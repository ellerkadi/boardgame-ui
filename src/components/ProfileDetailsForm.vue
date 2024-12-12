<template>
  <div><br><br>
    <div id="formauth-div">

      <form>

        <h2>Change your details</h2>

        <div class="form-floating mb-3">
          <input v-model="updatedUser.username" type="text" class="form-control rounded-3" id="floatingUsername" placeholder="Username" readonly required/>
          <label for="floatingUsername">Username (can't change)</label>
        </div>

        <div class="form-floating mb-3">
          <div class="password-container">
            <input v-model="updatedUser.password" :type="showPassword ? 'text' : 'password'" class="form-control rounded-3" id="floatingPassword" placeholder="Password" required/> <!-- type password makes the password hidden -->
            <button type="button" class="btn btn-sm btn-outline-secondary toggle-password" @click="togglePasswordVisibility">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <div v-if="passwordError" class="text-danger mt-1">
            Password is required.
          </div>
        </div>

        <div class="form-floating mb-3">
          <input v-model="updatedUser.name" type="text" class="form-control rounded-3" id="floatingName" placeholder="Name" required/>
          <label for="floatingName">Name</label>
        </div>

        <div class="form-floating mb-3">
          <input v-model="updatedUser.email" type="text" class="form-control rounded-3" id="floatingEmail" placeholder="Email" required/>
          <label for="floatingEmail">Email</label>
        </div>

        <div class="submit mt-auto">
          <button class="change-button" @click="updateUser(currentUser.id)" type="button">
            Save changes
          </button>
        </div>
        <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
          {{ errorMessage }}
        </div>
        <br>
      </form>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axiosConfig";

export default {
  data() {
    return {
      api: "http://localhost:8082/api/users",
      UserDetails: [],
      currentUser: null,
      showPassword: false,
      successMessage: '',
      errorMessage: '',
      passwordError: false,
      updatedUser: {
        password: '',
        name: '',
        email: ''
      },
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      const username = JSON.parse(localStorage.getItem("loggedInUser"))?.username || this.$store.state.username;
      console.log('Fetching user with username:', username);
      axiosInstance
          .get(`${this.api}/getUserByUsername/${username}`)
          .then((res) => {
            this.currentUser = res.data;
            console.log('Fetched user:', this.currentUser);
            this.updatedUser = {
              username: res.data.username,
              name: res.data.name,
              email: res.data.email,
              password: '', // Clear password for security purposes
            };
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
    },
    updateUser() {
      if (!this.updatedUser.password || !this.updatedUser.name || !this.updatedUser.email) {
        this.errorMessage = "Name and Email are required.";
        this.successMessage = "Details successfully changed!";
        return; // Prevent form submission if any field is empty
      }

      const payload = {
        name: this.updatedUser.name,
        email: this.updatedUser.email,
      };

      if (this.updatedUser.password) {
        payload.password = this.updatedUser.password; // Include password only if updated
      }

      console.log('Updating user with ID:', this.currentUser.id);
      axiosInstance
          .put(`${this.api}/updateUser/${this.currentUser.id}`, payload)
          .then((res) => {
            console.log('User updated:', res.data);
            this.fetchUser(); // Refresh the user details after update
            this.updatedUser.password = '';
            this.successMessage = "Details successfully changed!";
            this.errorMessage = "";
          })
          .catch(console.error)
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; // Toggle visibility state
    },
  },
};
</script>