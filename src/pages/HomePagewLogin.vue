<template>
  <div>
    <LogoutButton/>
  </div>
  <div>
    <SearchGames/>
  </div>
  <div>
    <AddGameForm/>
  </div>
  <div>
    <ApprovedGamesTable/>
  </div>
</template>

<script>
import ApprovedGamesTable from "@/components/ApprovedGamesTable.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import SearchGames from "@/components/SearchGames.vue";
import AddGameForm from "@/components/AddGameForm.vue";

export default {
  components: {
    ApprovedGamesTable,
    LogoutButton,
    SearchGames,
    AddGameForm,
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
    };
  },

};
</script>
