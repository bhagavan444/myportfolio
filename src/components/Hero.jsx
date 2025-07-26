import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg";
import "./Home.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative min-h-screen w-full bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 🌌 Aurora Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 20% 30%, rgba(168,85,247,0.15), transparent 60%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 🎈 Floating Gradient Blobs */}
      <motion.div
        className="absolute -top-32 left-[-15%] w-[400px] h-[400px] rounded-full bg-purple-500 opacity-20 blur-3xl animate-blob"
        animate={{ x: [0, 30, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pink-500 opacity-20 blur-3xl animate-blob animation-delay-2000"
        animate={{ x: [0, -30, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      {/* ✨ Starfield */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* 🔆 Profile Image */}
      <motion.img
        src={profile}
        alt="Bhagavan"
        className="z-10 w-48 h-48 rounded-full border-4 border-pink-500 shadow-[0_0_40px_#9333ea] object-cover hover:scale-105 transition duration-500"
        variants={itemVariants}
        whileHover={{ rotate: 5 }}
      />

      {/* 💬 Heading */}
      <motion.h1
        className="z-10 mt-10 text-center text-5xl md:text-6xl font-extrabold leading-tight animate-text-glow"
        variants={itemVariants}
      >
        B.Tech AI&DS Student | Focused on
        <br />
        <motion.span
          className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          AI, ML, DS & Full Stack Web Development
        </motion.span>
      </motion.h1>

      {/* 🔖 Tagline */}
      <motion.p
        className="z-10 mt-6 max-w-xl text-center text-gray-300 text-lg"
        variants={itemVariants}
      >
        Building smart AI, elegant UIs, and real-world apps with impact 🚀
      </motion.p>

      {/* 🎯 CTA */}
      <motion.button
        onClick={() => navigate("/about")}
        className="z-10 mt-10 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-pink-400 transition-all duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        About Me
      </motion.button>

      {/* ⬇ Scroll Cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-300"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>

      {/* 🎨 Custom Keyframes */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -40px) scale(1.1); }
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
              0 0 6px #e879f9,
              0 0 12px #c084fc,
              0 0 18px #a855f7,
              0 0 24px #9333ea,
              0 0 32px #7e22ce;
          }
        `}
      </style>
    </motion.div>
  );
};

export default Hero;
