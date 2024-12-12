<template>
  <div>
    <div id="header" >
      <div v-if="!$store.state.isLoggedIn" id="userGreeting">
        <button class="logout-button" @click="goToLogin">Login</button>
      </div>

      <div id="userGreeting" v-if="isUser || isAdmin">
        <p>Hello, {{ userName }}!</p>
        <LogoutButton/>
      </div>
      <img src="https://www.upload.ee/image/17499735/Etsy_Shop_Big_Banner__2_.jpg" alt="logo"/>
<!--      <img src="https://www.upload.ee/image/17499948/1.png" alt="logo"/>-->
    </div>

    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto"> <!-- ms-auto for right alignment -->

            <li class="nav-item">
              <button @click="goToHomePage" class="nav-link">Home</button>
            </li>

            <li class="nav-item" v-if="$store.state.isLoggedIn">
              <button @click="goToUserPage" class="nav-link">Your games</button>
            </li>

            <li class="nav-item" v-if="isAdmin">
              <button @click="goToAdminPage" class="nav-link">Admin page</button>
            </li>

            <li class="nav-item" v-if="$store.state.isLoggedIn">
              <button @click="goToProfilePage" class="nav-link">Profile</button>
            </li>

          </ul>
          <div>
            <SearchGamesByGamename/>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import LogoutButton from "@/components/LogoutButton.vue";
import SearchGamesByGamename from "@/components/SearchGamesByGamename.vue";

export default {
  name: 'MainNavbar',
  components: {
    SearchGamesByGamename,
    LogoutButton,
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      isAdmin: false,
      userName: "",
      isUser: false,
    };
  },
  methods: {
    checkUserRole() {
      const role = localStorage.getItem("userRole");
      this.isAdmin = role === "admin"; // Set isAdmin to true if the role is admin
      this.userName = localStorage.getItem('userName')
      this.isUser = role === "user";
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

    goToProfilePage() {
      this.$router.push('/profile-page');
    },

  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.$store.commit('setIsLoggedIn', true); // Update Vuex store state
      this.checkUserRole();

    }
  },
};
</script>