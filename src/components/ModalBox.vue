<template>

  <div class="modal-mask" v-show="visible">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            Default Header
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            Default Body
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('close')">
              Close
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>