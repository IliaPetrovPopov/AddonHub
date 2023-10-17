import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import {
  EMAIL_REGEX,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  PHONE_NUM_DIGITS,
} from "../constants";
import { db } from "../../config/firebase-config";
import { authErrorMessages } from "../error.messages";

const isEmailValid = (email) => {
  return EMAIL_REGEX.test(email);
};

const isUsernameValid = (username) => {
  return (
    username &&
    username.length > MIN_USERNAME_LENGTH &&
    username.length < MAX_USERNAME_LENGTH
  );
};

const isPhoneValid = (number) => {
  return number && number.length === PHONE_NUM_DIGITS;
};

const isNotTaken = async (type, value) => {
  const retrieve = query(ref(db, "users"), orderByChild(type), equalTo(value));

  try {
    const snapshot = await get(retrieve);

    return !snapshot.exists();
  } catch (e) {
    console.error(e);
  }
};

export const emailValidAndNotTaken = async (email, currentEmail) => {
  if (email !== currentEmail) {
    if (!isEmailValid(email)) {
      throw new Error(authErrorMessages.invalidEmail);
    }
    if (!(await isNotTaken("email", email))) {
      throw new Error(`Email${authErrorMessages.takenData}`);
    }
    return true;
  }
};

export const usernameValidAndNotTaken = async (username) => {
  if (!isUsernameValid(username)) {
    throw new Error(authErrorMessages.invalidUsername);
  }
  if (!(await isNotTaken("username", username))) {
    throw new Error(`Username${authErrorMessages.takenData}`);
  }
  return true;
};

export const phoneValidAndNotTaken = async (phone, currentPhone) => {
  if (phone !== currentPhone) {
    if (!isPhoneValid(phone)) {
      throw new Error(authErrorMessages.invalidPhone);
    }
    if (!(await isNotTaken("phone", phone))) {
      throw new Error(`Phone${authErrorMessages.takenData}`);
    }
    return true;
  }
};
