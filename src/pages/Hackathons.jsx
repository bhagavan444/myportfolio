import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Hackathons.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.3 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -70, rotateZ: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateZ: 0,
    transition: { duration: 1, type: "spring", stiffness: 100 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 70, scale: 0.85, rotateY: -15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.9, type: "spring", stiffness: 90 },
  },
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

  const filteredCards =
    filter === "all"
      ? hackathons
      : hackathons.filter((card) => card.type === filter);

  return (
    <motion.div
      className="workshops-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a001a, #1a0040, #2a0060)",
        padding: "6rem 3rem",
        overflow: "hidden",
        willChange: "background, transform",
      }}
    >
      {/* Floating Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + i}px`,
            height: `${2 + i}px`,
            background: `radial-gradient(circle, rgba(0, 255, 204, 0.5), transparent)`,
            borderRadius: "50%",
            boxShadow: "0 0 40px rgba(0, 255, 204, 0.9)",
            top: `${5 + i * 4}%`,
            left: `${5 + i * 4}%`,
          }}
          animate={{
            y: [0, -70, 0],
            opacity: [0.3, 0.9, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 9 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Header */}
      <motion.div
        className="workshops-header"
        variants={headerVariants}
        style={{
          textAlign: "center",
          padding: "3rem",
          background: "rgba(20, 10, 40, 0.95)",
          border: "2px solid rgba(0, 255, 204, 0.6)",
          borderRadius: "20px",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(0, 255, 204, 0.4)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            color: "#00ffcc",
            textShadow:
              "0 0 60px rgba(0, 255, 204, 0.9), 0 0 80px rgba(255, 105, 180, 0.7)",
            marginBottom: "1.5rem",
            background:
              "linear-gradient(45deg, #00ffcc, #ff69b4, #00bfff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          ⚡ Hackathon Achievements
        </h2>
        <div
          className="underline"
          style={{ borderBottom: "3px solid rgba(0, 255, 204, 0.7)" }}
        ></div>
        <p
          style={{
            color: "#d0d8e8",
            fontSize: "1.3rem",
            maxWidth: "700px",
            margin: "0 auto 2rem",
            lineHeight: "1.8",
            textShadow: "0 0 20px rgba(0, 255, 204, 0.5)",
          }}
        >
          Showcasing my ability to deliver cutting-edge solutions under
          pressure, these hackathon successes highlight my technical expertise,
          teamwork, and innovative mindset.
        </p>

        {/* Filter Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            style={{
              padding: "0.6rem 1.5rem",
              background: "rgba(0, 255, 204, 0.2)",
              border: "1px solid rgba(0, 255, 204, 0.4)",
              borderRadius: "20px",
              color: "#00ffcc",
              cursor: "pointer",
            }}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            style={{
              padding: "0.6rem 1.5rem",
              background: "rgba(0, 255, 204, 0.2)",
              border: "1px solid rgba(0, 255, 204, 0.4)",
              borderRadius: "20px",
              color: "#00ffcc",
              cursor: "pointer",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2.5rem",
          maxWidth: "1300px",
          margin: "4rem auto 2rem",
          perspective: "1200px",
        }}
      >
        {filteredCards.map((item, index) => (
          <motion.div
            key={index}
            className="glass-card"
            variants={cardVariants}
            whileHover={{
              scale: 1.12,
              rotateX: 10,
              rotateY: 10,
              boxShadow:
                "0 25px 70px rgba(0, 255, 204, 0.8), 0 0 90px rgba(255, 105, 180, 0.7)",
            }}
            style={{
              background: "rgba(20, 10, 40, 0.95)",
              border: "2px solid rgba(0, 255, 204, 0.6)",
              borderRadius: "20px",
              padding: "2rem",
              textAlign: "center",
              backdropFilter: "blur(12px)",
              animation: "cardPulse 6s ease-in-out infinite",
            }}
          >
            <h3
              style={{
                fontSize: "1.8rem",
                color: "#00ffcc",
                marginBottom: "1rem",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                color: "#f0f0f5",
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
              }}
            >
              {item.description}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              {item.projLink && (
                <a
                  href={item.projLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0.7rem 1.5rem",
                    background:
                      "linear-gradient(90deg, #00ffcc, #ff33cc)",
                    color: "#0d0026",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
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
                    padding: "0.7rem 1.5rem",
                    background:
                      "linear-gradient(90deg, #00ffcc, #ff33cc)",
                    color: "#0d0026",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  🎓 View Certificate
                </a>
              )}
            </div>
            <p style={{ color: "#d1d5db", marginTop: "1rem" }}>{item.tag}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Hackathons;
