// src/TopTrending.jsx
import React, { useEffect, useState } from "react";
import { fetchTrendingProjects, cleanDescription } from "../../api/api";
import ProjectCard from "../ProjectCard/ProjectCard";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopTrending = () => {
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [licenseType, setLicenseType] = useState("mit"); // Default license type
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch trending projects based on license type
  const getTrendingProjects = async () => {
    setLoading(true); // Start loading
    try {
      const data = await fetchTrendingProjects(licenseType);
      setTrendingProjects(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Failed to load trending projects:", error);
      setError("Failed to load trending projects.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Update trending projects when the license type changes
  useEffect(() => {
    getTrendingProjects();
  }, [licenseType]);

  // Handle dropdown change for license type
  const handleLicenseChange = (e) => {
    setLicenseType(e.target.value);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mt-[4rem]">
      <label className=" ">
        License Type:
        <select
          value={licenseType}
          onChange={handleLicenseChange}
          className="dark:text-black cursor-pointer py-2 ml-2 rounded-md"
        >
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



      {loading ? (
        <Loader /> // Display loader when loading
      ) : (
        <Slider {...sliderSettings} className="my-[3rem] mt-3 grid grid-cols-1 md:grid-cols-3">
          {trendingProjects.map((project) => (
            <ProjectCard
              key={project.id} // Unique key for each project card
              title={project.name} // Project title
              description={cleanDescription(project.description)} // Cleaned project description
              url={project.html_url} // Project URL
              imageurl={project.owner.avatar_url} // Project owner's avatar URL
              stars={project.stargazers_count} // Number of stars for the project
              license={project.license ? project.license.name : "No License"} // License name or fallback
              forks={project.forks_count} // Number of forks for the project
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TopTrending;
