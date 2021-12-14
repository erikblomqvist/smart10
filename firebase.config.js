// import { initializeApp } from "firebase/app"
// import { getFirestore } from '@firebase/firestore'

// const config = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
//     databaseUrl: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app`,
//     messagingSenderId: "295516985410",
//     appId: "1:295516985410:web:a589365a4e722f2becb5db",
//     measurementId: "G-G4WK5RJRVY"
// }

// const app = initializeApp(config)

// export const database = getFirestore(app)

import { initializeApp } from 'firebase/app'
import { getDatabase } from '@firebase/database'

const config = {
    apiKey: "AIzaSyB9aTLsXV9zE0ntCEEFv-W4f5LfLNRXxUw",
    authDomain: "smart10-6a1e7.firebaseapp.com",
    databaseURL: "https://smart10-6a1e7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "smart10-6a1e7",
    storageBucket: "smart10-6a1e7.appspot.com",
    messagingSenderId: "295516985410",
    appId: "1:295516985410:web:a589365a4e722f2becb5db",
    measurementId: "G-G4WK5RJRVY"
}

const app = initializeApp(config)
const database = getDatabase(app)

export default database