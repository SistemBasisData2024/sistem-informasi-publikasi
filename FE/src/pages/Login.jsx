import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/user.actions';

const Login = () => {
    const [formData, setFormData] = useState({
        username:"",
        password:""
    });
    const[message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        const { name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.username || !formData.password) {
            setMessage("All fields are required: username, password");
            return;
        }
        const result = await login(formData);
        if (result.success) {
            setMessage("Login successful!");
            navigate("/home")
        } else {
            console.log(`${result.success}`);
            setMessage("Login failed. Please try again.");
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-500">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl text-blue-900 font-bold text-center mb-8">
                    Welcome to SIP
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-blue-900">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-blue-900 focus:outline-none focus:border-blue-500"
                            value={formData.username}
                            onChange={handleLogin}
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-blue-900">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-blue-900 focus:outline-none focus:border-blue-500"
                            value={formData.password}
                            onChange={handleLogin}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </form>
                {message && (
                    <div className="mt-4 text-blue-900 text-center">
                        <p>{message}</p>
                    </div>
                )}
                <div className="mt-4 text-blue-900 text-center">
                    <p>
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;