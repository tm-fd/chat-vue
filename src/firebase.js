import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Filter from 'bad-words'
import { ref, onUnmounted, computed } from 'vue'


!firebase.apps.length ? firebase.initializeApp(
    {
    apiKey: "AIzaSyBAXjAmMaAvPvTKZXhr62WQVAqt_gI5izc",
  authDomain: "chat-vue-1d117.firebaseapp.com",
  projectId: "chat-vue-1d117",
  storageBucket: "chat-vue-1d117.appspot.com",
  messagingSenderId: "934003695232",
  appId: "1:934003695232:web:f60001c506c87062a9d065"
}) : firebase.app()
 
const auth = firebase.auth();

export function useAuth(){
    const user = ref(null);
    const unSubscribe = auth.onAuthStateChanged(_user => (user.value = _user));
    onUnmounted(unSubscribe)

    const isLogin = computed(() => user.value !== null)

    const signIn = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithPopup(googleProvider)
      }
      const signOut = () => auth.signOut()
    
      return { user, isLogin, signIn, signOut }
    }

const firestore = firebase.firestore()
const messagesCollection = firestore.collection('messages')
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)
const filter = new Filter()

export function useChat() {
    const messages = ref([])
    const unsubscribe = messagesQuery.onSnapshot(snapshot => {
      messages.value = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .reverse()
    })
    onUnmounted(unsubscribe)

    const { user, isLogin } = useAuth()
  const sendMessage = text => {
    if (!isLogin.value) return
    const { photoURL, uid, displayName } = user.value
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: filter.clean(text),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return { messages, sendMessage }

}