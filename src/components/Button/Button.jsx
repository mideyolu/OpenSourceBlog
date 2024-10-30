const Button = ({ children, onClick }) => {
  return (
    <div
      className="px-[0.6rem] w-[100%] cursor-pointer hover:scale-105 py-[0.8rem] font-semibold bg-white text-blue-500  rounded-md transition duration-200 text-2rem lg:text-[1.3rem] md:text-[1rem]"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
