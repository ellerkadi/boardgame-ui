<template>
  <div>
    <ApprovedGamesTable/>
  </div>
</template>

<script>
import ApprovedGamesTable from "@/components/ApprovedGamesTable.vue";

export default {
  components: {
    ApprovedGamesTable
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
    };
  },

};
</script>
