import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ekran boyutu değiştiğinde menüyü otomatik kapatır
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // masaüstüne geçince menüyü kapat
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-opacity-80 shadow-lg fixed top-0 left-0 w-full z-10 h-16 flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* logo */}
          <a href="/" className="text-3xl font-bold text-white hover:text-gray-300 transition duration-300">
            BungaRes
          </a>

          {/* mobile menü buttom */}
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

          {/* Menü Öğeleri */}
          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex items-center 
            transition-all duration-300 ease-in-out bg-gray-900 md:bg-transparent md:space-x-8
            ${menuOpen ? "flex flex-col py-4 space-y-4 text-center" : "hidden md:flex"}`}
          >
            <li>
              <a href="/" className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/bungalovlar" className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300">
                Bungalows
              </a>
            </li>
            <li>
              <a href="/hakkimizda" className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300">
                About
              </a>
            </li>
            <li>
              <a href="/iletisim" className="text-white font-semibold text-lg hover:text-yellow-400 transition duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* sayfadakiler navbarın biraz aşağısında başlıyor*/}
      <div className="mt-9"></div>
    </>
  );
};

export default Navbar;
