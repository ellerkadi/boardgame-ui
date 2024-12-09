<template>
  <div>
    <h2>Approved Games</h2>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Game Type</th>
        <th>Location</th>
        <th>Availability</th>
        <th v-if="isAdmin">Action</th>
        <th v-if="isUser || isAdmin">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in approvedGames" :key="game.id">
        <td>{{ game.gamename }}</td>
        <td>{{ game.description }}</td>
        <td>{{ game.gametype }}</td>
        <td>{{ game.location }}</td>
        <td>{{ game.availability }}</td>

        <td v-if="isAdmin"> <!-- if role is admin then show. -->
          <button @click="openModal(game)">Change</button>
          <button @click="deleteGame(game.id)">Remove</button>
        </td>
        <td v-if="isUser || isAdmin"> <!-- if role is user then show. -->
          <button @click="openContactModal(game.id)">Contact</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if= "isContactModalVisible" class="modal fade show" tabindex="-1" style="display: block;" id="modalChoice">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-body p-4 text-center">
            <button @click="closeContactModal" type="button" class="btn-close"
                    aria-label="Close"></button>
            <h5 class="mb-0">Get in touch with the game owner</h5>
            <p class="mb-0">Game owner email address: {{ userEmail }} </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isModalVisible" class="modal fade show" tabindex="-1" role="dialog" id="modalChoice">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header border-bottom-0">
            <h1 class="modal-title fs-5">Change Game</h1>
            <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
          </div>
          <div class="modal-body py-0">
            <form>
              <div class="mb-3 form-check">
                <input v-model="updatedGame.gamename" type="text" class="form-control rounded-3"
                       placeholder="Game Name">
              </div>
              <div class="mb-3 form-check">
                <input v-model="updatedGame.description" type="text" class="form-control rounded-3"
                       placeholder="Description">
              </div>
              <div class="mb-3 form-check">
                <input v-model="updatedGame.location" type="text" class="form-control rounded-3"
                       placeholder="Location">
              </div>
              <div class="mb-3 form-check">
                <label>Game Type</label>
                <select v-model="updatedGame.gametype" class="form-control rounded-3">
                  <option value="Games for children">Games for children</option>
                  <option value="Classic games">Classic games</option>
                  <option value="Family games">Family games</option>
                  <option value="Strategic games">Strategic games</option>
                </select>
              </div>
              <div class="mb-3 form-check">
                <label>Game Availability</label>
                <select v-model="updatedGame.availability" class="form-control rounded-3">
                  <option :value="true">Available</option>
                  <option :value="false">Not available</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer flex-column gap-2 pb-3 border-top-0">
            <button @click="updateGame" type="button" class="btn btn-primary">Save changes</button>
            <button @click="closeModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close and lose your changes</button>
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
      approvedGames: [],
      isModalVisible: false,
      isContactModalVisible: false,
      currentGame: null,
      updatedGame: {
        gamename: "",
        description: "",
        location: "",
        gametype: "",
        availability: "",
      },
      isAdmin: false, // New property to track if the user is an admin
      token: false,
      isUser: false,
      userEmail: ""
    };
  },
  mounted() {
    this.fetchGames();
   this.checkUserRole();
  },
  methods: {
    checkUserRole() {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("userRole");
      this.isAdmin = token && role === "admin"; // Only set isAdmin if the user is logged in and has the admin role
      this.isUser = token && role === "user";
    },
    fetchGames() {
      axiosInstance
          .get(`${this.api}/approvedGames`)
          .then((response) => {
            this.approvedGames = response.data;
          })
          .catch((error) => {
            console.error("Error fetching games:", error);
          });
    },
    deleteGame(id) {
      axiosInstance
          .delete(`${this.api}/deleteGameById/${id}`)
          .then(() => {
            this.fetchGames();
          });
    },
    openModal(game) {
      this.currentGame = game;
      this.updatedGame = { ...game }; // Spread operator to copy game properties
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    openContactModal(id) {
      this.isContactModalVisible = true;
      this.fetchUserByGameId(id)
    },
    closeContactModal() {
      this.isContactModalVisible = false;
    },
    updateGame() {
      axiosInstance
          .put(`${this.api}/updateGame/${this.currentGame.id}`, this.updatedGame)
          .then((res) => {
            console.log("Game updated:", res.data);
            this.fetchGames();
            this.closeModal();
          })
          .catch((error) => {
            console.error("Error updating game:", error);
          });
    },
    fetchUserByGameId(id){
      axiosInstance
          .get(`${this.api}/getUserByGame/${id}`)
          .then((res) => {
            this.userEmail = res.data.email;
           console.log( res.data.email)
          })
    },
  },
};
</script>
