<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      How far?
    </p>
    <input :value="distance" @change="update" id="distance" />
    <p>
      What time?
    </p>
    <p>
      <input :value="hours" @change="update" id="hours" />
      <span>Hrs</span>
      <input :value="minutes" @change="update" id="minutes" />
      <span>Mins</span>
      <input :value="seconds" @change="update" id="seconds" />
      <span>Secs</span>
    </p>
    <h2>
      <button @click="calculate">↩︎</button>
      Pace: {{ pace }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function() {
    return {
      distance: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      unit: "",
      pace: ""
    };
  },
  methods: {
    update(event) {
      this[event.target.id] = event.target.value;
    },
    calculate() {
      const totalSeconds =
        parseInt(this.seconds) +
        parseInt(this.minutes * 60) +
        parseInt(this.hours * 60 * 60);
      const secondsPace = totalSeconds / this.distance;
      if (secondsPace) {
        this.pace = `${Math.trunc(secondsPace / 60)}minutes${secondsPace %
          60}seconds`;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 14px;
  margin: 3px;
}
</style>
