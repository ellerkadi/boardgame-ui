<template>

  <h2>SEARCH</h2>



  <div>
    <h3>Search by Game</h3>
    <input type="text" id="searchGameInput" placeholder="Enter game name"/>
    <button @click="findGameByGamename">Search</button>

    <thead v-if="findGameByGamenameResult.length > 0">
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Game Type</th>
      <th>Location</th>
      <th>Availability</th>
    </tr>
    </thead>
    <tbody v-for="game in findGameByGamenameResult" :key="game.id">
    <tr>
      <td>{{ game.gamename }}</td>
      <td>{{ game.description }}</td>
      <td>{{ game.gametype }}</td>
      <td>{{ game.location }}</td>
      <td>{{ game.availability }}</td>
    </tr>
    </tbody>
  </div>

  <h3>Search by Availability</h3>
  <select id="availabilitySelect" @change="findGameByAvailability">
    <option value="">Select Availability</option>
    <option value="true">Available</option>
    <option value="false">Not Available</option>
  </select>

  <table>
    <thead v-if="findGameByAvailabilityResult.length > 0">
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Game Type</th>
      <th>Location</th>
    </tr>
    </thead>
    <tbody v-for="game in findGameByAvailabilityResult" :key="game.id">
    <tr>
      <td>{{ game.gamename }}</td>
      <td>{{ game.description }}</td>
      <td>{{ game.gametype }}</td>
      <td>{{ game.location }}</td>
    </tr>
    </tbody>
  </table>

  <h3>Search by Game Type</h3>
  <select id="gametypeSelect" @change="findGameByGametype">
    <option value="">Select Availability</option>
    <option value="Games for children">Games for children</option>
    <option value="Classic games">Classic games</option>
    <option value="Family games">Family games</option>
    <option value="Strategic games">Strategic games</option>
  </select>

  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Location</th>
      <th>Availability</th>
    </tr>
    </thead>
    <tbody v-for="game in findGameByGametypeResult" :key="game.id">
    <tr>
      <td>{{ game.gamename }}</td>
      <td>{{ game.description }}</td>
      <td>{{ game.location }}</td>
      <td>{{ game.availability }}</td>
    </tr>
    </tbody>
  </table>

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

  <br>

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
    <tr v-for="item in approvedGames" :key="item.id">
      <td>{{ item.gamename }}</td>
      <td>{{ item.description }}</td>
      <td>{{ item.gametype }}</td>
      <td>{{ item.location }}</td>
      <td>{{ item.availability }}</td>
      <td>
        <div>
          <!-- Button to trigger the modal -->
          <button @click="openModal" class="btn btn-danger btn-sm action-button">Change</button>
          <section class="modal" :class="{ hidden: !isModalVisible }" id="updateGameModal">
            <div class="flex">
              <img src="user.png" width="50px" height="50px" alt="user" />
              <button @click="closeModal" class="btn-close">⨉</button>
            </div>
            <div>
              <h3>Stay in touch</h3>
              <p>
                This is a dummy newsletter form so don't bother trying to test it. Not
                that I expect you to, anyways. :)
              </p>
            </div>
            <input type="email" id="email" placeholder="brendaneich@js.com" />
            <button class="btn">Submit</button>
          </section>

          <div class="overlay" :class="{ hidden: !isModalVisible }" @click="closeModal"></div>
        </div>
     <!--   <div class = "modal fade"
             id="updateGameModal" tabindex="-1" aria-labelledby="updateGameModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="updateGameModalLabel">Update Game</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="submitUpdate">
                  <div class="mb-3">
                    <label for="gamename" class="form-label">Game Name</label>
                    <input type="text" class="form-control" id="gamename" v-model="updatedGame.gamename">
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description" v-model="updatedGame.description">
                  </div>
                  <div class="mb-3">
                    <label for="gametype" class="form-label">Game Type</label>
                    <input type="text" class="form-control" id="gametype" v-model="updatedGame.gametype">
                  </div>
                  <div class="mb-3">
                    <label for="location" class="form-label">Location</label>
                    <input type="text" class="form-control" id="location" v-model="updatedGame.location">
                  </div>
                  <button type="submit" class="btn btn-primary">Save changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
-->
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
    </tr>
    </tbody>
  </table>

</template>

<script>
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  data: () => ({
    api: "http://localhost:8082/api/boardgame",
    allGamesList: [],
    pendingGames: [],
    approvedGames: [],
    findGameByGamenameResult: [],
    findGameByAvailabilityResult: [],
    findGameByGametypeResult: [],
    newGame: {
      gamename: "",
      description: "",
      location: "",
      gametype: "",
      availability: ""
    },
    updatedGame: {
      gamename: "",
      description: "",
      location: "",
      gametype: "",
      availability: ""
    },
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

    fetchFindGameByGamename(gamename) {
      if (!gamename) {
        console.error("Game name is required to fetch data.");
        return;
      }
      axios
          .get(`${this.api}/findGameByGamename/${gamename}`)
          .then((res) => {
            this.findGameByGamenameResult = res.data;
          });
    },

    findGameByGamename() {
      const gamename = document.getElementById("searchGameInput").value.trim();
      this.fetchFindGameByGamename(gamename);
    },

    fetchFindGameByAvailability(availability) {
      axios
          .get(`${this.api}/findGameByAvailability/${availability}`)
          .then((res) => {
            this.findGameByAvailabilityResult = res.data;
            console.log("Games found:", res.data);
          });
    },

    findGameByAvailability() {
      const availability = document.getElementById("availabilitySelect").value;
      if (availability === "") {
        this.findGameByAvailabilityResult = [];
      } else {
        this.fetchFindGameByAvailability(availability === 'true');
      }
    },

    fetchFindGameByGametype(gametype) {
      axios
          .get(`${this.api}/findGameByGametype/${gametype}`)
          .then((res) => {
            this.findGameByGametypeResult = res.data;
            console.log("Games found:", res.data);
          });
    },

    findGameByGametype() {
      const gametype = document.getElementById("gametypeSelect").value;
      if (gametype === "") {
        this.findGameByGametypeResult = [];
      } else {
        this.fetchFindGameByGametype(gametype);
      }
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

  /* updateGame(id) {
      axios
          .put(`${this.api}/updateGame/${id}`, this.updatedGame)
          .then((res) => {
            console.log('Game updated:', res.data);
            this.fetchGames();
            this.updatedGame = {gamename: '', description: '', gametype: '', location: ''};
          })
          .catch(console.error)
    },
    */

    deleteGameById(id) {
      axios
          .delete(`${this.api}/deleteGameById/${id}`)
          .then(() => {
            this.fetchGames();
          })
          .catch(console.error);
    }
  },
  mounted() {
    this.fetchGames();
    this.fetchPendingGames();
    this.fetchApprovedGames();
  }
};

</script>
