import React, { useState, useEffect } from "react";
import { getUsers, grantAdmin } from "../actions/admin.actions";
import NavBar from "../components/NavBar";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleGrantAdmin = async (username) => {
    const response = await grantAdmin(username);
    if (response.success) {
      setUsers(users.map(user => user.username === username ? { ...user, roles: 'Admin' } : user));
    } else {
      setError("Failed to grant admin role.");
    }
  };

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
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Grant Admin to Users</h1>
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">User List</h2>
          <ul>
            {users.map(user => (
              <li key={user.user_id} className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xl font-semibold text-blue-900">{user.username}</p>
                  <p className="text-gray-700">{user.email}</p>
                  <p className="text-gray-700">Role: {user.roles}</p>
                </div>
                {user.roles !== 'Admin' && (
                  <button
                    onClick={() => handleGrantAdmin(user.username)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Grant Admin
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;