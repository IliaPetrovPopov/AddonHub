import { createAddonToasts } from "../../../../common/toast.messages";
import { useEffect } from "react";
import {
  areTagsMoreThanOne,
  isAddonNameValid,
  isDescriptionValid,
  isIDEEntered,
} from "../../../../common/helperFunctions/addon/addon.validations";
import { useState } from "react";
import { ToastItem } from "../ToastItem";
import PropTypes from "prop-types";

const ToastContent = ({ name, description, targetIDE, tags }) => {
  const [isNameValid, setIsNameValid] = useState(false);
  const [areTagsValidAmount, setAreTagsValidAmount] = useState(false);
  const [isIDEValid, setIsIDEValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);

  useEffect(() => {
    const nameCheck = (nameToValidate) => {
      const result = isAddonNameValid(nameToValidate);
      setIsNameValid(result);
    };

    nameCheck(name);
  }, [name]);

  useEffect(() => {
    const tagsCheck = (tagsToValidate) => {
      const result = areTagsMoreThanOne(tagsToValidate);
      setAreTagsValidAmount(result);
    };

    tagsCheck(tags);
  }, [tags]);

  useEffect(() => {
    const targetIDECheck = (targetIDEToValidate) => {
      const result = isIDEEntered(targetIDEToValidate);
      setIsIDEValid(result);
    };

    targetIDECheck(targetIDE);
  }, [targetIDE]);

  useEffect(() => {
    const descriptionCheck = (descriptionToValidate) => {
      const result = isDescriptionValid(descriptionToValidate);
      setDescriptionValid(result);
    };

    descriptionCheck(description);
  }, [description]);

  const toastItems = [
    { isValid: isNameValid, text: createAddonToasts.name },
    { isValid: descriptionValid, text: createAddonToasts.description },
    { isValid: isIDEValid, text: createAddonToasts.targetIDE },
    { isValid: areTagsValidAmount, text: createAddonToasts.tags },
  ];

  return (
    <div className="p-4">
      <div className="bg-base-300  border border-base-content p-4 rounded-xl shadow-lg w-70 space-y-4">
        {toastItems.map((item, index) => (
          <ToastItem
            key={index}
            isValid={item.isValid}
            toastItemText={item.text}
          />
        ))}
      </div>
    </div>
  );
};

ToastContent.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  targetIDE: PropTypes.string,
  tags: PropTypes.array,
};

export default ToastContent;
