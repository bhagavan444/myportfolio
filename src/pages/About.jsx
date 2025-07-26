import React from "react";
import { motion } from "framer-motion";
import "./About.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaPython,
} from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiFlask,
  SiTensorflow,
} from "react-icons/si";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 20, rotate: -10 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      type: "spring",
      stiffness: 120,
    },
  }),
};

const floatIn = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const techStack = [
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "React", icon: <FaReact /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Python", icon: <FaPython /> },
  { name: "Flask", icon: <SiFlask /> },
  { name: "TensorFlow", icon: <SiTensorflow /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "Database", icon: <FaDatabase /> },
];

const badges = [
  "React.js", "Node.js", "MongoDB", "Express.js", "Python", "Flask",
  "TensorFlow", "Keras", "Scikit-Learn", "OpenCV", "Numpy", "Pandas",
  "Matplotlib", "Seaborn", "AWS Lambda", "Git", "GitHub",
  "REST APIs", "HTML5", "Tailwind CSS", "Bootstrap",
  "SQL", "VS Code", "Postman", "Agile", "CI/CD"
];

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="orbiting-circle"></div>

      <motion.section
        className="beast-about-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="beast-about-title"
          variants={floatIn}
          whileHover={{ scale: 1.05 }}
        >
          👋 Hi, I'm <span className="highlight">Siva Satya Sai Bhagavan</span>
        </motion.h2>

        <motion.p
          className="beast-about-subtitle"
          variants={floatIn}
          whileHover={{ scale: 1.02 }}
        >
          Final Year B.Tech AI&DS Student | MERN Stack Developer | Python & Data Science Enthusiast
        </motion.p>

        <motion.div className="beast-about-box" variants={sectionVariants}>
          <p>
            I’m a proactive and solution-driven developer with hands-on experience in{" "}
            <strong>Full Stack (MERN)</strong>, <strong>Python</strong>, and{" "}
            <strong>Machine Learning and AI</strong>. I love building scalable web apps and real-time AI solutions.
          </p>
        </motion.div>

        {[
          {
            title: "🚀 Real-World Projects",
            items: [
              "Resume Builder (MERN + ATS) – Google/GitHub login, ATS scoring using NLP, PDF/Word export.",
              "Career Recommendation System – ML + Flask app to suggest best-fit careers based on inputs.",
              "Second-Hand Electronics Platform – Full MERN app with secure auth and MongoDB listings.",
              "AI Chatbot (AWS Lex) – Voice/text bot with AWS Lambda integration and NLP logic.",
              "OLX-Style Marketplace – Full-stack marketplace for electronics (search, auth, filters).",
            ],
          },
          {
            title: "📜 Internship Experience",
            items: [
              "AI/ML Intern @ Blackbucks Pvt Ltd – Developed a real-time ML prediction system.",
              "SmartBridge x Eduskills – Created fruit & vegetable classifier with DL + TensorFlow + AWS.",
            ],
          },
          {
            title: "🎯 Career Objectives",
            items: [
              "Seeking roles in Full Stack Development, Machine Learning, or Data Science.",
              "Aim is to apply skills on real-world problems, work in agile teams, and grow as an engineer.",
            ],
          },
          {
            title: "🌟 Why Me?",
            items: [
              "✔ End-to-end delivery (frontend, backend, ML)",
              "✔ Git, GitHub, APIs, CI/CD experience",
              "✔ Agile collaboration & documentation",
              "✔ Fast learner & tech explorer",
            ],
          },
        ].map((section, index) => (
          <motion.div
            className="beast-about-section"
            key={index}
            variants={sectionVariants}
            whileHover={{ scale: 1.015 }}
          >
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* 💠 Animated Icon-Based Tech Stack with Names */}
        <motion.div
          className="tech-stack-section"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h4>🚀 Core Technologies</h4>
          <div className="tech-stack-grid">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="tech-icon-with-label"
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.15 }}
              >
                <div className="icon">{tech.icon}</div>
                <div className="tech-label">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 🔤 Text-Based Skill Badges */}
        <motion.div
          className="beast-about-badges"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h4>📚 Other Tools & Skills</h4>
          <div className="badge-grid">
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                className="badge"
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.08 }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;
