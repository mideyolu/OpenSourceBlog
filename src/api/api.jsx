import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchTopTrendingProjects = async () => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
      params: {
        q: "stars:>10000 license:mit", // Filter for open-source licenses
        sort: "stars",
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data.items;
    
  } catch (error) {
    console.error("Error Fetching Github Data");
    return [];
  }
};

export const cleanDescription = (description) => {
  return description.replace(/^:+\s*/, "").trim();
};
