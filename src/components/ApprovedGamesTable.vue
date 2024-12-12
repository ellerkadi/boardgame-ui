<template>

<br>
    <div>
      <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Game Types</th>
        <th>Location</th>
        <th>Availability</th>
        <th v-if="isAdmin">Action</th>
        <th v-if="isUser || isAdmin">Rent</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in approvedGames" :key="game.id">
        <td>{{ game.gamename }}</td>
        <td>{{ game.description }}</td>
        <td>{{ game.gametypes }}</td>
        <td>{{ game.location }}</td>
        <td>{{ game.availability }}</td>

        <td v-if="isAdmin"> <!-- if role is admin then show. -->
          <div class="button-container">
            <button @click="openModal(game)">Change</button>
            <button @click="deleteGame(game.id)">Remove</button>
          </div>
        </td>
        <td v-if="isUser || isAdmin"> <!-- if role is user then show. -->
          <button @click="openContactModal(game)">Contact</button>
        </td>
      </tr>
      </tbody>
    </table>

    <ContactModal
        :is-contact-modal-visible="isContactModalVisible"
        :currentGame="currentGame"
        :userName="userName"
        :userEmail="userEmail"
        @close="closeContactModal"
    />


    <div v-if="isModalVisible" class="modal fade show" tabindex="-1" role="dialog" id="modalSheet"
         style="display: block;">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header border-bottom-0">
            <h1 class="modal-title fs-5">Change Game</h1>
            <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button> <!-- x button to close -->
          </div>
          <div class="modal-body py-0">
            <form>
              <div class="mb-3 form-check">
                <input v-model="updatedGame.gamename" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Game Name">
              </div>
            </form>
            <form>
              <div class="mb-3 form-check">
                <input v-model="updatedGame.description" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Description">
              </div>
            </form>
            <form>
              <div class="mb-3 form-check">
                <input v-model="updatedGame.location" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Location">
              </div>
            </form>
            <form>
              <div class="mb-3 form-check">
                <label for="floatingInput">Game Type</label>
                <select v-model="updatedGame.gametypes" class="form-control rounded-3" id="floatingInput" required multiple>
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
                  <option disabled value="">-- Select one --</option>
                  <option :value="true">Available</option>
                  <option :value="false">Not available</option>
                </select>
              </div>
            </form>
            <form>
              <img
                  v-if="currentGame && currentGame.picture"
                  :src="currentGame.picture"
                  alt="Game Image"
                  class="img-fluid mb-3"
                  style="max-width: 200px; border-radius: 8px;"
              >
              <div class="mb-3 form-check">
                <input v-model="updatedGame.picture" type="text" class="form-control rounded-3" id="floatingInput"
                       placeholder="Picture">
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
import ContactModal from "@/components/ContactModal.vue";

export default {
  components: {
    ContactModal,
  },
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
        gametypes: "",
        availability: "",
        picture: "",
        arrayGametypes: ""
      },
      isAdmin: false,
      token: false,
      isUser: false,
      userEmail: "",
      userName: "",
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
          .then((res) => {
            this.approvedGames = res.data;
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
      console.log("Closing modal")
      this.isModalVisible = false;
    },
    openContactModal(game) {
      console.log("Contact button clicked, game: ", game);   // Add this log
      this.currentGame = game;
      this.fetchUserByGameId(game.id);
      this.isContactModalVisible = true;
      },
    closeContactModal() {
      this.isContactModalVisible = false; // Close the modal
    },
    fetchUserByGameId(id){
      axiosInstance
          .get(`${this.api}/getUserByGame/${id}`)
          .then((res) => {
            this.userEmail = res.data.email;
            this.userName = res.data.name;
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
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
