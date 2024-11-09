const SearchBar = ({
  value, // Current value of the input
  onChange, // Function to handle changes to the input
  placeholder = "Search...", // Default placeholder text for the input
  className = "", // Additional CSS classes to apply to the input
}) => {
  return (
    <div className="searchBar">
      {" "}
      {/* Wrapper div for the search bar */}
      <input
        type="text" // Input type is text for search functionality
        value={value} // Controlled component: bind input value to the state
        onChange={onChange} // Call onChange function when the input value changes
        placeholder={placeholder} // Set placeholder text for the input
        className={`border bg-[#f7fafc] border-gray-200 border-solid mt-[0.4rem] inline-block w-[120%] md:w-[150%] outline-none rounded-[1.3rem] mb-[0.9rem] text-left py-[0.7rem] px-[1.05rem] transition-all
             focus:bg-transparent focus:border focus:border-gray-400 duration-75 ease-in-out ${className}`} // Apply styles and additional classes
      />
    </div>
  );
};

export default SearchBar; // Export the SearchBar component for use in other parts of the application
