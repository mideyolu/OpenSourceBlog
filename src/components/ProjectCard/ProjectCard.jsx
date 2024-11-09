import { FaGithub } from "react-icons/fa"; // GitHub icon for project links

const ProjectCard = ({
  title,
  description,
  url,
  stars,
  imageurl,
  license,
  forks,
  issues,
  lang,

}) => {
  const fallBackImage = "/download.jpg"; // Default image if no image URL is provided

  return (
    <div className="cursor-pointer hover:-translate-y-[1.1rem] shadow-sm shadow-gray-300 hover:shadow-2xl dark:shadow-none hover:scale-105 transition-all duration-100 w-full md:w-[95%] px-[1rem] py-[1rem]">
      {/* Card wrapper with hover effects for better UX */}

      <img
        src={imageurl || fallBackImage} // Use provided image URL or fallback image
        alt={title} // Alt text for accessibility
        className="w-32 h-32 mx-auto rounded-full" // Style for the image (size, centering, and shape)
      />
      <p className="text-sm text-center mt-1">
        ⭐ {stars} stars | 📄 {license || "No License"} | 🍴 {forks} | {issues}
      </p>
      {/* Display the number of stars, forks, and license for the project */}

      <h5 className="capitalize my-3">{title}</h5>
      {/* Project title, styled to be capitalized and with margin */}

      <p className="text-[0.7rem] capitalize my-2">{description}</p>
      {/* Project description, with smaller text size and margin */}

      <p className="text-[0.7rem] capitalize my-2">{lang}</p>

      <a href={url} target="_blank" rel="noopener noreferrer" className="">
        {/* Link to the project on GitHub, opens in a new tab */}
        <FaGithub className="text-[1.3rem] mt-3" />
        {/* GitHub icon for the project link */}
      </a>
    </div>
  );
};

export default ProjectCard; // Export the ProjectCard component for use in other parts of the application
