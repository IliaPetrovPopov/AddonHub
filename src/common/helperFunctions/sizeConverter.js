const units = ["bytes", "kB", "MB", "GB", "TB"];

export const convertSize = (x) => {
  let l = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(1) + " " + units[l];
};
