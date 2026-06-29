import axios from "axios";

const getLatestRepos = async (data, token) => {
  try {
    const username = data.githubUsername;
    const config = {
      params: {
        sort: "updated",
        per_page: 6,
        type: "owner",
      },
    };

    if (token) {
      config.headers = {
        Authorization: `token ${token}`,
      };
    }

    const res = await axios.get(`https://api.github.com/users/${username}/repos`, config);
    return res.data.filter((repo) => !repo.fork).slice(0, 6);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getLatestRepos;
