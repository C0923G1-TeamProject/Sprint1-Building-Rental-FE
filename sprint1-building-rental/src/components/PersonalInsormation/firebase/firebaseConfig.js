// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWlDc-FxMY_WNWqgBS_1-IG_Y6EbdHNHg",
  authDomain: "vi-project-957bb.firebaseapp.com",
  projectId: "vi-project-957bb",
  storageBucket: "vi-project-957bb.appspot.com",
  messagingSenderId: "630912732169",
  appId: "1:630912732169:web:83f8e7d81f5180ef5d3cd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;