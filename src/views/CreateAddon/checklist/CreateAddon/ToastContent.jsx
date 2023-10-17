import { createAddonToasts } from "../../../../common/toast.messages";
import { useEffect } from "react";
import {
  areTagsMoreThanOne,
  isAddonNameValid,
  isDescriptionValid,
  isFileExtensionValid,
  isFileSizeValid,
  isGitHubLink,
  isIDEEntered,
} from "../../../../common/helperFunctions/addon/addon.validations";
import { useState } from "react";
import { ToastItem } from "../ToastItem";
import PropTypes from "prop-types";

const ToastContent = ({ name, description, targetIDE, origin, tags, file }) => {
  const [isNameValid, setIsNameValid] = useState(false);
  const [isGitHLinkValid, setIsGitHLinkValid] = useState(false);
  const [isIDEValid, setIsIDEValid] = useState(false);
  const [areTagsValidAmount, setAreTagsValidAmount] = useState(false);
  const [fileSizeValid, setFileSizeValid] = useState(false);
  const [isValidExtension, setIsValidExtension] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);

  useEffect(() => {
    const nameCheck = (nameToValidate) => {
      const result = isAddonNameValid(nameToValidate);
      setIsNameValid(result);
    };

    nameCheck(name);
  }, [name]);

  useEffect(() => {
    const originCheck = (originToValidate) => {
      const result = isGitHubLink(originToValidate);
      setIsGitHLinkValid(result);
    };

    originCheck(origin);
  }, [origin]);

  useEffect(() => {
    const descriptionCheck = (descriptionToValidate) => {
      const result = isDescriptionValid(descriptionToValidate);
      setDescriptionValid(result);
    };

    descriptionCheck(description);
  }, [description]);

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
    const fileCheck = (fileToValidate) => {
      const result = isFileSizeValid(fileToValidate);
      setFileSizeValid(result);
    };

    fileCheck(file);
  }, [file]);

  useEffect(() => {
    const fileCheck = (fileToValidate) => {
      const result = isFileExtensionValid(fileToValidate);
      setIsValidExtension(result);
    };

    fileCheck(file);
  }, [file]);

  const toastItems = [
    { isValid: isNameValid, text: createAddonToasts.name },
    { isValid: isGitHLinkValid, text: createAddonToasts.origin },
    { isValid: descriptionValid, text: createAddonToasts.description },
    { isValid: areTagsValidAmount, text: createAddonToasts.tags },
    { isValid: isIDEValid, text: createAddonToasts.targetIDE },
    { isValid: fileSizeValid, text: createAddonToasts.fileSize },
    { isValid: isValidExtension, text: createAddonToasts.fileExtension },
  ];

  return (
    <div className="p-4">
      <div className="bg-base-300 border border-base-content p-4 rounded-xl shadow-lg w-70 space-y-4">
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
  origin: PropTypes.string,
  tags: PropTypes.array,
  file: PropTypes.object,
};

export default ToastContent;
