// src/pages/Skills.jsx
import React from "react";
import { motion } from "framer-motion";

const skills = [
  "React", "Node.js", "MongoDB", "Tailwind CSS",
  "Python", "TensorFlow", "Flask", "GitHub",
];

const backgroundShapes = [
  { top: "10%", left: "5%", size: "80px", color: "rgba(255, 99, 132, 0.3)" },
  { top: "20%", right: "10%", size: "60px", color: "rgba(54, 162, 235, 0.3)" },
  { bottom: "15%", left: "15%", size: "100px", color: "rgba(255, 206, 86, 0.3)" },
  { bottom: "10%", right: "5%", size: "70px", color: "rgba(75, 192, 192, 0.3)" },
];

const Skills = () => {
  return (
    <div className="relative min-h-screen px-6 py-16 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#9333ea]">
      {/* 🔷 Animated Background Shapes */}
      {backgroundShapes.map((shape, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full blur-2xl"
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            top: shape.top,
            bottom: shape.bottom,
            left: shape.left,
            right: shape.right,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: idx * 0.3, repeat: Infinity, repeatType: "reverse" }}
        />
      ))}

      <motion.h2
        className="text-4xl font-bold text-white mb-12 drop-shadow-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        My Superpowers 💪
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg z-10 relative">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            className="bg-white/20 backdrop-blur-md p-5 rounded-xl shadow-lg text-white font-semibold hover:scale-105 hover:bg-white/30 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
