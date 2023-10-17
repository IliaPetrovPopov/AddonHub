import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { changeAddonData } from "../../services/addon.service";
import { BoltIcon } from "@heroicons/react/24/solid";
import { addNotification } from "../../services/notification.service";

const FeatureButton = ({
  uid,
  reloadParent,
  author,
  loggedUser,
  addonName,
}) => {
  const handleFeatured = async () => {
    try {
      await changeAddonData(uid, { state: "featured" });
      toast.success("Addon added to admin choices");
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
      onClick={handleFeatured}
    >
      <BoltIcon className="md:mr-1 w-4 h-4" />
      <div className="hidden md:block ">Feature</div>
    </button>
  );
};
FeatureButton.propTypes = {
  uid: PropTypes.string,
  author: PropTypes.string,
  loggedUser: PropTypes.string,
  addonName: PropTypes.string,
  reloadParent: PropTypes.func,
};

FeatureButton.defaultProps = {
  reloadParent: () => {},
};

export default FeatureButton;
