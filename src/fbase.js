import { initializeApp } from "firebase/app";
import { 
getAuth, 
createUserWithEmailAndPassword, 
signInWithEmailAndPassword,
signInWithPopup,
GoogleAuthProvider,
GithubAuthProvider,
updateProfile
} from "firebase/auth";

import { 
getFirestore, 
addDoc, 
getDocs, 
collection, 
doc, 
onSnapshot, 
query,
updateDoc, 
deleteField, 
deleteDoc,
where 
} from "firebase/firestore"

import {
getStorage, 
ref, 
uploadString, 
getDownloadURL,
deleteObject
} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDaLLllqTNcmnuUw9Pt53NBiVfq3uA9zg4",
  authDomain: "nwitter-c1a90.firebaseapp.com",
  projectId: "nwitter-c1a90",
  storageBucket: "nwitter-c1a90.appspot.com",
  messagingSenderId: "1035859157301",
  appId: "1:1035859157301:web:9006337e5e06cfe58f2c7c"
};

//#.0 App
const app = initializeApp(firebaseConfig);

//#.1 Auth
export const authService = getAuth(app); 

export const popupSignInWithProviders = provider_Name => {
  console.log(provider_Name);
  let provider;
  switch(provider_Name){
    case "GitHub":
      provider = new GithubAuthProvider();
      break;
    case "Google":
      provider = new GoogleAuthProvider();
      break;
    default: 
      return new Error("name of Provider is not available");
  }
  return signInWithPopup(authService, provider);
}

export const createNewAccount = (email, password) => {
  return createUserWithEmailAndPassword(authService, email, password);
}

export const signInAccount = (email, password) => {
  return signInWithEmailAndPassword(authService, email, password);
}

export const updateUserProfile = (updateData) => {
  return updateProfile(authService.currentUser, updateData);
}

//#.2 FireStore
const database = getFirestore(app); 

export const addDocumentToCollection = (collectionName, data) =>{
  return addDoc(collection(database, collectionName), data);
}

export const getDataFromCollection = (collectionName) => {
  return getDocs(collection(database, collectionName));
}

export const watchDataBase = (collectionName, callback) => {
  const unsub = onSnapshot(collection(database, collectionName), (snapShot) => {
    if(callback) {
      callback(snapShot);
    }
  });
}

export const deleteDocumentById = (collectionName, documentName) => {
  console.log(collectionName, documentName);
  return deleteDoc(doc(database, collectionName, documentName));
}

export const updateDocumentById = (collectionName, documentName, data) => {
  console.log(collectionName, documentName, data);
  return updateDoc(doc(database, collectionName, documentName), data);
}

export const getDocumentByQuery = (collectionName, prop, operator, condition) => {
  const q = query(collection(database, collectionName), where(prop, operator, condition));
  return getDocs(q);
}

//#.3 Storage
const storageService = getStorage(app);

export const uploadStringData = async (path, string) => {
  const fileRef = ref(storageService, path);
  await uploadString(fileRef, string, "data_url");
} 

export const getDownloadUrlFromStorage = async (path, callback) => {
  const fileRef = ref(storageService, path);
  await getDownloadURL(fileRef).then(url => callback(url));
}

export const deleteStorageDataByUrl = (url) => {
  const fileRef = ref(storageService, url);
  deleteObject(fileRef);
}
