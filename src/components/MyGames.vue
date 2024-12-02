<template>
  <form @submit.prevent="addGame" class="d-flex align-items-center mb-4">
    <input
        type="text"
        v-model="newGame.gamename"
        placeholder="Name"
        class="form-control col input-style"
        required
    />
    <input
        type="text"
        v-model="newGame.description"
        placeholder="Description"
        class="form-control col input-style"
        required
    />
    <input
        type="text"
        v-model="newGame.gametype"
        placeholder="Game Type"
        class="form-control col input-style"
        required
    />
    <input
        type="text"
        v-model="newGame.location"
        placeholder="Location"
        class="form-control col input-style"
        required
    />
    <button>Add</button>
  </form>
  <table class="table table-hover table-bordered vintage-table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Game Type</th>
      <th>Location</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in allGamesList" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.gamename }}</td>
      <td>{{ item.description}}</td>
      <td>{{ item.gametype}}</td>
      <td>{{ item.location}}</td>
      <td>
        <button
            @click="deleteGameById(item.id)"
            class="btn btn-danger btn-sm action-button"
        >
          Remove
        </button>
      </td>
    </tr>
    </tbody>
  </table>

</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:8082/api/boardgame",
    allGamesList: [],
    newGame: {
      gamename:"",
      description:"",
      location: "",
      gametype: "",
      availability: true
    }
  }),

  methods: {
    fetchGames() {
      axios.all ([
        axios
            .get(`${this.api}/getAllGames`)
            .then((res) =>(this.allGamesList = res.data)),
      ])
    },
    addGame (){
      axios
          .post(`${this.api}/addGame`, this.newGame)
          .then((res) => {
            console.log('Game added:', res.data);
            this.fetchGames();
            this.newGame = {gamename: '', description: '', gametype: '', location: ''};
          })
          .catch(console.error)
    },
    deleteGameById() {
      axios
          .delete(`$[{this.api}/deleteGameById/{id}`)
          .then(() => {
            this.fetchGames();
          })
          .catch(console.error)
    }
  },
  mounted() {
    this.fetchGames();
  }
};

</script>


<style>

</style>