import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import
{
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import
{
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { OPEN_ERROR_MODAL, OPEN_SUCCESS_MODAL, SET_ERROR_TEXT, SET_SUCCESS_TEXT } from "../redux/slices/modalSlice";

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

  const dispatch = useDispatch();

  async function signup(email, password) 
  {
    try
    {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user
      await setDoc(doc(db, "users", user.uid), {
        favorite: [],
        playlists: []
      });
    } catch (error)
    {
      //log error
      dispatch(SET_ERROR_TEXT("Fail to signup!"));
      // open error dialog
      dispatch(OPEN_ERROR_MODAL());
    }
  }
  async function login(email, password)
  {
    try
    {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error)
    {
      dispatch(SET_ERROR_TEXT("Wrong username or password!"));
      dispatch(OPEN_ERROR_MODAL());
    }
  }
  function logout()
  {
    try
    {
      return signOut(auth);
    } catch (error)
    {
      console.log(error);
    }
  }

  const isLogined = currentUser != null;

  async function addSongToFavorite(song)
  {
    try
    {
      if (!currentUser)
        throw Error("Please login!")
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      const favorite = docSnap.data().favorite

      if (!favorite.some((s) => s.music == song.music))
      {
        favorite.push(song)
        await updateDoc(docRef, {
          favorite: favorite
        });

        dispatch(SET_SUCCESS_TEXT("Song is added to favorite!"));
        // open error dialog
        dispatch(OPEN_SUCCESS_MODAL());
      } else
      {
        throw Error("Song already exists!")
      }
    } catch (error)
    {
      dispatch(SET_ERROR_TEXT(error.toString()));
      // open error dialog
      dispatch(OPEN_ERROR_MODAL());
    }
  }

  async function removeSongFromFavorite(music)
  {
    try
    {
      if (!currentUser)
        throw Error("Please login!")
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      const favorite = docSnap.data().favorite
      const newFavorite = favorite.filter((s) => s.music != music)
      await updateDoc(docRef, {
        favorite: newFavorite
      });

      dispatch(SET_SUCCESS_TEXT("Song is removed to favorite!"));
      // open error dialog
      dispatch(OPEN_SUCCESS_MODAL());
    } catch (error)
    {
      dispatch(SET_ERROR_TEXT(error.toString()));
      // open error dialog
      dispatch(OPEN_ERROR_MODAL());
    }
  }


  async function getListFavorite()
  {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data().favorite

  }
  const value = {
    db,
    currentUser,
    login,
    signup,
    logout,
    isLogined,
    addSongToFavorite,
    removeSongFromFavorite,
    getListFavorite,
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
