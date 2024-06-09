import React from "react";
import { useNavigate } from "react-router-dom";

const DashCards = ({ title, status, orderedBy, time, kontenId }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${kontenId}`);
  };

  return (
    <div onClick={handleCardClick} className="bg-blue-800 text-white rounded-lg p-4 mb-4 cursor-pointer">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="font-semibold">Status: <span className="font-bold">{status}</span></p>
      <p className="mt-2">Dipesan Oleh: <span className="font-bold">{orderedBy}</span></p>
      <p className="mt-2">{time}</p>
    </div>
  );
};

export default DashCards;
