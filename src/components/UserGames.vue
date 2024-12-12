<template>
  <div>
    <h1>Your Games</h1>
    <br>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Game Types</th>
        <th>Location</th>
        <th>Availability</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in UserGames" :key="game.id">
        <td>{{ game.gamename }}</td>
        <td>{{ game.description }}</td>
        <td>{{ game.gametypes }}</td>
        <td>{{ game.location }}</td>
        <td>{{ game.availability }}</td>
        <td>
          <div class="button-container">
          <button class="change-button" @click="openModal(game)">Change</button>
          <button class="remove-button" @click="deleteGame(game.id)">Remove</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block;" id="modalChoice">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content rounded-3 shadow">
          <div class="modals-header border-bottom-0 text-center justify-content-center">
            <br>
          </div>
          <div class="modal-body py-0">
            <form>
              <div class="mb-3 form-check">
                <label for="floatingInput">Game name</label>
                <input v-model="updatedGame.gamename" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Game Name">
              </div>
            </form>
            <form>
              <div class="mb-3 form-check">
                <label for="floatingInput">Description</label>
                <input v-model="updatedGame.description" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Description">
              </div>
            </form>
            <form>
              <div class="mb-3 form-check">
                <label for="floatingInput">Location</label>
                <input v-model="updatedGame.location" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Location">
              </div>
            </form>
            <form>
              <div class="mb-3 form-check">
                <label for="floatingInput">Game Type</label>
                <select v-model="updatedGame.gametypes" id="floatingInput" required multiple class="custom-select">
                  <option value="Games for children">Games for children</option>
                  <option value="Classic games">Classic games</option>
                  <option value="Family games">Family games</option>
                  <option value="Strategic games">Strategic games</option>
                  <option value="Educational games">Educational games</option>
                  <option value="Casual games">Casual games</option>
                  <option value="Party games">Party games</option>
                  <option value="Outdoor games">Outdoor games</option>
                  <option value="Quick games">Quick games</option>
                </select>
              </div>
            </form>
            <form>
              <div class="mb-3 form-check">
                <label for="floatingInput">Game Availability</label>
                <select v-model="updatedGame.availability" type="boolean" class="form-control rounded-3"
                        id="floatingInput">
                  <option disabled value="">-- Select availability --</option>
                  <option :value="true">Available</option>
                  <option :value="false">Not available</option>
                </select>
              </div>
            </form>
            <form>
              <div class="mb-3 form-check">
                <label for="floatingInput">Picture</label>
                <div class="mb-3 form-check">
                  <input v-model="updatedGame.picture" type="text" class="form-control rounded-3" id="floatingInput"
                         placeholder="Picture">
                </div>
                <img
                    v-if="currentGame && currentGame.picture"
                    :src="currentGame.picture"
                    alt="Game Image"
                    class="img-fluid mb-3"
                    style="max-width: 200px; border-radius: 8px;"
                >
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
import axiosInstance from "@/axiosConfig";


export default {
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      UserGames: [],
      isModalVisible: false,
      currentGame: null,
      updatedGame: {
        gamename: "",
        description: "",
        location: "",
        gametypes: "",
        availability: "",
        arrayGametypes: "",
        picture: ""
       },
    };
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    fetchGames() {
      const username = JSON.parse(localStorage.getItem("loggedInUser"))?.username || this.$store.state.username;
      axiosInstance
          .get(`${this.api}/getGamesByUsername/${username}`)
          .then((res) => {
            this.UserGames = res.data; // Use UserGames instead
          })
          .catch((error) => {
            console.error("Error fetching games:", error);
          });
    },
    deleteGame(id) {
      axiosInstance
          .delete(`${this.api}/deleteGameById/${id}`).then(() => {
        this.fetchGames();
      });
    },
    openModal(game) {
      this.currentGame = game;
      this.updatedGame = {
        gamename: game.gamename,
        description: game.description,
        gametypes: game.arrayGametypes,
        location: game.location,
        availability: game.availability,
        picture: game.picture
      };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    updateGame() {
      axiosInstance
          .put(`${this.api}/updateGame/${this.currentGame.id}`, this.updatedGame)
          .then((res) => {
            console.log("Game updated:", res.data);
            this.fetchGames();
            this.updatedGame = {
              gamename: '',
              description: '',
              gametypes: '',
              location: '',
              availability: '',
              picture: ''
            };
            this.closeModal();
          })
          .catch((error) => {
            console.error("Error updating game:", error);
          });
    },
  },
};
</script>