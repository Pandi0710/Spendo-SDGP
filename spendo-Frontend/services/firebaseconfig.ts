import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbCfItImdP_-hks2GKcY73o6B6ptmAbpk",
  authDomain: "spendoapp-b3f0e.firebaseapp.com",
  projectId: "spendoapp-b3f0e",
  storageBucket: "spendoapp-b3f0e.firebasestorage.app",
  messagingSenderId: "347636111001",
  appId: "1:347636111001:web:92ac0c62b0f0e4147d8a08",
  measurementId: "G-4D4W7B913C",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
