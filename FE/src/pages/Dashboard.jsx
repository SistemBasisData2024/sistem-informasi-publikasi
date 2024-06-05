import React, { useEffect, useState } from "react";
import { getKonten } from "../actions/user.actions";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getKonten();
        if (response.data) {
          setData(response.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500">
      <NavBar className="w-full" />
      <div className="flex">
        <main className="flex-1 p-4 bg-brown-100">
          <h2 className="text-3xl text-blue-900 font-bold mb-8">Dashboard</h2>
          <div className="mb-4 flex justify-between">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-4 h-4 opacity-30"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            <select className="p-2 border border-gray-300 rounded">
              <option value="all">Status</option>
              <option value="quality_control">Quality Control</option>
              <option value="design">Design</option>
              <option value="last_check">Last Check</option>
              <option value="ready_to_publish">Ready to Publish</option>
              <option value="published">Published</option>
            </select>
          </div>
          {data.map((item) => (
            <div key={item.konten_id} className="mb-4 p-4 bg-white shadow-lg">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p>Status: {item.tahap_id}</p>
              <p>Dipesan Oleh: {item.requester_id}</p>
              <p>{item.req_time}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
