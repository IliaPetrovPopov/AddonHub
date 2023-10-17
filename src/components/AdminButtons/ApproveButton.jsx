import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { changeAddonData } from "../../services/addon.service";
import { addNotification } from "../../services/notification.service";
import { CheckCircleIcon, EyeIcon } from "@heroicons/react/24/solid";

const ApproveButton = ({
  author,
  uid,
  reloadParent,
  label,
  loggedUser,
  addonName,
}) => {
  const handleApprove = async () => {
    try {
      await changeAddonData(uid, { state: "approved" });
      toast.success(`Addon ${label.toLowerCase()}d`);
      await addNotification(
        author,
        loggedUser,
        `${addonName} is ${label.toLowerCase()}d by ${loggedUser}`
      );
      reloadParent();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className="btn btn-success px-2 btn-sm text-sm"
      onClick={handleApprove}
    >
      {label === "Approve" && <CheckCircleIcon className="mr-1 w-5 h-5" />}
      {label === "Enable" && <EyeIcon className="mr-1 w-5 h-5" />}
      <div className="hidden md:block ">{label}</div>
    </button>
  );
};
ApproveButton.propTypes = {
  uid: PropTypes.string,
  author: PropTypes.string,
  addonName: PropTypes.string,
  loggedUser: PropTypes.string,
  reloadParent: PropTypes.func,
  label: PropTypes.string,
};

ApproveButton.defaultProps = {
  reloadParent: () => {},
};

export default ApproveButton;
