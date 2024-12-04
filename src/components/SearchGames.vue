<template>
  <div>
    <h2>SEARCH</h2>

    <h3>Search by Game</h3>
    <input type="text" id="searchGameInput" placeholder="Enter game name"/>
    <button @click="findGameByGamename">Search</button>

    <h3>Search by Availability</h3>
    <select id="availabilitySelect" @change="findGameByAvailability">
      <option value="">Select Availability</option>
      <option value="true">Available</option>
      <option value="false">Not Available</option>
    </select>

    <h3>Search by Game Type</h3>
    <select id="gametypeSelect" @change="findGameByGametype">
      <option value="">Select Type</option>
      <option value="Games for children">Games for children</option>
      <option value="Classic games">Classic games</option>
      <option value="Family games">Family games</option>
      <option value="Strategic games">Strategic games</option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      findGameByGamenameResult: [],
      findGameByAvailabilityResult: [],
      findGameByGametypeResult: [],
    };
  },
  methods: {
    findGameByGamename() {
      const gamename = document.getElementById("searchGameInput").value.trim();
      if (gamename) {
        axios
            .get(`${this.api}/findGameByGamename/${gamename}`)
            .then((res) => {
              this.findGameByGamenameResult = res.data;
            })
            .catch(console.error);
      }
    },
    findGameByAvailability() {
      const availability = document.getElementById("availabilitySelect").value;
      if (availability) {
        axios
            .get(`${this.api}/findGameByAvailability/${availability === "true"}`)
            .then((res) => {
              this.findGameByAvailabilityResult = res.data;
            })
            .catch(console.error);
      }
    },
    findGameByGametype() {
      const gametype = document.getElementById("gametypeSelect").value;
      if (gametype) {
        axios
            .get(`${this.api}/findGameByGametype/${gametype}`)
            .then((res) => {
              this.findGameByGametypeResult = res.data;
            })
            .catch(console.error);
      }
    },
  },
};
</script>