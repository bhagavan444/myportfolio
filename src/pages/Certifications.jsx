import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Certifications.css";

const certifications = [
  { name: "C for Everyone – Coursera", file: "https://drive.google.com/file/d/1_icpofMdYi5iGjbELOY0VHMBloGJDhAA/view?usp=drive_link" },
  { name: "Python for Everyone – Coursera", file: "https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link" },
  { name: "Python Django - Infosys Spring Board", file: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view?usp=drive_link" },
  { name: "JavaScript - Infosys Spring Board", file: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link" },
  { name: "Skill Up in Java - Infosys Spring Board", file: "https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link" },
  { name: "React - Infosys Spring Board", file: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link" },
  { name: "MLOps - Infosys Spring Board", file: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link" },
  { name: "ServiceNow - Infosys Spring Board", file: "https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view?usp=drive_link" },
  { name: "ML using Python - Infosys Spring Board", file: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view?usp=drive_link" },
  { name: "HTML - Infosys Spring Board", file: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link" },
  { name: "CSS - Infosys Spring Board", file: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link" },
  { name: "AWS Certified", file: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view?usp=drive_link" },
  { name: "Mastering Python - Infosys Spring Board", file: "https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link" },
  { name: "R Programming - Infosys Spring Board", file: "https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing" },
  { name: "Continuous Integration and Continuous Delivery - Infosys Spring Board", file: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing" },
  { name: "Large Language Model - IBM Skills", file: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing" },
  { name: "Mastering the Art of Programming - IBM Skills", file: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing" },
  { name: "Build Your First Chatbot - IBM Skills", file: "https://drive.google.com/file/d/1HOr1qGDbIZ_t-Uw3KJU9PGYk65xCW41R/view?usp=sharing" },
  { name: "Software Engineering - Infosys Spring Board", file: "https://drive.google.com/file/d/1siy3p3J8Y9yr8oSzrXMjf0fZ7V7iNKcl/view?usp=sharing" },
];

const Certifications = () => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto"; // allow vertical scrolling
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, type: "spring", stiffness: 50 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -60, rotateZ: -10 },
    visible: { opacity: 1, y: 0, rotateZ: 0, transition: { delay: 0.5, duration: 1, type: "spring", stiffness: 80 } },
  };

  const gridVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const cardVariants = { hidden: { opacity: 0, y: 50, rotateY: -15 }, visible: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 0.7, type: "spring", stiffness: 90 } } };

  return (
    <motion.div
      className="certifications-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a001a, #1a0040, #2a0060)",
        padding: "6rem 1.5rem",
        willChange: "background, transform",
      }}
    >
      {/* Background Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + i}px`,
            height: `${2 + i}px`,
            background: `radial-gradient(circle, rgba(0, 191, 255, 0.5), transparent)`,
            borderRadius: "50%",
            boxShadow: "0 0 25px rgba(0, 191, 255, 0.9)",
            top: `${(i * 7) % 100}%`,
            left: `${(i * 13) % 100}%`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.4, 0.9, 0.4], rotate: [0, 360] }}
          transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.h2
        className="cert-title"
        variants={titleVariants}
        style={{
          fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
          color: "#00bfff",
          textShadow: "0 0 40px rgba(0, 191, 255, 0.9), 0 0 60px rgba(255, 105, 180, 0.7)",
          fontWeight: "900",
          textAlign: "center",
          marginBottom: "3rem",
          background: "linear-gradient(45deg, #00bfff, #ff69b4, #00ffcc)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
        }}
      >
        My Certifications
      </motion.h2>

      <motion.div
        className="cert-grid"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
          perspective: "1000px",
        }}
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="cert-card"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: 5,
              boxShadow: "0 15px 40px rgba(0, 191, 255, 0.7), 0 0 50px rgba(255, 105, 180, 0.6)",
            }}
            whileTap={{ scale: 0.96, rotateZ: -5 }}
            style={{
              background: "rgba(20, 10, 40, 0.95)",
              border: "1.5px solid rgba(0, 191, 255, 0.6)",
              borderRadius: "15px",
              padding: "1.5rem",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              animation: "cardPulse 5s ease-in-out infinite",
            }}
          >
            <p
              className="cert-name"
              style={{
                fontSize: "1rem",
                color: "#d0d8e8",
                marginBottom: "1rem",
                textShadow: "0 0 15px rgba(0, 191, 255, 0.5)",
                background: "linear-gradient(90deg, #d0d8e8, #a3bffa)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
              title={cert.name}
            >
              📜 {cert.name}
            </p>
            <motion.a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-download-btn"
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(90deg, #0ea5e9, #3b82f6)",
                color: "#fff",
              }}
              whileTap={{ scale: 0.9 }}
              style={{
                display: "inline-block",
                padding: "0.6rem 1.5rem",
                background: "linear-gradient(90deg, #0ea5e9, #1d4ed8)",
                borderRadius: "20px",
                fontSize: "0.95rem",
                fontWeight: "700",
                color: "#d0d8e8",
                textDecoration: "none",
                textShadow: "0 0 10px rgba(14, 165, 233, 0.7)",
              }}
              aria-label={`Download certificate: ${cert.name}`}
            >
              View PDF
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Certifications;
