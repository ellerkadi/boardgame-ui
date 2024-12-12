<template>
  <br>
  <div id="formauth-div">
    <form @submit.prevent="addGame" class="d-flex align-items-center mb-4">

      <h2>Add new game</h2>

      <label for="gamename">Name</label>
      <input
          type="text"
          v-model="newGame.gamename"
          placeholder="Name"
          required
      />
      <label for="gamedescription">Description</label>
      <input
          type="text"
          v-model="newGame.description"
          placeholder="Description"
      />
      <label for="gamelocation">Location</label>
      <input
          type="text"
          v-model="newGame.location"
          placeholder="Location"
          required
      />
      <label for="gametypes">Type</label>
      <select v-model="newGame.gametypes" id="floatingInput" required multiple class="customgame">
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

      <label for="availability">Availability</label>
      <select v-model="newGame.availability" id="availability" required>
        <option value="Available">Available</option>
        <option value="Not Available">Not Available</option>
      </select>
      <label for="gamepicture">Picture</label>
      <input
          type="text"
          v-model="newGame.picture"
          placeholder="Picture URL"
      />
      <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
        {{ errorMessage }}
      </div>
      <button class="change-button">Add</button>
      <br>
    </form>
  </div>
</template>

<script>
import axiosInstance from "@/axiosConfig";

axiosInstance.defaults.withCredentials = true;

export default {
  data() {
    return {
      newGame: {
        gamename: "",
        description: "",
        location: "",
        gametypes: [],
        availability: "",
        status: "PENDING",
        picture: "",
        user: {username: ''},
      },
      successMessage: '',
      errorMessage: '',
      api: "http://localhost:8082/api/boardgame",
    };
  },
  methods: {
    addGame() {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Authorization token is missing!");
        return;
      }

      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      console.log('Logged in user:', loggedInUser); // PRINTS IN THE CONSOLE THE CORRECT USER, SO THIS WORKS
      console.log('Game info is:', this.newGame)

      if (loggedInUser && loggedInUser.username) {
        this.newGame.user.username = loggedInUser.username;  // Username is set here
      } else {
        console.error("Logged in user data is missing!");
        return;
      }

      axiosInstance
          .post(`${this.api}/addGame`, this.newGame, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {

            this.successMessage = "Game added successfully! Game is pending approval, wait for admin to approve.";
            this.newGame = {
              gamename: "",
              description: "",
              location: "",
              gametypes: [],
              availability: "",
              picture: "",
              user: { username: '' },
            };
          })
          .catch((error) => {
            console.error("Failed to add game:", error.response || error.message);
          });
    },
  },
};
</script>