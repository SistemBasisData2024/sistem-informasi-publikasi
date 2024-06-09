import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchKonten,
  fetchNotes,
  addNotes,
  fetchTahap,
} from "../actions/konten.actions";
import { getUserRole, approve, deleteKonten } from "../actions/admin.actions";

import NavBar from "../components/NavBar";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const Detail = () => {
  const [tahapName, setTahapName] = useState("");
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    konten_id: "",
    tahap_id: "",
    notes: "",
  });
  const { konten_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchKonten(konten_id);
      setData(result.data);
      const notesResult = await fetchNotes({
        konten_id,
        tahap_id: result.data.tahap_id,
      });
      setNotes(notesResult.data);
    };

    const checkAdmin = async () => {
      const role = await getUserRole();
      console.log(role);
      setIsAdmin(role === "Admin");
    };

    fetchData();
    checkAdmin();
  }, [konten_id]);

  useEffect(() => {
    const fetchTahapName = async (tahapId, setter) => {
      try {
        const response = await fetchTahap();
        const tahapData = response.data;
        const foundTahap = tahapData.find((t) => t.id === tahapId);
        console.log("foundTahap:", foundTahap);
        const namaTahap = foundTahap ? foundTahap.nama_tahap : "";
        setter(namaTahap);
      } catch (error) {
        console.error("Failed to fetch tahap:", error);
      }
    };

    if (data.tahap_id) {
      fetchTahapName(data.tahap_id, setTahapName);
    }
  }, [data.tahap_id]);
  if (!data || !notes) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    setCurrentStepIndex(steps.indexOf(data.tahap_nama));
  }, [data.tahap_nama]);

  const steps = ["Quality Control", "Design", "Ready to Publish", "Published"];
  const formattedReqTime = formatDate(data.req_time);
  const formattedUpTime = formatDate(data.up_time);
  const [upDate, upTime] = formattedUpTime.split(" ");

  const handleCommentChange = (e) => {
    setFormData({ ...formData, notes: e.target.value });
  };

  const handleTambahCatatan = async () => {
    const formDataWithIds = {
      ...formData,
      konten_id: konten_id,
      tahap_id: data.tahap_id,
    };
    const response = await addNotes(formDataWithIds);
    if (response.success) {
      setNotes([
        ...notes,
        {
          note_id: response.data.note_id,
          note_date: new Date().toISOString(),
          notes: formData.notes,
        },
      ]);
      setFormData({ ...formData, notes: "" });
    } else {
      console.error("Failed to add notes:", response.error);
    }
  };

  const handleDelete = async (konten_id) => {
    const result = await deleteKonten(konten_id);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError("Failed to delete konten.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500 text-3xl text-blue-900 font-bold items-center justify-center">
        {error}
      </div>
    );
  }
  const handleApprove = async () => {
    const result = await approve(data.konten_id);
    if (result.success) {
      // Handle success, e.g., show a success message
      console.log("Content approved successfully!");
      window.location.reload(); // Reload the page
    } else {
      // Handle failure, e.g., show an error message
      console.error("Failed to approve content:", result.error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500">
      <NavBar className="w-full" />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full flex justify-between items-center px-4 py-4">
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
        {/* <ul className="steps py-8 w-3/5">
          <li className="step step-info text-blue-900 font-medium">
            {data.tahap_nama}
          </li>
        </ul> */}
        <ul className="steps py-8 w-3/5">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`step ${
                index <= currentStepIndex ? "step-info" : ""
              } text-blue-900 font-medium`}
            >
              {step}
            </li>
          ))}
        </ul>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
          {/* Data Pemesanan */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              DATA PEMESANAN
            </h2>
            <p className="text-gray-700 font-semibold">TANGGAL PEMESANAN</p>
            <p className="mb-4">{formattedReqTime}</p>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">NOTES</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-300 mt-4 overflow-y-auto h-96">
              {notes.map((note) => (
                <div key={note.note_id} className="mb-2">
                  <p className="text-gray-700">
                    {formatDate(note.note_date)} - {note.notes}
                  </p>
                </div>
              ))}
            </div>
            <textarea
              placeholder="Add a comment..."
              className="w-full h-32 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 mt-4 resize-y"
              value={formData.notes}
              onChange={handleCommentChange}
            />
            <button
              onClick={handleTambahCatatan}
              className="w-full bg-blue-500 text-white py-2 rounded mt-4"
            >
              Tambah Catatan
            </button>
          </div>
          {}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              DETAIL PESANAN
            </h2>
            <p className="text-gray-700 font-semibold">INSIDENTAL</p>
            <p className="mb-4">{data.insidental ? "Yes" : "No"}</p>
            <p className="text-gray-700 font-semibold">TANGGAL PUBLIKASI</p>
            <p className="mb-4">{upDate}</p>
            <p className="text-gray-700 font-semibold">WAKTU Publikasi</p>
            <p className="mb-4">{upTime}</p>
            <p className="text-gray-700 font-semibold">KANAL PUBLIKASI</p>
            <p className="mb-4">{data.kanal}</p>
            <p className="text-gray-700 font-semibold">MEDIA PUBLIKASI</p>
            <img
              src={data.file_path}
              alt="Publication Image"
              className="mt-4 max-w-full h-auto"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>

        {isAdmin && (
          <div className="">
            <button
              onClick={() => handleApprove(data.konten_id)}
              className="bg-blue-500 text-white py-2 px-6 rounded mt-6 mb-6"
            >
              {data.tahap_nama === "Published"
                ? "Konten sudah Published"
                : `Selesai ${tahapName}`}
            </button>
          </div>
        )}
      </div>{" "}
      {/* Display notes here */}
    </div>
  );
};

export default Detail;
