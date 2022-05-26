import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { OPEN_ERROR_MODAL, SET_ERROR_TEXT } from "../redux/slices/modalSlice";

const FirebaseContext = React.createContext();

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  const dispatch = useDispatch();

  async function signup(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      dispatch(SET_ERROR_TEXT("Fail to signup!"));
      dispatch(OPEN_ERROR_MODAL());
    }
  }
  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      dispatch(SET_ERROR_TEXT("Wrong username or password!"));
      dispatch(OPEN_ERROR_MODAL());
    }
  }
  function logout() {
    try {
      return signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }
  const isLogined = currentUser != null;

  const value = {
    db,
    currentUser,
    login,
    signup,
    logout,
    isLogined,
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(currentUser);
    });
    return unsubcribe;
  }, []);

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}
