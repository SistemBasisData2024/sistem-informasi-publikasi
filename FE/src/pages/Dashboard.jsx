import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../actions/user.actions";
import { fetchMembers, fetchKonten } from "../actions/divisi.actions";
import { getUserRole, getAllKonten } from "../actions/admin.actions";
import { fetchTahap } from "../actions/konten.actions";
import NavBar from "../components/NavBar";
import DashCards from "../components/DashCards";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const [members, setMembers] = useState([]);
  const [tahapMapping, setTahapMapping] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await getUser();
        if (userResponse.data) {
          setUserData(userResponse.data);

          // Fetch members
          const divisiMembers = await fetchMembers();
          if (divisiMembers) {
            const userMap = divisiMembers.reduce((acc, member) => {
              acc[member.user_id] = member.username;
              return acc;
            }, {});


            const filteredMembers = Object.values(divisiMembers)
              .filter(
                (member) => member.username !== userResponse.data.username
              ) // Filter out current user
              .map((member) => String(member.username))
              .join("<br>");
            setMembers(filteredMembers);
          } else {
            setError("Failed to fetch members");
          }

        const role = await getUserRole();
        if (role === "Admin") {
          // Fetch all konten for admin
          const kontenResponse = await getAllKonten();
          if (kontenResponse.success) {
            setData(kontenResponse.data);
          } else {
            setError("Failed to fetch konten data for admin");
          }
        } else {
          // Fetch konten data for regular user
          const kontenResponse = await fetchKonten();
          if (kontenResponse.success) {
            setData(kontenResponse.data);
          } else {
            setError("Failed to fetch konten data");
          }
        }
          // Fetch konten data
          // const kontenResponse = await fetchKonten();
          // if (kontenResponse.success) {
          //   if (kontenResponse.data) {
          //     setData(kontenResponse.data);
          //   } else {
          //     setData([]);
          //     setError("No konten available");
          //   }
          // } else {
          //   setError("Failed to fetch konten data");
          // }

          // Fetch tahap data
          const tahapResponse = await fetchTahap();
          if (tahapResponse.success) {
            const tahapMap = tahapResponse.data.reduce((acc, tahap) => {
              acc[tahap.id] = tahap.nama_tahap;
              return acc;
            }, {});
            setTahapMapping(tahapMap);
          } else {
            setError("Failed to fetch tahap data");
          }
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
    
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      navigate("/"); 
    } catch (error) {
      setError("Failed to logout");
    }
  };

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
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Dashboard Akun
          </h2>
          <p className="font-semibold text-blue-700 mb-4">
            Username: <b>{userData.username}</b>
          </p>
          <p className="font-semibold text-blue-700 mb-4">
            Divisi: <b>{userData.name}</b>
          </p>
          <p className="font-semibold text-blue-700 mb-4">
            Akun di Divisi yang sama:
          </p>
          <p
            className="font-semibold text-blue-700 mb-4"
            dangerouslySetInnerHTML={{ __html: members }}
          />
          <button 
            className="w-full bg-red-500 text-white mt-4 py-2 rounded mb-4"
            onClick={handleLogout}>
            Logout
          </button>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4">
          <h2 className="text-4xl text-blue-900 font-bold mb-8 py-4">
            Publikasi Pemohon
          </h2>
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
            <select className="py-2 px-4 border border-gray-100 rounded bg-transparent text-white"
              onChange={(e) => setSelectedStatus(e.target.value)}
              value={selectedStatus}>
              <option value="all" className="bg-blue-500">
                Status
              </option>
              <option value="quality_control" className="bg-blue-500">
                Quality Control
              </option>
              <option value="design" className="bg-blue-500">
                Design
              </option>
              <option value="last_check" className="bg-blue-500">
                Last Check
              </option>
              <option value="ready_to_publish" className="bg-blue-500">
                Ready to Publish
              </option>
              <option value="published" className="bg-blue-500">
                Published
              </option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.length > 0 ? (
              data.map((item) => (
                <DashCards
                  key={item.konten_id}
                  title={item.title}
                  status={tahapMapping[item.tahap_id]}
                  orderedBy={item.requester_id}
                  time={formatDate(item.req_time)}
                  konten_id={item.konten_id}
                />
              ))
            ) : (
              <div className="text-center text-xl text-blue-900 font-semibold">
                Belum ada Konten yang Di Request
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
