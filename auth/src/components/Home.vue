<template>
  <div>
    <form class="val" @submit.prevent="val">
      <h1>Already signed in</h1>
      <label>Some Label</label>
      <input required v-model="value" type="text" placeholder="Value" />
      <button type="submit">Add</button>
    </form>
    <ul class='itemsList'>
      <li v-for="item in itemsList" :key="item.value">
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    let user = this.$store.state.user
    this.$store
      .dispatch("getData", user)
      .then(() => {
        this.itemsList= this.$store.state.data
      })
    return {
      value: "",
      itemsList: this.$store.state.data,
    }
  },
  methods: {
    val() {
      let value = this.value;
      let user = this.$store.state.user
      this.$store
        .dispatch("addValue", { user, value })
    },
  },
};
</script>
