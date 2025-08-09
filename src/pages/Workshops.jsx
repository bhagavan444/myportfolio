import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Workshops.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
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

// Workshop data
const workshops = [
  { title: "🔍 Machine Learning (ML)", description: "Hands-on experience with supervised and unsupervised learning techniques. Explored model building, evaluation, and tuning using Scikit-learn." },
  { title: "🧠 Deep Learning (DL)", description: "Built CNNs for image classification using TensorFlow and Keras. Understood backpropagation, activation functions, and optimization techniques." },
  { title: "📱 Mobile App Development", description: "Developed cross-platform mobile apps using Flutter. Focused on UI/UX principles, navigation, and state management with REST API integration." },
  { title: "🌐 Web Development", description: "Created responsive web applications using HTML, CSS, JavaScript, and React. Mastered component-based architecture and frontend optimization." },
  { title: "🤖 Introduction to Artificial Intelligence", description: "Explored AI fundamentals, real-world use cases, ethical considerations, and logic-based AI systems through interactive sessions." },
  { title: "💻 Full Stack Development Bootcamp", description: "Completed a comprehensive MERN stack bootcamp. Built and deployed full-stack apps with Express.js, MongoDB, React, and Node.js." },
];

const Workshops = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
      {/* Background Particles */}
      {[...Array(22)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + i}px`,
            height: `${2 + i}px`,
            background: `radial-gradient(circle, rgba(0, 191, 255, 0.5), transparent)`,
            borderRadius: "50%",
            boxShadow: "0 0 40px rgba(0, 191, 255, 0.9)",
            top: `${5 + i * 4}%`,
            left: `${5 + i * 4}%`,
            willChange: "transform",
          }}
          animate={{
            y: [0, -70, 0],
            opacity: [0.3, 0.9, 0.3],
            rotate: [0, 360],
          }}
          transition={{ duration: 9 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Header Section */}
      <motion.div
        className="workshops-header"
        variants={headerVariants}
        style={{
          textAlign: "center",
          padding: "3rem",
          background: "rgba(20, 10, 40, 0.95)",
          border: "2px solid rgba(0, 191, 255, 0.6)",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(0, 191, 255, 0.4)",
          backdropFilter: "blur(12px)",
          transformStyle: "preserve-3d",
          willChange: "transform, box-shadow",
        }}
      >
        <h2 className="section-title" style={{
          fontSize: "1.7rem",
          color: "#00bfff",
          textShadow: "0 0 60px rgba(0, 191, 255, 0.9), 0 0 80px rgba(255, 105, 180, 0.7)",
          marginBottom: "1.5rem",
          background: "linear-gradient(45deg, #00bfff, #ff69b4, #00ffcc)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          animation: "gradientFlow 10s linear infinite",
        }}>
          📖 Technical Workshops
        </h2>
        <div className="underline" style={{ borderBottom: "3px solid rgba(0, 191, 255, 0.7)" }}></div>
        <p className="intro-text" style={{
          color: "#d0d8e8",
          fontSize: "1.3rem",
          maxWidth: "700px",
          margin: "0 auto 2rem",
          lineHeight: "1.8",
          textShadow: "0 0 20px rgba(0, 191, 255, 0.5)",
          background: "linear-gradient(90deg, #d0d8e8, #a3bffa)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
        }}>
          I’ve immersed myself in various technical workshops to sharpen my practical skills and keep pace with cutting-edge technologies. Explore these impactful sessions:
        </p>
      </motion.div>

      {/* Cards Grid Section */}
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
        {workshops.map((workshop, index) => (
          <motion.div
            key={index}
            className="glass-card"
            variants={cardVariants}
            whileHover={{
              scale: 1.12,
              rotateX: 10,
              rotateY: 10,
              boxShadow: "0 25px 70px rgba(0, 191, 255, 0.8), 0 0 90px rgba(255, 105, 180, 0.7)",
              transition: { duration: 0.6 },
            }}
            whileTap={{ scale: 0.96, rotateZ: -5 }}
            style={{
              background: "rgba(20, 10, 40, 0.95)",
              border: "2px solid rgba(0, 191, 255, 0.6)",
              borderRadius: "20px",
              padding: "2rem",
              textAlign: "center",
              backdropFilter: "blur(12px)",
              transformStyle: "preserve-3d",
              willChange: "transform, box-shadow",
              animation: "cardPulse 6s ease-in-out infinite",
            }}
          >
            <h3 className="card-title" style={{
              fontSize: "1.8rem",
              color: "#00ffcc",
              marginBottom: "1rem",
              textShadow: "0 0 20px rgba(0, 255, 204, 0.6)",
              background: "linear-gradient(45deg, #00ffcc, #ff69b4)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}>
              {workshop.title}
            </h3>
            <p className="card-description" style={{
              color: "#f0f0f5",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              textShadow: "0 0 15px rgba(0, 191, 255, 0.4)",
            }}>
              {workshop.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Workshops;