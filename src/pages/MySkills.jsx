import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./MySkills.css";

// Skill categories data
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
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, type: "spring", stiffness: 50 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -80, rotateZ: -15 },
    visible: { opacity: 1, y: 0, rotateZ: 0, transition: { delay: 0.3, duration: 1.2, type: "spring", stiffness: 80 } },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 90 } },
  };

  return (
    <motion.div
      className="skills-beast-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #0a001a, #1a0040)",
        padding: "clamp(2rem, 5vw, 6rem) clamp(1rem, 2vw, 3rem)",
        overflow: "hidden",
      }}
    >
      {/* Background Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${1.5 + i * 0.2}rem`,
            height: `${1.5 + i * 0.2}rem`,
            background: "rgba(0, 191, 255, 0.3)",
            borderRadius: "50%",
            top: `${5 + i * 3}%`,
            left: `${5 + i * 3}%`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.h1
        className="skills-beast-title"
        variants={titleVariants}
        style={{
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          color: "#00bfff",
          textAlign: "center",
          marginBottom: "clamp(1.5rem, 3vw, 3.5rem)",
        }}
      >
        🚀 My Skill Set
      </motion.h1>

      <p
        className="skills-intro"
        style={{
          textAlign: "center",
          fontSize: "clamp(1rem, 2vw, 1.3rem)",
          color: "#d0d8e8",
          maxWidth: "700px",
          margin: "0 auto clamp(2rem, 4vw, 4rem)",
          lineHeight: 1.6,
        }}
      >
        I bring a diverse arsenal of technical expertise paired with exceptional interpersonal skills to craft scalable solutions, empower teams, and thrive in dynamic tech ecosystems.
      </p>

      <motion.div
        className="skills-grid-wrapper"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "clamp(1rem, 2vw, 2.5rem)",
          maxWidth: "1300px",
          margin: "0 auto",
          perspective: "1000px",
        }}
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            className="skills-beast-card"
            variants={cardVariants}
            whileHover={{ scale: 1.08, boxShadow: "0 15px 40px rgba(0, 191, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "rgba(20, 10, 40, 0.95)",
              border: "2px solid rgba(0, 191, 255, 0.6)",
              borderRadius: "1.25rem",
              padding: "clamp(1rem, 2vw, 2.2rem)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                color: "#00ffcc",
                marginBottom: "1rem",
              }}
            >
              {category.title}
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "0.6rem",
              }}
            >
              {category.skills.map((skill, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.05, color: "#00bfff" }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)",
                    color: "#f0f0f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#00ffcc", marginRight: "0.5rem" }}>✅</span> {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MySkills;