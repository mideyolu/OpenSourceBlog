import Button from "../../components/Button/Button";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { useEffect, useRef, useState } from "react";
import { fetchTopTrendingProjects, cleanDescription } from "../../api/api";
const HomePage = () => {
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
    const getTrendingProjects = async () => {
      //check the localstorage first
      const localProjects = localStorage.getItem("trendingProjects");

      if (localProjects) {
        // Parse the JSON string back into an array
        setProjects(JSON.parse(localProjects));
      } else {
        // Fetch from API if no local data is found
        const data = await fetchTopTrendingProjects();
        const slicedData = data.slice(0, 6); // Limit to 6 projects
        setProjects(slicedData);
      }
      // Save to local storage
      localStorage.setItem("trendingProjects", JSON.stringify(slicedData));
    };

    getTrendingProjects();
  }, []);

  return (
    <div className="flex gap-[2rem] flex-col">
      <div className="flex flex-2 items-center flex-col justify-center h-[100vh]">
        <div className="text-center">
          <h2 className="text-[1.5rem] font-bold md:text-[2.5rem]">
            Explore a Curated Directory Containing
            <span className="block">Open Source Projects</span>
            Across Various Categories
          </h2>
        </div>
        <div className="flex items-center justify-center gap-[0.5rem] mt-[2rem]">
          <Button onClick={scrollToTrendingSection}>
            <h5>Top Trending</h5>
          </Button>
          <Button>
            <h5>View More</h5>
          </Button>
        </div>
      </div>

      {/* Top Trending Section */}
      <div ref={trendingSectionRef} className="px-[1.2rem]">
        <h3 className="text-center mb-[2rem] text-[2rem] font-semibold lg:text-[1.7rem] md:text-[1.5rem]">
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
