export const MIN_USERNAME_LENGTH = 2;
export const MAX_USERNAME_LENGTH = 20;
export const PHONE_NUM_DIGITS = 10;
export const MAX_PROFILE_PIC_SIZE = 600000;

export const EMAIL_REGEX = /\S+@\S+\.\S+/;

export const DEFAULT_ITEMS_PER_PAGE = 5;
export const ADDONS_BROWSE_PAGE = 10;

export const daisyThemes = [
  // "☀️ light",
  // "🌙 dark",
  "⚫️ black",
  "🧁 cupcake",
  "🐝 bumblebee",
  "💎 emerald",
  "🌌 synthwave",
  "🎞️ retro",
  "🧛‍♂️ dracula",
  "🎉 cmyk",
  "🌉 business",
  "💖 valentine",
  "🎃 halloween",
  // "🏙️ corporate",
  // "🔫 cyberpunk",
  // "🪴 garden",
  "🌲 forest",
  // "💧 aqua",
  // "🔲 lofi",
  // "🫧 pastel",
  // "🧞 fantasy",
  // "🔘 wireframe",
  // "💰 luxury",
  // "🍁 autumn",
  // "🧬 acid",
  // "🍋 lemonade",
  // "🌒 night",
  // "☕️ coffee",
  // "❄️ winter",
];

export const roleBadgeColors = {
  admin: "red",
  user: "blue",
  blocked: "black",
};

export const stateBadgeColors = {
  pending: "orange",
  approved: "green",
  featured: "teal",
  disabled: "purple",
};

export const visibleAddons = ["approved", "featured"];

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 9);
export const formattedMaxDate = maxDate.toISOString().split("T")[0];

const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 100);
export const formattedMinDate = minDate.toISOString().split("T")[0];

export const ADDONS_PER_TAB_ON_HOME_PAGE = 15;
export const ADDONS_PER_BROWSE_PAGE = 16;

export const MIN_ADDON_NAME_LENGTH = 3;
export const MAX_ADDON_NAME_LENGTH = 30;

export const MIN_DESCRIPTION_LENGTH = 32;
export const MAX_DESCRIPTION_LENGTH = 512;

export const githubRegex = /^https?:\/\/github\.com\//;

export const addonExtensions = ["zip", "rar", "jar"];

export const MIN_TAGS = 1;
export const MAX_TAGS = 9;

export const MIN_TAG_NAME_LENGTH = 1;

export const MAX_FILE_SIZE_BYTES = 7 * 1024 * 1024;
export const MAX_FILE_SIZE_MB = (MAX_FILE_SIZE_BYTES / 1000000).toFixed(2);

export const MAX_NOTIFICATIONS = 9;

export const IDEs = ["VS Code", "IntelliJ IDEA", "PyCharm"];
