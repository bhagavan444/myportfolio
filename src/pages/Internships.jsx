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
      whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0, 191, 255, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      viewport={{ once: true }}
      style={{
        background: "rgba(20, 10, 40, 0.95)",
        border: "2px solid rgba(0, 191, 255, 0.6)",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        textAlign: "center",
        backdropFilter: "blur(10px)",
        transformStyle: "preserve-3d",
      }}
    >
      <header>
        <motion.h2
          className="internship-role"
          variants={textVariants}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
            color: "#00ffcc",
            marginBottom: "1rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
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
            fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
            color: "#d0d8e8",
            margin: "0.6rem 0",
          }}
        >
          <strong style={{ color: "#00ffcc" }}>Company:</strong> {company}
        </motion.p>
        <motion.p
          variants={textVariants}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
            color: "#d0d8e8",
            margin: "0.6rem 0",
          }}
        >
          <strong style={{ color: "#00ffcc" }}>Duration:</strong> {duration}
        </motion.p>
        <motion.p
          variants={textVariants}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
            color: "#d0d8e8",
            margin: "0.6rem 0",
            lineHeight: 1.5,
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
        whileHover={{ scale: 1.1, background: "#00bfff" }}
        whileTap={{ scale: 0.9 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "0.75rem 1.5rem",
          background: "#1d4ed8",
          borderRadius: "1.5rem",
          fontSize: "clamp(0.9rem, 1.6vw, 1.2rem)",
          fontWeight: "700",
          color: "#fff",
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
        aria-label={`View certificate for ${title}`}
      >
        View Certificate{" "}
        <FaExternalLinkAlt className="ml-2" style={{ verticalAlign: "middle" }} />
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
    visible: { opacity: 1, transition: { duration: 1.2, type: "spring", stiffness: 60 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -60, scale: 0.85 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, type: "spring", stiffness: 110 } },
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
        background: "linear-gradient(135deg, #0a001a, #1a0040)",
        padding: "clamp(2rem, 5vw, 6rem) clamp(1rem, 2vw, 3rem)",
        overflow: "hidden",
      }}
    >
      {/* Background Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${1.5 + i * 0.2}rem`,
            height: `${1.5 + i * 0.2}rem`,
            background: "rgba(0, 191, 255, 0.3)",
            borderRadius: "50%",
            top: `${5 + i * 3}%`,
            left: `${5 + i * 3}%`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.h1
        className="internship-title"
        variants={titleVariants}
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          color: "#00bfff",
          textAlign: "center",
          marginBottom: "clamp(1.5rem, 3vw, 4rem)",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(1rem, 2vw, 3rem)",
          maxWidth: "1400px",
          margin: "0 auto",
          perspective: "1000px",
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