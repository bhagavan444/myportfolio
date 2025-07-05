// src/pages/Skills.jsx
import React from "react";
import { motion } from "framer-motion";

const skills = [
  "React", "Node.js", "MongoDB", "Tailwind CSS",
  "Python", "TensorFlow", "Flask", "GitHub",
];

const Skills = () => {
  return (
    <div className="min-h-screen px-6 py-10 text-center">
      <motion.h2
        className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow-md font-semibold text-gray-800 dark:text-gray-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
