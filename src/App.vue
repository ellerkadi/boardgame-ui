<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      isLoggedIn: false,
      showLogin: true,
      //loggedInUser: JSON.parse(localStorage.getItem('loggedInUser'))?.username || null,
    };
  }

};
</script>