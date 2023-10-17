import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import ToastContent from "./ToastContent";
import PropTypes from "prop-types";

const CheckList = ({
  isToastOn,
  handleToggleToast,
  name,
  description,
  targetIDE,
  origin,
  tags,
  file,
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
            name={name === undefined ? "" : name}
            description={description === undefined ? "" : description}
            origin={origin}
            targetIDE={targetIDE}
            tags={tags}
            file={file}
          />
        ) : (
          <svg
            className="fill-current w-12 h-12 md:w-16 md:w-16"
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
  origin: PropTypes.string,
  tags: PropTypes.array,
  file: PropTypes.object,
};

export default CheckList;
