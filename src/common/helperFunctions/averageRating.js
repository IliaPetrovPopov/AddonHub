export const avgRating = (ratingArray) => {
  if (ratingArray.length === 0) {
    return 0;
  }
  const average = ratingArray.reduce((a, b) => a + b, 0) / ratingArray.length;
  return average.toFixed(1);
};
