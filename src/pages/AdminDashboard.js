import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const AdminDashboard = () => {
  const navigate = useNavigate(); 

 
  const [bungalows, setBungalows] = useState([
    {
      id: 1,
      name: "Family Bungalow",
      type: "Small Family",
      price: 120,
      units: Array(5).fill("Available"), 
    },
    {
      id: 2,
      name: "Big Family Bungalow",
      type: "Large Family",
      price: 180,
      units: Array(5).fill("Available"),
    },
    {
      id: 3,
      name: "Luxury Bungalow",
      type: "Luxury",
      price: 250,
      units: Array(5).fill("Available"),
    },
  ]);

  //rezervasyon durumunu değiştir
  const toggleReservation = (bungalowId, unitIndex) => {
    setBungalows((prevBungalows) =>
      prevBungalows.map((bungalow) =>
        bungalow.id === bungalowId
          ? {
              ...bungalow,
              units: bungalow.units.map((unit, index) =>
                index === unitIndex ? (unit === "Available" ? "Reserved" : "Available") : unit
              ),
            }
          : bungalow
      )
    );
  };

  
  const handleLogout = () => {
    navigate("/admin-login"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="w-full flex justify-between items-center max-w-4xl">
        <h1 className="text-3xl font-bold">Have a nice day 🏡</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto w-full max-w-4xl mt-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Bungalow Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Price ($/night)</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Units</th>
            </tr>
          </thead>
          <tbody>
            {bungalows.map((bungalow) => (
              <tr key={bungalow.id} className="border-t">
                <td className="px-6 py-3">{bungalow.name}</td>
                <td className="px-6 py-3">{bungalow.type}</td>
                <td className="px-6 py-3">${bungalow.price}</td>
                <td className="px-6 py-3">
                  <div className="flex flex-wrap gap-2">
                    {bungalow.units.map((unit, index) => (
                      <button
                        key={index}
                        onClick={() => toggleReservation(bungalow.id, index)}
                        className={`px-3 py-1 rounded-lg text-white font-semibold transition ${
                          unit === "Available"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {unit === "Available" ? `Unit ${index + 1} - Reserve` : `Unit ${index + 1} - Available`}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
