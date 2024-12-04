<template>
  <div>
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
      <tr v-for="game in games" :key="game.id">
        <td>{{ game.gamename }}</td>
        <td>{{ game.description }}</td>
        <td>{{ game.gametype }}</td>
        <td>{{ game.location }}</td>
        <td>{{ game.availability }}</td>
        <td>
          <button @click="deleteGame(game.id)" class="btn btn-danger">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["api", "games"],
  methods: {
    deleteGame(id) {
      axios
          .delete(`${this.api}/deleteGameById/${id}`)
          .then(() => this.$emit("game-deleted"))
          .catch(console.error);
    },
  },
};
</script>