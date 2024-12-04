<template>
  <div>
    <SearchGames />
    <AddGameForm @game-added="fetchGames" />
    <PendingGamesTable :api="api" />
    <ApprovedGamesTable :api="api" />

  </div>
</template>

<script>
import AddGameForm from "@/components/AddGameForm.vue";
import PendingGamesTable from "@/components/PendingGamesTable.vue";
import SearchGames from "@/components/SearchGames.vue";
import ApprovedGamesTable from "@/components/ApprovedGamesTable.vue";

import axios from "axios";

export default {
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      approvedGames: [],
    };
  },
  components: {
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
  },
  mounted() {
    this.fetchGames();
  },
};
</script>