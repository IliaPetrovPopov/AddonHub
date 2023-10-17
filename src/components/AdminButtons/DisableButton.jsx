import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { changeAddonData } from "../../services/addon.service";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { addNotification } from "../../services/notification.service";

const DisableButton = ({
  uid,
  reloadParent,
  author,
  loggedUser,
  addonName,
}) => {
  const handleDisable = async () => {
    try {
      await changeAddonData(uid, { state: "disabled" });
      toast.warn("Addon disabled");
      reloadParent();
      await addNotification(
        author,
        loggedUser,
        `${addonName} was disabled by ${loggedUser}`
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className="btn btn-error px-3 m-auto w-fit btn-sm text-sm"
      onClick={handleDisable}
    >
      <EyeSlashIcon className="md:mr-1 w-4 h-4" />
      <div className="hidden md:block ">Disable</div>
    </button>
  );
};
DisableButton.propTypes = {
  uid: PropTypes.string,
  reloadParent: PropTypes.func,
  loggedUser: PropTypes.string,
  addonName: PropTypes.string,
  author: PropTypes.string,
};

DisableButton.defaultProps = {
  reloadParent: () => {},
};

export default DisableButton;
