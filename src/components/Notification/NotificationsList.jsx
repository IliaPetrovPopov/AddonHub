import { BellAlertIcon } from "@heroicons/react/24/solid";
import Notification from "./Notification";
import { MAX_NOTIFICATIONS } from "../../common/constants";
import { deleteAllNotifications } from "../../services/notification.service";
import PropTypes from "prop-types";

const NotificationsList = ({
  username,
  notifications,
  notificationsList,
  reloadParent,
}) => {
  const handleDeleteAll = async () => {
    await deleteAllNotifications(username);
    reloadParent();
  };

  return (
    <div className="dropdown dropdown-end">
      <div className="indicator">
        <span className="indicator-item badge badge-secondary">
          {notificationsList.length}
        </span>
        <button className="btn btn-primary items-center border-2 shadow-xl btn-circle">
          <BellAlertIcon className="w-8" />{" "}
        </button>
      </div>
      {notificationsList && notificationsList.length > 0 && (
        <ul
          tabIndex={0}
          className="mt-3 w-72 z-[1] shadow-lg menu menu-lg dropdown-content bg-base-100 border-2 border-base-300 rounded-box"
        >
          {notificationsList
            ?.sort((a, b) => notifications[b].sentOn - notifications[a].sentOn)
            .slice(0, MAX_NOTIFICATIONS)
            .map((n) => (
              <Notification
                key={n}
                uid={n}
                content={notifications[n].content}
                date={notifications[n].sentOn}
                reloadParent={reloadParent}
                username={username}
              />
            ))}
          <button
            className="btn btn-sm btn-error p-1"
            onClick={handleDeleteAll}
          >
            <i className="bi bi-trash3" />
            <div className="text-xs">Delete all<span className="hidden md:inline"> notifications</span></div>
          </button>
        </ul>
      )}
    </div>
  );
};

NotificationsList.propTypes = {
  username: PropTypes.string,
  notifications: PropTypes.object,
  notificationsList: PropTypes.array,
  reloadParent: PropTypes.func,
};

export default NotificationsList;
