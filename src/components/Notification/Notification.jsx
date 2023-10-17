import { getTimeDifference } from "../../common/helperFunctions/timeDifference";
import { deleteNotification } from "../../services/notification.service";
import PropTypes from "prop-types";

const Notification = ({ username, uid, content, date, reloadParent }) => {
  const handleDelete = async () => {
    await deleteNotification(username, uid);
    reloadParent();
  };
  return (
    <div className="alert gap-0 flex p-2 mr-0 border mb-1">
      {" "}
      <div>
        <h6 className="font-bold text-left ">{content}</h6>
        <div className="text-xs  text-left mb-0 mt-1 ">{getTimeDifference(date)}</div>{" "}
      </div>
      <div className="mr-0 p-0 ml-auto ">
        <button className="btn btn-sm btn-error flex items-center px-1" onClick={handleDelete}>
          <i className="bi bi-x text-xl"></i>
        </button>
      </div>
      <hr className="border-base-300 border-1" />
    </div>
  );
};

Notification.propTypes = {
  username: PropTypes.string,
  uid: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.any,
  reloadParent: PropTypes.func,
};

export default Notification;
