import Button from "../../components/Button/Button";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { useEffect, useRef, useState } from "react";
import { fetchTopTrendingProjects, cleanDescription } from "../../api/api";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // Create a route redirect to project section
  const navigate = useNavigate();

  const getNavigate = () => {
    navigate("/projects");
  };

  // Create a reference to the "Top Trending Open Source Projects" section
  const trendingSectionRef = useRef(null);

  // Function to scroll to the "Top Trending Open Source Projects" section
  const scrollToTrendingSection = () => {
    if (trendingSectionRef.current) {
      trendingSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [projects, setProjects] = useState([]); // State to hold fetched projects

  useEffect(() => {
    const loadTrendingProjects = () => {
      // Check if trending projects are in local storage
      const storedProjects = localStorage.getItem("trendingProjects");

      if (storedProjects) {
        // If found, parse and set projects from local storage
        setProjects(JSON.parse(storedProjects));
      } else {
        // If not found, fetch from API
        getTrendingProjects();
      }
    };

    const getTrendingProjects = async () => {
      const data = await fetchTopTrendingProjects();
      const slicedData = data.slice(0, 6);
      setProjects(slicedData);

      // Save fetched projects to local storage
      localStorage.setItem("trendingProjects", JSON.stringify(slicedData));
    };

    loadTrendingProjects();
  }, []);

  return (
    <div className="flex gap-[2rem] flex-col">
      <div className="flex flex-2 items-center flex-col justify-center h-[100vh]">
        <div className="text-center">
          <h2 className="text-[1.1rem] font-bold md:text-[2rem]">
            Explore a Curated Directory Containing
            <span className="block">Open Source Projects</span>
            Across Various Categories
          </h2>
        </div>
        <div className="flex items-center justify-center text-center w-[40%] gap-[0.2rem] mt-[2rem]">
          <Button onClick={scrollToTrendingSection}>
            <h5>Trending</h5>
          </Button>
          <Button onClick={getNavigate}>
            <h5>More</h5>
          </Button>
        </div>
      </div>

      {/* Top Trending Section */}
      <div ref={trendingSectionRef} className="px-[1.2rem]">
        <h3 className="text-center mb-[2rem] text-[1.1rem] font-bold md:text-[2rem]">
          Top Trending Open Source Projects
        </h3>
        <div className="grid grid-cols-2 place-content-center place-items-center gap-[2rem] md:space-y-3 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.name}
              description={cleanDescription(project.description)}
              url={project.html_url}
              imageUrl={project.owner.avatar_url}
              stars={project.stargazers_count}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
