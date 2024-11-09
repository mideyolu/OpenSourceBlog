import React, { useEffect, useState } from "react";
import { fetchProjectsByLicense, cleanDescription, truncateDescription } from "../../api/api";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [licenseType, setLicenseType] = useState(""); // Default to empty for "All"
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;

  const handleLicenseChange = (e) => {
    setLicenseType(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjectsByLicense(licenseType);
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
      // Show the loader for 2 seconds before hiding it
      setTimeout(() => {
        setLoading(false);
      }, 3000); // 2-second loader delay
    };

    getProjects();
  }, [licenseType]);

  useEffect(() => {
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, projects]);

  // Get projects to display based on the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <div className="mt-4 flex flex-col md:flex-row items-center justify-center md:justify-around space-x-4 md:space-x-9 gap-4">
        <div className="left">
          <SearchBar
            placeholder="Search Projects..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="right cursor-pointer">
          <label>
            License Type:
            <select
              value={licenseType}
              onChange={handleLicenseChange}
              className=" dark:text-black cursor-pointer py-2 ml-2 rounded-md"
            >
              <option value="">All</option>
              <option value="mit">MIT</option>
              <option value="apache-2.0">Apache 2.0</option>
              <option value="gpl-3.0">GPL 3.0</option>
              <option value="bsd-3-clause">BSD 3-Clause</option>
              <option value="unlicense">Unlicense</option>
              <option value="mpl-2.0">Mozilla Public License 2.0</option>
              <option value="lgpl-3.0">LGPL 3.0</option>
              <option value="epl-2.0">Eclipse Public License 2.0</option>
              <option value="agpl-3.0">AGPL 3.0</option>
              <option value="cc0-1.0">CC0 1.0 Universal</option>
              <option value="creative-commons">Creative Commons</option>
              <option value="osl-3.0">Open Software License 3.0</option>
              <option value="bsl-1.0">Business Source License 1.0</option>
            </select>
          </label>
        </div>
      </div>

      <div className="bottom">
        {loading ? (
          <Loader /> // Show the loader when data is still being fetched
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 my-4 mx-2 space-y-4">
              {currentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.name}
                  description={truncateDescription(cleanDescription(project.description))}
                  url={project.html_url}
                  imageurl={project.owner.avatar_url}
                  stars={project.stargazers_count}
                  license={
                    project.license ? project.license.name : "No License"
                  }
                  forks={project.forks_count}
                />
              ))}
            </div>

            <div className="pagination-controls mt-4 flex items-center justify-center space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-[0.6rem] w-[20%] cursor-pointer hover:scale-105 py-[0.8rem] font-semibold bg-white mx-2 border  rounded-md transition duration-200 text-2rem lg:text-[1.3rem] md:text-[1rem] dark:text-black"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-[0.6rem] w-[20%] cursor-pointer hover:scale-105 py-[0.8rem] font-semibold bg-white mx-2 border  rounded-md transition duration-200 text-2rem lg:text-[1.3rem] md:text-[1rem] dark:text-black"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
