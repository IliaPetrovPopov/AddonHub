import { useContext, useEffect, useState } from "react";
import { getUserByUsername } from "../../services/users.service";
import ProfilePic from "../ProfilePic/ProfilePic";
import SocialMediaIcons from "./SocialMediaIcons";
import PropTypes from "prop-types";
import Badge from "../Badge/Badge";
import BlockButton from "../AdminButtons/BlockButton";
import UnblockButton from "../AdminButtons/UnblockButton";
import { RoleContext } from "../../context/RoleContext";
import { roleBadgeColors } from "../../common/constants";
import AuthContext from "../../context/AuthContext";

const UserDetails = ({ username }) => {
  const [user, setUser] = useState(null);
  const { userData } = useContext(AuthContext);
  const { role } = useContext(RoleContext);
  const [isBlocked, setIsBlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const snapshot = await getUserByUsername(username);
        setUser(snapshot.val());
        setIsBlocked(snapshot.val()?.role === "blocked");
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, [username, modalOpen]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  if (user) {
    return (
      <div className="card bg-base-300 shadow-xl w-full rounded-xl">
        <div className="grid grid-cols-2 p-4 gap-4">
          <ProfilePic
            username={username}
            url={user.photoUrl}
            alt="Large avatar"
          />
          {role === "admin" && user.role !== "admin" && (
            <div className="flex justify-end space-y-2">
              {isBlocked ? (
                <UnblockButton
                  user={user}
                  onModalClose={toggleModal}
                  loggedUser={userData?.username}
                />
              ) : (
                <BlockButton
                  user={user}
                  onModalClose={toggleModal}
                  loggedUser={userData?.username}
                />
              )}
            </div>
          )}
          <div className="space-y-3 col-span-2">
            <span className="flex justify-between items-center mb-3">
              <h3 className="font-bold">
                {user.firstName} {user.lastName}
              </h3>{" "}
              <Badge item={user.role} itemsSet={roleBadgeColors} user={user} />
            </span>
            <span className="font-semibold">
              {user.occupation && (
                <h5 className="col-start-1">
                  <i className="bi bi-briefcase-fill"></i> {user.occupation}
                </h5>
              )}
              {user.company && (
                <h5 className="col-start-2">@ {user.company}</h5>
              )}
              {user.joinedOn && (
                <h6 className="col-start-2 font-light">
                  Member since {new Date(user.joinedOn).toLocaleDateString()}
                </h6>
              )}
            </span>
            {user.bio && (
              <div className="car-body col-span-2 space-y-2">
                <h5 className="card-title">About me</h5>
                <p>{user.bio}</p>
              </div>
            )}
            <div>
              <div className="divider" />
              <div className="grid grid-cols-2 grid-rows-2 ">
                {user.region && (
                  <h6>
                    <i className="bi bi-geo-alt-fill" /> {user.region}
                  </h6>
                )}
                {user.birthdate && (
                  <h6 className="row-start-2">
                    <i className="bi bi-gift-fill" /> {user.birthdate}
                  </h6>
                )}
                <SocialMediaIcons className="col-start-2" user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

UserDetails.propTypes = {
  username: PropTypes.string,
};

export default UserDetails;
