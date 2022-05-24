import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import
  {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
import
  {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
  } from "firebase/firestore";

const FirebaseContext = React.createContext();

export function useFirebase()
{
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children })
{
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  async function signup(email, password)
  {
    const result = await createUserWithEmailAndPassword(auth, email, password);
  }
  async function login(email, password)
  {
    await signInWithEmailAndPassword(auth, email, password);
  }
  function updateProfile(password)
  {
    return updatePassword(currentUser, password);
  }
  function resetPassword(email)
  {
    return sendPasswordResetEmail(auth, email);
  }
  function logout()
  {
    console.log(currentUser);
    return signOut(auth);
  }
  function getPhoto()
  {
    if (currentUser.photoURL)
    {
      return currentUser.photoURL;
    }
  }
  function isLogined()
  {
    return currentUser;
  }

  const value = {
    db,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    isLogined,
  };

  useEffect(() =>
  {
    const unsubcribe = auth.onAuthStateChanged((user) =>
    {
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
