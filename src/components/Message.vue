<template>
  <div class="message" :class="sender ? 'sent' : 'received'">
      <Avatar class="mt-1" :src="photoUrl" />
      <p>
        <slot />
      </p>
    
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  components: { Avatar },
  props: {
    name: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false }
  }
}
</script>