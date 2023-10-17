import { get, set, ref, remove } from "firebase/database";
import { db } from "../config/firebase-config";

export const addBlockedUser = async (username, reason) => {
  try {
    const email = (await get(ref(db, `users/${username}/email`))).val();
    await set(ref(db, `blocked-users/${username}`), {
      reason: reason,
      email: email,
    });
  } catch (error) {
    alert("Error adding user to blocked users:", error);
  }
};

export const removeBlockedUser = async (username) => {
  try {
    await remove(ref(db, `blocked-users/${username}`));
  } catch (error) {
    alert("Error unblocking user", error);
  }
};

export const seeBlockingReason = async (username) => {
  try {
    const reasonSnapshot = await get(
      ref(db, `blocked-users/${username}/reason`)
    );
    const reason = reasonSnapshot.val();
    return reason;
  } catch (e) {
    console.error(e);
  }
};
