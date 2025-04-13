import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import _Carousel from "../components/_Carousel"; 
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import "./HomePage.css";

const HomePage = () => {
  const [featuredBungalows, setFeaturedBungalows] = useState([
    {
      id: "small-family",
      image: "/assets/small1.jpg",
      price: "$120/night",
      name: "Family Bungalow",
      rating: 0,
    },
    {
      id: "big-family",
      image: "/assets/big_family.jpg",
      price: "$180/night",
      name: "Big Family Bungalow",
      rating: 0,
    },
    {
      id: "luxury",
      image: "/assets/lux.jpg",
      price: "$250/night",
      name: "Luxury Bungalow",
      rating: 0,
    },
  ]);

  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const bungalowIdMap = {
          "small-family": 1,
          "big-family": 2,
          "luxury": 3
        };

        const updatedBungalows = await Promise.all(
          featuredBungalows.map(async (bungalow) => {
            const response = await api.get(`/bungalows/${bungalowIdMap[bungalow.id]}/comments`);
            const comments = response.data;
            
            if (comments.length > 0) {
              const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
              const averageRating = totalRating / comments.length;
              return { ...bungalow, rating: averageRating };
            }
            return bungalow;
          })
        );

        setFeaturedBungalows(updatedBungalows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setError("Failed to load ratings");
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-500">&#9733;</span>);
    }

    if (halfStar) {
      stars.push(<span key="half" className="text-yellow-500">&#9733;</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">&#9733;</span>);
    }

    return stars;
  };

  const handleBookNow = (type) => {
    if (!user) {
      const bungalowIdMap = {
        "small-family": 1,
        "big-family": 2,
        "luxury": 3
      };
      const numericBungalowId = bungalowIdMap[type];
      navigate('/login', { state: { bungalowId: numericBungalowId } });
    } else {
      const bungalowIdMap = {
        "small-family": 1,
        "big-family": 2,
        "luxury": 3
      };
      const numericBungalowId = bungalowIdMap[type];
      navigate(`/reservation/${numericBungalowId}`);
    }
  };

  return (
    <div className="min-h-screen">
      <_Carousel />
      
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-4xl font-semibold text-gray-800">Welcome to BungaRes</h1>
        <p className="mt-4 text-lg text-gray-600">Explore the best bungalows for your next vacation!</p>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800">Featured Bungalows</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {featuredBungalows.map((bungalow) => (
              <div key={bungalow.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={bungalow.image}
                  alt={`Bungalow ${bungalow.id}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{bungalow.name}</h3>
                  <p className="text-gray-600 mt-2">{bungalow.price}</p>
                  <div className="flex items-center justify-center mt-2">
                    <div className="flex items-center">
                      {renderStars(bungalow.rating)}
                      <span className="ml-2 text-gray-600">{bungalow.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <Link to={`/bungalows/${bungalow.id}`}>
                      <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Details
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleBookNow(bungalow.id)}
                      className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
