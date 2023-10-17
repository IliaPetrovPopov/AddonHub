import {
  MAX_ADDON_NAME_LENGTH,
  MAX_TAGS,
  MAX_USERNAME_LENGTH,
  MIN_ADDON_NAME_LENGTH,
  MIN_TAGS,
  MIN_USERNAME_LENGTH,
  PHONE_NUM_DIGITS,
} from "./constants";

export const createAddonMessages = {
  existingError: `Such Addon exists in the system. Please try different name!`,
  nameLengthError: `Name of the Addon must be between ${MIN_ADDON_NAME_LENGTH} and ${MAX_ADDON_NAME_LENGTH} symbols long!`,
  targetIDEError: `Please enter targetIDE of the Addon!`,
  originError: `Please enter origin of the Addon!`,
  tagsError: `Each Addon must have between ${MIN_TAGS} and ${MAX_TAGS} tags!`,
  tagNotExisting: `Please type in tag name to add it successfully!`,
};

export const authErrorMessages = {
  invalidEmail: "Invalid email format!",
  takenData: " already exists in our database!",
  invalidUsername: `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters long`,
  invalidPhone: `Phone number must be exactly ${PHONE_NUM_DIGITS} digits`,
  wrongPass: `Wrong password`,
};

export const addonErrorMessages = {
  downloadError: "Sorry! You cannot currently download this.",
};