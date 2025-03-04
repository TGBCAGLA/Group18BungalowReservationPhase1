import React, { useState } from "react";

const _Carousel = ({ className = "mt-[80px] md:mt-[100px]" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/assets/homepage7.png",
    "/assets/homepage4.png",
    "/assets/homepage8.png"
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={`relative w-full mx-auto px-4 sm:px-8 md:px-16 ${className}`}>
      <div className="overflow-hidden rounded-lg w-full h-[400px]">
        <img
          src={images[currentIndex]}
          alt={`carousel-img-${currentIndex}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />
      </div>

      {/* left arrow */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition duration-300"
        onClick={prevSlide}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      {/* right arrow */}
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition duration-300"
        onClick={nextSlide}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"} transition duration-300`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default _Carousel;


