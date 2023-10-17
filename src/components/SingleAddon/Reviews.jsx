import { useState } from "react";
import { getTimeDifference } from "../../common/helperFunctions/timeDifference";
import PropTypes from "prop-types";

const Reviews = ({ reviews }) => {
  const [showAll, setShowAll] = useState(false);

  if (!reviews || Object.keys(reviews).length === 0) {
    return <div>No reviews available</div>;
  }
  const displayedReviews = showAll
    ? Object.keys(reviews)
    : Object.keys(reviews).slice(0, 2);

  return (
    <div className="grid grid-cols-2 mt-3">
      {displayedReviews.map((index) => {
        const review = reviews[index];
        if (review.content) {
          return (
            <div
              key={index}
              className=" card border shadow-lg px-4 py-1 max-h-15 "
            >
              <h5>{review.content}</h5>
              <h6 className="flex justify-between">
                <span>
                  {" "}
                  {Array.from({ length: review.rating }, (_, index) => (
                    <i
                      key={index}
                      className="bi bi-star-fill text-orange-400"
                    />
                  ))}{" "}
                  <span>{review.author}</span>
                </span>
                <span>{getTimeDifference(review.createdOn)}</span>
              </h6>
            </div>
          );
        }
      })}{" "}
      {!showAll && Object.keys(reviews) > 2 && (
        <button className="mt-3 text-blue-500" onClick={() => setShowAll(true)}>
          Show All Reviews
        </button>
      )}
      {showAll && (
        <button
          className="mt-3 text-blue-500"
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      )}
    </div>
  );
};
Reviews.propTypes = {
  reviews: PropTypes.any,
};

export default Reviews;
