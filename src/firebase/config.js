import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC67EruQFXDDvAxlxji1sPy2TO9eo54AKA",
  authDomain: "av-03-06.firebaseapp.com",
  projectId: "av-03-06",
  storageBucket: "av-03-06.firebasestorage.app",
  messagingSenderId: "908090842972",
  appId: "1:908090842972:web:6e6b3640948711e3532b99"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default app
