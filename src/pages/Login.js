import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
      
        <p className="text-sm text-gray-300 mb-4">
         This page is for employee logins only. 
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/admin-login")}
            className="bg-green-500 w-full px-4 py-2 rounded-lg text-md font-semibold hover:bg-blue-600 transition"
          >
            Admin Login
          </button>
          <button
            onClick={() => navigate("/manager-login")}
            className="bg-green-500 w-full px-4 py-2 rounded-lg text-md font-semibold hover:bg-blue-600 transition"
          >
            Manager Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
