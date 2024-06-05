import React from "react";
import NavBar from "../components/NavBar";
import Cards from "../components/Cards";
import DashIcon from "../assets/DashboardIcon.svg";
import PublikasiIcon from "../assets/PublikasiIcon.svg";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500 relative">
      <NavBar className="w-full" />
      {/* <div className="absolute inset-0">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#3787DA"
            fillOpacity="1"
            d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,197.3C672,213,768,203,864,176C960,149,1056,107,1152,112C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div> */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10">
        <h1 className="text-5xl font-extrabold py-8 text-blue-800 text-center">
          Mulai Gunakan SIP Untuk Keperluan Publikasi!
        </h1>
        <div className="flex flex-col sm:flex-row gap-20 justify-center items-center">
          <Cards
            title="Publikasi"
            desc="Lakukan request publikasi ke kanal informasi!"
            url="/publikasi"
            imgSrc={PublikasiIcon}
          />
          <Cards
            title="Dashboard"
            desc="Ingin mengetahui publikasi yang telah kamu pesan?"
            url="/dashboard"
            imgSrc={DashIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
