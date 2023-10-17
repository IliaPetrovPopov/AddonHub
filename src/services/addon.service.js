import {
  ref,
  push,
  get,
  query,
  equalTo,
  orderByChild,
  limitToLast,
  set,
  update,
  onValue,
} from "firebase/database";
import { db } from "../config/firebase-config";
import { ADDONS_PER_TAB_ON_HOME_PAGE } from "../common/constants";
import {
  addonNameExists,
  areTagsMoreThanOne,
  isAddonNameValid,
  isDescriptionValid,
  isFileExtensionValid,
  isFileSizeValid,
  isGitHubLink,
  isIDEEntered,
  isTagLengthValid,
} from "../common/helperFunctions/addon/addon.validations";
import { addonToStorage, editLogo, logoToStorage } from "../common/helperFunctions/addon/addon.storage";
import { addNotification } from "./notification.service";
import { toast } from "react-toastify";

export const createPendingAddon = async (
  name,
  description,
  gitHubLink,
  targetIDE,
  tags,
  license,
  author,
  price,
  file,
  logo
) => {
  try {
    const addonName = isAddonNameValid(name);
    const addonDescription = isDescriptionValid(description);
    const addonOrigin = isGitHubLink(gitHubLink);
    const addonIDE = isIDEEntered(targetIDE);
    const addonTags = areTagsMoreThanOne(tags);
    const addonFileExtension = isFileExtensionValid(file);
    const addonFileSize = isFileSizeValid(file);

    if (
      !addonName ||
      !addonDescription ||
      !addonOrigin ||
      !addonIDE ||
      !addonTags ||
      !addonFileExtension ||
      !addonFileSize
    ) {
      toast.error(
        "You inputed wrong information! Take a look at the check list!"
      );

      return false;
    }

    const nameExists = await addonNameExists(name);

    if (nameExists) {
      toast.error(
        "This addon name is already taken! Enter different name to continue!"
      );

      return false;
    }

    const newAddonRef = await push(ref(db, "addons"), {
      name,
      description,
      gitHubLink,
      targetIDE,
      tags,
      license: license === "" ? "Not added" : license,
      price: (price === "" || price === "0.00") ? "$0.00" : `$${price}`,
      author,
      addedOn: new Date().valueOf(),
      state: "pending",
      reviews: {},
      downloadedBy: [],
    });

    const newAddonKey = newAddonRef.key;

    await tagsToDataBase(tags);
    await addonToStorage(file, name);
    const logoUrl = await logoToStorage(logo, name);
    await update(ref(db, `users/${author}/addons`), { [newAddonKey]: true });
    await update(ref(db, `addons/${newAddonKey}`), { logo: logoUrl });
    await addNotification(
      author,
      author,
      `${name} was added and is waiting for approval`
    );
  } catch (e) {
    console.error(e.message);
    return false;
  }
};

