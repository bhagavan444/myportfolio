// src/pages/Home.jsx
import React from "react";
import profileImg from "../assets/profile.png";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 md:flex-row md:justify-between md:px-20 bg-white">
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Turning Vision Into Reality With Code And Design.
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          As a skilled full-stack developer, I am dedicated to turning ideas into innovative web applications. Explore my latest projects and articles showcasing expertise in React.js and web development.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <button className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">
            Resume ↗
          </button>
          <a href="#contact" className="text-gray-900 underline">Contact</a>
        </div>
      </div>

      <div className="mt-10 md:mt-0">
        <img src={profileImg} alt="Profile" className="max-w-xs md:max-w-md rounded-full" />
      </div>
    </div>
  );
};

export default Home;
