import * as firebase from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider
} from 'firebase/auth'
import type { Auth } from 'firebase/auth'

import { getStorage } from 'firebase/storage'
import type { FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

if (typeof window !== 'undefined' && !firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig)
}

const getFirebaseAuth = (): Auth => {
  return getAuth()
}

export const auth = getFirebaseAuth()

const getFirebaseStorage = (): FirebaseStorage => {
  return getStorage()
}

export const storage = getFirebaseStorage()

export const googleProvider = new GoogleAuthProvider()
export const twitterProvider = new TwitterAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const githubProvider = new GithubAuthProvider()

export default auth
