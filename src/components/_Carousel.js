import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const _Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/assets/homepage4.png',
      title: 'Luxury Bungalows',
      description: 'Experience the ultimate comfort in our luxury bungalows',
    },
    {
      image: '/assets/homepage6.jpg',
      title: 'Family Getaway',
      description: 'Perfect for family vacations and memorable moments',
    },
    {
      image: '/assets/homepage7.png',
      title: 'Nature Retreat',
      description: 'Immerse yourself in nature and tranquility',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-2xl mb-8">{slide.description}</p>
                <Link
                  to="/bungalows"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
                >
                  Explore Bungalows
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default _Carousel;


