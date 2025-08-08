import React from "react";
import { motion } from "framer-motion";
import "./MySkills.css";

const skillCategories = [
  {
    title: "🧠 Programming Languages",
    delay: 0,
    skills: ["C", "Java", "Python", "R", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "🌐 Web & Mobile Technologies",
    delay: 0.2,
    skills: ["HTML5", "CSS3", "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Firebase"],
  },
  {
    title: "⚙️ Frameworks & Platforms",
    delay: 0.4,
    skills: ["Flask", "Django", "MERN Stack", "Git & GitHub", "AWS", "Cloud Computing"],
  },
  {
    title: "🧩 AI, ML & Data Science",
    delay: 0.6,
    skills: ["Scikit-learn", "TensorFlow", "Pandas", "Numpy", "AI & ML Concepts", "Data Visualization"],
  },
  {
    title: "💼 Professional & Soft Skills",
    delay: 0.8,
    skills: [
      "Effective Communication",
      "Problem Solving",
      "Team Collaboration",
      "Leadership",
      "Critical Thinking",
      "Adaptability",
      "Time Management",
    ],
  },
];

const MySkills = () => {
  return (
    <div className="skills-beast-container">
      <h1 className="skills-beast-title">🚀 My Skill Set</h1>
      <p className="skills-intro">
        I bring a diverse set of technical skills combined with strong interpersonal qualities to build scalable solutions, contribute to teams, and adapt in fast-paced environments.
      </p>

      <div className="skills-grid-wrapper">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            className="skills-beast-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: category.delay }}
          >
            <h2>{category.title}</h2>
            <ul>
              {category.skills.map((skill, idx) => (
                <li key={idx}>✅ {skill}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MySkills;
