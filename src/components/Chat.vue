<template>
<section>
  <main v-if="user">
  <div>
      <Message
        v-for="{ id, text, userPhotoURL, userName, userId } in messages"
        :key="id"
        :name="userName"
        :photo-url="userPhotoURL"
        :sender="userId === user?.uid"
      >
        {{ text }}
      </Message>
   </div>
   </main>
   <div v-else>
       <button @click="signIn">
        Sign in with google
      </button>
      </div>
      <form v-if="isLogin" @submit.prevent="send">
        <input v-model="message" placeholder="Message" required />
        <button type="submit" :disabled="!message">
          <SendIcon />
        </button>
      </form>
  </section>
</template>
<script>
import { ref, watch, nextTick } from 'vue'
import { useAuth, useChat } from '@/firebase'
import SendIcon from './SendIcon.vue'
import Message from './Message.vue'
export default {
  components: { Message, SendIcon },
  setup() {
    const { user, isLogin, signIn } = useAuth()
    const { messages, sendMessage } = useChat()
    const bottom = ref(null)
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: 'smooth' })
        })
      },
      { deep: true }
    )
    const message = ref('')
    const send = () => {
      sendMessage(message.value)
      message.value = ''
    }
    return { user, isLogin, signIn, messages, bottom, message, send }
  }
}
</script>