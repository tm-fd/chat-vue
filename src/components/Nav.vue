<template>
 <header>
      <h3>Vue Chat</h3>
      <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL" />
        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign Out
        </button>
      </div>
  </header>
</template>

<script>
import Avatar from './Avatar.vue'
import { useAuth } from '@/firebase'
export default {
  components: { Avatar },
  setup() {
    const { user, isLogin, signOut } = useAuth()
    return { user, isLogin, signOut}
  }
}
</script>

