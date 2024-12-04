<template>
  <div>
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
      <tr v-for="game in games" :key="game.id">
        <td>{{ game.gamename }}</td>
        <td>{{ game.description }}</td>
        <td>{{ game.gametype }}</td>
        <td>{{ game.location }}</td>
        <td>{{ game.availability }}</td>
        <td>
          <button @click="openModal(game)">Change</button>
        </td>
      </tr>
      </tbody>
    </table>

    <Modal :visible="isModalVisible" @close="closeModal">
      <template #header>
        <h3>Edit Game</h3>
      </template>
      <template #body>
        <form @submit.prevent="updateGame">
          <input v-model="selectedGame.gamename" placeholder="Name" required />
          <input v-model="selectedGame.description" placeholder="Description" required />
          <select v-model="selectedGame.gametype">
            <option value="Games for children">Games for children</option>
            <option value="Classic games">Classic games</option>
            <option value="Family games">Family games</option>
            <option value="Strategic games">Strategic games</option>
          </select>
          <input v-model="selectedGame.location" placeholder="Location" required />
          <select v-model="selectedGame.availability">
            <option :value="true">Available</option>
            <option :value="false">Not available</option>
          </select>
        </form>
      </template>
      <template #footer>
        <button @click="updateGame">Save</button>
        <button @click="closeModal">Cancel</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./components/Modal.vue";
import axios from "axios";

export default {
  components: { Modal },
  data() {
    return {
      games: [], // List of games
      isModalVisible: false, // Controls modal visibility
      selectedGame: {}, // Stores the selected game for editing
      api: "http://localhost:8082/api/boardgame", // API endpoint
    };
  },
  methods: {
    fetchGames() {
      axios.get(`${this.api}/getAllGames`).then((res) => {
        this.games = res.data;
      });
    },
    openModal(game) {
      this.selectedGame = { ...game }; // Copy the game object
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    updateGame() {
      axios
          .put(`${this.api}/updateGame/${this.selectedGame.id}`, this.selectedGame)
          .then(() => {
            this.fetchGames();
            this.closeModal();
          })
          .catch(console.error);
    },
  },
  mounted() {
    this.fetchGames();
  },
};
</script>