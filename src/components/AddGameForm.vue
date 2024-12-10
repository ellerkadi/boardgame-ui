<template>
  <h2>Add new game</h2>
  <form @submit.prevent="addGame" class="d-flex align-items-center mb-4">

    <input
        type="text"
        v-model="newGame.gamename"
        placeholder="Name"
        required
    />
    <input
        type="text"
        v-model="newGame.description"
        placeholder="Description"
        required
    />
    <label for="gametypes">Game types</label>
    <select v-model="newGame.gametypes" id="gametypes" required multiple>
      <option value="Games for children">Games for children</option>
      <option value="Classic games">Classic games</option>
      <option value="Family games">Family games</option>
      <option value="Strategic games">Strategic games</option>
      <option value="Educational games">Educational games</option>
      <option value="Casual games">Casual games</option>
      <option value="Party games">Party games</option>
      <option value="Party games">Outdoor games</option>
      <option value="Party games">Quick games</option>
    </select>
    <input
        type="text"
        v-model="newGame.location"
        placeholder="Location"
        required
    />
    <label for="availability">Availability</label>
    <select v-model="newGame.availability" id="availability" required>
      <option value="Available">Available</option>
      <option value="Not Available">Not Available</option>
    </select>
    <input
        type="text"
        v-model="newGame.picture"
        placeholder="Picture URL"
    />
    <button>Add</button>
  </form>
  <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
        gametypes: "",
        availability: "",
        status: "PENDING",
        picture: "",
        user: { username: '' },
      },
      successMessage: '',
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
          .then((response) => {
            console.log("Game added successfully:", response.data);
            this.successMessage = "Game added sucessfully! Game is pending approval, wait for admin to approve.";
          })
          .catch((error) => {
            console.error("Failed to add game:", error.response || error.message);
          });
    },
  },
};
</script>