import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Axios instance for GitHub API requests
const api = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// Function to fetch trending repositories
export const fetchTopTrendingProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "stars:>10000 license:mit", // Filter for open-source licenses
        sort: "stars",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching trending GitHub projects:", error);
    return [];
  }
};


// Function to fetch all projects sorted by stars
export const fetchAllProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "stars:>0", // Fetch all projects with at least one star
        sort: "stars",
        order: "desc", // Sort in descending order
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching all GitHub projects:", error);
    return [];
  }
};



// Function to fetch projects licensed under MIT
export const fetchMITProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:mit",
        sort: "stars",
        order: "desc",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching MIT projects:", error);
    return [];
  }
};

// Function to fetch projects licensed under Apache 2.0
export const fetchApacheProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:apache-2.0",
        sort: "stars",
        order: "desc",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching Apache projects:", error);
    return [];
  }
};

// Function to fetch projects licensed under BSD
export const fetchBSDProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        // q: "license:bsd",

        q: "license:bsd-2-clause",
        sort: "stars",
        order: "desc",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching BSD projects:", error);
    return [];
  }
};
export const fetchBSD3Projects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:bsd-3-clause",
        sort: "stars",
        order: "desc",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching BSD projects:", error);
    return [];
  }
};

// Function to fetch GPL-2.0 Licensed Projects
export const fetchGPL2Projects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:gpl-2.0",
        sort: "stars",
        order: "desc",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching GPL-2.0 projects:", error);
    return [];
  }
};

// Function to fetch GPL-3.0 Licensed Projects
export const fetchGPL3Projects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:gpl-3.0",
        sort: "stars",
        order: "desc",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching GPL-3.0 projects:", error);
    return [];
  }
};

// Function to fetch Creative Commons Zero Licensed Projects
export const fetchCC0Projects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:cc0-1.0",
        sort: "stars",
        order: "desc",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching CC0 projects:", error);
    return [];
  }
};

// Function to fetch Eclipse Public License 2.0 Licensed Projects
export const fetchEPLProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:epl-2.0",
        sort: "stars",
        order: "desc",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching EPL projects:", error);
    return [];
  }
};

// Function to fetch Mozilla Public License 2.0 Licensed Projects
export const fetchMPLProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:mpl-2.0",
        sort: "stars",
        order: "desc",
        per_page: 150, // Limit to 100 results per page
        page: 1,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching MPL projects:", error);
    return [];
  }
};

// Function to fetch Unlicense Projects
export const fetchUnlicenseProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:unlicense",
        sort: "stars",
        order: "desc",
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching Unlicense projects:", error);
    return [];
  }
};

// Function to fetch Microsoft Public License Projects
export const fetchMsPLProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:ms-pl",
        sort: "stars",
        order: "desc",
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching MS-PL projects:", error);
    return [];
  }
};

// Function to fetch Zlib License Projects
export const fetchZlibProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:zlib",
        sort: "stars",
        order: "desc",
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching Zlib projects:", error);
    return [];
  }
};

// Function to fetch LGPL-3.0 Licensed Projects
export const fetchLGPL3Projects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:lgpl-3.0",
        sort: "stars",
        order: "desc",
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching LGPL-3.0 projects:", error);
    return [];
  }
};

// Function to fetch Artistic License 2.0 Projects
export const fetchArtisticProjects = async () => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: "license:artistic-2.0",
        sort: "stars",
        order: "desc",
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching Artistic projects:", error);
    return [];
  }
};


export const cleanDescription = (description) => {
  return description.replace(/^:+\s*/, "").trim();
};
