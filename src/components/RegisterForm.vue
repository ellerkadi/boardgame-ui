<!--
<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="text" v-model="email" placeholder="Email" required />
      <button type="submit">Register</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      username: '',
      password: '',
      email: '',
      message: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', {
          name: this.name,
          username: this.username,
          password: this.password,
          email: this.email,
        });
        this.message = response.data;
      } catch (error) {
        this.message = 'Registration failed!';
        console.error(error);
      }
    },
  },
};
</script>-->
