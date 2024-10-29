const Button = ({ children, onClick }) => {
  return (
    <div
      className="px-[0.6rem] cursor-pointer hover:translate-y-5 py-[0.8rem] font-semibold bg-white text-blue-500  rounded-md transition duration-200 text-2rem lg:text-[1.3rem] md:text-[1rem]"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
