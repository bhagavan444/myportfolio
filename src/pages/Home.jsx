import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg";
import "../components/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative min-h-screen w-full bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#334155] text-white flex flex-col items-center justify-center px-6 md:px-0 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Glowing Aurora Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.15), transparent 60%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Animated Gradient Blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-700 opacity-30 blur-3xl animate-blob"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600 opacity-20 blur-3xl animate-blob animation-delay-2000"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Twinkling Star Background Layer */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Profile Image */}
      <motion.img
        src={profile}
        alt="Bhagavan"
        className="z-10 w-48 h-48 rounded-full border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-[0_0_25px_rgb(168,85,247)] object-cover"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{ scale: 1.05, rotate: 5 }}
      />

      {/* Main Heading */}
      <motion.h1
        className="z-10 mt-10 max-w-4xl text-center text-5xl md:text-6xl font-extrabold tracking-tight leading-tight animate-text-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Final Year B Tech AI&DS Student Specialized in
        <br />
        <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          AI, DS & Full Stack Web Development
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        className="z-10 mt-6 max-w-3xl text-center text-gray-300 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        Passionate about building intelligent software, beautiful web apps,
        and solving real-world problems with code.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={() => navigate("/about")}
        className="z-10 mt-12 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full text-white text-lg font-semibold shadow-lg hover:shadow-pink-500 transition-all duration-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.3, duration: 0.7 }}
        whileHover={{ scale: 1.1 }}
      >
        About Me
      </motion.button>

      {/* Scroll Down Arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>

      {/* Keyframes and CSS */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 8s infinite ease-in-out;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animate-text-glow {
            text-shadow:
              0 0 5px #d8b4fe,
              0 0 10px #c084fc,
              0 0 15px #a855f7,
              0 0 20px #9333ea,
              0 0 30px #7e22ce,
              0 0 40px #6b21a8;
          }
        `}
      </style>
    </motion.div>
  );
};

export default Home;
