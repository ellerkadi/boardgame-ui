<template>
  <div class="auth-container">
    <!-- Login Form -->
    <div v-if="!isLoggedIn">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?
        <button @click="goToRegister">Register</button>
      </p>
      <p v-if="error" style="color: red">{{ error }}</p>
      <p v-if="success" style="color: green">{{ success }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      error: null,
      success: null,
      isLoggedIn: false,
      api: "http://localhost:8082/api/auth/login",
    };
  },
  methods: {
    login() {
      this.error = null;
      this.success = null;
      axios
          .post(this.api, {username: this.username, password: this.password})
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            this.isLoggedIn = true;
            this.success = "Login successful!";
            console.log('Redirecting to /search-games');
            this.$router.push('/search-games').catch((err) => console.error(err));  // Navigate to the search games page
          })
          .catch((error) => {
            this.error = error.response?.data || "Login failed";
            this.isLoggedIn = false;  // Ensure isLoggedIn is false if login fails
          });
    },
    toggleForm() {
      this.isLoggedIn = !this.isLoggedIn;
    },
    goToRegister() {
      this.$router.push('/register');  // Redirect to the Register page
    },
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.isLoggedIn = true;
    }
  },
};
</script>