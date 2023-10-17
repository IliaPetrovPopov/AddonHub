import { useContext, useEffect, useState } from "react";
import { fetchPhotoUrl } from "../../services/users.service";
import PropTypes from "prop-types";
import AuthContext from "../../context/AuthContext";
import { randomPics } from "../../common/helperFunctions/randomPic";

const ProfilePic = ({ username, url }) => {
  const { userData } = useContext(AuthContext);
  const [photo, setPhoto] = useState(url || "");
  const isRandomPic = randomPics.includes(userData?.photoUrl);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        let newUrl;
        if (!url) {
          newUrl = await fetchPhotoUrl(username);
        } else {
          newUrl = url;
        }

        setPhoto(newUrl);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUrl();
  }, [username, url]);

  return (
    <div className="avatar flex justify-center max-w-20">
      <div className="rounded-lg flex justify-center ">
        {photo ? (
          isRandomPic ? (
            <div
              className="tooltip tooltip-bottom items-center"
              data-tip={`Random pic on sign up`}
            >
              <img src={photo} className="flex " alt="Profile" />
            </div>
          ) : (
            <img src={photo} className="w-20 h-20 rounded" alt="Profile" />
          )
        ) : (
          <span className="loading loading-ring loading-md"></span>
        )}
      </div>
    </div>
  );
};
export default ProfilePic;

ProfilePic.propTypes = {
  username: PropTypes.string,
  url: PropTypes.string,
};
