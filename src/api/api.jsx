// api.jsx

import axios from "axios";

// Set up the GitHub API token and headers
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

const api = axios.create({
  baseURL: "https://api.github.com",
  headers,
});





// Fetch trending projects based on license type
export const fetchTrendingProjects = async (licenseType, perPage = 6) => {
  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        params: {
          q: `license:${licenseType} stars:>500`, // Adjust stars count as needed
          sort: "stars",
          order: "desc",
          per_page: perPage,
        },
        headers,
      }
    );
    return response.data.items; // Return only the items array
  } catch (error) {
    console.error("Error fetching trending projects:", error);
    throw error;
  }
};

// Fetch projects from GitHub by license type with pagination for up to 1000 results
export const fetchProjectsByLicense = async (licenseType = "") => {
  const licenseQuery = licenseType ? `license:${licenseType}` : ""; // Only apply if specific license
  const perPage = 100; // Max per page by GitHub
  const maxResults = 1000; // Max results to fetch
  let allProjects = [];
  let page = 1;

  try {
    while (allProjects.length < maxResults) {
      const response = await axios.get(
        "https://api.github.com/search/repositories",
        {
          params: {
            q: `stars:>500 ${licenseQuery}`.trim(),
            sort: "stars",
            order: "desc",
            per_page: perPage,
            page,
          },
          headers,
        }
      );

      const newProjects = response.data.items;
      allProjects = [...allProjects, ...newProjects];

      if (newProjects.length < perPage) break; // Stop if fewer results

      page++;
    }

    return allProjects.slice(0, maxResults); // Limit to maxResults
  } catch (error) {
    console.error("Error fetching projects by license:", error);
    throw error;
  }
};

export const truncateDescription = (description, wordLimit = 30) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."; // Truncate and add ellipsis
  }
  return description;
};

// Helper function to format numbers with suffixes (e.g., 1k, 1M)
export const formatNumber = (num) => {
  if (num === undefined || num === null) {
    return "N/A"; // You can choose to return "0" or any default string
  }

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "k";
  }

  return num.toString();
};

// Helper function to clean up description text by removing leading colons and spaces
export const cleanDescription = (description) => {
  return description.replace(/^:+\s*/, "").trim();
};
