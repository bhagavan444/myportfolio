import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./About.css";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaDatabase, FaGitAlt, FaGithub, FaPython
} from "react-icons/fa";
import {
  SiMongodb, SiTailwindcss, SiExpress, SiFlask, SiTensorflow
} from "react-icons/si";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.25 },
  },
};

const floatIn = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
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

// Data
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

const sections = [
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
];

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="orbiting-circle" />

      {[null, ...sections].map((section, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, {
          margin: "-40% 0px -40% 0px",
          once: false,
        });

        if (index === 0) {
          return (
            <motion.section
              key="intro"
              className="fullscreen-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="beast-about-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 className="beast-about-title" variants={floatIn}>
                  👋 Hi, I'm <span className="highlight">Siva Satya Sai Bhagavan</span>
                </motion.h2>

                <motion.p className="beast-about-subtitle" variants={floatIn}>
                  Final Year B.Tech AI&DS Student | MERN Stack Developer | Python & Data Science Enthusiast
                </motion.p>
              </motion.div>
            </motion.section>
          );
        }

        const isEven = index % 2 === 0;
        const fromX = isEven ? -150 : 150;
        const toX = isEven ? 150 : -150;

        return (
          <motion.section
            ref={ref}
            key={section.title}
            className="fullscreen-card"
            initial={{ opacity: 0, x: fromX }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: toX }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div className="beast-about-section" whileHover={{ scale: 1.015 }}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </motion.section>
        );
      })}

      {/* Tech Stack */}
      <motion.section
        className="fullscreen-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="tech-stack-section" variants={floatIn}>
          <h4>🚀 Core Technologies</h4>
          <div className="tech-stack-grid">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="tech-icon-with-label"
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <div className="icon">{tech.icon}</div>
                <div className="tech-label">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Tools & Skills */}
      <motion.section
        className="fullscreen-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="beast-about-badges">
          <h4>📚 Other Tools & Skills</h4>
          <div className="badge-grid">
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                className="badge"
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
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
