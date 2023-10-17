import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { changeAddonData } from "../../services/addon.service";
import { BoltSlashIcon } from "@heroicons/react/24/solid";
import { addNotification } from "../../services/notification.service";

const UnfeatureButton = ({
  uid,
  reloadParent,
  author,
  loggedUser,
  addonName,
}) => {
  const handleUnfeature = async () => {
    try {
      await changeAddonData(uid, { state: "approved" });
      toast.success("Addon removed from admin choices");
      reloadParent();
      await addNotification(
        author,
        loggedUser,
        `${addonName} is added to featured by ${loggedUser}`
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className="btn btn-primary px-3 m-auto w-fit btn-sm text-sm"
      onClick={handleUnfeature}
    >
      <BoltSlashIcon className="md:mr-1 w-4 h-4" />
      <div className="hidden md:block ">Unfeature</div>
    </button>
  );
};
UnfeatureButton.propTypes = {
  uid: PropTypes.string,
  author: PropTypes.string,
  loggedUser: PropTypes.string,
  addonName: PropTypes.string,
  reloadParent: PropTypes.func,
};

UnfeatureButton.defaultProps = {
  reloadParent: () => {},
};

export default UnfeatureButton;
