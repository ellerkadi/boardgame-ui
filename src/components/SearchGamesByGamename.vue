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
    findGameByGamename() {
      const gamename = document.getElementById("searchGameInput").value.trim();
      this.fetchFindGameByGamename(gamename);
    },
    openModal() {
      this.isModalVisible = true;
    },
  },
};
</script>