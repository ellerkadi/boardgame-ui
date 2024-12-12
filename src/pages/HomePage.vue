<template>
  <div>
    <MainNavbar/>
  </div>
  <br>
  <br>
  <h1>Games For Rent!</h1>

  <div v-if="isLoggedIn">
    <h4>Contact owner for more info</h4>
  </div>
  <div v-if="!isLoggedIn">
    <h4>Log in to rent a game</h4>
  </div>

  <div class="search-container">
    <SearchGames />
  </div>

  <div>
    <ApprovedGamesTable/>
  </div>
  <br>
  <br>
</template>

<script>
import ApprovedGamesTable from "@/components/ApprovedGamesTable.vue";
import SearchGames from "@/components/SearchGames.vue";
import MainNavbar from "@/components/Navbar.vue";

export default {
  components: {
    ApprovedGamesTable,
    SearchGames,
    MainNavbar,
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      isAdmin: false,
    };
  },
  methods: {
    checkUserRole() {
      const role = localStorage.getItem("userRole");
      this.isAdmin = role === "admin"; // Set isAdmin to true if the role is admin
    },
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.$store.commit('setIsLoggedIn', true); // Update Vuex store state
      this.checkUserRole();
      //   this.checkUserName();
    }
  },
};
</script>
