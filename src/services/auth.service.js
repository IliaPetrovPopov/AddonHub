import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase-config";
import { changeUserData, getUserByEmail } from "./users.service";

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email, password) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = (await getUserByEmail(email)).val();

    const username = Object.keys(user)[0];

    // await changeUserData(username, { online: true })

    await changeUserData(username, {
      lastLoggedIn:
        auth.currentUser.metadata.lastSignInTime ||
        auth.currentUser.metadata.creationTime,
    });

    return credential;
  } catch (e) {
    console.error(e);
  }
};

export const logoutUser = () => {
  return signOut(auth);
};
