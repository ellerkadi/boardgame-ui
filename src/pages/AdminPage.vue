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
};
</script>
