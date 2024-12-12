<template>
    <div class="search-bar-container">
<!--    <div class="search-bar">-->
<!--      <input-->
<!--          type="text"-->
<!--          id="searchGameInput"-->
<!--          placeholder="Enter game name"-->
<!--          class="search-input"-->
<!--      />-->
<!--      <button @click="findGameByGamename" class="search-button">Search</button>-->
<!--    </div>-->
<!--    <br>-->

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

      <SearchModal
          :isModalVisible="isModalVisible"
          :games="gamesToDisplay"
          @close="isModalVisible = false"
      />

      <ContactModal
          :is-contact-modal-visible="isContactModalVisible"
          :currentGame="currentGame"
          :userName="userName"
          :userEmail="userEmail"
          @close="closeContactModal"
      />
    </div>
</template>

<script>
import axios from "axios";
import axiosInstance from "../axiosConfig.js";
import SearchModal from "@/components/SearchModal.vue";

axios.defaults.withCredentials = true;
export default {
  components: {
    SearchModal,
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      gamesToDisplay: [],
      isModalVisible: false,
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
            console.log(res);
            this.gamesToDisplay = res.data;
            this.openModal();
          });
    },
    // findGameByGamename() {
    //   const gamename = document.getElementById("searchGameInput").value.trim();
    //   this.fetchFindGameByGamename(gamename);
    // },
    openModal() {
      this.isModalVisible = true;
    },
    fetchFindGameByAvailability(availability) {
      axiosInstance
          .get(`${this.api}/findGameByAvailability/${availability}`)
          .then((res) => {
            this.gamesToDisplay = res.data;
            console.log("Games found:", res.data);
            this.openModal();
          });
    },
    findGameByAvailability() {
      const availability = document.getElementById("availabilitySelect").value;
      if (availability === "") {
        this.gamesToDisplay = [];
      } else {
        this.fetchFindGameByAvailability(availability === 'true' ? "Available" : "Not Available");
      }
    },

    fetchFindGameByGametype(gametype) {
      axiosInstance
          .get(`${this.api}/findGameByGametype/${gametype}`)
          .then((res) => {
            this.gamesToDisplay = res.data;
            console.log("Games found:", res.data);
            this.openModal();
          });
    },
    findGameByGametype() {
      const gametype = document.getElementById("gametypeSelect").value;
      if (gametype === "") {
        this.gamesToDisplay = [];
      } else {
        this.fetchFindGameByGametype(gametype);
      }
    },
  },
};
</script>