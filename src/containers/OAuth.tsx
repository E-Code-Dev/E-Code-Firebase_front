// Firebase
import { signInWithRedirect } from 'firebase/auth'
import {
  auth,
  googleProvider,
  twitterProvider,
  facebookProvider,
  githubProvider
} from '@lib/firebase'

// Google
export const googleAuth = async () => {
  await signInWithRedirect(auth, googleProvider)
}

// Twitter
export const twitterAuth = async () => {
  await signInWithRedirect(auth, twitterProvider)
}

// Facebook
export const facebookAuth = async () => {
  await signInWithRedirect(auth, facebookProvider)
}

// GitHub
export const githubAuth = async () => {
  await signInWithRedirect(auth, githubProvider)
}
