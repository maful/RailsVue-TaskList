<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "Hello World!"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 3em;
  text-align: center;
}
</style>
