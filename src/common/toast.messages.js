import { MAX_ADDON_NAME_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_FILE_SIZE_MB, MAX_TAGS, MIN_ADDON_NAME_LENGTH, MIN_DESCRIPTION_LENGTH, MIN_TAGS } from "./constants";

export const createAddonToasts = {
  name: `Name is between ${MIN_ADDON_NAME_LENGTH} and ${MAX_ADDON_NAME_LENGTH} symbols long`,
  description: `Description is between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH} symbols long`,
  origin: `GitHub origin is valid`,
  targetIDE: `Target IDE is entered`,
  tags: `Tags are more than ${MIN_TAGS} and less than ${MAX_TAGS}`,
  fileExtension: `File has allowed extension`,
  fileSize: `File size is less than ${MAX_FILE_SIZE_MB} MB`,
};
