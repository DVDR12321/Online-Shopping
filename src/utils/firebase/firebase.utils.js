import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0RlYkZwb-kpV8kxoBVEsM9Eg7g2sxTIU",

  authDomain: "crown-clothing-db-71aa8.firebaseapp.com",

  projectId: "crown-clothing-db-71aa8",

  storageBucket: "crown-clothing-db-71aa8.appspot.com",

  messagingSenderId: "393884380964",

  appId: "1:393884380964:web:41eb2261f7bbd7b2f84db1",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); // has "new" because we may want multiple instances in the future

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); //doesnt have "new" because we always want the same authentication
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
