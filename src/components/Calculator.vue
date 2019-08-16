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
        <span>hrs</span>
        <input :value="minutes" @change="update" id="minutes" />
        <span>mins</span>
        <input :value="seconds" @change="update" id="seconds" />
        <span>secs</span>
      </p>
    </div>
    <div class="section">
      <p>
        Pace
      </p>
      <p>
        <input :value="paceMinutes" @change="update" id="paceMinutes" />
        <span>mins</span>
        <input :value="paceSeconds" @change="update" id="paceSeconds" />
        <span>secs</span>
        <span> /{{ unit === "miles" ? "mile" : unit }}</span>
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
      paceMinutes: 0,
      paceSeconds: 0,
      unit: "km",
      unitOptions: ["km", "miles"],
      latestInputs: [],
      sectionMapping: {
        hours: "time",
        minutes: "time",
        seconds: "time",
        distance: "distance",
        paceMinutes: "pace",
        paceSeconds: "pace"
      }
    };
  },
  methods: {
    update(event) {
      this[event.target.id] =
        event.target.value === "" ? "0" : event.target.value;
      const sectionName = this.sectionMapping[event.target.id];
      this.updateLatestInputs(sectionName);
      this.calculate();
    },
    calculate() {
      if (
        this.latestInputs.includes("distance") &&
        this.latestInputs.includes("time")
      ) {
        this.calculatePace();
      }
      if (
        this.latestInputs.includes("distance") &&
        this.latestInputs.includes("pace")
      ) {
        this.calculateTime();
      }
      if (
        this.latestInputs.includes("pace") &&
        this.latestInputs.includes("time")
      ) {
        this.calculateDistance();
      }
    },
    calculatePace() {
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
    calculateTime() {
      const totalPaceSeconds =
        parseInt(this.paceMinutes * 60) + parseInt(this.paceSeconds);
      const totalSeconds = totalPaceSeconds * this.distance;
      this.hours = Math.trunc(totalSeconds / 60 / 60);
      this.minutes = Math.trunc((totalSeconds / 60) % 60);
      this.seconds = Math.trunc(
        (totalSeconds / 60 - Math.trunc(totalSeconds / 60)) * 60
      );
    },
    calculateDistance() {
      const totalPaceSeconds =
        parseInt(this.paceMinutes * 60) + parseInt(this.paceSeconds);
      const totalSeconds =
        parseInt(this.seconds) +
        parseInt(this.minutes * 60) +
        parseInt(this.hours * 60 * 60);
      this.distance = (totalSeconds / totalPaceSeconds).toFixed(1);
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
  width: 30px;
  margin: 3px 3px 3px 6px;
  border: none;
  font-size: 20px;
  text-align: right;
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
