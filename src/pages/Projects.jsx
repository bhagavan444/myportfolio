import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiFlask,
  SiPython,
  SiFirebase,
  SiHtml5,
  SiCss3,
  SiScikitlearn,
  SiTensorflow,
  SiPandas,
  SiOpenai,
  SiSocketdotio,
  SiCloudinary,
  SiNumpy,
} from "react-icons/si";
import "../styles/Projects.css";

// Tech icon mapping function
const getTechIcons = (tech) => {
  const iconMap = {
    MongoDB: { icon: <SiMongodb />, label: "MongoDB" },
    Express: { icon: <SiExpress />, label: "Express" },
    "Express.js": { icon: <SiExpress />, label: "Express.js" },
    React: { icon: <SiReact />, label: "React" },
    "React.js": { icon: <SiReact />, label: "React.js" },
    Node: { icon: <SiNodedotjs />, label: "Node.js" },
    "Node.js": { icon: <SiNodedotjs />, label: "Node.js" },
    Flask: { icon: <SiFlask />, label: "Flask" },
    Python: { icon: <SiPython />, label: "Python" },
    Firebase: { icon: <SiFirebase />, label: "Firebase" },
    "Firebase Auth": { icon: <SiFirebase />, label: "Firebase Auth" },
    HTML: { icon: <SiHtml5 />, label: "HTML" },
    CSS: { icon: <SiCss3 />, label: "CSS" },
    CSS3: { icon: <SiCss3 />, label: "CSS3" },
    "HTML/CSS": {
      icon: (
        <>
          <SiHtml5 /> <SiCss3 />
        </>
      ),
      label: "HTML/CSS",
    },
    "Scikit-learn": { icon: <SiScikitlearn />, label: "Scikit-learn" },
    TensorFlow: { icon: <SiTensorflow />, label: "TensorFlow" },
    Pandas: { icon: <SiPandas />, label: "Pandas" },
    Numpy: { icon: <SiNumpy />, label: "Numpy" },
    Numpys: { icon: <SiNumpy />, label: "Numpy" },
    OpenAI: { icon: <SiOpenai />, label: "OpenAI" },
    "OpenAI API": { icon: <SiOpenai />, label: "OpenAI API" },
    Socket: { icon: <SiSocketdotio />, label: "Socket.io" },
    "Socket.io": { icon: <SiSocketdotio />, label: "Socket.io" },
    Cloudinary: { icon: <SiCloudinary />, label: "Cloudinary" },
    TFIDF: { icon: null, label: "TF-IDF" },
    "TF-IDF": { icon: null, label: "TF-IDF" },
    NLTK: { icon: null, label: "NLTK" },
    Keras: { icon: null, label: "Keras" },
    LangChain: { icon: null, label: "LangChain" },
  };

  return tech.split(", ").map((t, i) => (
    <motion.span
      key={i}
      className="tech-badge"
      whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 0 15px rgba(0, 255, 204, 0.7)" }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ display: "inline-flex", alignItems: "center", gap: "8px", margin: "4px" }}
    >
      {iconMap[t] ? (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{ color: "#00ffcc", textShadow: "0 0 10px rgba(0, 255, 204, 0.5)" }}
          >
            {iconMap[t].icon}
          </motion.span>
          <span style={{ color: "#f0f0f5" }}>{iconMap[t].label}</span>
        </>
      ) : (
        <span style={{ color: "#d1d5db" }}>{t}</span>
      )}
    </motion.span>
  ));
};

// Project data
const projectData = [
  {
    title: "🧠 Enhance Resume Builder",
    description:
      "An intelligent MERN stack application that allows users to create professional resumes with modern templates, scoring using ATS.",
    tech: "MongoDB, Express.js, React.js, Node.js, Firebase Auth, HTML/CSS",
    link: "https://github.com/bhagavan444/resumebuilder",
  },
  {
    title: "🍏 Fruit & Vegetable Disease Classifier",
    description:
      "Flask + MobileNetV2-based image classifier to detect fruit/vegetable health. Real-time prediction and animated UI.",
    tech: "TensorFlow, Keras, Flask, React, CSS3, Python",
    link: "https://github.com/bhagavan444/smartbidgeproject",
  },
  {
    title: "🎯 Career Recommendation System",
    description:
      "ML-powered system recommending careers based on user's data. Includes predictions, roadmap, and resources.",
    tech: "Python, Flask, React.js, Scikit-learn, Pandas, HTML/CSS",
    link: "https://github.com/bhagavan444/career-path-project",
  },
  {
    title: "💻 2nd Hand Electronics Platform",
    description:
      "Full-stack app for buying/selling electronics. Built during a hackathon with real-time chat, image uploads, auth.",
    tech: "MongoDB, Express, React, Node.js, Cloudinary, Socket.io",
    link: "https://github.com/bhagavan444/hackathon-project",
  },
  {
    title: "❌ Fake News Detector",
    description:
      "An AI-driven app that detects fake news using TF-IDF, NLP, and classification models.",
    tech: "Python, Flask, Scikit-learn, TF-IDF, NLTK, HTML/CSS",
    link: "https://github.com/bhagavan444/fake-news-detector",
  },
  {
    title: "📖 Smart Career Chatbot",
    description:
      "LangChain + OpenAI-based chatbot that recommends careers through interactive dialogue.",
    tech: "LangChain, OpenAI API, Flask, React",
    link: "https://github.com/bhagavan444/smart-career-chatbot",
  },
  {
    title: "📑 Diabetes Predictor",
    description:
      "A Flask ML app predicting diabetes from user medical data. Simple and elegant UI.",
    tech: "Python, Flask, Scikit-learn, Pandas, HTML/CSS",
    link: "https://github.com/bhagavan444/diabetes-predictor-app",
  },
  {
    title: "📊 ML Projects – Health Risk Predictions",
    description:
      "Collection of mini-ML projects including diabetes, heart, and cancer risk predictors.",
    tech: "Python, Flask, Scikit-learn, Pandas, TensorFlow, Numpys",
    link: "https://github.com/bhagavan444",
  },
];

