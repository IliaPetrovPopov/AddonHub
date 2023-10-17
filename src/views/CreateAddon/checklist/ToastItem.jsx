import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

export const ToastItem = ({ isValid, toastItemText }) => {
  return (
    <>
      {isValid ? (
        <div className="flex space-x-2 items-center ">
          <CheckCircleIcon className="w-5 text-green-600" />
          <span className="text-xs md:text-md">
            <strong>{toastItemText}</strong>
          </span>
        </div>
      ) : (
        <div className="flex space-x-2  items-center">
          <XCircleIcon className="w-5 text-red-600" />
          <span className="text-xs md:text-md">
            <strong>{toastItemText}</strong>
          </span>
        </div>
      )}
    </>
  );
};
ToastItem.propTypes = {
  isValid: PropTypes.any,
  toastItemText: PropTypes.string,
};
