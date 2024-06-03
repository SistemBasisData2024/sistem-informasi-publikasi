import React, { useState } from "react";

const Dropdown = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHover = () => {
    setIsOpen(true);
  };

  const handleLeave = () => {
    setIsOpen(false);
  };

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div
      className="dropdown dropdown-hover relative"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <button
        tabIndex={0}
        className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400 w-full flex justify-between items-center"
      >
        <span className="mr-2">Select Divisi</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${
            isOpen ? "-rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 1 .707 1.707l-3.707 3.707a1 1 0 0 1-1.414-1.414L8.586 13H4a1 1 0 1 1 0-2h4.586l-1.293-1.293a1 1 0 1 1 1.414-1.414l3.707 3.707A1 1 0 0 1 10 12z"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 top-full left-0 w-full bg-gray-100 border border-gray-300 rounded-b-lg shadow-lg">
          {Array.isArray(items) &&
            items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleSelect(item)}
                  className="block w-full px-4 py-2 text-gray-900 hover:bg-gray-200 focus:outline-none"
                >
                  {item.name}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