// Inline styles for a stylish design
const styles = {
  container: {
    padding: "3rem 2rem",
    background: "linear-gradient(135deg, #0d0026, #1e003b)",
    minHeight: "100vh",
    color: "#f0f0f5",
    overflowX: "hidden",
  },
  title: {
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#00ffcc",
    textShadow: "0 0 25px rgba(0, 255, 204, 0.8)",
    marginBottom: "2rem",
    animation: "pulseGlow 2s ease-in-out infinite alternate",
  },
  filterBar: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "2.5rem",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "0.6rem 1.4rem",
    background: "rgba(0, 255, 204, 0.2)",
    border: "none",
    borderRadius: "20px",
    color: "#00ffcc",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(0, 255, 204, 0.3)",
    borderRadius: "15px",
    padding: "1.8rem",
    margin: "1rem",
    textAlign: "left",
    transition: "all 0.4s ease",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
  },
  cardTitle: {
    fontSize: "1.8rem",
    color: "#00ffcc",
    marginBottom: "0.8rem",
    textShadow: "0 0 12px rgba(0, 255, 204, 0.5)",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#d1d5db",
    marginBottom: "1rem",
    lineHeight: "1.5",
  },
  visitBtn: {
    display: "inline-block",
    padding: "0.7rem 1.5rem",
    background: "linear-gradient(90deg, #00ffcc, #ff33cc)",
    color: "#0d0026",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};

// Animation keyframes (to be added to Projects.css)
const animationStyles = `
  @keyframes pulseGlow {
    from { text-shadow: 0 0 15px rgba(0, 255, 204, 0.6); }
    to { text-shadow: 0 0 30px rgba(0, 255, 204, 0.9), 0 0 40px rgba(255, 51, 153, 0.5); }
  }
`;

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const techOptions = [
    "All",
    ...Array.from(new Set(projectData.flatMap((p) => p.tech.split(", ")))).sort(),
  ];

  const filteredProjects =
    filter === "All"
      ? projectData
      : projectData.filter((p) => p.tech.includes(filter));

  return (
    <motion.div
      className="projects-container"
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      <style>{animationStyles}</style>
      <motion.h2
        className="projects-title"
        style={styles.title}
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      >
        🚀 My Technical Projects
      </motion.h2>

      <motion.div
        className="filter-bar"
        style={styles.filterBar}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <AnimatePresence>
          {techOptions.map((tech, index) => (
            <motion.button
              key={tech}
              className={`filter-btn ${filter === tech ? "active" : ""}`}
              style={styles.filterBtn}
              onClick={() => setFilter(tech)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.2, background: "rgba(0, 255, 204, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Filter by ${tech}`}
            >
              {tech}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="projects-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card"
              style={styles.card}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.12, duration: 0.7, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.08,
                rotateX: 3,
                rotateY: 3,
                boxShadow: "0 20px 60px rgba(0, 255, 204, 0.5)",
              }}
            >
              <motion.h3
                style={styles.cardTitle}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12 + 0.2, duration: 0.5 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                style={styles.cardDescription}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12 + 0.3, duration: 0.5 }}
              >
                {project.description}
              </motion.p>
              <motion.p
                style={{ fontWeight: "bold", color: "#00ffcc", marginTop: "1rem" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.12 + 0.4, duration: 0.5 }}
              >
                🔧 Tech Used:
              </motion.p>
              <motion.div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "0.8rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.12 + 0.5, duration: 0.5 }}
              >
                {getTechIcons(project.tech)}
              </motion.div>
              <motion.a
                href={project.link}
                style={styles.visitBtn}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 15px 50px rgba(255, 51, 153, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 + 0.6, duration: 0.5 }}
              >
                View Project
              </motion.a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Projects;