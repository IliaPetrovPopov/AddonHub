import { get, onValue, push, ref, remove } from "firebase/database";
import { db } from "../config/firebase-config";

export const addNotification = async (receiver, author, content = "") => {
  try {
    const userRef = ref(db, `users/${receiver}/notifications`);

    const newNotification = {
      content: content,
      sentOn: new Date().valueOf(),
      author: author,
    };
    await push(userRef, newNotification);
    return { ...newNotification };
  } catch (e) {
    console.error(e);
  }
};

export const getUserNotifications = async (username) => {
  try {
    const notificationsSnapshot = await get(
      ref(db, `users/${username}/notifications`)
    );
    if (notificationsSnapshot.exists()) {
      return notificationsSnapshot.val();
    }
  } catch (e) {
    console.error(e);
  }
};

export const deleteNotification = async (username, uid) => {
  try {
    return remove(ref(db, `users/${username}/notifications/${uid}`));
  } catch (e) {
    console.error(e);
  }
};

export const deleteAllNotifications = async (username) => {
  try {
    return remove(ref(db, `users/${username}/notifications`));
  } catch (e) {
    console.error(e);
  }
};

export const realtimeNotifications = (username, callback) => {
  const notificationsSnapshot = ref(db, `users/${username}/notifications`);

  return onValue(notificationsSnapshot, (snapshot) => {
    const result = snapshot.val();
    callback(result);
  });
};