export const modifyAddon = async (
  addonName,
  name,
  description,
  targetIDE,
  tags,
  price,
  logo,
  uid
) => {
  const changes = {
    name,
    description,
    targetIDE,
    tags,
    price,
    logo,
  };

  const filteredChanges = Object.keys(changes)
    .filter((key) => {
      const value = changes[key];
      if (typeof value === "string") {
        return value.trim() !== "";
      } else if (Array.isArray(value)) {
        return value.length > 0;
      } else if (typeof value === "object" && value !== null) {
        return Object.keys(value).length > 0;
      } else {
        return value !== undefined;
      }
    })
    .reduce((result, key) => {
      result[key] = changes[key];
      return result;
    }, {});

  try {
    if (filteredChanges.name) {
      isAddonNameValid(name);
    }

    if(filteredChanges.description) {
      isDescriptionValid(description)
    }

    if (filteredChanges.tags) {
      areTagsMoreThanOne(tags);
    }

    if (filteredChanges.logo) {
      await editLogo(filteredChanges.logo, addonName);
    }

    await changeAddonData(uid, filteredChanges);
    await tagsToDataBase(tags);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const changeAddonData = async (uid, updatedData) => {
  try {
    await update(ref(db, `addons/${uid}`), updatedData);
  } catch (error) {
    console.error(error);
  }
};

export const tagsToDataBase = async (tags) => {
  try {
    const invalidTags = tags.filter((tag) => !isTagLengthValid(tag.length));

    if (invalidTags.length === 0) {
      const promiseTags = tags.map(async (tag) => {
        isTagLengthValid(tag.length);

        const tagInDBRef = query(ref(db, "tags"), equalTo(tag));
        const retrieveName = await get(tagInDBRef);

        if (!retrieveName.exists()) {
          return set(ref(db, `tags/${tag}`), true);
        }

        return null;
      });

      await Promise.all(promiseTags);
      return true;
    }

    return false;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAddonFromAddonsDocument = async (snapshot) => {
  const addonsDocument = snapshot.val();

  return Object.keys(addonsDocument).map((key) => {
    const addon = addonsDocument[key];

    //const [lastCommitDate, commitMessage ] = fetchLastCommit(addon.gitHubLink);

    return {
      ...addon,
      id: key,
      addedOn: new Date(addon.addedOn),
      //lastCommit: lastCommitDate,
      //commitMessage: commitMessage
    };
  });
};

const getAddonFromSnapshot = (snapshot) => {
  const addonsDocument = snapshot.val();

  return {
    ...addonsDocument,
  };
};

export const getAddonById = async (uid) => {
  const result = await get(ref(db, `addons/${uid}`));

  if (!result) {
    console.error(`Addon with id ${uid} does not exist!`);
    return null;
  }

  const addon = await getAddonFromSnapshot(result);
  addon.id = uid;
  return addon;
};

export const getRecentlyUploadedAddons = async () => {
  try {
    const snapshotApproved = await get(
      query(ref(db, "addons"), orderByChild("state"), equalTo("approved"))
    );

    const snapshotFeatured = await get(
      query(ref(db, "addons"), orderByChild("state"), equalTo("featured"))
    );

    if (!snapshotApproved.exists() && !snapshotFeatured.exists()) return [];

    const resultApproved = await getAddonFromAddonsDocument(snapshotApproved);
    const resultFeatured = await getAddonFromAddonsDocument(snapshotFeatured);

    return [...resultApproved, ...resultFeatured]
      .sort((a, b) => b.createdOn - a.createdOn)
      .slice(0, ADDONS_PER_TAB_ON_HOME_PAGE + 1);
    /*const snapshot = await get(
      query(
        ref(db, "addons"),
        orderByChild("addedOn"),
        limitToLast(ADDONS_PER_TAB_ON_HOME_PAGE)
      )
    );

    if (!snapshot.exists()) return [];

    return getAddonFromAddonsDocument(snapshot);*/
  } catch (error) {
    console.error("Error fetching recently uploaded addons: ", error);
    throw error;
  }
};

export const getFeaturedAddons = async () => {
  try {
    const snapshot = await get(
      query(
        ref(db, "addons"),
        orderByChild("state"),
        equalTo("featured"),
        limitToLast(ADDONS_PER_TAB_ON_HOME_PAGE)
      )
    );

    if (!snapshot.exists()) return [];

    return getAddonFromAddonsDocument(snapshot);
  } catch (error) {
    console.error("Error fetching featured addons: ", error);
    throw error;
  }
};

export const getAddons = () => {
  return get(query(ref(db, "addons")));
};

export const getTagsLive = (callback) => {
  const notificationsSnapshot = ref(db, `tags`);

  return onValue(notificationsSnapshot, (snapshot) => {
    const result = snapshot.val();
    callback(result);
  });
};

export const getApprovedAddonsSnapshot = () => {
  return get(
    query(ref(db, "addons"), orderByChild("state"), equalTo("approved"))
  );
};

export const getFeaturedAddonsSnapshot = () => {
  return get(
    query(ref(db, "addons"), orderByChild("state"), equalTo("featured"))
  );
};

export const getAllAddons = async () => {
  try {
    const snapshotApproved = await get(
      query(ref(db, "addons"), orderByChild("state"), equalTo("approved"))
    );

    const snapshotFeatured = await get(
      query(ref(db, "addons"), orderByChild("state"), equalTo("featured"))
    );

    if (!snapshotApproved.exists() && !snapshotFeatured.exists()) return [];

    const resultApproved = await getAddonFromAddonsDocument(snapshotApproved);
    const resultFeatured = await getAddonFromAddonsDocument(snapshotFeatured);

    return {
      addons: [...resultApproved, ...resultFeatured].sort(
        (a, b) => b.createdOn - a.createdOn
      ),
      addonsList: [...resultApproved, ...resultFeatured].map((el) => el.id),
    };
    //return getAddonFromAddonsDocument(snapshot);
  } catch (error) {
    console.error("Error fetching addons: ", error);
    throw error;
  }
};

export const getAddonsFromIdList = async (idList) => {
  const addonsPromises = idList.map(async (id) => {
    try {
      const addon = await getAddonById(id);
      return addon;
    } catch (error) {
      console.error(error);
    }
  });

  const addons = Promise.all(addonsPromises);
  return addons;
};

export const downloadAddon = async (uid, username) => {
  if (username) {
    await update(ref(db, `users/${username}/downloads`), { [uid]: true });
    await update(ref(db, `addons/${uid}/downloadedBy`), { [username]: true });
  } else {
    let counter = 0;
    await update(ref(db, `addons/${uid}/downloadedBy`), {
      [`anonymousUser${++counter}`]: true,
    });
  }
};
