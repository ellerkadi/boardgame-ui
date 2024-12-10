<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Boardgame Rental</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto"> <!-- ms-auto for right alignment -->
          <li class="nav-item">
            <p>Hello, {{ userName }}</p>
          </li>

          <li class="nav-item">
            <button @click="goToHomePage" class="nav-link">Home</button>
          </li>

          <li class="nav-item" v-if="$store.state.isLoggedIn">
            <button @click="goToUserPage" class="nav-link">Your games</button>
          </li>

          <li class="nav-item" v-if="isAdmin">
            <button @click="goToAdminPage" class="nav-link">Admin page</button>
          </li>

          <li class="nav-item" v-if="!$store.state.isLoggedIn">
            <button @click="goToLogin" class="nav-link">Login</button>
          </li>

          <li class="nav-item">
            <LogoutButton />
          </li>


        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

import LogoutButton from "@/components/LogoutButton.vue";
import axiosInstance from "@/axiosConfig";

export default {
  name: 'MainNavbar',
  components: {
    LogoutButton,
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      isAdmin: false,
      userName: "",
    };
  },
  methods: {
    checkUserRole() {
      const role = localStorage.getItem("userRole");
      this.isAdmin = role === "admin"; // Set isAdmin to true if the role is admin
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToHomePage() {
      this.$router.push('/home-page');
    },
    goToUserPage() {
      this.$router.push('/user-page');
    },
    goToAdminPage() {
      this.$router.push('/admin-page');
    },
    fetchUserByGameId(id){
      axiosInstance
          .get(`${this.api}/getUserByGame/${id}`)
          .then((res) => {
            this.userName = res.data.name;
            console.log( res.data.name)
          })
    },
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.$store.commit('setIsLoggedIn', true); // Update Vuex store state
      this.checkUserRole();
      const id = localStorage.getItem("id");
      if(id) {
      this.fetchUserByGameId(id);
      } else {
        console.error("User ID not found");
      }
    }
  },
};
</script>