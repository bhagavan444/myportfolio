// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center justify-center text-center">
      <motion.h2
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>

      <motion.p
        className="max-w-3xl text-lg text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        I'm Rocky, a passionate full-stack developer specializing in creating
        exceptional digital experiences. I have experience building web
        applications using modern technologies such as React, Node.js,
        Tailwind CSS, MongoDB, and more. I'm enthusiastic about coding,
        constantly learning, and always ready to take on new challenges.
      </motion.p>

      <motion.div
        className="mt-6 flex flex-col gap-2 text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>🎓 B.Tech in Artificial Intelligence & Data Science</p>
        <p>📍 Based in India</p>
        <p>💻 MERN Stack | Firebase | Tailwind | Flask</p>
      </motion.div>
    </div>
  );
};
export default About;