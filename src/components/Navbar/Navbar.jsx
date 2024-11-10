import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import {FaMoon, FaSun} from 'react-icons/fa'
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const menu = (prev) => {
    setOpen((prev) => !prev);
  };
  const changeMenu = ()=>{
    setOpen(false)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="py-4 rounded-md shadow-md ">
      <div className="flex items-center justify-around gap-1">
        <Link to={'/'}>OSS DIR</Link>
        <div className="block md:hidden relative cursor-pointer" onClick={menu}>
          {open ? (
            <RxCross1 className="text-[1.7rem]" />
          ) : (
            <IoMenu className="text-[2rem] z-100" />
          )}
        </div>
        <div className="hidden md:flex items-center justify-between gap-[4rem]">
          <Link to={"/"}>Home</Link>
          <Link to={"/projects"}>Projects</Link>
          <button onClick={toggleDarkMode}>
            {darkMode ? (
              <FaSun className="text-yellow-600" />
            ) : (
              <FaMoon className="text-gray-700" />
            )}
          </button>
        </div>
        <div
          className={`${
            open ? "shadow-md top-[7%]" : "-top-[100%]"
          } absolute mt-2 left-0 flex items-center justify-between gap-[4rem] py-2 px-5  w-full rounded-md transition-all duration-300 ease-in-out md:hidden dark:bg-black shadow-md z-100`}
        >
          <div className=" flex items-center gap-4 flex-col">
            <Link to={"/"} onClick={changeMenu}>
              Home
            </Link>
            <Link to={"/projects"} onClick={changeMenu}>
              Projects
            </Link>
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <FaSun className="text-yellow-600" onClick={changeMenu} />
              ) : (
                <FaMoon className="text-gray-700" onClick={changeMenu} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
