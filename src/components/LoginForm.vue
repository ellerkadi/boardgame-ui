<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required/>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">{{ success }}</p>
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
      api: "http://localhost:8082/api/users/login",
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
  },
};
</script>
