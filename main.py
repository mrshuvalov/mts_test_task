from flask import Flask, Response
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask import request

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)


from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

    def __repr__(self):
	       return "<{}:{}>".format(self.id, self.username)

    def check_password(self,  password):
        if password==self.password:
            return True
        else:
            return False

class Value(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(140))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return '<Post {}>'.format(self.value)

@app.route('/login/', methods=['post'])
def login():
    user = db.session.query(User).filter(User.username == request.json['email']).first()
    if user and user.check_password(request.json['password']):
        return Response(user.username)
    else:
        return Response(status=404)

@app.route('/get_data/', methods=['get'])
def get_data():
    user = db.session.query(User).filter(User.username == request.json['email']).first()
    db.session.query(User).filter(User.username == request.json['user']).first()
    values = db.session.query(Value).filter(Value.user == request.json['user'])
    return Response(values)

@app.route('/add_data/', methods=['post'])
def add_data():
    user = db.session.query(User).filter(User.username == request.json['user']).first()
    value = Value(value=request.json['value'], user_id=user.id)
    db.session.add(value)
    db.session.commit()
    return Response(status=201)
