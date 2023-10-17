import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import RatingShort from "../SingleAddon/RatingShort";
import DownloadButton from "../SingleAddon/DownloadButton";
import { getUserRating } from "../../services/rating.service";
import { useEffect } from "react";
import { useState } from "react";
import Logo from "../SingleAddon/Logo";
import BuyButtonRedirection from "../BuyButton/BuyButtonRedirection";
import { RoleContext } from "../../context/RoleContext";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export const AddonCard = ({ addon, username, id }) => {
  let uid = "";
  if (id) {
    uid = id;
  } else if (addon.id) {
    uid = addon.id;
  }
  const { userData } = useContext(AuthContext);
  const { role } = useContext(RoleContext);
  const usernameParam = useParams()?.username;
  const [userRating, setUserRating] = useState(0);
  const [price, setPrice] = useState("");

  useEffect(() => {
    setPrice(addon?.price?.slice(1));
  }, [addon?.price]);

  useEffect(() => {
    const fetchUserRating = async () => {
      const uRating = await getUserRating(uid, username);
      setUserRating(uRating);
    };
    fetchUserRating();
  }, [username]);

  const navigate = useNavigate();
  return (
    <center className="bg-primary-focus flex-block w-[11rem] h-[20rem]  md:w-[15rem] md:h-[26rem] shadow-xl rounded-2xl bg-base-300 py-2 px-1">
      <div onClick={() => navigate(`/addons/${uid}`)}>
        <div className="h-[8rem] md:h-[11rem] flex items-center justify-center">
          {addon && addon.logo ? <Logo url={addon.logo} /> : <></>}
        </div>
        <h5 className="mb-2 font-extrabold leading-tight">{addon.name}</h5>
        <h5 className="mb-2 font-light leading-tight ">by {addon.author}</h5>
        <h5 className="mb-3 font-light ">{addon.targetIDE}</h5>
        <h5 className="flex  justify-center">
          {usernameParam && userRating !== 0 ? "Your rating" : "Overall Rating"}
          :
        </h5>
        <span className="flex justify-center">
          <RatingShort addonID={uid} />
        </span>
      </div>
      <span className="flex justify-between px-4 md:py-1 mt-2 ">
        <div className="p-1 gap-0">
          <i className="bi bi-arrow-down-circle-fill "></i>{" "}
          {addon.downloadedBy ? Object.keys(addon.downloadedBy).length : 0}{" "}
        </div>
        {userData ? (
          price === "0.00" || role === "admin" || addon?.author === username ? (
            <DownloadButton uid={uid} name={addon.name} username={username} />
          ) : userData?.boughtAddons?.includes(addon.name) ? (
            <DownloadButton uid={uid} name={addon.name} username={username} />
          ) : (
            <BuyButtonRedirection addonPrice={price} addonID={uid} />
          )
        ) : (price === "0.00" || role === "admin") ? (
          <DownloadButton uid={uid} name={addon.name} username={username} />
        ) : (
          <BuyButtonRedirection addonPrice={price} addonID={uid} />
        )}
      </span>
    </center>
  );
};

AddonCard.propTypes = {
  addon: PropTypes.any,
  username: PropTypes.string,
  id: PropTypes.string,
};
