import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { request } from "../actions/konten.actions";

const Request = () => {
  const [formData, setFormData] = useState({
    title: "",
    up_time: "",
    insidental: false,
    kanal: "",
    notes: "",
    file_path: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRequest = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBadgeClick = (kanal) => {
    setFormData({
      ...formData,
      kanal,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.up_time || formData.insidental === "" || !formData.kanal || !formData.file_path) {
        setMessage("All starred fields are required.");
        return;
      }

      const response = await request(formData);
      if (response.data.success) {
        setMessage("Request submission successful!");
        navigate("/dashboard");
      } else {
        setMessage("Request submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred. Please try again.');
    }
  };

  const badges = [
    { label: 'IG Feed', className: 'btn btn-outline' },
    { label: 'IG Story', className: 'btn btn-outline' },
    { label: 'TikTok', className: 'btn btn-outline' },
    { label: 'Twitter/X', className: 'btn btn-outline' },
    { label: 'Line OA', className: 'btn btn-outline' },
    { label: 'YouTube', className: 'btn btn-outline' },
    { label: 'LinkedIn', className: 'btn btn-outline' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-blue-300">
      <NavBar />
      <div className="container mx-auto p-8 bg-gradient-to-r from-blue-800 to-blue-800">
        <h2 className="text-3xl text-white font-bold mb-8">Buat Permintaan Publikasi</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Judul Konten *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleRequest}
              className="w-full p-2 border border-white-900 rounded bg-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Tanggal dan Waktu Publikasi *</label>
            <input
              type="datetime-local"
              name="up_time"
              value={formData.up_time}
              onChange={handleRequest}
              className="w-full p-2 border border-white-900 rounded bg-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Insidental *</label>
            <div>
              <label className="mr-2 text-white">
                <input
                  type="radio"
                  name="insidental"
                  value={true}
                  checked={formData.insidental === true}
                  onChange={() => setFormData({ ...formData, insidental: true })}
                  className="mr-1"
                />
                Ya
              </label>
              <label className="mr-2 text-white">
                <input
                  type="radio"
                  name="insidental"
                  value={false}
                  checked={formData.insidental === false}
                  onChange={() => setFormData({ ...formData, insidental: false })}
                  className="mr-1"
                />
                Tidak
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Tautan Konten *</label>
            <input
              type="text"
              name="file_path"
              value={formData.file_path}
              onChange={handleRequest}
              className="w-full p-2 border border-white-900 rounded bg-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Kanal Publikasi *</label>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <button
                  type="button"
                  key={badge.label}
                  className={`${badge.className} ${formData.kanal === badge.label ? 'btn-active' : ''}`}
                  onClick={() => handleBadgeClick(badge.label)}
                >
                  {badge.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Tambah Catatan</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleRequest}
              className="w-full p-2 border border-white-900 rounded bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-red-500 text-white py-2 mt-8">
            Request Publikasi
          </button>
        </form>
        {message && (
          <div className="mt-4 text-white text-center">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
