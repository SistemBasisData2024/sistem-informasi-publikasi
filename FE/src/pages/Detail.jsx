import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Detail = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500">
      <NavBar className="w-full" />
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Judul Publikasi</h1> {/* Judul di fetch */}
        <h2 className="text-xl text-blue-900 mb-4 font-semibold">Biro Multimedia</h2> {/* Divisi di fetch */}
        <ul className="steps py-8 w-3/5">
          <li className="step step-info text-blue-900 font-medium">Quality Control</li> {/* highlight step pake step-info*/}
          <li className="step text-blue-900 font-medium">Design</li>
          <li className="step text-blue-900 font-medium">Ready to Publish</li>
          <li className="step text-blue-900 font-medium">Published</li>
        </ul>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
          {/* Data Pemesanan */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              DATA PEMESANAN
            </h2>
            {/* <p className="text-gray-700 font-semibold">PEMESAN</p>
            <p className="mb-4">{data.pemesanan}</p>
            <p className="text-gray-700 font-semibold">TANGGAL/WAKTU PEMESANAN</p>
            <p className="mb-4">{data.tanggalPemesanan}</p>
            <textarea
              className="w-full h-40 p-2 border border-purple-400 rounded mb-4"
              placeholder="Tambah Catatan"
              readOnly
              value={data.catatan}
            /> */}
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              Tambah Catatan
            </button>
          </div>
          {/* Detail Pesanan */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              DETAIL PESANAN
            </h2>
            <p className="text-gray-700 font-semibold">TANGGAL PUBLIKASI</p>
            {/* <p className="mb-4">{data.tanggalPublikasi}</p>
      me              DETAIL PESANANUB            </h2>p className="mb-4">{data.waktuPublikasi}</p>
            <p className="text-gray-700 font-semibold">INSIDENTAL</p>
            <p className="mb-4">{data.insidental}</p>
            <p className="text-gray-700 font-semibold">BUKTI INSIDENTAL</p>
            <a href={data.buktiInsidental} className="text-blue-500 mb-4 block" target="_blank" rel="noopener noreferrer">{data.buktiInsidental}</a>
            <p className="text-gray-700 font-semibold">BAHAN PUBLIKASI</p>
            <a href={data.bahanPublikasi} className="text-blue-500 mb-4 block" target="_blank" rel="noopener noreferrer">{data.bahanPublikasi}</a>
            <p className="text-gray-700 font-semibold">KANAL PUBLIKASI</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.kanalPublikasi.map((kanal, index) => (
                <span key={index} className="bg-blue-700 text-white px-4 py-1 rounded-full">{kanal}</span>
              ))}
            </div> */}
          </div>
        </div>
        <button className="bg-blue-500 text-white py-2 px-6 rounded mt-6">
          Selesai Quality Control
        </button>
      </div>
    </div>
  );
};

export default Detail;
