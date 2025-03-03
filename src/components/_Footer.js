import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 BungaRes. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://facebook.com" className="mx-3 text-gray-400 hover:text-white">
            Facebook
          </a>
          <a href="https://twitter.com" className="mx-3 text-gray-400 hover:text-white">
            Twitter
          </a>
          <a href="https://instagram.com" className="mx-3 text-gray-400 hover:text-white">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
