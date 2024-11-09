const Button = ({ children, onClick }) => {
  return (
    <div
      className="px-[0.6rem] w-[80%] cursor-pointer hover:scale-105 py-[0.8rem] font-semibold bg-white mx-2 border  rounded-md transition duration-200 text-2rem lg:text-[1.3rem] md:text-[1rem] dark:text-black"
      onClick={onClick} // Event handler for button clicks
    >
      {children}
      {/* // Render the content passed between the opening and closing
      tags of the Button component */}
    </div>
  );
};

export default Button; // Export the Button component for use in other parts of the application
