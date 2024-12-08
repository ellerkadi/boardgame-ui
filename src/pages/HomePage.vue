<template>
  <div class="button-container">
    <button @click="goToHomePage">Home</button>
    <button v-if="$store.state.isLoggedIn" @click="goToUserPage">Your page</button>
    <button v-if="!$store.state.isLoggedIn" @click="goToLogin">Login</button>
    <LogoutButton/>
  </div>
  <h1>Welcome To Boardgame Rental!</h1>
  <div>
    <SearchGames/>
  </div>
  <div>
    <ApprovedGamesTable/>
  </div>
</template>

<script>
import ApprovedGamesTable from "@/components/ApprovedGamesTable.vue";
import SearchGames from "@/components/SearchGames.vue";
import LogoutButton from "@/components/LogoutButton.vue";

export default {
  components: {
    LogoutButton,
    ApprovedGamesTable,
    SearchGames,
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToHomePage() {
      this.$router.push('/home-page');
    },
    goToUserPage() {
      this.$router.push('/user-page');
    },
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.$store.commit('setIsLoggedIn', true); // Update Vuex store state
    }
  },
};
</script>
