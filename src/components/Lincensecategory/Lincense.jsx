// src/api/licenseCategories.js
import {
  fetchMITProjects,
  fetchApacheProjects,
  fetchBSDProjects,
  fetchBSD3Projects,
  fetchGPL2Projects,
  fetchGPL3Projects,
  fetchEPLProjects,
  fetchMPLProjects,
  fetchUnlicenseProjects,
  fetchMsPLProjects,
  fetchZlibProjects,
  fetchLGPL3Projects,
  fetchArtisticProjects,
  fetchAllProjects,
} from "../../api/api"; // Adjust the import path as necessary

export const licenseCategories = [
  { label: "All", fetchProjects: fetchAllProjects },
  { label: "MIT", fetchProjects: fetchMITProjects },
  { label: "Apache 2.0", fetchProjects: fetchApacheProjects },
  { label: "BSD", fetchProjects: fetchBSDProjects },
  { label: "BSD3", fetchProjects: fetchBSD3Projects },
  { label: "GPL-2.0", fetchProjects: fetchGPL2Projects },
  { label: "GPL-3.0", fetchProjects: fetchGPL3Projects },
  { label: "EPL 2.0", fetchProjects: fetchEPLProjects },
  { label: "MPL 2.0", fetchProjects: fetchMPLProjects },
  { label: "Unlicense", fetchProjects: fetchUnlicenseProjects },
  { label: "MPL", fetchProjects: fetchMsPLProjects },
  { label: "Zlib License", fetchProjects: fetchZlibProjects },
  { label: "LGPL-3.0", fetchProjects: fetchLGPL3Projects },
  { label: "Artistic License 2.0", fetchProjects: fetchArtisticProjects },
];
