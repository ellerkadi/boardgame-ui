<template>
  <div v-if= "isModalVisible" class="modal fade show" tabindex="-1" style="display: block;" id="modalChoice">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content rounded-3 shadow">
        <div class="modal-header">
          <h5 class="modal-title">Search Results</h5>
          <br>
          <button @click ="closeModal" type="button" class="btn-close"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table v-if="games.length > 0" class="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Game Type</th>
              <th>Location</th>
              <th>Availability</th>
              <th v-if="isUser || isAdmin">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="game in games" :key="game.id">
              <td>{{ game.gamename }}</td>
              <td>{{ game.description }}</td>
              <td>{{ game.gametypes }}</td>
              <td>{{ game.location }}</td>
              <td>{{ game.availability }}</td>
              <td v-if="isUser || isAdmin">
                <button @click="openContactModal(game)">Contact</button>
              </td>
            </tr>
            </tbody>
          </table>
          <p v-else>No games found.</p>
        </div>
      </div>
    </div>
  </div>

  <ContactModal
      :is-contact-modal-visible="isContactModalVisible"
      :userName="userName"
      :userEmail="userEmail"
      @close="closeContactModal"
  />

</template>

<script>
import ContactModal from "@/components/ContactModal.vue";

export default {
  components: {
    ContactModal,
  },
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
    games: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    openContactModal() {
      this.isContactModalVisible = true;
    },
    closeContactModal() {
      this.isContactModalVisible = false; // Close the modal
    },
  },
}

</script>