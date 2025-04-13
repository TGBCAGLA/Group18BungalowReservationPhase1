import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">BungaRes</h3>
            <p className="text-gray-400">Your perfect holiday destination in Sapanca</p>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bungalows" className="text-gray-400 hover:text-white transition duration-300">
                  Bungalows
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p>Email: info@bungares.com</p>
              <p>Phone: +90 555 123 4567</p>
              <p>Address: Sapanca, Turkey</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} BungaRes. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://facebook.com" 
                className="text-gray-400 hover:text-white transition duration-300"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a 
                href="https://twitter.com" 
                className="text-gray-400 hover:text-white transition duration-300"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a 
                href="https://instagram.com" 
                className="text-gray-400 hover:text-white transition duration-300"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 