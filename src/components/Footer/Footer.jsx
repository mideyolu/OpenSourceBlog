import { Link } from "react-router-dom";
import Button from "../Button/Button";
const Footer = () => {
  const date = new Date().getFullYear();
  const link = "https://github.com/mideyolu/OpenSourceBlog";

  return (
    <div className="mt-[0.2rem] text-[0.9rem] text-center py-[2rem] px-[2rem]">
      <div className="flex items-center justify-between flex-col md:flex-row  gap-[1rem]">
        <div className="d">&copy; Copright {date}</div>

        <div className="capitalize ">
          <h5 className="mb-2 md:mb-0">
            Designed by Group Oss Project Group 1
          </h5>
          <p>
            <Link to={link}>View Repo</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
