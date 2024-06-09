import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { fetchKontenDetails } from "../actions/divisi.actions";
import { getUserRole, deleteKonten } from "../actions/admin.actions";

function Details() {
  const { kontenId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchKontenDetails(kontenId);
      if (result.success) {
        setData(result.data);
      } else {
        setError("Failed to fetch konten details.");
      }
      setLoading(false);
    };

    const checkAdmin = async () => {
      const role = await getUserRole();
      setIsAdmin(role === "Admin");
    };

    getData();
    checkAdmin();
  }, [kontenId]);

  const handleDelete = async () => {
    const result = await deleteKonten(kontenId);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError("Failed to delete konten.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-800"></span>
        <div className="text-3xl text-blue-900 font-bold ">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500 text-3xl text-blue-900 font-bold items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500">
      <NavBar className="w-full" />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full flex justify-between items-center px-4 py-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Kembali
          </button>
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          )}
        </div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{data.title}</h1>
        <h2 className="text-xl text-blue-900 mb-4 font-semibold">
          {data.requester_username}
        </h2>
        <ul className="steps py-8 w-3/5">
          <li
            className={`step ${
              data.tahap_nama === "Quality Control" ? "step-info" : ""
            } text-blue-900 font-medium`}
          >
            Quality Control
          </li>
          <li
            className={`step ${
              data.tahap_nama === "Design" ? "step-info" : ""
            } text-blue-900 font-medium`}
          >
            Design
          </li>
          <li
            className={`step ${
              data.tahap_nama === "Ready to Publish" ? "step-info" : ""
            } text-blue-900 font-medium`}
          >
            Ready to Publish
          </li>
          <li
            className={`step ${
              data.tahap_nama === "Published" ? "step-info" : ""
            } text-blue-900 font-medium`}
          >
            Published
          </li>
        </ul>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              DATA PEMESANAN
            </h2>
            <p className="text-gray-700 font-semibold">PEMESAN</p>
            <p className="mb-4">{data.requester_username}</p>
            <p className="text-gray-700 font-semibold">
              TANGGAL/WAKTU PEMESANAN
            </p>
            <p className="mb-4">{new Date(data.req_time).toLocaleString()}</p>
            <textarea
              className="w-full h-40 p-2 border border-purple-400 rounded mb-4"
              placeholder="Tambah Catatan"
              readOnly
              value={data.notes || ""}
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              Tambah Catatan
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              DETAIL PESANAN
            </h2>
            <p className="text-gray-700 font-semibold">TANGGAL PUBLIKASI</p>
            <p className="mb-4">{new Date(data.up_time).toLocaleString()}</p>
            <p className="text-gray-700 font-semibold">INSIDENTAL</p>
            <p className="mb-4">{data.insidental ? "Yes" : "No"}</p>
            <p className="text-gray-700 font-semibold">BUKTI INSIDENTAL</p>
            <a
              href={data.file_path}
              className="text-blue-500 mb-4 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.file_path}
            </a>
            <p className="text-gray-700 font-semibold">KANAL PUBLIKASI</p>
            <span className="bg-blue-700 text-white px-4 py-1 rounded-full">
              {data.kanal}
            </span>
          </div>
        </div>
        <button className="bg-blue-500 text-white py-2 px-6 rounded mt-6">
          Selesai Quality Control
        </button>
      </div>
    </div>
  );
}

export default Details;
