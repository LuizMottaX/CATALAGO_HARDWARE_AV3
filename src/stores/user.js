import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onIdTokenChanged,
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import '@/firebase/config'

export const useUserStore = defineStore('user', () => {
  const auth = getAuth()
  const router = useRouter()

  const user = ref(null)
  const pronto = ref(false) // indica se o Firebase já verificou o estado inicial

  const isLoggedIn = computed(() => user.value !== null)

  // Restaura o usuário automaticamente ao recarregar a página
  // onIdTokenChanged dispara imediatamente com o usuário atual (ou null)
  onIdTokenChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const idToken = await firebaseUser.getIdToken()
      user.value = {
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        idToken,
      }
    } else {
      user.value = null
    }
    pronto.value = true
  })

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()
      user.value = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        idToken,
      }
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error.message)
      throw error
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      user.value = null
      router.push('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message)
    }
  }

  return { user, isLoggedIn, pronto, loginWithGoogle, logout }
})
