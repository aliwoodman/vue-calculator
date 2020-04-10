<template>
  <div class="calculator">
    <h1>{{ msg }}</h1>
    <div class="section">
      <p>
        Distance
      </p>
      <div id="distance-container">
        <input
          id="distance"
          :value="distance"
          @change="update"
          @click="selectAll"
          v-bind:style="[inputStyles, { width: this.getInputWidth(distance) }]"
        />
        <button @click="toggleUnit">{{ unit }}</button>
      </div>
    </div>
    <div class="section">
      <p>
        Time
      </p>
      <div>
        <input
          id="hours"
          :value="hours"
          @change="update"
          @click="selectAll"
          v-bind:style="[inputStyles, { width: this.getInputWidth(hours) }]"
        />
        <span>hrs</span>
        <input
          id="minutes"
          :value="minutes"
          @change="update"
          @click="selectAll"
          v-bind:style="[inputStyles, { width: this.getInputWidth(minutes) }]"
        />
        <span>mins</span>
        <input
          id="seconds"
          :value="seconds"
          @change="update"
          @click="selectAll"
          v-bind:style="[inputStyles, { width: this.getInputWidth(seconds) }]"
        />
        <span>secs</span>
      </div>
    </div>
    <div class="section">
      <p>
        Pace
      </p>
      <div>
        <input
          id="paceMinutes"
          :value="paceMinutes"
          @change="update"
          @click="selectAll"
          v-bind:style="[
            inputStyles,
            { width: this.getInputWidth(paceMinutes) }
          ]"
        />
        <span>mins</span>
        <input
          id="paceSeconds"
          :value="paceSeconds"
          @change="update"
          @click="selectAll"
          v-bind:style="[
            inputStyles,
            { width: this.getInputWidth(paceSeconds) }
          ]"
        />
        <span>secs</span>
        <span> /{{ unit === "miles" ? "mile" : unit }}</span>
      </div>
    </div>
    <div class="section">
      <div>
        <img
          @click="resetCalculator"
          src="../../public/refresh.png"
          style="width: 24px"
        />
      </div>
    </div>
  </div>
</template>

<script>
  const CHAR_WIDTH = 12;
  const initialState = () => ({
    distance: 5,
    hours: 0,
    minutes: 0,
    seconds: 0,
    paceMinutes: 0,
    paceSeconds: 0,
    unit: "km",
    latestInputs: ["distance"],
    unitOptions: ["km", "miles"],
    sectionMapping: {
      hours: "time",
      minutes: "time",
      seconds: "time",
      distance: "distance",
      paceMinutes: "pace",
      paceSeconds: "pace"
    },
    inputStyles: {
      margin: "3px 3px 3px 6px",
      width: "max-content",
      border: "none",
      fontSize: "20px",
      textAlign: "right",
    }
  });
  export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function() {
    return initialState()
  },
  methods: {
    update(event) {
      this[event.target.id] =
        event.target.value === "" ? "0" : event.target.value;
      const sectionName = this.sectionMapping[event.target.id];
      this.updateLatestInputs(sectionName);
      this.calculate();
    },
    selectAll(event) {
      const input = document.getElementById(event.target.id);
      input.select();
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

      if (parseInt(this.distance) === 0 || parseInt(totalSeconds) === 0) {
        this.paceMinutes = 0;
        this.paceSeconds = 0;
      } else {
        const secondsPace = totalSeconds / this.distance;
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

      if (totalPaceSeconds === 0) {
        this.distance = 0;
      } else {
        const totalSeconds =
          parseInt(this.seconds) +
          parseInt(this.minutes * 60) +
          parseInt(this.hours * 60 * 60);
        this.distance = (totalSeconds / totalPaceSeconds).toFixed(1);
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
    resetCalculator() {
      Object.assign(this.$data, initialState());
    },
    toggleUnit() {
      this.unit =
        this.unit === this.unitOptions[0]
          ? this.unitOptions[1]
          : this.unitOptions[0];
    },
    getInputWidth(text) {
      return `${text.toString().length * CHAR_WIDTH}px`
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  font-size: 20px;
  border-radius: 3px;
  background-color: #235024;
  color: #ffffff;
}

.section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 30px;
}
</style>
