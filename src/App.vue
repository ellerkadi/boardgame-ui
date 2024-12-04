<template>
  <div>
<!--    <div v-if="!isLoggedIn">
      <Login @login-success="handleLoginSuccess" />
    </div>-->
<!--    <div v-else>-->
      <SearchGames />
      <AddGameForm @game-added="fetchGames" />
      <PendingGamesTable :api="api" />
      <ApprovedGamesTable :api="api" />
<!--      <button @click="logout">Logout</button>-->
<!--    </div>-->
  </div>
</template>

<script>
import AddGameForm from "@/components/AddGameForm.vue";
import PendingGamesTable from "@/components/PendingGamesTable.vue";
import SearchGames from "@/components/SearchGames.vue";
import ApprovedGamesTable from "@/components/ApprovedGamesTable.vue";
/*import Register from "@/components/RegisterForm.vue";
import Login from "@/components/LoginForm.vue";*/

import axios from "axios";

export default {
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      approvedGames: [],
     /* isLoggedIn: false,*/
    };
  },
  components: {
    /*LoginForm,*/
    AddGameForm,
    PendingGamesTable,
    SearchGames,
    // eslint-disable-next-line vue/no-unused-components
    ApprovedGamesTable
  },
  methods: {
    fetchGames() {
      axios
          .get(`${this.api}/approvedGames`).then((res) => {
        this.approvedGames = res.data;
      });
    },
    /*handleLoginSuccess() {
      this.isLoggedIn = true; // Set login state to true
    },
    logout() {
      this.isLoggedIn = false; // Clear login state on logout
    },*/
  },
  mounted() {
    this.fetchGames();
  },
};
</script>