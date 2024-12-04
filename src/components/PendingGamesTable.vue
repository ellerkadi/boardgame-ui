<template>
  <div>
    <h2>Pending games for admin to approve or reject</h2>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Game Type</th>
        <th>Location</th>
        <th>Availability</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in pendingGames" :key="game.id">
        <td>{{ game.gamename }}</td>
        <td>{{ game.description }}</td>
        <td>{{ game.gametype }}</td>
        <td>{{ game.location }}</td>
        <td>{{ game.availability }}</td>
        <td>
          <button @click="approveGame(game.id)" class="btn btn-success">Approve</button>
          <button @click="rejectGame(game.id)" class="btn btn-danger">Reject</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["api"],
  data() {
    return { pendingGames: [] };
  },
  mounted() {
    this.fetchPendingGames();
  },
  methods: {
    fetchPendingGames() {
      axios
          .get(`${this.api}/pendingGames`)
          .then((res) => {
            this.pendingGames = res.data;
          })
          .catch(console.error);
    },
    approveGame(id) {
      axios
          .post(`${this.api}/approveGame/${id}`)
          .then(() => this.fetchPendingGames())
          .catch(console.error);
    },
    rejectGame(id) {
      axios
          .post(`${this.api}/rejectGame/${id}`)
          .then(() => this.fetchPendingGames())
          .catch(console.error);
    },
  },
};
</script>