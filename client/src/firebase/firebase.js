// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId:          import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket:      import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSINGINGSENDERID,
  appId:              import.meta.env.VITE_FIREBASE_APPID, 
  //map:import.meta.env.GOOGLE_MAPS_API_KEY
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;


