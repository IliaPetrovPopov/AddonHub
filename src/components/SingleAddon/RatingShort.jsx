import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  addReview,
  getAddonReviews,
  getUserRating,
} from "../../services/rating.service";
import { avgRating } from "../../common/helperFunctions/averageRating";
import { Modal } from "flowbite-react";

const RatingShort = ({ addonID }) => {
  const { user, userData } = useContext(AuthContext);
  const [userRating, setUserRating] = useState(0);
  const [allRatings, setAllRatings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const usernameParam = useParams()?.username;

  useEffect(() => {
    if (userData) {
      const fetchUserRating = async () => {
        const rating = await getUserRating(addonID, userData.username);

        setUserRating(rating);
      };

      fetchUserRating();
    }
  }, [userData]);

  useEffect(() => {
    const fetchAllRatings = async () => {
      const { ratings } = await getAddonReviews(addonID);
      setAllRatings(ratings);
      if (userRating === 0 && allRatings.length === 1) {
        setAllRatings([Math.round(avgRating(allRatings))]);
      }
    };
    fetchAllRatings();
  }, [isModalOpen]);

  const handleRatingChange = async (event) => {
    if (!user) {
      toast.warn("Oops! Only logged in users can rate addons.");
      return;
    }
    const newRating = parseInt(event.target.value, 10);
    setUserRating(newRating);
    openModal();
  };

  const handleContentChange = (e) => {
    setReview(e.target.value);
  };

  const handleSaveReview = async () => {
    await addReview(addonID, userRating, userData.username, review);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    //await addReview(addonID, userRating, userData.username);
    setIsModalOpen(false);
  };

    return (
    <div className="rating rating-sm md:rating-md flex justify-center">
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-orange-400"
        value="1"
        onChange={handleRatingChange}
        disabled={!user}
        checked={userRating === 1}
      />
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-orange-400"
        value="2"
        onChange={handleRatingChange}
        disabled={!user}
        checked={userRating === 2}
      />
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-orange-400"
        value="3"
        onChange={handleRatingChange}
        disabled={!user}
        checked={userRating === 3}
      />
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-orange-400"
        value="4"
        onChange={handleRatingChange}
        disabled={!user}
        checked={userRating === 4}
      />
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-orange-400"
        value="5"
        onChange={handleRatingChange}
        disabled={!user}
        checked={userRating === 5}
      />
      {!user && (
        <span
          className="tooltip tooltip-right"
          data-tip="Only logged in users can rate addons."
        >
          <i className="bi bi-lock ml-2 text-lg" />
        </span>
      )}

      {((usernameParam === undefined) || (userRating === 0)) && (
        <span className="text-sm md:text-lg ml-3">
          {avgRating(allRatings)}({allRatings.length})
        </span>
      )}

      {(usernameParam !== undefined) && (userRating !==0) && (
        <span className="text-sm md:text-lg ml-3">
        {userRating}
        </span>
      )}
      
      <Modal
        show={isModalOpen}
        onClose={closeModal}
        contentLabel="Write a Review Modal"
      >
        <Modal.Body className="items-center bg-base-300 border-3 py-6 border-primary">
          <div className="space-y-4">
            <h3 className="flex w-full justify-center">Write a review</h3>
            <h5 className="flex w-full justify-center">
              Or skip and just click
            </h5>
            <textarea
              placeholder={
                "You can write a review in addition to the rating"
              }
              className="textarea textarea-bordered textarea-md w-full h-40"
              onChange={handleContentChange}
            ></textarea>
          </div>
          <span className="flex justify-between">
            <button className="btn" onClick={closeModal}>
              Close
            </button>
            <button className="btn" onClick={handleSaveReview}>
              Save
            </button>
          </span>
        </Modal.Body>
      </Modal>
    </div>
  );
};

RatingShort.propTypes = {
  addonID: PropTypes.string,
};

export default RatingShort;
