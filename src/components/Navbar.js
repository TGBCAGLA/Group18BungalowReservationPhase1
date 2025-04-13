import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-opacity-80 shadow-lg fixed top-0 left-0 w-full z-50 h-16 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-bold text-white hover:text-gray-300 transition duration-300"
          >
            BungaRes
            <span className="text-sm text-gray-300 ml-2">Sapanca</span>
          </Link>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex items-center 
            transition-all duration-300 ease-in-out bg-gray-900 md:bg-transparent md:space-x-8
            ${
              menuOpen
                ? "flex flex-col py-4 space-y-4 text-center"
                : "hidden md:flex"
            }`}
          >
            <li>
              <Link
                to="/bungalows"
                className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300"
              >
                Bungalows
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300"
              >
                Contact
              </Link>
            </li>
            {user ? (
              <>
                {user.role === 'manager' && (
                  <li>
                    <Link
                      to="/manager-dashboard"
                      className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="h-16"></div>
    </>
  );
};

export default Navbar; 