import React from "react";
import { motion } from "framer-motion";
import "./Education.css"; // ✅ Link your CSS here

// Education Data
const educationData = [
  {
    sno: 1,
    qualification: "B Tech - Artificial Intelligence And Data Science (Presently pursuing Final Year)",
    board: "Jawaharlal Nehru Technological University (Kakinada)",
    college: "Ramachandra College of Engineering",
    cgpa: "7.5 (Present)",
  },
  {
    sno: 2,
    qualification: "Intermediate - MPC",
    board: "Board of Intermediate Education",
    college: "Sri Vidya Junior College",
    cgpa: "8.0 CGPA",
    certificateLink: "https://drive.google.com/file/d/113yi6vME2ZiAfc8kLLvP6Vvfy8VUUMa3/view?usp=sharing",
  },
  {
    sno: 3,
    qualification: "SSC",
    board: "Secondary School Certificate",
    school: "Montessori English Medium High School",
    cgpa: "9.8 GPA",
    certificateLink: "https://drive.google.com/file/d/1u0T6y17c92h46HUbkMAcDXJhuTxcGkBn/view?usp=sharing",
  },
];

// Inline styles for a stylish design
const styles = {
  container: {
    padding: "3rem 2rem",
    background: "linear-gradient(135deg, #0d0026, #1e003b)",
    minHeight: "100vh",
    color: "#f0f0f5",
    overflowX: "hidden",
  },
  title: {
    fontSize: "3.3rem",
    textAlign: "center",
    color: "#00ffcc",
    textShadow: "0 0 25px rgba(0, 255, 204, 0.9)",
    marginBottom: "2.5rem",
    animation: "pulseGlow 2s ease-in-out infinite alternate",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(0, 255, 204, 0.3)",
    borderRadius: "18px",
    padding: "2rem",
    margin: "1.5rem",
    textAlign: "left",
    transition: "all 0.4s ease",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6)",
  },
  cardTitle: {
    fontSize: "1.7rem",
    color: "#00ffcc",
    marginBottom: "1rem",
    textShadow: "0 0 10px rgba(0, 255, 204, 0.5)",
  },
  label: {
    color: "#00ffcc",
    fontWeight: "600",
    marginRight: "0.5rem",
  },
  certificateLink: {
    display: "inline-block",
    padding: "0.6rem 1.2rem",
    background: "linear-gradient(90deg, #00ffcc, #ff33cc)",
    color: "#0d0026",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
    marginTop: "1rem",
  },
};

// Animation keyframes (to be added to Education.css)
const animationStyles = `
  @keyframes pulseGlow {
    from { text-shadow: 0 0 15px rgba(0, 255, 204, 0.6); }
    to { text-shadow: 0 0 30px rgba(0, 255, 204, 0.9), 0 0 40px rgba(255, 51, 153, 0.5); }
  }
`;

const Education = () => {
  return (
    <motion.div
      className="education-beast-container"
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      <style>{animationStyles}</style>
      <motion.h1
        className="education-beast-title"
        style={styles.title}
        initial={{ opacity: 0, y: -60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 110 }}
      >
        My Education
      </motion.h1>

      <motion.div
        className="education-grid-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {educationData.map((edu, index) => (
          <motion.div
            key={edu.sno}
            className="education-beast-card"
            style={styles.card}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: index * 0.25 }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 45px rgba(0, 255, 204, 0.7)" }}
            viewport={{ once: true }}
          >
            <motion.h2
              style={styles.cardTitle}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.25 + 0.2, duration: 0.5 }}
            >
              #{edu.sno} • {edu.qualification}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.25 + 0.3, duration: 0.5 }}
            >
              <span style={styles.label}>Board:</span> {edu.board}
            </motion.p>

            {edu.college && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.25 + 0.4, duration: 0.5 }}
              >
                <span style={styles.label}>College:</span> {edu.college}
              </motion.p>
            )}

            {edu.school && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.25 + 0.5, duration: 0.5 }}
              >
                <span style={styles.label}>School:</span> {edu.school}
              </motion.p>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.25 + 0.6, duration: 0.5 }}
            >
              <span style={styles.label}>CGPA:</span> {edu.cgpa}
            </motion.p>

            {edu.certificateLink && (
              <motion.a
                href={edu.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.certificateLink}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.25 + 0.7, duration: 0.5 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 10px 30px rgba(255, 51, 153, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                🔗 View Certificate
              </motion.a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Education;