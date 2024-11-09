import axios from "axios";

// Set up the GitHub API token in your headers
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

// Fetch trending projects directly from GitHub by license type
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
    return response.data.items; // Directly returning items array
  } catch (error) {
    console.error("Error fetching trending projects:", error);
    throw error;
  }
};

// Fetch projects from GitHub by license type
export const fetchProjectsByLicense = async (licenseType = "") => {
  const licenseQuery = licenseType ? `license:${licenseType}` : ""; // Only apply if a specific license is selected
  const perPage = 100; // GitHub allows a maximum of 100 items per page
  const maxResults = 1000; // Maximum number of results to fetch
  let allProjects = [];
  let page = 1; // Start from page 1

  try {
    // Keep fetching until we have 1000 results or there are no more pages
    while (allProjects.length < maxResults) {
      const response = await axios.get(
        "https://api.github.com/search/repositories",
        {
          params: {
            q: `stars:>500 ${licenseQuery}`.trim(),
            sort: "stars",
            order: "desc",
            per_page: perPage,
            page: page, // Request the next page
          },
          headers,
        }
      );

      const newProjects = response.data.items;
      allProjects = [...allProjects, ...newProjects];

      // If we have fewer than `perPage` results, break the loop (no more results)
      if (newProjects.length < perPage) {
        break;
      }

      page++; // Increment page for the next request
    }

    return allProjects.slice(0, maxResults); // Ensure we only return up to 1000 results
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
