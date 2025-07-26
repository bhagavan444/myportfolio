import React from "react";
import { motion } from "framer-motion";
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
import "../components/Projects.css";

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
    OpenAI: { icon: <SiOpenai />, label: "OpenAI" },
    "OpenAI API": { icon: <SiOpenai />, label: "OpenAI API" },
    Socket: { icon: <SiSocketdotio />, label: "Socket.io" },
    "Socket.io": { icon: <SiSocketdotio />, label: "Socket.io" },
    Cloudinary: { icon: <SiCloudinary />, label: "Cloudinary" },
    Numpy: { icon: <SiNumpy />, label: "Numpy" },
    Numpys: { icon: <SiNumpy />, label: "Numpy" },
  };

  return tech.split(", ").map((t, i) => {
    const entry = iconMap[t];
    return (
      <span
        key={i}
        style={{
          marginRight: "12px",
          fontSize: "1.1rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {entry ? (
          <>
            {entry.icon}
            <span>{entry.label}</span>
          </>
        ) : (
          <span>{t}</span>
        )}
      </span>
    );
  });
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
    link: "https://github.com/bhagavan444/hacakthon-project",
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
  return (
    <div className="projects-container">
      <motion.h2
        className="projects-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🚀 My Technical Projects
      </motion.h2>

      <div className="projects-grid">
        {projectData.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="tech-used">
              <b>🔧 Tech:</b>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
              {getTechIcons(project.tech)}
            </div>
            <a
              href={project.link}
              className="visit-btn"
              target="_blank"
              rel="noreferrer"
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
