import { useState, useEffect } from "react"; // Import React hooks for state and lifecycle management
import ProjectCard from "../../components/ProjectCard/ProjectCard"; // Import ProjectCard component for displaying projects
import SearchBar from "../../components/SearchBar/SearchBar"; // Import SearchBar component for searching projects
import { licenseCategories } from "../../components/Lincensecategory/Lincense"; // Import the license categories
import { RiArrowUpWideFill, RiArrowDownWideFill } from "react-icons/ri"; // Import icons for dropdown functionality

const ProjectPage = () => {
  // State variables for managing component state
  const [open, setOpen] = useState(false); // State to manage the visibility of the license menu
  const [projects, setProjects] = useState([]); // State to hold the fetched projects
  const [filteredProjects, setFilteredProjects] = useState([]); // State to hold projects after filtering
  const [selectedLicense, setSelectedLicense] = useState("All"); // State to manage selected license category
  const [searchTerm, setSearchTerm] = useState(""); // State to manage the search input value
  const [currentPage, setCurrentPage] = useState(1); // State to manage current pagination page
  const projectsPerPage = 12; // Number of projects to display per page

  // Function to toggle the visibility of the license menu
  const toggleMenu = () => {
    setOpen((prev) => !prev); // Toggle the open state
  };

  // Function to handle license selection
  const handleLicenseChange = (license) => {
    setSelectedLicense(license); // Update the selected license
    setOpen(false); // Close the menu when a license is selected
  };

  // Effect to retrieve saved license and search term from local storage on component mount
  useEffect(() => {
    const storedLicense = localStorage.getItem("selectedLicense"); // Retrieve the saved license
    const storedSearchTerm = localStorage.getItem("searchTerm"); // Retrieve the saved search term

    // Set the state if values are found in local storage
    if (storedLicense) {
      setSelectedLicense(storedLicense);
    }
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  // Effect to fetch projects based on the selected license whenever it changes
  useEffect(() => {
    const fetchProjectsByLicense = async () => {
      const license = licenseCategories.find(
        (cat) => cat.label === selectedLicense // Find the selected license category
      );
      if (license) {
        const fetchedProjects = await license.fetchProjects(); // Fetch projects using the selected license
        setProjects(fetchedProjects); // Update the projects state
        setFilteredProjects(fetchedProjects); // Set the filtered projects to the fetched projects
      }
    };

    fetchProjectsByLicense(); // Call the fetch function
  }, [selectedLicense]); // Dependency on selectedLicense to refetch when it changes

  // Effect to filter projects based on the search term whenever it or projects change
  useEffect(() => {
    let updatedProjects = projects; // Start with the full list of projects

    // If there is a search term, filter the projects
    if (searchTerm) {
      updatedProjects = updatedProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Check if name includes search term
          project.description?.toLowerCase().includes(searchTerm.toLowerCase()) // Check if description includes search term
      );
    }

    setFilteredProjects(updatedProjects); // Update the filtered projects
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, projects]); // Dependencies on searchTerm and projects

  // Effect to save the selected license to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedLicense", selectedLicense); // Save the selected license
  }, [selectedLicense]);

  // Effect to save the search term to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm); // Save the search term
  }, [searchTerm]);

  // Pagination calculation
  const indexOfLastProject = currentPage * projectsPerPage; // Calculate index of the last project on current page
  const indexOfFirstProject = indexOfLastProject - projectsPerPage; // Calculate index of the first project on current page
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject // Get the current projects to display
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage); // Calculate total number of pages

  return (
    <div className="px-[1.2rem] mt-[1.5rem]">
      {" "}
      {/* Main container */}
      <div className="flex items-center md:flex-row justify-between mb-4">
        {" "}
        {/* Header containing filters */}
        <div className="flex-1 relative">
          {" "}
          {/* License selection menu */}
          <h5
            className={` ${open ?"fixed " : " relative"} z-10 flex items-center gap-1 cursor-pointer py-1 w-[50%] md:w-[30%]`}
            onClick={toggleMenu} // Toggle the license menu on click
          >
            Licenses
            {open ? (
              <RiArrowUpWideFill className="text-[1.3rem]" /> // Icon indicating menu is open
            ) : (
              <RiArrowDownWideFill className="text-[1.3rem]" /> // Icon indicating menu is closed
            )}
          </h5>
          <div
            className={`${
              open ? "translate-y-[0%] bg-gray-100" : "-translate-y-[150%]"
            } flex flex-col gap-4 mt-2 fixed top-[15%] z-10 rounded-[1rem] py-2 px-2 transition-all duration-300 ease-in-out`} // Dropdown menu styles
          >
            {licenseCategories.map(
              (
                { label } // Map over license categories to create options
              ) => (
                <label key={label} className="cursor-pointer">
                  {" "}
                  {/* Label for each license */}
                  <input
                    type="radio"
                    name="license"
                    value={label}
                    checked={selectedLicense === label} // Check if the license is selected
                    onChange={() => handleLicenseChange(label)} // Handle license change
                  />
                  <span className="ml-2">{label}</span>{" "}
                  {/* Display the license label */}
                </label>
              )
            )}
          </div>
        </div>
        <div className="flex-1 mt-4 md:mt-0">
          {" "}
          {/* Search bar container */}
          <SearchBar
            value={searchTerm} // Pass search term value
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
            placeholder="Search projects..." // Placeholder text for the search bar
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {" "}
        {/* Grid layout for project cards */}
        {currentProjects.map(
          (
            project // Map over current projects to create cards
          ) => (
            <ProjectCard
              key={project.id} // Unique key for each project card
              title={project.name} // Project title
              description={project.description} // Project description
              url={project.html_url} // Project URL
              stars={project.stargazers_count} // Number of stars
              imageurl={project.owner.avatar_url} // Project owner's avatar URL
            />
          )
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {" "}
        {/* Pagination buttons container */}
        <button
          disabled={currentPage === 1} // Disable if on the first page
          onClick={() => setCurrentPage((prev) => prev - 1)} // Go to previous page
          className="px-4 py-2 mx-2 border rounded"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages} // Disable if on the last page
          onClick={() => setCurrentPage((prev) => prev + 1)} // Go to next page
          className="px-4 py-2 mx-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectPage; // Export the ProjectPage component
