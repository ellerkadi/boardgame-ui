<template>
  <div class="auth-container">
    <!-- Login Form -->
    <div v-if="!isLoggedIn">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required/>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required/>
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
import axiosInstance from "@/axiosConfig";

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      error: null,
      success: null,
      isLoggedIn: false
    };
  },
  methods: {
    login() {
      axiosInstance.post('/auth/login', {
        username: this.username,
        password: this.password,
      })
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            console.log("auth token : " + localStorage.getItem('authToken'));
            const redirectTo = this.$route.query.redirect || '/home-page';

            this.$router.push(redirectTo).catch((err) => {
              console.error('Routing error:', err);
            });
          })
          .catch((error) => {
            this.error = error.response?.data || "Login failed";
            this.isLoggedIn = false;  // Ensure isLoggedIn is false if login fails
          });
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.isLoggedIn = true;
    }
  },
};
</script>