import { Link } from "react-router-dom";
import NotificationsList from "../Notification/NotificationsList";
import ProfilePic from "../ProfilePic/ProfilePic";
import Badge from "../Badge/Badge";
import { roleBadgeColors } from "../../common/constants";
import { useContext } from "react";
import { RoleContext } from "../../context/RoleContext";
import { logoutUser } from "../../services/auth.service";
import PropTypes from "prop-types";

const NavBarUserActions = ({
  userData,
  notifications,
  notificationsList,
  reloadParent,
}) => {
  const { role } = useContext(RoleContext);
  const onLogout = () => {
    logoutUser();
    // window.location.reload();
  };
  return (
    <span className="flex space-x-2 md:space-x-4 justify-center items-center">
      {role !== "blocked" && (
        <Link to={`/create-addon`}>
          <button className="btn btn-secondary hidden md:flex">
            Create addon
          </button>
        </Link>
      )}
      <NotificationsList
        notifications={notifications}
        notificationsList={notificationsList}
        username={userData.username}
        reloadParent={reloadParent}
      />

      <div className="dropdown mt-2 dropdown-end content-center">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="rounded-full">
            <ProfilePic username={userData.username} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow-lg menu menu-md md:menu-lg dropdown-content bg-base-100 border-2 border-base-300 rounded-box"
        >
          <span className="p-2 ml-4 text-md md:text-lg rounded-box flex items-center justify-between">
            {userData.username}
            <Badge item={userData.role} itemsSet={roleBadgeColors} />
          </span>

          <span className="p-2 ml-4 text-md md:text-lg rounded-box flex items-center justify-between">
            {userData.email}
          </span>
          <hr className="border-base-300 border-2" />
          {role !== "blocked" && (
            <li className="md:hidden">
              <Link to={`/create-addon`}>
                <i className="bi bi-cloud-upload" />
                Create addon
              </Link>
            </li>
          )}
          <li>
            <Link to={`/users/${userData.username}`}>
              <i className="bi bi-person-vcard"></i>Dashboard
            </Link>
          </li>
          <li>
            <Link to="/reauth">
              <i className="bi bi-gear"></i>
              Edit details
            </Link>
          </li>
          {role === "admin" && (
            <>
              <hr className="border-base-300 border-2" />
              <li>
                <Link to={`/addon-list`}>
                  <i className="fa-solid fa-puzzle-piece"></i>Addons
                </Link>
              </li>
              <li>
                <Link to="/user-list">
                  <i className="bi bi-people-fill"></i>
                  Users
                </Link>
              </li>
            </>
          )}
          <hr className="border-base-300 border-2" />
          <li>
            <Link to="/" onClick={onLogout}>
              <i className="bi bi-box-arrow-right "></i>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </span>
  );
};

NavBarUserActions.propTypes = {
  userData: PropTypes.object,
  notifications: PropTypes.object,
  notificationsList: PropTypes.array,
  reloadParent: PropTypes.func,
};

export default NavBarUserActions;
