import { useNavigate } from "react-router-dom";
import { getTimeDifference } from "../../common/helperFunctions/timeDifference";
import Badge from "../Badge/Badge";
import ProfilePic from "../ProfilePic/ProfilePic";
import UnblockButton from "../AdminButtons/UnblockButton";
import BlockButton from "../AdminButtons/BlockButton";
import PropTypes from "prop-types";
import { roleBadgeColors } from "../../common/constants";

const UserListRow = ({ userData, reloadParent, loggedUser }) => {
  const navigate = useNavigate();
  return (
    <tr
      key={userData}
      className="hover:bg-base-100 hover:cursor-pointer text-center border-b-2 border-base-300 "
    >
      <td
        className="text-sm md:text-lg md:p-6 p-3"
        onClick={() => navigate(`/users/${userData.username}`)}
      >
        <div className="flex items-center space-x-3">
          <div className="mask mask-squircle w-16 md:w-24">
            <ProfilePic user={userData} url={userData.photoUrl} />
          </div>
          <div className="w-full">
            <span className="flex justify-between w-full mr-0">
              <div className="font-bold">{userData.username}</div>
              <Badge
                className="font-thin"
                item={userData.role}
                itemsSet={roleBadgeColors}
                user={userData}
              />
            </span>
            <span className="flex justify-between w-full mr-0">
              <div className="opacity-70 text-start">{userData.email}</div>
              <div className="opacity-70 text-start">{userData.phone}</div>
            </span>
          </div>
        </div>
      </td>

      <td onClick={() => navigate(`/users/${userData.username}`)}>
        {" "}
        <div className="grid grid-rows-2 items-center text-sm md:text-md">
          <div className="row-span-1">
            <span className="opacity-70">Member since </span>
            <span className="font-bold">
              {userData.joinedOn
                ? new Date(userData.joinedOn).toLocaleDateString()
                : "unknown"}
            </span>
          </div>
          <div className="row-start-2">
            <span className="opacity-70">Last logged in </span>
            <span className="font-bold">
              {userData.lastLoggedIn
                ? getTimeDifference(userData.lastLoggedIn)
                : getTimeDifference(userData.joinedOn)}
            </span>
          </div>
        </div>
      </td>
      <td onClick={() => navigate(`/users/${userData.username}`)}>
        <i className="bi bi-cloud-upload mr-1"></i>{" "}
        {userData.addons ? Object.keys(userData.addons).length : 0}
      </td>
      <td onClick={() => navigate(`/users/${userData.username}`)}>
        <i className="bi bi-arrow-down-circle-fill mr-1"></i>{" "}
        {userData.downloads ? Object.keys(userData.downloads).length : 0}
      </td>
      <td
        className="hidden md:table-cell md:text-md"
        onClick={() => navigate(`/users/${userData.username}`)}
      >
        {" "}
        <div className="grid grid-cols-2 ">
          <div>
            <div className="font-bold">{userData.occupation}</div>
            <div className="opacity-70">{userData.company}</div>
          </div>
          <div>
            <div className="font-bold">{userData.region}</div>
            <div className="opacity-70">{userData.birthdate}</div>
          </div>
        </div>
      </td>
      <td>
        <center className="m-0 p-0">
          {userData.role === "blocked" && (
            <UnblockButton
              key={userData.uid}
              user={userData}
              onModalClose={reloadParent}
              loggedUser={loggedUser}
            />
          )}
          {userData.role === "user" && (
            <BlockButton
              onModalClose={reloadParent}
              user={userData}
              loggedUser={loggedUser}
            />
          )}
        </center>
      </td>
    </tr>
  );
};

UserListRow.propTypes = {
  userData: PropTypes.object,
  reloadParent: PropTypes.func,
  loggedUser: PropTypes.string,
};

UserListRow.defaultProps = {
  reloadParent: () => {},
};

export default UserListRow;
