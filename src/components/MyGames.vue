<template>
  <form @submit.prevent="addGame" class="d-flex align-items-center mb-4">

    <h2>Add new game</h2>



    <br>

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
    <label for="gametype" class="form-label mt-2">Game type</label>
    <select
        id="gametype"
        v-model="newGame.gametype"
        class="form-control col input-style"
        required>
      <option value="Games for children">Games for children</option>
      <option value="Classic games">Classic games</option>
      <option value="Family games">Family games</option>
      <option value="Strategic games">Strategic games</option>
    </select>
    <input
        type="text"
        v-model="newGame.location"
        placeholder="Location"
        class="form-control col input-style"
        required
    />
    <label for="availability" class="form-label mt-2">Availability</label>
    <select
        id="availability"
        v-model="newGame.availability"
        class="form-control col input-style"
        required>
      <option :value="true">Available</option>
      <option :value="false">Not available</option>
    </select>
    <button>Add</button>
  </form>

  <br>

  <h2>Approved games by admin (users see this list when they want to rent)</h2>

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
  <br>

  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Name</th>
      <th>Game</th>
      <th>Description</th>
      <th>Game Type</th>
      <th>Location</th>
      <th>Availability</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in approvedGames" :key="item.id">
    <tr v-for="item in allGamesList" :key="item">
    <tr v-for="item in allGamesList" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.gamename }}</td>
      <td>{{ item.description }}</td>
      <td>{{ item.gametype }}</td>
      <td>{{ item.location }}</td>
      <td>{{ item.availability }}</td>
      <td>
        <button @click="deleteGameById(item.id)" class="btn btn-danger btn-sm action-button">Change</button>
        <button @click="deleteGameById(item.id)" class="btn btn-danger btn-sm action-button">Remove</button>
      </td>
    </tr>
    </tbody>
  </table>

<br>

  <h2>Pending games for admin to approve or reject</h2>
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
    <tr v-for="game in pendingGames" :key="game.id">
      <td>{{ game.gamename }}</td>
      <td>{{ game.description }}</td>
      <td>{{ game.gametype }}</td>
      <td>{{ game.location }}</td>
      <td>{{ game.availability }}</td>
      <td>
        <button @click="approveGame(game.id)" class="btn btn-success">Approve</button>
        <button @click="rejectGame(game.id)" class="btn btn-danger">Reject</button>
      </td>
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
    pendingGames: [],
    approvedGames: [],
    newGame: {
      gamename: "",
      description: "",
      location: "",
      gametype: "",
      availability: ""
    }
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
      axios
          .get(`${this.api}/getAllGames`)
          .then((res) => (this.allGamesList = res.data))
    },

    fetchPendingGames() {
      axios
          .get(`${this.api}/pendingGames`)
          .then((res) => (this.pendingGames = res.data))
    },

    fetchApprovedGames() {
      axios
          .get(`${this.api}/approvedGames`)
          .then((res) => (this.approvedGames = res.data))
    },

    approveGame(id) {
      axios
          .post(`${this.api}/approveGame/${id}`)
          .then(() => this.fetchPendingGames())
          .catch(console.error);
    },

    rejectGame(id) {
      axios
          .post(`${this.api}/rejectGame/${id}`)
          .then(() => this.fetchPendingGames())
          .catch(console.error);
    },

    addGame() {
      axios
          .post(`${this.api}/addGame`, this.newGame)
          .then((res) => {
            console.log('Game added:', res.data);
            this.fetchGames();
            this.newGame = {gamename: '', description: '', gametype: '', location: ''};
          })
          .catch(console.error)
    },

    /*updateGame(id) {
      axios
          .put(`${this.api}/updateGame/${id}`, this.updatedGame)
          .then((res) => {
            console.log('Game updated:', res.data);
            this.fetchGames();
            this.newGame = {gamename: '', description: '', gametype: '', location: ''};
          })
          .catch(console.error)
    },*/

    deleteGameById(id) {
      axios
          .delete(`${this.api}/deleteGameById/${id}`)
          .then(() => {
            this.fetchGames();
          })
          .catch(console.error);
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
    this.fetchPendingGames();
    this.fetchApprovedGames();
  }
  }
};

</script>


<style>

</style>