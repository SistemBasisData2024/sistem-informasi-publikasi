import React from "react";
import GroupSvg from "../assets/Group.svg";

const LandingPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-blue-900">
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <div className="flex items-center mb-4">
          <div className="text-left">
            <h1 className="text-5xl font-extrabold mr-4">
              Get Your Publication Done By Using SIP
            </h1>
            <p className="text-xl mb-8">
              Temukan Kemudahan dalam mengajukan permohonan terkait publikasi,
              di sini.
            </p>
          </div>
          <img src={GroupSvg} alt="Document Icon" className="w-1/4" />
        </div>
        <button className="bg-green-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:bg-green-400 transition">
          MULAI
        </button>
      </main>
      <footer className="w-full p-4 text-center">
        <p>&copy; SIP 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
