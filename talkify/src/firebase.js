// Import the functions you need from the SDKs you need
// import { FirebaseApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNOynma5xqInsuH-6kLB1ZdyoHSHCv68M",
  authDomain: "talkify-486a2.firebaseapp.com",
  databaseURL:"http://talkify-486a2.firebaseio.com",
  projectId: "talkify-486a2",
  storageBucket: "talkify-486a2.appspot.com",
  messagingSenderId: "725094979099",
  appId: "1:725094979099:web:84ca61b8deacf49e490abe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
// export default FirebaseApp;
