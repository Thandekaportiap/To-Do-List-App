import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const ContactUs = () => {
    return(

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">Contact Us</h1>
      <div className="text-lg text-gray-700 text-center mb-8">
        <p>Email: <a href="mailto:TDList@gmail.com" className="text-purple-600 hover:underline">TDList@gmail.com</a></p>
        <p>Phone: <a href="tel:0332546522" className="text-purple-600 hover:underline">033 2546 522</a></p>
      </div>
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
    );
};
    