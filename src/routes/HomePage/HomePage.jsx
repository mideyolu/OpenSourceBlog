import Button from "../../components/Button/Button"; // Import Button component for clickable buttons
import ProjectCard from "../../components/ProjectCard/ProjectCard"; // Import ProjectCard component for displaying projects
import { useEffect, useRef, useState } from "react"; // Import React hooks for state and lifecycle management
import { useNavigate } from "react-router-dom"; // Import hook for navigation between routes
import TopTrending from "../../components/TopTrending/TopTrending";



const HomePage = () => {
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
  const [projects, setProjects] = useState([]);
  const [licenseType, setLicenseType] = useState("mit"); // Default license type

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
        <h3 className="text-center mt-[3rem] mb-[2rem] text-[1.1rem] font-bold md:text-[2rem]">
          {" "}
          {/* Section title */}
          Top Trending Open Source Projects
        </h3>
        <div className="">
          {" "}
          {/* Grid for project cards */}
          <TopTrending />
        </div>

      </div>
    </div>
  );
};

export default HomePage;
