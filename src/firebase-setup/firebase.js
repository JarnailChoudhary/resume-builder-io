import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDLBtrJs8foP7OaTxQmvKHUSoh9DHFwf4g",
  authDomain: "resume-build-a2569.firebaseapp.com",
  projectId: "resume-build-a2569",
  storageBucket: "resume-build-a2569.appspot.com",
  messagingSenderId: "479106639658",
  appId: "1:479106639658:web:516550e5244a20b044e053"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const auth = getAuth(app);

export default db;
