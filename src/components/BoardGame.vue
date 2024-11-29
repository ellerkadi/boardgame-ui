<template>
  <table class="table">

    <thead>
    <tr>
      <th>Game</th>
      <th>Description</th>
      <th>Location</th>
      <th>Game type</th>
      <th>Availability</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in allGamesList" :key="item">
      <td>{{ item.game_name }}</td>
      <td>{{ item.description }}</td>
      <td>{{ item.location }}</td>
      <td>{{ item.game_type }}</td>
      <td>{{ item.availability }}</td>
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
  }),
  methods: {
    fetchGames() {
      axios.all ([
        axios
            .get(`${this.api}/getAllGames`)
            .then((res) =>(this.allGamesList = res.data)),
      ])
    }
  },
  mounted() {
    this.fetchGames();
  },
};

</script>


<style>

</style>