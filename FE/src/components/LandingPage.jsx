import React from "react";
import { Link } from "react-router-dom";
import SIPSvg from "../assets/SIPlogowithout.svg";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 to-blue-500 text-blue-900">
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <div className="flex items-center justify-between w-full max-w-7xl mb-8 gap-16">
          <div className="text-left max-w-lg mt-16">
            <h1 className="text-5xl font-extrabold mb-4">Get Your Publication Done By Using SIP</h1>
            <p className="text-xl mb-8 pt-8">
              Temukan Kemudahan dalam mengajukan permohonan terkait publikasi,
              <strong> di sini</strong>.
            </p>
          </div>
          <img src={SIPSvg} alt="Document Icon" className="w-1/2" />
        </div>
        <Link to="/login">
          <button className="bg-blue-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:bg-blue-500 transition mt-8">
            MULAI
          </button>
        </Link>
      </main>
      <footer className="w-full p-4 text-center">
        <p>&copy; SIP 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
