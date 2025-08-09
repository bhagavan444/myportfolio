import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Hackathons.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: -70, rotateZ: -10 },
  visible: { opacity: 1, y: 0, rotateZ: 0, transition: { duration: 1, type: "spring", stiffness: 100 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 70, scale: 0.85, rotateY: -15 },
  visible: { opacity: 1, y: 0, scale: 1, rotateY: 0, transition: { duration: 0.9, type: "spring", stiffness: 90 } },
};

// Hackathon data
const hackathons = [
  {
    type: "hackathon",
    title: "🚀 Hackathon - Brainovision x RCE 2025",
    description:
      "Led a high-performing team to victory in a 24-hour Hackathon hosted by Brainovision & RCE, developing a scalable MERN full-stack application for a second-hand electronics marketplace, outperforming 15+ teams with innovative UI/UX and robust backend optimization.",
    certLink: "https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view?usp=sharing",
    projLink: "https://github.com/bhagavan444/hacakthon-project",
    tag: "#MERN #Hackathon #Leadership #FullStack #Innovation",
  },
];

const Hackathons = () => {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const filteredCards = filter === "all" ? hackathons : hackathons.filter((card) => card.type === filter);

  return (
    <motion.div
      className="workshops-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #0a001a, #1a0040)",
        padding: "clamp(2rem, 5vw, 6rem) clamp(1rem, 2vw, 3rem)",
        overflow: "hidden",
      }}
    >
      {/* Floating Background Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${1.5 + i * 0.2}rem`,
            height: `${1.5 + i * 0.2}rem`,
            background: "rgba(0, 255, 204, 0.3)",
            borderRadius: "50%",
            top: `${5 + i * 3}%`,
            left: `${5 + i * 3}%`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Header */}
      <motion.div
        className="workshops-header"
        variants={headerVariants}
        style={{
          textAlign: "center",
          padding: "clamp(1.5rem, 3vw, 3rem)",
          background: "rgba(20, 10, 40, 0.95)",
          border: "2px solid rgba(0, 255, 204, 0.6)",
          borderRadius: "1.25rem",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
          marginBottom: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
            color: "#00ffcc",
            marginBottom: "1rem",
          }}
        >
          ⚡ Hackathon Achievements
        </h2>
        <div className="underline" style={{ borderBottom: "2px solid rgba(0, 255, 204, 0.7)" }}></div>
        <p
          style={{
            color: "#d0d8e8",
            fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)",
            maxWidth: "600px",
            margin: "0 auto 1.5rem",
            lineHeight: 1.6,
          }}
        >
          Showcasing my ability to deliver cutting-edge solutions under pressure, these hackathon successes highlight my technical expertise, teamwork, and innovative mindset.
        </p>

        {/* Filter Buttons */}
        <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(0, 255, 204, 0.2)",
              border: "1px solid rgba(0, 255, 204, 0.4)",
              borderRadius: "1rem",
              color: "#00ffcc",
              cursor: "pointer",
              fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
            }}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(0, 255, 204, 0.2)",
              border: "1px solid rgba(0, 255, 204, 0.4)",
              borderRadius: "1rem",
              color: "#00ffcc",
              cursor: "pointer",
              fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
            }}
            onClick={() => setFilter("hackathon")}
          >
            Hackathons
          </button>
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "clamp(1rem, 2vw, 2.5rem)",
          maxWidth: "1300px",
          margin: "0 auto",
          perspective: "1000px",
        }}
      >
        {filteredCards.map((item, index) => (
          <motion.div
            key={index}
            className="glass-card"
            variants={cardVariants}
            whileHover={{ scale: 1.08, boxShadow: "0 15px 40px rgba(0, 255, 204, 0.6)" }}
            style={{
              background: "rgba(20, 10, 40, 0.95)",
              border: "2px solid rgba(0, 255, 204, 0.6)",
              borderRadius: "1.25rem",
              padding: "clamp(1rem, 2vw, 2rem)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#00ffcc", marginBottom: "1rem" }}>
              {item.title}
            </h3>
            <p style={{ color: "#f0f0f5", fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)", marginBottom: "1.5rem" }}>
              {item.description}
            </p>
            <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
              {item.projLink && (
                <a
                  href={item.projLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0.6rem 1.2rem",
                    background: "#00ffcc",
                    color: "#0d0026",
                    borderRadius: "0.75rem",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                  }}
                >
                  🔗 View Project
                </a>
              )}
              {item.certLink && (
                <a
                  href={item.certLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0.6rem 1.2rem",
                    background: "#00ffcc",
                    color: "#0d0026",
                    borderRadius: "0.75rem",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                  }}
                >
                  🎓 View Certificate
                </a>
              )}
            </div>
            <p style={{ color: "#d1d5db", fontSize: "clamp(0.8rem, 1.5vw, 1rem)", marginTop: "1rem" }}>{item.tag}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Hackathons;