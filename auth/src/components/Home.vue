<template>
  <div>
    <form class="val" @submit.prevent="val">
      <h1>Already signed in</h1>
      <label>Some Label</label>
      <input required v-model="value" type="text" placeholder="Value" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    val: function () {
      let value = this.value;
      let user = this.$store.state.user
      this.$store
        .dispatch("addValue", { user, value })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>
