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
    visible: {
      opacity: 1,
      transition: { duration: 1.5, type: "spring", stiffness: 50 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -80, rotateZ: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: { delay: 0.3, duration: 1.2, type: "spring", stiffness: 80 },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 90 },
    },
  };

  return (
    <motion.div
      className="skills-beast-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a001a, #1a0040, #2a0060)",
        padding: "6rem 3rem",
        overflow: "hidden",
        willChange: "background, transform",
      }}
    >
      {/* Background Particles */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + i}px`,
            height: `${2 + i}px`,
            background: `radial-gradient(circle, rgba(0, 191, 255, 0.5), transparent)`,
            borderRadius: "50%",
            boxShadow: "0 0 30px rgba(0, 191, 255, 0.9)",
            top: `${5 + i * 5}%`,
            left: `${5 + i * 5}%`,
            willChange: "transform",
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.9, 0.3],
            rotate: [0, 360],
          }}
          transition={{ duration: 7 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.h1
        className="skills-beast-title"
        variants={titleVariants}
        style={{
          fontSize: "4.5rem",
          color: "#00bfff",
          textShadow: "0 0 50px rgba(0, 191, 255, 0.9), 0 0 70px rgba(255, 105, 180, 0.7)",
          fontWeight: "900",
          textAlign: "center",
          marginBottom: "3.5rem",
          background: "linear-gradient(45deg, #00bfff, #ff69b4, #00ffcc)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          animation: "gradientFlow 9s linear infinite",
        }}
      >
        🚀 My Skill Set
      </motion.h1>

      <p
        className="skills-intro"
        style={{
          textAlign: "center",
          fontSize: "1.3rem",
          color: "#d0d8e8",
          maxWidth: "800px",
          margin: "0 auto 4rem",
          lineHeight: "1.8",
          textShadow: "0 0 20px rgba(0, 191, 255, 0.5)",
          background: "linear-gradient(90deg, #d0d8e8, #a3bffa)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          maxWidth: "1300px",
          margin: "0 auto",
          perspective: "1200px",
        }}
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            className="skills-beast-card"
            variants={cardVariants}
            whileHover={{
              scale: 1.12,
              boxShadow: "0 25px 60px rgba(0, 191, 255, 0.8), 0 0 80px rgba(255, 105, 180, 0.7)",
              transition: { duration: 0.6 },
            }}
            whileTap={{ scale: 0.95, rotateZ: -5 }}
            style={{
              background: "rgba(20, 10, 40, 0.95)",
              border: "2px solid rgba(0, 191, 255, 0.6)",
              borderRadius: "20px",
              padding: "2.2rem",
              textAlign: "center",
              backdropFilter: "blur(12px)",
              transformStyle: "preserve-3d",
              willChange: "transform, box-shadow",
              animation: "cardPulse 6s ease-in-out infinite",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                color: "#00ffcc",
                marginBottom: "1.5rem",
                textShadow: "0 0 20px rgba(0, 255, 204, 0.6)",
                background: "linear-gradient(45deg, #00ffcc, #ff69b4)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
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
                gap: "0.8rem",
              }}
            >
              {category.skills.map((skill, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.1, color: "#00bfff", textShadow: "0 0 15px rgba(0, 191, 255, 0.7)" }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: "1.2rem",
                    color: "#f0f0f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span style={{ color: "#00ffcc", marginRight: "0.7rem" }}>✅</span> {skill}
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