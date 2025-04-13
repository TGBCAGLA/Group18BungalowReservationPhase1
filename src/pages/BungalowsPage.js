import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const BungalowsPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-4xl font-bold text-center mb-6">Bungalows</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        Explore our beautiful bungalows for a perfect stay.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* bungalov 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <Link to="/bungalows/1">
            <img
              src="/assets/small1.jpg"
              alt="Bungalow 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
              style={{ objectFit: "cover", height: "200px", width: "100%" }}
            />
          </Link>
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold mb-2">Family Bungalow</h2>
            <p className="text-gray-600 mb-4">
              A cozy and peaceful bungalow perfect for small families.
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-4">$120/night</p>
          </div>
          <Link 
            to={user ? `/reservation/1` : "/login"} 
            state={{ 
              fromBungalows: true, 
              bungalowId: 1,
              redirectTo: "/profile"
            }}
          >
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
              Book Now
            </button>
          </Link>
        </div>

        {/* bungalov 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <Link to="/bungalows/2">
            <img
              src="/assets/big_family.jpg"
              alt="Bungalow 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
              style={{ objectFit: "cover", height: "200px", width: "100%" }}
            />
          </Link>
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold mb-2">Big Family Bungalow</h2>
            <p className="text-gray-600 mb-4">
              A spacious bungalow with beautiful views and great amenities.
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-4">$180/night</p>
          </div>
          <Link 
            to={user ? `/reservation/2` : "/login"} 
            state={{ 
              fromBungalows: true, 
              bungalowId: 2,
              redirectTo: "/profile"
            }}
          >
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
              Book Now
            </button>
          </Link>
        </div>

        {/* bungalov 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <Link to="/bungalows/3">
            <img
              src="/assets/lux.jpg"
              alt="Bungalow 3"
              className="w-full h-48 object-cover rounded-lg mb-4"
              style={{ objectFit: "cover", height: "200px", width: "100%" }}
            />
          </Link>
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold mb-2">Luxury Bungalow</h2>
            <p className="text-gray-600 mb-4">
              A luxurious bungalow with all the comforts you need.
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-4">$250/night</p>
          </div>
          <Link 
            to={user ? `/reservation/3` : "/login"} 
            state={{ 
              fromBungalows: true, 
              bungalowId: 3,
              redirectTo: "/profile"
            }}
          >
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BungalowsPage;
