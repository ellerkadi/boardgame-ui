<template>
  <br><br><br><br><br><br>
  <div class="auth-container" >
    <div v-if="!isLoggedIn" id="formauth-div">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <input type="text" id="username" v-model="username" placeholder="Username" required/>
        </div>
        <div>
          <input type="password" id="password" v-model="password" placeholder="Password" required/>
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

            this.isLoggedIn = true;
            this.loggedInUser = this.username;
            this.$emit('login', response.data.username);
            localStorage.setItem('authToken', token);
            localStorage.setItem('loggedInUser', JSON.stringify({ username: this.username }));
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userName', response.data.name);

            const redirectTo = this.$route.query.redirect || '/home-page';
            this.$router.push(redirectTo).catch((err) => {
              console.error('Routing error:', err);
            });
          })
          .catch((error) => {
            this.error = error.response?.data || "Login failed";
            this.isLoggedIn = false;
          });
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.$store.commit('setIsLoggedIn', true);
    }
  },
};
</script>