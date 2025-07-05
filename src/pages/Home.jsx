import React from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.jpg";
import "../components/Home.css";

const Home = () => {
  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#334155] text-white flex flex-col items-center justify-center px-6 md:px-0 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Animated Background Circles */}
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

      {/* Profile Image */}
      <motion.img
        src={profile}
        alt="Bhagavan"
        className="z-10 w-48 h-48 rounded-full border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-[0_0_20px_rgb(139,92,246)] object-cover"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{ scale: 1.05, rotate: 5, boxShadow: "0 0 30px #a855f7" }}
      />

      {/* Main Heading */}
      <motion.h1
        className="z-10 mt-10 max-w-4xl text-center text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Rising Final Year B.Tech Student Specialized in{" "}
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 animate-text-glow font-extrabold">
          AI, Web & ML
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full animate-gradient-underline"></span>
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

      {/* Call to Action */}
      <motion.a
        href="#about"
        className="z-10 mt-12 inline-block px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full text-white text-lg font-semibold shadow-lg hover:shadow-purple-500 transition-shadow duration-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.3, duration: 0.7 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px #ec4899" }}
      >
        About Me
      </motion.a>

      {/* About Me Section */}
      <motion.section
        id="about"
        className="z-10 mt-24 max-w-5xl w-full px-6 md:px-0 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1 }}
      >
        <h2 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg">
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          I’m a passionate and highly motivated <strong>Final Year B.Tech AI&DS student</strong>
          specializing in <strong>AI, Web Development, Data Science and Machine Learning</strong>.
          With strong hands-on experience in full-stack projects (MERN), Python, and Data Science,
          I love solving real-world problems with clean, intelligent code.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          I'm actively seeking opportunities as a <strong>Full Stack Developer, Python Developer, or AI/ML Engineer</strong>.
          Eager to contribute to impactful teams, build scalable software, and grow continuously with the latest technologies.
        </p>
      </motion.section>

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

      {/* CSS Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
          .animate-blob {
            animation: blob 8s infinite;
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
          .animate-gradient-underline {
            animation: gradient-slide 3s ease-in-out infinite alternate;
          }
          @keyframes gradient-slide {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default Home;
