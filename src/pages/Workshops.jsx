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
    type: "hackathon",
    title: "🚀 Hackathon - Brainovision x RCE",
    description:
      "Participated in a 24-hour Hackathon by Brainovision & RCE. Built a full-stack MERN app for buying and selling second-hand electronics, inspired by OLX.",
    certLink: "https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view?usp=sharing",
    projLink: "https://github.com/bhagavan444/hacakthon-project",
    tag: "#MERN #Hackathon #FullStack",
  },
  {
    type: "workshop",
    title: "📚 Workshops Attended",
    list: [
      "🔬 Machine Learning – Supervised & unsupervised learning, model training with Scikit-learn.",
      "🧠 Deep Learning – CNNs, image classification using TensorFlow & Keras.",
      "📱 Mobile App Dev – Flutter-based Android apps and UI/UX best practices.",
      "🌐 Web Development – Responsive design with HTML, CSS, JS & React.",
    ],
    tag: "#ML #DL #Flutter #WebDev",
  },
];

const Workshops = () => {
  const [filter, setFilter] = useState("all");

  const filteredCards =
    filter === "all" ? data : data.filter((card) => card.type === filter);

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
        <h2 className="section-title">⚡ Workshops & Hackathons</h2>
        <div className="underline"></div>
        <p className="intro-text">
          Here's a glimpse of my hands-on learning through Hackathons and Technical Workshops I participated in.
        </p>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "hackathon" ? "active" : ""}
            onClick={() => setFilter("hackathon")}
          >
            Hackathons
          </button>
          <button
            className={filter === "workshop" ? "active" : ""}
            onClick={() => setFilter("workshop")}
          >
            Workshops
          </button>
        </div>
      </motion.div>

      {/* 🔲 Cards Grid */}
      <div className="cards-grid">
        {filteredCards.map((item, index) => (
          <motion.div
            className="glass-card"
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="card-title">{item.title}</h3>
            {item.description && <p>{item.description}</p>}

            {item.list && (
              <ul className="workshop-list">
                {item.list.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}

            <div className="button-group">
              {item.projLink && (
                <a
                  href={item.projLink}
                  className="view-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 View Project
                </a>
              )}
              {item.certLink && (
                <a
                  href={item.certLink}
                  className="view-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🎓 View Certificate
                </a>
              )}
            </div>
            <p className="tag">{item.tag}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Workshops;
