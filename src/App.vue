<template>
  <h1>Welcome To Boardgame Rental!</h1>
  <div>
    <router-view></router-view>
    <Logout/>
  </div>
</template>

<script>
import Logout from './components/LogoutButton.vue';
import axios from "axios";

export default {
  components: {
    Logout,
  },
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

};
</script>