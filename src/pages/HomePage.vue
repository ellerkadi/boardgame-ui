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
    <SearchGames @update-approved-games="updateApprovedGames" />
  </div>

  <div>
    <ApprovedGamesTable :approved-games="approvedGames" />
  </div>
  <br>
  <br>
</template>

<script>
import ApprovedGamesTable from "@/components/ApprovedGamesTable.vue";
import SearchGames from "@/components/SearchGames.vue";
import MainNavbar from "@/components/Navbar.vue";
import axiosInstance from "@/axiosConfig";

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
      approvedGames: [],
    };
  },
  methods: {
    updateApprovedGames(games) {
      this.approvedGames = games;
      console.log('Updated approved games:', games)
    },
    checkUserRole() {
      const role = localStorage.getItem("userRole");
      this.isAdmin = role === "admin"; // Set isAdmin to true if the role is admin
    },
    fetchAllApprovedGames() {
      axiosInstance
          .get(`${this.api}/approvedGames`)
          .then((res) => {
            this.approvedGames = res.data; // Set all games initially
          })
          .catch((error) => {
            console.error("Error fetching all approved games:", error);
          });
    },
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.$store.commit('setIsLoggedIn', true); // Update Vuex store state
      this.checkUserRole();
      //   this.checkUserName();
    }
    this.fetchAllApprovedGames();
  },
};
</script>
