import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BungalowDetail = () => {
  const { id } = useParams();
  const [bungalow, setBungalow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBungalow = async () => {
      try {
        console.log('Fetching bungalow details...');
        const response = await axios.get(`http://localhost:5002/api/bungalows/${id}`);
        console.log('Response:', response.data);
        setBungalow(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bungalow:', err);
        setError('Error fetching bungalow details');
        setLoading(false);
      }
    };

    fetchBungalow();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!bungalow) return <div className="text-center py-8">Bungalow not found</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={bungalow.BungalowType?.image || "/assets/default-bungalow.jpg"}
            alt={bungalow.BungalowType?.name}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-semibold text-gray-800">{bungalow.BungalowType?.name}</h1>
            <p className="text-gray-600 mt-2">Unit Number: {bungalow.unit_number}</p>
            <p className="text-gray-600 mt-1">Status: {bungalow.status}</p>
            <p className="text-gray-600 mt-1">Base Price: ${bungalow.BungalowType?.base_price}/night</p>
            <p className="text-gray-600 mt-1">Max Capacity: {bungalow.BungalowType?.max_capacity} people</p>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">Description</h2>
              <p className="text-gray-600 mt-2">{bungalow.BungalowType?.description}</p>
            </div>

            <div className="mt-8 flex gap-4">
              <Link to="/" className="flex-1">
                <button className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300">
                  Back to Home
                </button>
              </Link>
              <Link to="/login" state={{ from: "detail", bungalowId: bungalow.id }} className="flex-1">
                <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                  Reserve Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BungalowDetail; 