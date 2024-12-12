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
  </div>
</template>
<script>
import axios from "axios";
import axiosInstance from "../axiosConfig.js";

axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      gamesToDisplay: [],
      isModalVisible: false,
    };
  },
  methods: {
    findGameByGamename() {
      const gamename = document.getElementById("searchGameInput").value.trim();
      this.fetchFindGameByGamename(gamename);
    },
    fetchFindGameByGamename(gamename) {
      if (!gamename) {
        console.error("Game name is required to fetch data.");
        return;
      }
      axiosInstance
          .get(`${this.api}/findGameByGamename/${gamename}`)
          .then((res) => {
            console.log("Games found:", res.data);
            this.$emit("update-approved-games", res.data); // Update the table directly
          })
          .catch((error) => {
            console.error("Error fetching games by name:", error);
          });
    },
  },
};
</script>