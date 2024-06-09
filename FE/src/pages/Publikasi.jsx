import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Publikasi = () => {
    const navigate = useNavigate();

    const navigateToRequest = () => {
        navigate("/request");
    };

    return (
        <div className="min-h-screen flex flex-col bg-blue-800">
            <NavBar className="w-full" />
            <div className="flex-grow flex flex-col items-center">
                {/* SearchBar */}
                <div className="flex flex-col items-center bg-blue-800 text-blue-100 py-8 px-4 w-full">
                    <h2 className="text-3xl font-bold mb-4">
                        Temukan kemudahan dalam memesan dan melacak publikasi
                    </h2>
                    <div className="flex items-center border border-blue-100 rounded p-2 gap-8 w-1/2">
                        <input
                            type="text"
                            placeholder='Temukan Pesanan Publikasi (Ex. "publikasi-mulmed-bem_ui-1")'
                            className="bg-blue-800 text-blue-100 placeholder-blue-100 outline-none p-2 w-full"
                        />
                        <button className="ml-2 bg-blue-100 text-blue-800 px-4 py-2 rounded">
                            Cari
                        </button>
                    </div>
                </div>
                <div className="bg-blue-100 py-8 px-4 w-full">
                    <h3 className="text-center text-2xl font-bold text-blue-900 mb-4">
                        Pesan publikasi dalam 3 langkah
                    </h3>
                    <div className="flex justify-center space-x-8">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-2 bg-blue-800 rounded-full flex items-center justify-center">
                                <span className="text-white text-lg">1</span>
                            </div>
                            <p className="text-blue-900 font-bold">Buka web SIT</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-2 bg-blue-800 rounded-full flex items-center justify-center">
                                <span className="text-white text-lg">2</span>
                            </div>
                            <p className="text-blue-900 font-bold">Isi form</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-2 bg-blue-800 rounded-full flex items-center justify-center">
                                <span className="text-white text-lg">3</span>
                            </div>
                            <p className="text-blue-900 font-bold">Tunggu pesanan</p>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-800 py-8 px-4 w-full flex justify-center">
                    <button onClick={navigateToRequest} className="bg-blue-100 text-blue-800 px-6 py-3 rounded text-lg font-bold">
                        Pesan Publikasi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Publikasi;
