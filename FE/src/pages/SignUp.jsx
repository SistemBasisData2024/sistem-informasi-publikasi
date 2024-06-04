import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../actions/user.actions";
import { fetchDivisi } from "../actions/divisi.actions";
import Dropdown from "../components/Dropdown";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    divisi: "",
  });
  const [message, setMessage] = useState("");
  const [divisiList, setDivisiList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDivisi = async () => {
      try {
        const response = await fetchDivisi();
        setDivisiList(response);
      } catch (error) {
        console.error("Failed to fetch divisi", error);
      }
    };

    getDivisi();
  }, []);

  const handleSignUp = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDivisiSelect = (divisi) => {
    console.log(divisi);
    setFormData((prevFormData) => ({
      ...prevFormData,
      divisi: divisi.name,
    }));
    
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.divisi) {
      setMessage("All fields are required: username, email, password, divisi");
      return;
    }
    const result = await signUp(formData);
    if (result.success) {
      setMessage("Sign Up successful!");
      navigate("/login");
    } else {
      setMessage("Sign Up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-500">
      <div className="max-w-md w-full glass p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl text-blue-900 font-bold text-center mb-8">
          Sign Up for SIP
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-blue-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="bg-gray-100 text-blue-900 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400 w-full"
              value={formData.username}
              onChange={handleSignUp}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="bg-gray-100 text-blue-900 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400 w-full"
              value={formData.email}
              onChange={handleSignUp}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="divisi" className="block text-blue-900">
              Divisi
            </label>
            <Dropdown
              items={divisiList}
              onSelect={handleDivisiSelect}
              selected={divisiList.find(item => item.id === formData.divisi)} 
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-blue-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-100 text-blue-900 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400 w-full"
              value={formData.password}
              onChange={handleSignUp}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
        {message && (
          <div className="mt-4 text-blue-900 text-center">
            <p>{message}</p>
          </div>
        )}
        <div className="mt-4 text-blue-900 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
