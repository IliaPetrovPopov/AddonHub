import { toast } from "react-toastify";
import { changeUserData } from "../../services/users.service";
import PropTypes from "prop-types";
import { removeBlockedUser } from "../../services/admin.service";
import { addNotification } from "../../services/notification.service";

const UnblockButton = ({ user, onModalClose, loggedUser }) => {
  const handleUnblock = async () => {
    try {
      await changeUserData(user.username, { role: "user" });
      await removeBlockedUser(user.username);
      await addNotification(
        user.username,
        loggedUser,
        `You were unblocked by ${loggedUser}'`
      );
      toast.success("User unblocked successfully");
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button className="btn btn-success btn-sm text-sm" onClick={handleUnblock}>
      <h6 className="bi bi-person-check-fill "></h6>
      <div className="hidden md:block ">Unblock</div>
    </button>
  );
};

UnblockButton.propTypes = {
  user: PropTypes.object,
  onModalClose: PropTypes.func,
  loggedUser: PropTypes.string,
};

UnblockButton.defaultProps = {
  onModalClose: () => {},
};

export default UnblockButton;
