<template>
  <div>
    <MainNavbar />
  </div>
  <div>
    <ProfileDetailsForm/>
  </div>
</template>

<script>
import ProfileDetailsForm from "@/components/ProfileDetailsForm.vue";
import MainNavbar from "@/components/Navbar.vue";

export default {
  components: {
    MainNavbar,
    ProfileDetailsForm
  },
  data() {
    return {
      api: "http://localhost:8082/api/users",
    };
  },
  mounted() {
    if (localStorage.getItem('authToken')) {
      this.$store.commit('setIsLoggedIn', true); // Update Vuex store state
    }
  },
};
</script>
