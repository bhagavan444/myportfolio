import React, { useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Internships.css";

// Internship Data
const internshipData = [
  {
    title: "AI, ML & Data Science Intern (AIML&DS)",
    company: "Blackbucks Pvt Ltd",
    duration: "May 2024 - June 2024 (2 Months)",
    description:
      "Completed a certified internship in AI, ML & Data Science (AIMLDS). Worked on real-time datasets, implemented preprocessing, exploratory data analysis (EDA), and built predictive models using Python, Pandas, NumPy, and scikit-learn.",
    certificateLink:
      "https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view?usp=sharing",
  },
  {
    title: "AI & Machine Learning Intern (AI&ML)",
    company: "SmartBridge (in collaboration with Eduskills)",
    duration: "May 2025 – June 2025 (2 Months)",
    description:
      "Successfully completed a certified internship in Artificial Intelligence & Machine Learning focused on image classification. Developed a deep learning-based Fruit and Vegetable Disease Classifier using transfer learning with MobileNetV2. Implemented model training, validation, and Flask-based deployment for real-time disease detection.",
    certificateLink:
      "https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view?usp=sharing",
  },
];

// Internship Card Component
const InternshipCard = ({ title, company, duration, description, certificateLink }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, type: "spring", stiffness: 90 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.article
      className="internship-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{
        scale: 1.1,
        boxShadow: "0 30px 80px rgba(0, 191, 255, 0.7), 0 0 90px rgba(255, 105, 180, 0.6)",
        transition: { duration: 0.5 },
      }}
      whileTap={{ scale: 0.95, rotateZ: -5 }}
      viewport={{ once: true }}
      style={{
        background: "rgba(20, 10, 40, 0.95)",
        border: "2px solid rgba(0, 191, 255, 0.6)",
        borderRadius: "20px",
        padding: "2.5rem",
        textAlign: "center",
        backdropFilter: "blur(12px)",
        transformStyle: "preserve-3d",
        willChange: "transform, box-shadow",
        animation: "cardPulse 6s ease-in-out infinite",
      }}
    >
      <header>
        <motion.h2
          className="internship-role"
          variants={textVariants}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "1.8rem",
            color: "#00ffcc",
            textShadow: "0 0 25px rgba(0, 255, 204, 0.7)",
            marginBottom: "1.5rem",
            background: "linear-gradient(45deg, #00ffcc, #ff69b4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          {title}
        </motion.h2>
      </header>

      <div className="internship-details">
        <motion.p
          variants={textVariants}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "1.1rem",
            color: "#d0d8e8",
            margin: "0.8rem 0",
            textShadow: "0 0 15px rgba(0, 191, 255, 0.4)",
          }}
        >
          <strong style={{ color: "#00ffcc" }}>Company:</strong> {company}
        </motion.p>
        <motion.p
          variants={textVariants}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: "1.1rem",
            color: "#d0d8e8",
            margin: "0.8rem 0",
            textShadow: "0 0 15px rgba(0, 191, 255, 0.4)",
          }}
        >
          <strong style={{ color: "#00ffcc" }}>Duration:</strong> {duration}
        </motion.p>
        <motion.p
          variants={textVariants}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: "1.1rem",
            color: "#d0d8e8",
            margin: "0.8rem 0",
            textShadow: "0 0 15px rgba(0, 191, 255, 0.4)",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: "#00ffcc" }}>Description:</strong> {description}
        </motion.p>
      </div>

      <motion.a
        href={certificateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="internship-btn"
        variants={textVariants}
        transition={{ delay: 0.7 }}
        whileHover={{
          scale: 1.15,
          background: "linear-gradient(90deg, #ff33cc, #00ffcc, #00bfff)",
          boxShadow: "0 20px 60px rgba(255, 51, 153, 0.8)",
          color: "#0d0026",
        }}
        whileTap={{ scale: 0.92 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "1rem 2.5rem",
          background: "linear-gradient(90deg, #ff33cc, #1d4ed8)",
          border: "none",
          borderRadius: "30px",
          fontSize: "1.2rem",
          fontWeight: "700",
          color: "#fff",
          textDecoration: "none",
          textShadow: "0 0 15px rgba(255, 51, 153, 0.7)",
          transition: "all 0.5s ease",
          transformStyle: "preserve-3d",
        }}
        aria-label={`View certificate for ${title}`}
      >
        View Certificate{" "}
        <FaExternalLinkAlt
          className="ml-2"
          style={{ transition: "transform 0.3s", verticalAlign: "middle", color: "#0d0026" }}
        />
      </motion.a>
    </motion.article>
  );
};

const Internships = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, type: "spring", stiffness: 60 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -90, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, type: "spring", stiffness: 110 },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.section
      className="internships-container"
      variants={sectionVariants}
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
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + i}px`,
            height: `${2 + i}px`,
            background: `radial-gradient(circle, rgba(0, 191, 255, 0.5), transparent)`,
            borderRadius: "50%",
            boxShadow: "0 0 35px rgba(0, 191, 255, 0.9)",
            top: `${5 + i * 4}%`,
            left: `${5 + i * 4}%`,
            willChange: "transform",
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.3, 0.9, 0.3],
            rotate: [0, 360],
          }}
          transition={{ duration: 8 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.h1
        className="internship-title"
        variants={titleVariants}
        style={{
          fontSize: "2.5rem",
          color: "#00bfff",
          textShadow: "0 0 60px rgba(0, 191, 255, 0.9), 0 0 80px rgba(255, 105, 180, 0.7)",
          fontWeight: "900",
          textAlign: "center",
          marginBottom: "4rem",
          background: "linear-gradient(45deg, #00bfff, #ff69b4, #00ffcc)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          animation: "gradientFlow 10s linear infinite",
        }}
      >
        My Internships
      </motion.h1>

      <motion.div
        className="internship-grid"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "3rem",
          maxWidth: "1400px",
          margin: "0 auto",
          perspective: "1200px",
        }}
      >
        {internshipData.map((intern, index) => (
          <InternshipCard key={index} {...intern} />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Internships;