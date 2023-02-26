import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut as signoutFirebase, getIdToken, onAuthStateChanged } from "firebase/auth";

// Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// Initialize Firebase
const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT
});

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const signIn = async (email, password) => {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        return { credentials: credentials.user, email: credentials.user.email }
    } catch (e) {
        return "Login Failed"
    }
}

export const signOut = async () => {
    return await signoutFirebase(auth)
}

export const setAuthChangeEvent = (setUser) => {
    onAuthStateChanged(auth, user => {
        setUser(user)
    })
}

export const getToken = async (user) => {
    const token = await getIdToken(user)
    return token
}