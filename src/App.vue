<template>
  <div id="app">
    <Calculator msg="Pace calculator" />
  </div>
</template>

<script>
import Calculator from "./components/Calculator.vue";

export default {
  name: "app",
  components: {
    Calculator
  }
};
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 3vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #235024;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  p {
    margin: 10px;
  }
  button {
    font-family: inherit;
    font-size: inherit;
  }
  input {
    font-family: inherit;
    font-size: inherit;
  }
</style>
