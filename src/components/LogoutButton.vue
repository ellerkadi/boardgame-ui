<template>
  <div v-if="isLoggedIn">
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login').then(() => {
        window.location.reload();
      });
    },
  }

};
</script>