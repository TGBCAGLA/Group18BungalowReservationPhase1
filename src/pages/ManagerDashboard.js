import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/manager-login");
  };

  const pastReservations = [
    { id: 1, name: "Ahmet", surname: "Yılmaz", email: "ahmet@gmail.com", phone: "5556259685", tckn: "12345678901", bungalowType: "Family" },
    { id: 2, name: "Fatma", surname: "Demir", email: "fatma@hotmail.com", phone: "5552345265", tckn: "23456789012", bungalowType: "Big family" },
    { id: 3, name: "Ali", surname: "Tekmez", email: "ali@gmail.com", phone: "5553456784", tckn: "34567890123", bungalowType: "Luxury" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Welcome 🎉</h1>
     
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Past Reservations List
      </h2>

      <div className="overflow-x-auto w-full max-w-4xl mb-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Surname</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Phone Number</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">TCKN</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Bungalow Type</th>
            </tr>
          </thead>
          <tbody>
            {pastReservations.map((customer) => (
              <tr key={customer.id} className="border-t">
                <td className="px-6 py-3">{customer.id}</td>
                <td className="px-6 py-3">{customer.name}</td>
                <td className="px-6 py-3">{customer.surname}</td>
                <td className="px-6 py-3">{customer.email}</td>
                <td className="px-6 py-3">{customer.phone}</td>
                <td className="px-6 py-3">{customer.tckn}</td>
                <td className="px-6 py-3">{customer.bungalowType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-lg text-lg font-semibold text-white hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ManagerDashboard;
