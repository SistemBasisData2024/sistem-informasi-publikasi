import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../actions/user.actions";
import { fetchMembers, fetchKonten } from "../actions/divisi.actions";
import NavBar from "../components/NavBar";
import DashCards from "../components/DashCards";  // Ensure this import is here

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await getUser();
        if (userResponse.data) {
          setUserData(userResponse.data);
        } else {
          setError("Failed to fetch user data");
        }

        // Fetch konten data
        const kontenResponse = await fetchKonten();
        if (kontenResponse.success) {
          setData(kontenResponse.data);
        } else {
          setError("Failed to fetch konten data");
        }

        // Fetch members
        const divisiMembers = await fetchMembers();
        if (divisiMembers) {
          setMembers(
            Object.values(divisiMembers)
              .map((member) => String(member.username))
              .join("<br>")
          );
        } else {
          setError("Failed to fetch members");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500 items-center justify-center">
        <span className="items-center justify-center loading loading-spinner loading-lg text-blue-800"></span>
        <div className="to-blue-500 text-3xl text-blue-900 font-bold">
          Loading...
        </div>
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
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <aside className="glass p-4 w-full md:w-1/4 lg:w-1/5 shadow-lg rounded-lg m-4 flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Dashboard Akun</h2>
          <p className="font-semibold text-blue-700 mb-4">
            Username: <b>{[userData.username]}</b>{" "}
          </p>
          <p className="font-semibold text-blue-700 mb-4">
            Divisi: <b> {[userData.name]} </b>{" "}
          </p>
          <p className="font-semibold text-blue-700 mb-4">Akun di Divisi yang sama:</p>
          <p className="font-semibold text-blue-700 mb-4" dangerouslySetInnerHTML={{ __html: members }} />
          <button className="w-full bg-red-500 text-white mt-4 py-2 rounded mb-4">Logout</button>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4">
          <h2 className="text-4xl text-blue-900 font-bold mb-8 py-4">Publikasi Pemohon</h2>
          <div className="mb-4 flex items-center">
            <div className="relative flex-grow mr-2">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 px-4 rounded border border-gray-100 bg-transparent text-white"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 absolute right-3 top-3 text-gray-100"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <select className="py-2 px-4 border border-gray-100 rounded bg-transparent text-white">
              <option value="all" className="bg-blue-500">Status</option>
              <option value="quality_control" className="bg-blue-500">Quality Control</option>
              <option value="design" className="bg-blue-500">Design</option>
              <option value="last_check" className="bg-blue-500">Last Check</option>
              <option value="ready_to_publish" className="bg-blue-500">Ready to Publish</option>
              <option value="published" className="bg-blue-500">Published</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.map((item) => (
              <DashCards
                key={item.konten_id}
                title={item.title}
                status={item.nama_tahap}
                orderedBy={item.requester_id}
                time={item.req_time}
                kontenId={item.konten_id}  // Pass kontenId
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
