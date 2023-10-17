export const fetchRepo = async (path) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${path}`);
    const data = await response.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};
export const fetchPullRequests = async (path) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${path}/pulls`);
    const data = await response.json();

    return data.length;
  } catch (e) {
    console.error(e);
  }
};

export const fetchLastCommit = async (path) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${path}/commits`
    );
    const data = await response.json();

    // const lastDate = new Date(data[0]["commit"]["committer"]["date"]);
    const lastDate = new Date(data[0]?.commit?.committer?.date || new Date());
    const message = data[0]?.commit?.message || "";
    return {lastDate, message};
  } catch (e) {
    console.error(e);
  }
};

export const fetchReadMe = async (path) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${path}/readme`);
    const data = await response.json();
    const dataBase64 = data.content;
    const dataDecoded = atob(dataBase64);

    return dataDecoded;
  } catch (e) {
    console.error(e);
  }
};
