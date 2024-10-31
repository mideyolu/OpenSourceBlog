import Button from "../../components/Button/Button"; // Import Button component for clickable buttons
import ProjectCard from "../../components/ProjectCard/ProjectCard"; // Import ProjectCard component for displaying projects
import { useEffect, useRef, useState } from "react"; // Import React hooks for state and lifecycle management
import { fetchTopTrendingProjects, cleanDescription } from "../../api/api"; // Import API functions for fetching projects and cleaning descriptions
import { useNavigate } from "react-router-dom"; // Import hook for navigation between routes

const HomePage = () => {
  // Create a route redirect to project section using useNavigate hook
  const navigate = useNavigate();

  // Function to navigate to the projects page
  const getNavigate = () => {
    navigate("/projects"); // Navigate to the projects route
  };

  // Create a reference to the "Top Trending Open Source Projects" section
  const trendingSectionRef = useRef(null); // Create a ref to access the trending section

  // Function to scroll to the "Top Trending Open Source Projects" section
  const scrollToTrendingSection = () => {
    if (trendingSectionRef.current) {
      trendingSectionRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
    }
  };

  const [projects, setProjects] = useState([]); // State to hold fetched projects

  // Effect to load trending projects when the component mounts
  useEffect(() => {
    const loadTrendingProjects = () => {
      // Check if trending projects are in local storage
      const storedProjects = localStorage.getItem("trendingProjects");

      if (storedProjects) {
        // If found, parse and set projects from local storage
        setProjects(JSON.parse(storedProjects)); // Set the projects state with stored data
      } else {
        // If not found, fetch from API
        getTrendingProjects(); // Fetch trending projects from API
      }
    };

    // Function to fetch trending projects from the API
    const getTrendingProjects = async () => {
      const data = await fetchTopTrendingProjects(); // Fetch data from the API
      const slicedData = data.slice(0, 6); // Get the top 6 projects
      setProjects(slicedData); // Set the projects state

      // Save fetched projects to local storage for future reference
      localStorage.setItem("trendingProjects", JSON.stringify(slicedData)); // Store data in local storage
    };

    loadTrendingProjects(); // Call the function to load projects
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="flex gap-[2rem] flex-col">
      {" "}
      {/* Main container for the homepage */}
      <div className="flex flex-2 items-center flex-col justify-center h-[100vh]">
        {" "}
        {/* Hero section */}
        <div className="text-center">
          <h2 className="text-[1.1rem] font-bold md:text-[2rem]">
            {" "}
            {/* Title of the page */}
            Explore a Curated Directory Containing
            <span className="block">Open Source Projects</span>
            Across Various Categories
          </h2>
        </div>
        <div className="flex items-center justify-center text-center w-[40%] gap-[0.2rem] mt-[2rem]">
          {" "}
          {/* Buttons container */}
          <Button onClick={scrollToTrendingSection}>
            {" "}
            {/* Button to scroll to trending section */}
            <h5>Trending</h5>
          </Button>
          <Button onClick={getNavigate}>
            {" "}
            {/* Button to navigate to projects page */}
            <h5>More</h5>
          </Button>
        </div>
      </div>
      {/* Top Trending Section */}
      <div ref={trendingSectionRef} className="px-[1.2rem]">
        {" "}
        {/* Section for trending projects */}
        <h3 className="text-center mb-[2rem] text-[1.1rem] font-bold md:text-[2rem]">
          {" "}
          {/* Section title */}
          Top Trending Open Source Projects
        </h3>
        <div className="grid grid-cols-2 place-content-center place-items-center gap-[2rem] md:space-y-3 md:grid-cols-3">
          {" "}
          {/* Grid for project cards */}
          {projects.map(
            (
              project // Map over the projects array to create project cards
            ) => (
              <ProjectCard
                key={project.id} // Unique key for each project card
                title={project.name} // Project title
                description={cleanDescription(project.description)} // Cleaned project description
                url={project.html_url} // Project URL
                imageurl={project.owner.avatar_url} // Project owner's avatar URL
                stars={project.stargazers_count} // Number of stars for the project
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage; // Export the HomePage component
