<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="section">
      <p>
        Distance
      </p>
      <p id="distance-container">
        <input :value="distance" @change="update" id="distance" />
        <button @click="toggleUnit">{{ unit }}</button>
      </p>
    </div>
    <div class="section">
      <p>
        Time
      </p>
      <p>
        <input :value="hours" @change="update" id="hours" />
        <span>Hrs</span>
        <input :value="minutes" @change="update" id="minutes" />
        <span>Mins</span>
        <input :value="seconds" @change="update" id="seconds" />
        <span>Secs</span>
      </p>
    </div>
    <div class="section">
      <p>
        Pace
      </p>
      <p>
        <input :value="paceMinutes" @change="update" id="paceMinutes" />
        <span>Mins</span>
        <input :value="paceSeconds" @change="update" id="paceSeconds" />
        <span>Secs</span>
      </p>
    </div>
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
      unitOptions: ["km", "miles"],
      sectionMapping: {
        hours: "time",
        minutes: "time",
        seconds: "time",
        distance: "distance",
        paceMinutes: "pace",
        paceSeconds: "pace"
      },
      latestInputs: [],
      unit: "km",
      paceMinutes: 0,
      paceSeconds: 0
    };
  },
  methods: {
    update(event) {
      this[event.target.id] = event.target.value;
      const sectionName = this.sectionMapping[event.target.id];
      this.updateLatestInputs(sectionName);
      this.calculate();
    },
    calculate() {
      const totalSeconds =
        parseInt(this.seconds) +
        parseInt(this.minutes * 60) +
        parseInt(this.hours * 60 * 60);
      const secondsPace = totalSeconds / this.distance;
      if (secondsPace) {
        this.paceMinutes = Math.trunc(secondsPace / 60);
        this.paceSeconds = Math.round(secondsPace % 60);
      }
    },
    updateLatestInputs(sectionName) {
      if (this.latestInputs.length > 1) {
        if (this.latestInputs[1] !== sectionName) {
          this.latestInputs.shift();
          this.latestInputs.push(sectionName);
        }
      } else if (
        (this.latestInputs.length === 1 &&
          this.latestInputs[0] !== sectionName) ||
        this.latestInputs.length === 0
      ) {
        this.latestInputs.push(sectionName);
      }
    },
    toggleUnit() {
      this.unit =
        this.unit === this.unitOptions[0]
          ? this.unitOptions[1]
          : this.unitOptions[0];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: 28px;
  margin: 3px 3px 3px 6px;
  border: none;
  font-size: 20px;
}
button {
  font-size: 20px;
  border-radius: 3px;
  background-color: #235024;
  color: #ffffff;
}

#distance-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.section {
  margin-bottom: 30px;
}
</style>
