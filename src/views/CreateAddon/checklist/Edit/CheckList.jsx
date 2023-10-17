import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import ToastContent from "./ToastContent";
import PropTypes from "prop-types";

const CheckList = ({
  isToastOn,
  handleToggleToast,
  name,
  description,
  targetIDE,
  tags,
}) => {
  return (
    <div>
      <label className={`swap toast ${isToastOn ? "swap-on" : "swap-off"}`}>
        <input
          type="checkbox"
          onChange={handleToggleToast}
          checked={isToastOn}
        />
        {isToastOn ? (
          <ToastContent
            name={name}
            description={description}
            targetIDE={targetIDE}
            tags={tags}
          />
        ) : (
          <svg
            className="fill-current w-16 h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <ClipboardDocumentCheckIcon />
          </svg>
        )}
      </label>
    </div>
  );
};

CheckList.propTypes = {
  isToastOn: PropTypes.bool.isRequired,
  handleToggleToast: PropTypes.func.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  targetIDE: PropTypes.string,
  tags: PropTypes.array,
};

export default CheckList;
