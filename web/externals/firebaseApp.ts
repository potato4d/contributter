import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { UserData } from '../types/firestore'

interface FirebaseConfig {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

const config: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()
const firestore = app.firestore()

export default app

// TODO: 接続が終わった Firestore を使い回す
// export const Application = app
// export const auth = firebase.auth()
// export const firestore = firebase.firestore()

export async function fetchUser(uid: string): Promise<UserData | null> {
  let firestoreUserData: UserData
  const userRef = firestore.collection('users').doc(uid)
  try {
    firestoreUserData = await userRef.get().then(doc => doc.data() as UserData)
  } catch (e) {
    return null
  }
  return firestoreUserData
}

export async function updateUser(
  userData: Partial<UserData> & { uid: string }
): Promise<boolean> {
  let user: UserData
  try {
    user = await fetchUser(userData.uid)
  } catch (e) {}
  const userRef = firestore.collection('users').doc(userData.uid)
  try {
    userRef.set({
      ...(user || {}),
      ...userData
    })
  } catch (e) {
    console.log(e)
    return false
  }
}
