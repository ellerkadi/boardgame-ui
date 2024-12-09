<template>
  <div>
    <PendingGamesTable/>
  </div>
</template>

<script>
import PendingGamesTable from "@/components/PendingGamesTable.vue";

export default {
  components: {
    PendingGamesTable
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
    };
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.$store.commit('setIsLoggedIn', true); // Update Vuex store state
    }
  },
};
</script>
