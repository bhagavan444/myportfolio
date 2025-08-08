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
    TFIDF: { icon26: null, label: "TF-IDF" },
    "TF-IDF": { icon: null, label: "TF-IDF" },
    NLTK: { icon: null, label: "NLTK" },
    Keras: { icon: null, label: "Keras" },
    LangChain: { icon: null, label: "LangChain" },
  };

  return tech.split(", ").map((t, i) => (
    <motion.span
      key={i}
      className="tech-badge"
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {iconMap[t] ? (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {iconMap[t].icon}
          </motion.span>
          <span>{iconMap[t].label}</span>
        </>
      ) : (
        <span>{t}</span>
      )}
    </motion.span>
  ));
};

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="projects-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
      >
        🚀 My Technical Projects
      </motion.h2>

      <motion.div
        className="filter-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <AnimatePresence>
          {techOptions.map((tech, index) => (
            <motion.button
              key={tech}
              className={`filter-btn ${filter === tech ? "active" : ""}`}
              onClick={() => setFilter(tech)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.15, boxShadow: "0 6px 25px rgba(96, 165, 250, 0.6)" }}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.06,
                rotateX: 2,
                rotateY: 2,
                boxShadow: "0 30px 90px rgba(0, 0, 0, 0.75)",
              }}
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                {project.description}
              </motion.p>
              <motion.p
                className="tech-used"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
              >
                <b>🔧 Tech:</b>
              </motion.p>
              <motion.div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "6px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              >
                {getTechIcons(project.tech)}
              </motion.div>
              <motion.a
                href={project.link}
                className="visit-btn"
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.12,
                  boxShadow: "0 15px 45px rgba(79, 70, 229, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
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