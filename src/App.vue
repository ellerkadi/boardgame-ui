<template>
  <div>
    <router-view></router-view>
    <Logout/>
  </div>
</template>

<script>
import Logout from './components/LogoutButton.vue';

export default {
  components: {
    Logout,
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
      isLoggedIn: false,
      showLogin: true,
    };
  }

};
</script>