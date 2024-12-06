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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newGame: {
        gamename: "",
        description: "",
        location: "",
        gametype: "",
        availability: "",
        status: "PENDING"
      },
    };
  },
  methods: {
    addGame() {
      axios
          .post(`${this.api}/addGame`, this.newGame)
          .then(() => {
            this.$emit("game-added");
          })
          .catch(console.error);
    },
  },
};
</script>