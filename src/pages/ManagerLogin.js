import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagerLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "Tugba" && password === "2026") {
      navigate("/manager-dashboard"); 
    } else {
      setError("Invalid username or password!");
    }
  };

  
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(""); // Hata mesajını temizle
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Manager Login</h1>
      <input
        type="text"
        placeholder="Manager Username"
        value={username}
        onChange={handleInputChange(setUsername)}
        className="p-2 mb-4 rounded w-64 bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange(setPassword)}
        className="p-2 mb-4 rounded w-64 bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex space-x-4">
        <button
          onClick={handleLogin}
          className="bg-green-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ManagerLogin;
