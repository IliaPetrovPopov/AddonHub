import { avgRating } from "../../common/helperFunctions/averageRating";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAddonReviews } from "../../services/rating.service";
import Reviews from "./Reviews";

const RatingLong = ({ uid }) => {
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadRatings = async () => {
      const { allReviewsData, ratings } = await getAddonReviews(uid);
      setRatings(ratings);
      setReviews(allReviewsData);
    };
    loadRatings();
  }, [ratings]);

  const calculatePercentFilled = (ratingValue) => {
    if (ratings.length !== 0) {
      const totalRatings = ratings.length;
      const ratingCount = ratings.filter(
        (rating) => rating === ratingValue
      ).length;
      return ((ratingCount / totalRatings) * 100).toFixed(2);
    }
    return 0;
  };

  return (
    <div className="grid grid-cols-3">
      <div>
        <h4 className="font-bold">Rating & reviews</h4>
        {!isNaN(avgRating(ratings)) && (
          <>
            {" "}
            <h4 className="font-normal">
              {avgRating(ratings)} <span className="font-thin">out of 5 </span>
            </h4>
            <h5 className="font-thin">
              {" "}
              based on {ratings.length} user ratings
            </h5>
          </>
        )}
      </div>
      <div className=" gap-2 w-full col-span-2">
        {[5, 4, 3, 2, 1].map((ratingValue) => (
          <div
            key={ratingValue}
            className="gap-2 grid grid-cols-4 items-center justify-left"
          >
            <h6 className="col-span-1 flex justify-end">
              {Array.from({ length: ratingValue }, (_, index) => (
                <i key={index} className="bi bi-star-fill text-orange-400" />
              ))}
            </h6>
            <progress
              className="col-span-2 w-full progress-primary"
              value={calculatePercentFilled(ratingValue)}
              max="100"
            />
            <h6 className="col-span-1">
              {calculatePercentFilled(ratingValue)}%
            </h6>
          </div>
        ))}
      </div>
      {reviews && (
        <div className="col-span-3">
          <Reviews reviews={reviews} />
        </div>
      )}
    </div>
  );
};

RatingLong.propTypes = {
  uid: PropTypes.string,
};

export default RatingLong;
