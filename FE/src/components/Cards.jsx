import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ title, desc, url }) => {
  return (
    <div className="card w-full sm:w-80 bg-white shadow-lg rounded-lg overflow-hidden">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{desc}</p>
        </div>
        <div className="text-right mt-auto">
          <Link to={url}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Telusuri
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
