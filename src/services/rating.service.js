import { get, ref, update } from "@firebase/database";
import { db } from "../config/firebase-config";

export const addReview = async (addonId, rating, author, content = "") => {
  try {
    const addonRef = ref(db, `addons/${addonId}/reviews/${author}`);
    const userRef = ref(db, `users/${author}/reviews/${addonId}`);

    const newReview = {
      rating: rating,
      content: content,
      createdOn: new Date(),
      author: author,
    };
    await update(addonRef, newReview);
    await update(userRef, newReview);
    return { ...newReview };
  } catch (e) {
    console.error(e);
  }
};

export const getAddonReviews = async (addonId) => {
  try {
    const addonReviewsRef = ref(db, `addons/${addonId}/reviews`);

    const addonReviewsSnapshot = await get(addonReviewsRef);

    const allReviewsData = [];
    const ratings = [];
    if (addonReviewsSnapshot.exists()) {
      addonReviewsSnapshot.forEach((innerSnapshot) => {
        const reviewData = innerSnapshot.val();
        allReviewsData.push(reviewData);

        const rating = reviewData.rating;
        ratings.push(rating);
      });
    }
    return { allReviewsData, ratings };
  } catch (error) {
    console.error("Error fetching ratings for addon:", error);
    throw error;
  }
};

export const getUserRating = async (addonId, username) => {
  try {
    const addonReviewsRef = ref(db, `addons/${addonId}/reviews/${username}`);
    const snapshot = await get(addonReviewsRef);

    if (!snapshot.exists()) {
      return 0;
    }
    return snapshot.val().rating;
  } catch (e) {
    console.error(e);
  }
};
