<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="text" v-model="name" placeholder="First name" required />
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
    <p>{{ message }}</p>
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
      emailError: '', // New property for email validation error
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
        const response = await axios.post(`${this.api}/register`, {
          name: this.name,
          username: this.username,
          password: this.password,
          email: this.email,
          role: 'user',
        });
        this.message = response.data;
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
