import React from "react";
import { motion } from "framer-motion";
import "./MySkills.css";

const MySkills = () => {
  return (
    <div className="skills-beast-container">
      <h1 className="skills-beast-title">My Skills</h1>

      <div className="skills-grid-wrapper">
        {/* 🧠 Technical Skills - Languages */}
        <motion.div
          className="skills-beast-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Languages</h2>
          <ul>
            <li>C</li>
            <li>Java</li>
            <li>Python</li>
            <li>R </li>
            <li>AI & ML</li>
            <li>SQL</li>
            <li>HTML & CSS</li>
            <li>Cloud computing</li>
            <li>AWS</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
          </ul>
        </motion.div>

        {/* 🧱 Technical Skills - Frameworks/Tools */}
        <motion.div
          className="skills-beast-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Frameworks & Tools</h2>
          <ul>
            <li>Flask</li>
            <li>Django</li>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>Tailwind CSS</li>
            <li>Git & GitHub</li>
            <li>Firebase</li>
          </ul>
        </motion.div>

        {/* 🧠 Soft Skills */}
        <motion.div
          className="skills-beast-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Soft Skills</h2>
          <ul>
            <li>Teamwork & Collaboration</li>
            <li>Problem Solving</li>
            <li>Time Management</li>
            <li>Critical Thinking</li>
            <li>Leadership</li>
            <li>Communication</li>
            <li>Adaptability</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default MySkills;
