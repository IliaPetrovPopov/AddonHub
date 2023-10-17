import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  update,
  remove,
} from "firebase/database";
import { auth, db } from "../config/firebase-config";
import { getRandomProfilePicture } from "../common/helperFunctions/randomPic";
import { deleteUser } from "@firebase/auth";

export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

export const createUserByUsername = (username, uid, email, phone) => {
  const url = getRandomProfilePicture();
  return set(ref(db, `users/${username}`), {
    username,
    uid,
    email,
    phone,
    joinedOn: auth.currentUser.metadata.creationTime || new Date().valueOf(),
    role: "user",
    photoUrl: url,
    boughtAddons: ["empty"],
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};

export const getUserByEmail = (email) => {
  return get(query(ref(db, "users"), orderByChild("email"), equalTo(email)));
};

export const changeUserData = async (username, updatedData) => {
  try {
    await update(ref(db, `users/${username}`), updatedData);
  } catch (error) {
    alert("Error updating user data:", error);
  }
};

export const fetchPhotoUrl = async (username) => {
  try {
    const imageRef = await get(ref(db, `users/${username}/photoUrl`));
    return imageRef.val();
  } catch (e) {
    console.error(e);
  }
};

export const getUserRole = async (username) => {
  try {
    const snapshot = await get(ref(db, `users/${username}/role`));

    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (e) {
    console.error("Error getting user role:", e);
  }
};

export const getAllUsers = () => {
  return get(query(ref(db, "users")));
};

export const getUserReviews = async (username) => {
  try {
    const userReviewSnapshot = await get(ref(db, `users/${username}/reviews`));
    const userReviewsData = userReviewSnapshot.val();
    if (userReviewsData) {
      return Object.keys(userReviewsData);
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
};
export const getUserAddons = async (username) => {
  try {
    const userReviewSnapshot = await get(ref(db, `users/${username}/addons`));
    const userReviewsData = userReviewSnapshot.val();
    if (userReviewsData) {
      return Object.keys(userReviewsData);
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
};

export const getUserDownloads = async (username) => {
  try {
    const userReviewSnapshot = await get(ref(db, `users/${username}/downloads`));
    const userReviewsData = userReviewSnapshot.val();
    if (userReviewsData) {
      return Object.keys(userReviewsData);
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
};

export const deleteAccount = async (user) => {
  try {
    const userDataSnapshot = await getUserData(user.uid);
    const username = Object.keys(userDataSnapshot.val())[0];

    const reviews = await getUserReviews(username);
    const addons = await getUserAddons(username);

    reviews?.forEach(
      async (id) => await remove(ref(db, `addons/${id}/reviews/${username}`))
    );

    addons?.forEach(async (id) => await remove(ref(db, `addons/${id}`)));

    await remove(ref(db, `users/${username}`));

    await deleteUser(user);
  } catch (e) {
    console.error(e);
  }
};

export const buyAddon = async (addon, username) => {
  const userRef = ref(db, `users/${username}`);

  try {
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    if (userData) {

      userData.boughtAddons.push(addon);

      await set(userRef, userData);
    } else {
      console.error(`User ${username} not found.`);
    }
  } catch (error) {
    console.error(`Error adding addon to boughtAddons array for ${username}:`, error);
  }
}
