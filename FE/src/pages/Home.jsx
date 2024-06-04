import React from "react";
import NavBar from "../components/NavBar";
import Cards from "../components/Cards";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500">
      <NavBar className="w-full" />
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold mb-24 text-blue-800 text-center">
          Mulai Gunakan SIP Untuk Keperluan Publikasi!
        </h1>
        <div className="flex flex-col sm:flex-row gap-20 justify-center items-center">
          <Cards
            title="Publikasi"
            desc="Lakukan request publikasi ke kanal informasi!"
            url="/publikasi"
          />
          <Cards
            title="Dashboard"
            desc="Ingin mengetahui publikasi yang telah kamu pesan?"
            url="/dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
