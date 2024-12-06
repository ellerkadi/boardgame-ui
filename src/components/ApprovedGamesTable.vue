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
          <button @click="openModal(game)">Change</button>
          <button @click="deleteGame(game.id)">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="isModalVisible" class="modal fade show" tabindex="-1" role="dialog" id="modalSheet"
         style="display: block;">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header border-bottom-0"> <!-- title name -->
            <h1 class="modal-title fs-5">Change Game</h1> <!-- title name -->
            <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button> <!-- x button to close -->
          </div>
          <div class="modal-body py-0">
            <form>
              <div class="mb-3 form-check">
                <input v-model="updatedGame.gamename" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Game Name">
              </div>
              <div class="mb-3 form-check">
                <input v-model="updatedGame.description" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Description">
              </div>
              <div class="mb-3 form-check">
                <input v-model="updatedGame.location" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Location">
              </div>
              <div class="mb-3 form-check">
                <label for="floatingInput">Game Type</label>
                <select v-model="updatedGame.gametype" type="option" class="form-control rounded-3" id="floatingInput">
                  <option value="Games for children">Games for children</option>
                  <option value="Classic games">Classic games</option>
                  <option value="Family games">Family games</option>
                  <option value="Strategic games">Strategic games</option>
                </select>
              </div>
              <div class="mb-3 form-check">
                <label for="floatingInput">Game Availability</label>
                <select v-model="updatedGame.availability" type="boolean" class="form-control rounded-3"
                        id="floatingInput">
                  <option :value="true">Available</option>
                  <option :value="false">Not available</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer flex-column gap-2 pb-3 border-top-0">
            <button @click="updateGame(currentGame.id)" type="button" class="btn btn-primary">Save changes
            </button>
            <button @click="closeModal" type="button" class="btn btn-primary btn-secondary" data-bs-dismiss="modal">Close and
              lose your changes
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      approvedGames: [],
      isModalVisible: false,
      currentGame: null,
      updatedGame: {
        gamename: "",
        description: "",
        location: "",
        gametype: "",
        availability: "",
      },
    };
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
    openModal(game) {
      this.currentGame = game;
      this.updatedGame = {gamename: '', description: '', gametype: '', location: '', availability: ''};
      this.isModalVisible = true; // Show modal
    },
    closeModal() {
      this.isModalVisible = false; // Hide modal
    },
    updateGame() {
      axios
          .put(`${this.api}/updateGame/${this.currentGame.id}`, this.updatedGame)
          .then((res) => {
            console.log('Game updated:', res.data);
            this.fetchGames();
            this.updatedGame = {gamename: '', description: '', gametype: '', location: '', availability: ''};
            this.closeModal();
          })
          .catch(console.error)
    }
  },
};
</script>