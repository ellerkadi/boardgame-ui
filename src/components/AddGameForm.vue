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
    <label for="gametype">Game type</label>
    <select v-model="newGame.gametype" id="gametype" required>
      <option value="Games for children">Games for children</option>
      <option value="Classic games">Classic games</option>
      <option value="Family games">Family games</option>
      <option value="Strategic games">Strategic games</option>
    </select>
    <input
        type="text"
        v-model="newGame.location"
        placeholder="Location"
        required
    />
    <label for="availability">Availability</label>
    <select v-model="newGame.availability" id="availability" required>
      <option :value="true">Available</option>
      <option :value="false">Not available</option>
    </select>
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
        gametype: "",
        availability: "",
        status: "PENDING",
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

      if (loggedInUser && loggedInUser.username) {
        this.newGame.username = loggedInUser.username;  // Username is set here
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
            this.successMessage = "Game added sucessfully!";
          })
          .catch((error) => {
            console.error("Failed to add game:", error.response || error.message);
          });
    },
  },
  //mounted() {
  //  const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  //  if (savedUser) {
  //    this.handleLogin(savedUser.username);
  //  }
  //},
};
</script>