// Importing necessary icons from react-icons
import { FaGithub } from "react-icons/fa"; // GitHub icon for project links

const ProjectCard = ({ title, description, url, stars, imageurl }) => {
  const fallBackImage = "/download.jpg"; // Default image if no image URL is provided

  return (
    <div className="cursor-pointer hover:-translate-y-[1.1rem] shadow-sm shadow-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-100 w-[100%] px-[1rem] py-[1rem]">
      {/* Card wrapper with hover effects for better UX */}

      <img
        src={imageurl || fallBackImage} // Use provided image URL or fallback image
        alt={title} // Alt text for accessibility
        className="w-32 h-32 mx-auto rounded-full" // Style for the image (size, centering, and shape)
      />
      <p className="text-sm text-gray-500 mt-1">⭐ {stars} stars</p>
      {/* Display the number of stars for the project */}

      <h5 className="capitalize my-3">{title}</h5>
      {/* Project title, styled to be capitalized and with margin */}

      <p className="text-[0.7rem] capitalize my-2">{description}</p>
      {/* Project description, with smaller text size and margin */}

      <a href={url} target="_blank" rel="noopener noreferrer" className="">
        {/* Link to the project on GitHub, opens in a new tab */}
        <FaGithub className="text-[1.3rem] mt-3" />
        {/* GitHub icon for the project link */}
      </a>
    </div>
  );
};

export default ProjectCard; // Export the ProjectCard component for use in other parts of the application
