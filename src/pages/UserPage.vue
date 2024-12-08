<template>
  <div class="button-container">
    <button @click="goToHomePage">Home</button>
    <LogoutButton/>
  </div>
  <div>
    <UserGames/>
  </div>
  <br>
  <div>
    <AddGameForm/>
  </div>
</template>

<script>
import UserGames from "@/components/UserGames.vue";
import AddGameForm from '@/components/AddGameForm.vue';
import LogoutButton from "@/components/LogoutButton.vue";

export default {
  components: {
    LogoutButton,
    UserGames,
    AddGameForm
  },
  data() {
    return {
      api: "http://localhost:8082/api/boardgame",
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push('/home-page');
    },
  },
};
</script>