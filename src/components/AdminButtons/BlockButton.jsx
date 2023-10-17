import { toast } from "react-toastify";
import { changeUserData } from "../../services/users.service";
import PropTypes from "prop-types";
import { useState } from "react";
import { addBlockedUser } from "../../services/admin.service";
import { addNotification } from "../../services/notification.service";

const BlockButton = ({ user, onModalClose, loggedUser }) => {
  const [blockReason, setBlockReason] = useState("");

  const handleBlock = async () => {
    try {
      await changeUserData(user.username, { role: "blocked" });
      await addBlockedUser(user.username, blockReason);
      await addNotification(
        user.username,
        loggedUser,
        `You were blocked by ${loggedUser}: '${blockReason}'`
      );
      toast.success("User blocked successfully");
      closeModal();
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => {
    const modalCheckbox = document.getElementById("my_modal_7");
    if (modalCheckbox) {
      modalCheckbox.checked = false;
    }
  };

  return (
    <>
      <label htmlFor={`my_modal_7${user.uid}`} className="btn btn-error btn-sm">
        <h6 className="bi bi-person-fill-slash "></h6>
        <div className="hidden md:block ">Block</div>
      </label>

      <input
        type="checkbox"
        id={`my_modal_7${user.uid}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box space-y-4 h-60">
          <h5 className="font-semibold">
            Are you sure you want to block {user.username}?{" "}
          </h5>
          <h3 className="text-lg">Reason for blocking:</h3>
          <input
            type="text"
            className="input input-bordered mt-1 block w-full"
            value={blockReason}
            onChange={(e) => setBlockReason(e.target.value)}
            required
          />
          {blockReason && (
            <button className="btn btn-error btn-sm" onClick={handleBlock}>
              Confirm Block
            </button>
          )}
        </div>
        <label className="modal-backdrop" htmlFor={`my_modal_7${user.uid}`}>
          Close
        </label>
      </div>
    </>
  );
};

BlockButton.propTypes = {
  user: PropTypes.object,
  onModalClose: PropTypes.func,
  loggedUser: PropTypes.string,
};

BlockButton.defaultProps = {
  onModalClose: () => {},
};

export default BlockButton;
