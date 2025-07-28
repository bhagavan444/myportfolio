import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Hackathons.css";

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
    title: "🚀 Hackathon  - Brainovision x RCE 2025",
    description:
      "Led a high-performing team to victory in a 24-hour Hackathon hosted by Brainovision & RCE, developing a scalable MERN full-stack application for a second-hand electronics marketplace, outperforming 15+ teams with innovative UI/UX and robust backend optimization.",
    certLink: "https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view?usp=sharing",
    projLink: "https://github.com/bhagavan444/hacakthon-project",
    tag: "#MERN #Hackathon #Leadership #FullStack #Innovation",
  }
];

const Hackathons = () => {
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
        <h2 className="section-title">⚡ Hackathon Achievements</h2>
        <div className="underline"></div>
        <p className="intro-text">
          Showcasing my ability to deliver cutting-edge solutions under pressure, these hackathon successes highlight my technical expertise, teamwork, and innovative mindset—key assets for driving your organization forward.
        </p>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          
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

export default Hackathons;