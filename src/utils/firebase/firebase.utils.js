import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc, //get document
  getDoc, // get document data
  setDoc, // set document data
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0RlYkZwb-kpV8kxoBVEsM9Eg7g2sxTIU",

  authDomain: "crown-clothing-db-71aa8.firebaseapp.com",

  projectId: "crown-clothing-db-71aa8",

  storageBucket: "crown-clothing-db-71aa8.appspot.com",

  messagingSenderId: "393884380964",

  appId: "1:393884380964:web:41eb2261f7bbd7b2f84db1",
};

//  Firebase login

const firebaseApp = initializeApp(firebaseConfig); // creating instance of firebase

const googleProvider = new GoogleAuthProvider(); // has "new" because we may want multiple instances in the future ( can be other providers, eg. Facebook )

googleProvider.setCustomParameters({
  prompt: "select_account",
});


// this is always listening in to the current instance of the crwn-clothing that is being ran. That is wy on refresh, it still knows user is signed in
export const auth = getAuth(); //doesnt have "new" because we always want the same authentication

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Database

export const db = getFirestore(); // creating instance of a database

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
      
    })
    await batch.commit();
    console.log('done');

}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});
  
  return categoryMap;
}

//adding user to database
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDocs(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedlistener = ( callback ) => 
{
  if (!callback) return;
  onAuthStateChanged(auth, callback)
}