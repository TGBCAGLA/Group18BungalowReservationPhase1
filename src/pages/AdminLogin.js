import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      navigate("/admin-dashboard");
    } else {
      setError("Invalid username or password!");
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 w-80 text-center border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 border-b pb-2">Admin Login</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={handleInputChange(setUsername)}
            className="p-2 rounded w-full bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            className="p-2 rounded w-full bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleLogin}
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition w-full mt-2"
          >
            Login
          </button>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition w-full mt-2"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
