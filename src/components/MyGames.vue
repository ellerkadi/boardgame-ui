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
      <button @click="openModal" class="btn btn-danger btn-sm action-button">Change</button>
        <Transition name="modal">
          <div v-if="show" class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-header">
                  <slot name="header">default header</slot>
                </div>

                <div class="modal-body">
                  <slot name="body">default body</slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    default footer
                    <button
                        class="modal-default-button"
                        @click="$emit('close')"
                    >OK</button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </Transition>
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
  props: {
    show: Boolean
  },
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
    data() {
      return {
        isModalVisible: false
      };
    },
    methods: {
      openModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
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
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
