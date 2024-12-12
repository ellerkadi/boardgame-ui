<template>
  <div v-if= "isContactModalVisible" class="modal fade show" tabindex="-1" style="display: block;" id="modalChoice">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content rounded-3 shadow">
        <div class="modal-body p-4 text-center">
          <br>
          <img
              v-if="currentGame && currentGame.picture"
              :src="currentGame.picture"
              alt="Game Image"
              class="img-fluid mb-3"
              style="max-width: 200px; border-radius: 8px;"
          >
          <h5 class="mb-0">Get in touch with the game owner</h5>
          <p class="mb-0">Name: {{ userName }} </p>
          <p class="mb-0">Email: {{ userEmail }} </p>
          <br>
          <button @click="closeContactModal" type="button" class="btn-close"
                  aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isContactModalVisible: {
      type: Boolean,
      required: true,
    },
    currentGame: {
      type: Object,
      required: true,
    },
    userName: {
      type: String,
      default: "",
    },
    userEmail: {
      type: String,
      default: "",
    },
  },
  methods: {
    closeContactModal() {
      this.$emit('close');
    },
  },
}
</script>