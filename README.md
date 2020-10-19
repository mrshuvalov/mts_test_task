Back: 
export FLASK_APP=main.py
flask run --host=0.0.0.0 --port=8000

Front:
cd auth/
npm run serve

Browser:
http://192.168.1.5:8080/login - authentication page

P.S.: There's a problem with http://192.168.1.5:8080/home page rerender, you can find list of values in browser
example: [{"value":"my first post!"},{"value":"fghj"},{"value":"new"},{"value":"1245"}]

Go easy on
