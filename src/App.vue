<template>
  <h1>Welcome To Boardgame Rental!</h1>
  <div>
    <router-view></router-view>
<!--    <div v-if="!isLoggedIn">
      <div v-if="showLogin">
        <LoginForm @login-success="handleLoginSuccess" />
        <p>
          Don't have an account?
          <button @click="toggleForm">Register</button>
        </p>
      </div>
      <div v-else>
        <RegisterForm />
        <p>
          Already have an account?
          <button @click="toggleForm">Login</button>
        </p>
      </div>
    </div>-->

<!--    <div v-else>

      <button @click="logout">Logout</button>
    </div>-->
  </div>
</template>

<script>
import ApprovedGamesTable from "@/components/ApprovedGamesTable.vue";
/*import RegisterForm from "@/components/RegisterForm.vue";
import LoginForm from "@/components/LoginForm.vue";*/

import axios from "axios";/**/

export default {
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      approvedGames: [],
      isLoggedIn: false,
      showLogin: true,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ApprovedGamesTable,
   /* RegisterForm,
    LoginForm,*/
  },
  methods: {
    fetchGames() {
      axios
          .get(`${this.api}/approvedGames`).then((res) => {
        this.approvedGames = res.data;
      });
    },
    handleLoginSuccess() {
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
      this.$router.push("/search-games");
    },
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      this.$router.push("/login");
    },
    toggleForm() {
      this.showLogin = !this.showLogin;
    },
  },
  mounted() {
    if (localStorage.getItem("isLoggedIn")) {
      this.isLoggedIn = true;
      this.fetchGames(); // Fetch games only if logged in
    }
  },
};
</script>