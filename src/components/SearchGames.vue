<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <input
          type="text"
          id="searchGameInput"
          placeholder="Enter game name"
          class="search-input"
      />
      <button @click="findGameByGamename" class="search-button">Search</button>
    </div>
    <br>

    <select id="availabilitySelect" @change="findGameByAvailability" class="small-select">
      <option value="">Select Availability</option>
      <option value="true">Available</option>
      <option value="false">Not Available</option>
    </select>

    <select id="gametypeSelect" @change="findGameByGametype" class="small-select">
      <option value="">Select Game Type</option>
      <option value="Games for children">Games for children</option>
      <option value="Classic games">Classic games</option>
      <option value="Family games">Family games</option>
      <option value="Strategic games">Strategic games</option>
      <option value="Educational games">Educational games</option>
      <option value="Casual games">Casual games</option>
      <option value="Party games">Party games</option>
      <option value="Outdoor games">Outdoor games</option>
      <option value="Quick games">Quick games</option>
    </select>
    <div>
      <button @click="clearFields" class="clear-button">Clear Fields</button>
    </div>

  </div>

</template>

<script>
import axios from "axios";
import axiosInstance from "../axiosConfig.js";

axios.defaults.withCredentials = true;
export default {
  components: {},
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      approvedGames: [],
      isContactModalVisible: false,
      currentGame: null,
      updatedGame: {
        gamename: "",
        description: "",
        location: "",
        gametypes: "",
        availability: "",
        picture: "",
      },
      isAdmin: false,
      token: false,
      isUser: false,
      userEmail: "",
      userName: "",
    };
  },
  methods: {
    fetchFindGameByGamename(gamename) {
      if (!gamename) {
        console.error("Game name is required to fetch data.");
        return;
      }
      axiosInstance
          .get(`${this.api}/findGameByGamename/${gamename}`)
          .then((res) => {
            this.$emit("update-approved-games", res.data);
          })
          .catch((error) => {
            console.error("Error fetching games by name:", error);
          });
    },
    fetchFindGameByAvailability(availability) {
      axiosInstance
          .get(`${this.api}/findGameByAvailability/${availability}`)
          .then((res) => {
            this.$emit("update-approved-games", res.data);
          })
          .catch((error) => {
            console.error("Error fetching games by availability:", error);
          });
    },
    fetchFindGameByGametype(gametype) {
      axiosInstance
          .get(`${this.api}/findGameByGametype/${gametype}`)
          .then((res) => {
            this.$emit("update-approved-games", res.data);
          })
          .catch((error) => {
            console.error("Error fetching games by type:", error);
          });
    },
    findGameByGamename() {
      const gamename = document.getElementById("searchGameInput").value.trim();
      this.fetchFindGameByGamename(gamename);
    },
    findGameByAvailability() {
      const availability = document.getElementById("availabilitySelect").value;
      this.fetchFindGameByAvailability(availability === 'true' ? "Available" : "Not Available");

    },
    findGameByGametype() {
      const gametype = document.getElementById("gametypeSelect").value;
      this.fetchFindGameByGametype(gametype);
    },
    clearFields() {
      document.getElementById("searchGameInput").value = "";
      document.getElementById("availabilitySelect").value = "";
      document.getElementById("gametypeSelect").value = "";
      this.$emit("reset-approved-games");
    },
  },
};
</script>