import { initializeApp } from "firebase/app";

import { getAuth, 
createUserWithEmailAndPassword, 
signInWithEmailAndPassword,
signInWithPopup,
GoogleAuthProvider,
GithubAuthProvider
 } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaLLllqTNcmnuUw9Pt53NBiVfq3uA9zg4",
  authDomain: "nwitter-c1a90.firebaseapp.com",
  projectId: "nwitter-c1a90",
  storageBucket: "nwitter-c1a90.appspot.com",
  messagingSenderId: "1035859157301",
  appId: "1:1035859157301:web:9006337e5e06cfe58f2c7c"
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(); 


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

