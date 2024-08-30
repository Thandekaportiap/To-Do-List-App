import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const AboutUs = () => {
    return(
        <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">About Us</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
        Our mission is to empower individuals and teams to achieve more by providing a reliable and user-friendly to-do list solution. We believe that everyone deserves to live a more organized and fulfilling life.
      </p>
      <div className="flex space-x-4 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-white bg-purple-600 hover:bg-purple-500 rounded-full p-2" size={30} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white bg-purple-600 hover:bg-purple-500 rounded-full p-2" size={30} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-white bg-purple-600 hover:bg-purple-500 rounded-full p-2" size={30} />
        </a>
      </div>
    </div>
        </>
    );
};
