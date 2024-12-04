<template>
  <div>
    <h2>Approved games</h2>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Type</th>
        <th>Location</th>
        <th>Availability</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in approvedGames" :key="game.id">
        <td>{{ game.gamename }}</td>
        <td>{{ game.description }}</td>
        <td>{{ game.gametype }}</td>
        <td>{{ game.location }}</td>
        <td>{{ game.availability }}</td>

        <td>
          <button v-if="editingId === game.id" @click="updateGame(game.id)">Save</button>
          <button v-if="editingId === game.id" @click="cancelEdit">Cancel</button>
          <button v-else @click="UpdateApp">Change</button>
          <button @click="deleteGame(game.id)">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import UpdateApp from "@/components/UpdateApp.vue";

export default {
  computed: {
    UpdateApp() {
      return UpdateApp
    }
  },

  props: ["api"],
  data() {
    return { approvedGames: [] };
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    fetchGames() {
      axios.get(`${this.api}/approvedGames`).then((res) => {
        this.approvedGames = res.data;
      });
    },
    deleteGame(id) {
      axios.delete(`${this.api}/deleteGameById/${id}`).then(() => {
        this.fetchGames();
      });
    },
  },
};
</script>