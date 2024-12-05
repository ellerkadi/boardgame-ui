<template>
  <h1>Welcome To Boardgame Rental!</h1>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      isLoggedIn: false,
      showLogin: true,
    };
  },

  methods: {
    fetchGames() {
      axios
          .get(`${this.api}/approvedGames`).then((res) => {
        this.approvedGames = res.data;
      });
    },
  },
  mounted() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLoggedIn = true;
    }
  },
};
</script>