import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t border-purple-200">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Creator Text */}
        <p className="text-purple-700 font-medium text-sm sm:text-base">
          Created by Vladimer Tuyor
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/vladimer.tuyor.2025"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 transition-colors"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/akshe17"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
