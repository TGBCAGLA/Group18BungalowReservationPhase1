// src/pages/AboutPage.js
import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        Welcome to BungaRes! We specialize in providing cozy and comfortable
        bungalow stays for everyone who seeks a peaceful retreat.
      </p>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to offer the perfect getaway experience by providing
          charming and fully-equipped bungalows nestled in nature. Whether
          you're looking to escape the city or enjoy a relaxing vacation with
          your loved ones, we are here to make your stay memorable.
        </p>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li>Cozy and well-maintained bungalows.</li>
          <li>Located in serene and beautiful locations.</li>
          <li>Affordable pricing for a perfect retreat.</li>
          <li>Friendly and responsive customer service.</li>
        </ul>
        <p className="text-lg text-gray-700">
          We are committed to providing an exceptional experience to all our
          guests. Join us and experience the tranquility that BungaRes offers.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
