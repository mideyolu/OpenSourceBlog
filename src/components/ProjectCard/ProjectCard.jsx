//import './projectCard.css'
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({ title, description, url, stars, imageurl }) => {
  const fallBackImage = "/download.jpg";
  return (
    <div className="cursor-pointer hover:-translate-y-[1.1rem] scale-100 hover:scale-105 transition-all duration-100 w-[100%] shadow-xl px-[1rem] py-[1rem]">
      <img
        src={imageurl || fallBackImage}
        alt={title}
        className="w-32 h-32 mx-auto rounded-full"
      />
      <p className="text-sm text-gray-500 mt-1">⭐ {stars} stars</p>{" "}
      {/* Display star count */}
      <h5 className="capitalize my-3">{title}</h5>
      <p className="text-sm capitalize my-2">{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="">
        <FaGithub className="text-[1.3rem] mt-3" />
      </a>
    </div>
  );
};

export default ProjectCard;
