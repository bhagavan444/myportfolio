import React from "react";
import { motion } from "framer-motion";
import "../components/Projects.css";

const projectData = [
  {
    title: "🧠 AI-Powered Resume Builder",
    description:
      "An intelligent MERN stack application that allows users to create professional resumes using modern templates, and evaluate them using ATS (Applicant Tracking System) scoring. Integrated Google and GitHub authentication, dynamic form handling, and PDF/Word export features. Resume data is stored in MongoDB, and scoring is based on keyword matching using a Node.js API.",
    tech: "MongoDB, Express.js, React.js, Node.js, Firebase Auth, HTML2PDF",
    link: "https://github.com/bhagavan444/resumeanalyzer",
  },
  {
    title: "🍏 Fruit & Vegetable Disease Classifier",
    description:
      "Developed a deep learning-based Flask web app using MobileNetV2 (Transfer Learning) to detect whether uploaded images of fruits or vegetables are healthy or rotten. Trained on a custom Kaggle dataset with real-world image categories like Fresh Apple, Rotten Tomato, etc. Features include real-time prediction, smooth UI with animated cards, and responsive design.",
    tech: "TensorFlow, Keras, MobileNetV2, Flask, React, CSS3, Python",
    link: "https://github.com/bhagavan444/smartbidgeproject",
  }, 
  {   
    title: "🎯 Career Path Recommendation System",
    description:
      "Machine Learning-based web application that suggests suitable career paths based on user’s academic background, skillset, and interests. Collected real-world career data, applied classification algorithms, and built a Flask backend for predictions. Frontend displays dynamic suggestions, career roadmap, and learning resources.",
    tech: "Python, Flask, React.js, Scikit-learn, Pandas, HTML/CSS",
    link: "https://github.com/bhagavan444/career-path-project",
  },
  {
    title: "💻 Online 2nd Hand Electronics Selling Platform",
    description:
      "Developed during a 24-hour hackathon, this is a full-stack web platform for users to list and buy second-hand electronic products. Features include secure user login, product image uploads, real-time messaging, and categorized listings. This was built using MERN stack and implemented in a team collaboration setup.",
    tech: "MongoDB, Express, React, Node.js, Cloudinary, Socket.io",
    link: "https://github.com/bhagavan444/hacakthon-project",
  },
  {
    title: "Fake News Detector",
    description: "An AI-powered web application using NLP and machine learning to classify news articles as real or fake based on their content.",
    tech:"Python, Flask, Scikit-learn, TF-IDF, NLTK, HTML/CSS",
    link: "https://github.com/bhagavan444/fake-news-detector"
  },
  {
    title: "Smart Career Chatbot",
    description: "An intelligent career counseling chatbot built with LangChain and OpenAI API that interacts with students and suggests career paths.",
    tech: "LangChain, OpenAI API, Flask, React",
    link: "https://github.com/bhagavan444/smart-career-chatbot"
  },
   {
    title: "Diabetes Predictor",
    description: "A machine learning-based Flask web app that predicts the likelihood of diabetes using medical input data. Includes a user-friendly UI.",
    tech: "Python, Flask, Scikit-learn, Pandas, HTML/CSS",
    link: "https://github.com/bhagavan444/diabetes-predictor-app"
  },
  {
    title: "Career Path Recommendation System",
    description: "A smart recommendation system that analyzes skills and interests to suggest suitable career paths using ML and Flask web interface.",
    tech: "Python, Flask, Scikit-learn, Pandas, HTML/CSS",
    link : "https://github.com/bhagavan444/career-path-project"
  }  
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
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="tech-used">🔧 <b>Technologies:</b> {project.tech}</p>
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
