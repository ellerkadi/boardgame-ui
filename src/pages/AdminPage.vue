<template>
  <div>
    <MainNavbar />
  </div>
  <div>
    <PendingGamesTable/>
  </div>
</template>

<script>
import PendingGamesTable from "@/components/PendingGamesTable.vue";
import MainNavbar from "@/components/Navbar.vue";

export default {
  components: {
    MainNavbar,
    PendingGamesTable
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
    };
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.$store.commit('setIsLoggedIn', true);
    }
  },
};
</script>
