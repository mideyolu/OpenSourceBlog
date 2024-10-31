import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
const Navbar = () => {
  const [open, setOpen] = useState(true); // State to manage the visibility of the license menu

  const menu = (prev) => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="navbar bg-gray-100  fixed top-0 w-full py-4 rounded-md ">
      <div className="flex items-center justify-around gap-1">
        <div className="">OSS BLOG</div>
        <div
          className="block md:hidden relative cursor-pointer"
          onClick={menu}
        >
          {open ? (
            <RxCross1 className="text-[1.7rem]" />
          ) : (
            <IoMenu className="text-[2rem]" />
          )}
        </div>
        <div className="hidden md:flex items-center justify-between gap-[4rem]">
          <Link to={'/'}>Home</Link>
          <Link to={'/projects'}>Projects</Link>
        </div>
        <div
          className={` ${
            open ? "translate-y-[0%] bg-gray-100" : "-translate-y-[150%]"
          }  absolute top-[100%] mt-2 right-[20%] flex flex-col items-center 
            justify-between gap-[4rem] py-2 px-5 w-[30%] rounded-md transition-all duration-300 
            ease-in-out md:hidden`}
        >
          <Link to={'/'}>Home</Link>
          <Link to={'/projects'}>Projects</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
