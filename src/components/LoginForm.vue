<template>
  <div class="auth-container">
    <div v-if="!isLoggedIn">
      <h2>Login</h2>
      <form @submit="handleLoginSuccess">
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
        <button @click="toggleForm">Register</button>
      </p>
    </div>

    <div v-else>
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?
        <button @click="toggleForm">Login</button>
      </p>
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
      error: null,
      success: null,
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
            this.$router.push('/search-games').catch(err => console.error(err));  // Navigate to the search games page
          })
          .catch((error) => {
            this.error = error.response?.data || "Login failed";
          });
    },
    handleLoginSuccess() {
      this.isLoggedIn = true;
      localStorage.setItem('authToken', true);
      this.$router.push("/search-games");
    },
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem('authToken');
      this.$router.push("/login");
    },
    toggleForm() {
      this.showLogin = !this.showLogin;
    },
  },
};
</script>
