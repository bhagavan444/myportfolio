import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center text-white overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full animated-gradient-bg z-0" />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-20 text-center px-6 md:px-12"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Hi, I'm <span className="text-purple-400">Bhagavan</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Full Stack Developer | MERN | Machine Learning Enthusiast | Building modern web apps with creativity & performance
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center gap-2 text-lg font-medium mx-auto"
        >
          View Portfolio <FaArrowRight />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
