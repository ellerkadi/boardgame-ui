<template>
  <br><br><br><br><br><br>
  <div id="formauth-div">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required/>
      <input type="password" v-model="password" placeholder="Password" required/>
      <input type="text" v-model="name" placeholder="First name" required/>
      <input
          type="text"
          v-model="email"
          placeholder="Email"
          required
      />
      <p v-if="emailError" class="error">{{ emailError }}</p>
      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account?
      <button @click="goToLogin">Login</button>
    </p>
    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      api: "http://localhost:8082/api/auth",
      name: '',
      username: '',
      password: '',
      email: '',
      role: '',
      message: '',
      emailError: '',
      isSuccess: false,
    };
  },
  methods: {
    async register() {
      if (!this.validateEmail(this.email)) {
        this.emailError = 'Please enter a valid email address.';
        return;
      }
      this.emailError = '';

      try {
        await axios.post(`${this.api}/register`, {
          name: this.name,
          username: this.username,
          password: this.password,
          email: this.email,
          role: 'user',
        });
        const loginResponse = await axios.post(`${this.api}/login`, {
          username: this.username,
          password: this.password,
        });

        const token = loginResponse.data.token;

        this.isLoggedIn = true;
        this.loggedInUser = this.username;

        this.$emit('login', loginResponse.data.username);

        localStorage.setItem('authToken', token);
        localStorage.setItem('loggedInUser', JSON.stringify({username: this.username}));
        localStorage.setItem('userRole', loginResponse.data.role);
        localStorage.setItem('userName', loginResponse.data.name);

        const redirectTo = this.$route.query.redirect || '/home-page';
        this.$router.push(redirectTo).catch((err) => {
          console.error('Routing error:', err);
        });
      } catch (error) {
        this.message = error.response?.data.message || 'Registration failed!';
        console.error(error);
      }
    },
    validateEmail(email) {
      const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>
