import React, { useState } from "react";
import "../components/Workshops.css";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const data = [
  {
    type: "workshop",
    title: "📚 Technical Workshops Attended",
    list: [
      "🔍 **Machine Learning (ML)** – Gained practical experience with supervised and unsupervised algorithms, explored model training, validation, and evaluation using Scikit-learn.",
      "🧠 **Deep Learning (DL)** – Hands-on sessions on building Convolutional Neural Networks (CNNs) for image classification using TensorFlow & Keras.",
      "📱 **Mobile App Development** – Designed cross-platform mobile applications using Flutter, with a focus on UI/UX principles and integration with APIs.",
      "🌐 **Web Development** – Developed responsive web applications using HTML, CSS, JavaScript, and React. Covered frontend best practices and performance optimization.",
      "🤖 **Introduction to Artificial Intelligence** – Understood AI fundamentals, real-time use cases, and ethics in AI through interactive sessions.",
      "💻 **Full Stack Development Bootcamp** – Participated in a structured program on MERN stack development, including REST API design, MongoDB integration, and deployment practices.",
    ],
    tag: "#ML #DL #AI #Flutter #React #FullStack",
  },
];

const Workshops = () => {
  const [filter, setFilter] = useState("all");

  // Extract unique filter options from type and tags
  const filterOptions = ["all", ...new Set(data.flatMap((item) => [item.type, ...item.tag.split(" ").map(t => t.replace("#", ""))]))];

  const filteredCards = filter === "all"
    ? data
    : data.filter((card) => card.type === filter || card.tag.includes(`#${filter}`));

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
          I actively participate in workshops to build practical knowledge and stay updated with emerging technologies. Here’s a summary of the most impactful ones I've attended.
        </p>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {filterOptions.map((option) => (
            <button
              key={option}
              className={`filter-btn ${filter === option ? "active" : ""}`}
              onClick={() => setFilter(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1).replace("#", "")}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {filteredCards.map((item, index) => (
          <motion.div
            className="glass-card"
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="card-title">{item.title}</h3>

            {item.list && (
              <ul className="workshop-list">
                {item.list.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}

            <p className="tag">{item.tag}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Workshops;