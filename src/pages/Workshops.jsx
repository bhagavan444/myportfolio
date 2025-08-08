import React from "react";
import "../components/Workshops.css";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

// Each workshop as its own card with a unique title and summary
const workshops = [
  {
    title: "🔍 Machine Learning (ML)",
    description:
      "Hands-on experience with supervised and unsupervised learning techniques. Explored model building, evaluation, and tuning using Scikit-learn.",
  },
  {
    title: "🧠 Deep Learning (DL)",
    description:
      "Built CNNs for image classification using TensorFlow and Keras. Understood backpropagation, activation functions, and optimization techniques.",
  },
  {
    title: "📱 Mobile App Development",
    description:
      "Developed cross-platform mobile apps using Flutter. Focused on UI/UX principles, navigation, state management, and REST API integration.",
  },
  {
    title: "🌐 Web Development",
    description:
      "Created responsive web applications using HTML, CSS, JavaScript, and React. Gained experience in component-based architecture and frontend optimization.",
  },
  {
    title: "🤖 Introduction to Artificial Intelligence",
    description:
      "Explored AI fundamentals, real-world use cases, ethical considerations, and logic-based AI systems through interactive sessions.",
  },
  {
    title: "💻 Full Stack Development Bootcamp",
    description:
      "Completed a comprehensive MERN stack bootcamp. Built and deployed full-stack apps with Express.js, MongoDB, React, and Node.js.",
  },
];

const Workshops = () => {
  return (
    <motion.div
      className="workshops-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="workshops-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title">📖 Technical Workshops</h2>
        <div className="underline"></div>
        <p className="intro-text">
          I’ve attended various technical workshops to strengthen my practical skills and stay updated with evolving technologies. Here are a few impactful ones:
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {workshops.map((item, index) => (
          <motion.div
            className="glass-card"
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="card-title">{item.title}</h3>
            <p className="card-description">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Workshops;
