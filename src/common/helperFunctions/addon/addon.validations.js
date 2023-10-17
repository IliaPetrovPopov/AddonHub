import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import {
  MAX_ADDON_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_FILE_SIZE_BYTES,
  MAX_TAGS,
  MIN_ADDON_NAME_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TAGS,
  MIN_TAG_NAME_LENGTH,
  addonExtensions,
  githubRegex,
} from "../../constants";
import { db } from "../../../config/firebase-config";

export const isAddonNameValid = (addonName) => {
  try {
    if (
      addonName.length < MIN_ADDON_NAME_LENGTH ||
      addonName.length > MAX_ADDON_NAME_LENGTH
    ) {
      return false;
    }

    return true;
  } catch (error) {
    return;
  }
};

export const addonNameExists = async (addonName) => {
  const nameInDB = query(ref(db, 'addons'), orderByChild('name'), equalTo(addonName));
  const retrieveName = await get(nameInDB);

  if(retrieveName.exists()) {
      return true;
  }

  return false;
}


export const isGitHubLink = (link) => {
  return githubRegex.test(link);
};

export const isDescriptionValid = (description) => {
  try {
    if (
      description.length < MIN_DESCRIPTION_LENGTH ||
      description.length > MAX_DESCRIPTION_LENGTH
    ) {
      return false;
    }

    return true;
  } catch (error) {
    return;
  }
};

export const areTagsMoreThanOne = (tags) => {
  if (tags.length < MIN_TAGS || tags.length > MAX_TAGS) {
    return false;
  }

  return true;
};

export const isTagLengthValid = (tag) => {
  if (tag.length < MIN_TAG_NAME_LENGTH) {
    return false;
  }

  return true;
};

export const isIDEEntered = (ide) => {
  if (ide === "") {
    return false;
  }

  return true;
};

export const isFileExtensionValid = (uploadedFile) => {
  const extension = uploadedFile?.name?.slice(
    uploadedFile.name.lastIndexOf(".") + 1
  );

  if (addonExtensions.includes(extension)) {
    return true;
  } else {
    return false;
  }
};

export const setFile = (uploadedFile, setForm, form) => {
    return setForm({
      ...form,
      file: uploadedFile,
    });
};

export const isFileSizeValid = (uploadedFile) => {
  if (uploadedFile?.size <= MAX_FILE_SIZE_BYTES) {
    return true;
  } else {
    return false;
  }
};
