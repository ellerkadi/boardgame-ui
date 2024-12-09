<template>
  <div>
    <MainNavbar />
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
import MainNavbar from "@/components/Navbar.vue";

export default {
  components: {
    MainNavbar,
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