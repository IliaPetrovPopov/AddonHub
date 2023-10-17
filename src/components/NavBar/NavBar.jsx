import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { realtimeNotifications } from "../../services/notification.service";
import NavBarUserActions from "./NavBarUserActions";
import NavBarMain from "./NavBarMain";
import PropTypes from "prop-types";

const NavBar = ({ userData }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({});
  const [notificationsList, setNotificationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      return await realtimeNotifications(userData.username, (result) => {
        if (result) {
          setNotifications(result);
          setNotificationsList(Object.keys(result));
        } else {
          setNotifications({});
          setNotificationsList([]);
        }
      });
    };

    userData && fetchNotifications();
    if (userData) {
      setIsLoading(false);
    }
  }, [userData, isLoading]);

  return (
    <div className="navbar flex justify-between content-center bg-primary md:p-4 w-full">
      <NavBarMain />{" "}
      <h3
        onClick={() => navigate("/")}
        className="flex md:hidden btn-ghost btn justify-center normal-case text-xl  font-extrabold"
      >
        AddonHub
      </h3>

      <div className="gap-2">
      <button
        onClick={() => navigate("/browse")}
        className="hidden md:block btn btn-primary max-w-sm mr-auto ml-auto"
      >
        Browse catalog
      </button>
        {user !== null && !userData && (
          <span className="loading loading-dots loading-lg"></span>
        )}
        {!isLoading && userData && (
          <NavBarUserActions
            userData={userData}
            notifications={notifications}
            notificationsList={notificationsList}
            reloadParent={() => setIsLoading(!isLoading)}
          />
        )}
        {user === null && (
          <span className="space-x-2">
            <button
              className="btn btn-secondary hidden md:inline"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
            <button
              className="btn btn-neutral"
              onClick={() => navigate("/login")}
            >
              LogIn
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

NavBar.propTypes = {
  userData: PropTypes.object,
};

export default NavBar;
