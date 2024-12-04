<template>
<div>
<h3>Search by Game</h3>
<input type="text" id="searchGameInput" placeholder="Enter game name"/>
<button @click="findGameByGamename">Search</button>

<thead v-if="findGameByGamenameResult.length > 0">
<tr>
  <th>Name</th>
  <th>Description</th>
  <th>Game Type</th>
  <th>Location</th>
  <th>Availability</th>
</tr>
</thead>
<tbody v-for="game in findGameByGamenameResult" :key="game.id">
<tr>
  <td>{{ game.gamename }}</td>
  <td>{{ game.description }}</td>
  <td>{{ game.gametype }}</td>
  <td>{{ game.location }}</td>
  <td>{{ game.availability }}</td>
</tr>
</tbody>
</div>

<h3>Search by Availability</h3>
<select id="availabilitySelect" @change="findGameByAvailability">
<option value="">Select Availability</option>
<option value="true">Available</option>
<option value="false">Not Available</option>
</select>

<table>
<thead v-if="findGameByAvailabilityResult.length > 0">
<tr>
  <th>Name</th>
  <th>Description</th>
  <th>Game Type</th>
  <th>Location</th>
</tr>
</thead>
<tbody v-for="game in findGameByAvailabilityResult" :key="game.id">
<tr>
  <td>{{ game.gamename }}</td>
  <td>{{ game.description }}</td>
  <td>{{ game.gametype }}</td>
  <td>{{ game.location }}</td>
</tr>
</tbody>
</table>

<h3>Search by Game Type</h3>
<select id="gametypeSelect" @change="findGameByGametype">
<option value="">Select Availability</option>
<option value="Games for children">Games for children</option>
<option value="Classic games">Classic games</option>
<option value="Family games">Family games</option>
<option value="Strategic games">Strategic games</option>
</select>

<table>
<thead>
<tr>
  <th>Name</th>
  <th>Description</th>
  <th>Location</th>
  <th>Availability</th>
</tr>
</thead>
<tbody v-for="game in findGameByGametypeResult" :key="game.id">
<tr>
  <td>{{ game.gamename }}</td>
  <td>{{ game.description }}</td>
  <td>{{ game.location }}</td>
  <td>{{ game.availability }}</td>
</tr>
</tbody>
</table>
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
    fetchFindGameByGamename(gamename) {
      if (!gamename) {
        console.error("Game name is required to fetch data.");
        return;
      }
      axios
          .get(`${this.api}/findGameByGamename/${gamename}`)
          .then((res) => {
            this.findGameByGamenameResult = res.data;
          });
    },
    findGameByGamename() {
      const gamename = document.getElementById("searchGameInput").value.trim();
      this.fetchFindGameByGamename(gamename);
    },
    fetchFindGameByAvailability(availability) {
      axios
          .get(`${this.api}/findGameByAvailability/${availability}`)
          .then((res) => {
            this.findGameByAvailabilityResult = res.data;
            console.log("Games found:", res.data);
          });
    },
    findGameByAvailability() {
      const availability = document.getElementById("availabilitySelect").value;
      if (availability === "") {
        this.findGameByAvailabilityResult = [];
      } else {
        this.fetchFindGameByAvailability(availability === 'true');
      }
    },
    fetchFindGameByGametype(gametype) {
      axios
          .get(`${this.api}/findGameByGametype/${gametype}`)
          .then((res) => {
            this.findGameByGametypeResult = res.data;
            console.log("Games found:", res.data);
          });
    },
    findGameByGametype() {
      const gametype = document.getElementById("gametypeSelect").value;
      if (gametype === "") {
        this.findGameByGametypeResult = [];
      } else {
        this.fetchFindGameByGametype(gametype);
      }
    },
  },
};
</script>