import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import resumePDF from "../assets/bhagavanresume.pdf";

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "+" && isModalOpen) setZoomLevel((prev) => Math.min(prev + 0.2, 2));
      if (e.key === "-" && isModalOpen) setZoomLevel((prev) => Math.max(prev - 0.2, 1));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20, y: 80 },
    visible: { opacity: 1, scale: 1, rotateY: 0, y: 0, transition: { duration: 1.2, type: "spring", stiffness: 70, damping: 12 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { delay: 0.4, duration: 1, type: "spring" } },
  };

  const descVariants = {
    hidden: { opacity: 0, y: 40, skewX: 5 },
    visible: { opacity: 1, y: 0, skewX: 0, transition: { delay: 0.6, duration: 1.1 } },
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 0.95, backdropFilter: "blur(12px)", transition: { duration: 0.7 } },
    exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.5 } },
  };

  const modalContentVariants = {
    hidden: { scale: 0.6, opacity: 0, y: 100, rotateZ: -10 },
    visible: { scale: 1, opacity: 1, y: 0, rotateZ: 0, transition: { duration: 0.8, type: "spring", stiffness: 90 } },
    exit: { scale: 0.6, opacity: 0, y: -100, rotateZ: 10, transition: { duration: 0.6 } },
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  const iframeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.7 } },
  };

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);

  return (
    <motion.section
      className="resume-container"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #0a001a, #1a0040)",
        padding: "clamp(2rem, 5vw, 5rem) clamp(1rem, 2vw, 3rem)",
        overflow: "hidden",
        opacity,
        scale,
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.5 }}
    >
      {/* Enhanced Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${1 + i * 0.5}rem`,
            height: `${1 + i * 0.5}rem`,
            background: "rgba(0, 191, 255, 0.6)",
            borderRadius: "50%",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
        />
      ))}

      <motion.article
        className="resume-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05, boxShadow: "0 25px 70px rgba(0, 191, 255, 0.6)", rotateY: 5 }}
        whileTap={{ scale: 0.97 }}
        role="article"
        aria-label="Resume Card"
        style={{
          background: "rgba(20, 10, 40, 0.95)",
          border: "2px solid rgba(0, 191, 255, 0.7)",
          borderRadius: "1.5rem",
          padding: "clamp(2rem, 4vw, 4rem)",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          backdropFilter: "blur(12px)",
        }}
      >
        <motion.h2
          className="resume-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1, color: "#00ff99", textShadow: "0 0 20px #00ff99" }}
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#00bfff",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          🚀 Bhagavan's Professional Resume
        </motion.h2>

        <motion.p
          className="resume-description"
          variants={descVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ color: "#00ff99", textShadow: "0 0 15px #00ff99" }}
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
            color: "#d0d8e8",
            maxWidth: "700px",
            margin: "0 auto clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.7,
          }}
        >
          Dive into my full-stack odyssey, highlighting groundbreaking projects, 
          dynamic internships, and exceptional problem-solving prowess, engineered 
          for delivering cutting-edge, scalable solutions in evolving tech landscapes.
        </motion.p>

        <div
          className="resume-btn-group"
          style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.button
            className="resume-btn preview-btn"
            whileHover={{ scale: 1.15, background: "#1d4ed8", boxShadow: "0 0 30px #1d4ed8", rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsModalOpen(true)}
            aria-label="Preview Resume"
            transition={{ duration: 0.5 }}
            style={{
              padding: "clamp(1rem, 2vw, 1.5rem) clamp(2rem, 3vw, 3rem)",
              background: "#0ea5e9",
              border: "none",
              borderRadius: "2rem",
              fontSize: "clamp(1.2rem, 2.2vw, 1.4rem)",
              fontWeight: "700",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.4s ease",
            }}
          >
            👁️‍🗨️ Preview Resume
          </motion.button>

          <motion.a
            href={resumePDF}
            download
            className="resume-btn download-btn"
            whileHover={{ scale: 1.15, background: "#047857", boxShadow: "0 0 30px #047857", rotate: -360 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Download Resume PDF"
            transition={{ duration: 0.5 }}
            style={{
              padding: "clamp(1rem, 2vw, 1.5rem) clamp(2rem, 3vw, 3rem)",
              background: "#10b981",
              border: "none",
              borderRadius: "2rem",
              fontSize: "clamp(1.2rem, 2.2vw, 1.4rem)",
              fontWeight: "700",
              color: "#fff",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.4s ease",
            }}
          >
            📥 Download PDF
          </motion.a>
        </div>
      </motion.article>

      {/* Enhanced Modal Viewer */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="resume-modal-overlay"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-label="Resume Preview Modal"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3000,
            }}
          >
            <motion.div
              className="resume-modal-content"
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0, 191, 255, 0.7)" }}
              style={{
                background: "rgba(20, 10, 40, 0.98)",
                border: "2px solid rgba(0, 191, 255, 0.8)",
                borderRadius: "1.5rem",
                padding: "clamp(1.5rem, 3vw, 3rem)",
                maxWidth: "95vw",
                maxHeight: "95vh",
                overflow: "auto",
                position: "relative",
              }}
            >
              <motion.button
                className="resume-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Resume Modal"
                whileHover={{ scale: 1.3, color: "#ff69b4", rotate: 180 }}
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "none",
                  border: "none",
                  fontSize: "2rem",
                  color: "#00bfff",
                  cursor: "pointer",
                }}
              >
                ✖
              </motion.button>
              <motion.div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                  color: "#d0d8e8",
                }}
                animate={{ y: [0, -5, 0], opacity: [1, 0.8, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Zoom: {Math.round(zoomLevel * 100)}% (Use +/- keys)
              </motion.div>
              {isLoading ? (
                <motion.div
                  className="resume-loading"
                  variants={loadingVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    color: "#00bfff",
                    textAlign: "center",
                  }}
                >
                  Loading...
                </motion.div>
              ) : (
                <motion.iframe
                  src={resumePDF}
                  title="Bhagavan's Resume Viewer"
                  className="resume-iframe"
                  frameBorder="0"
                  variants={iframeVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  style={{
                    width: "100%",
                    height: "clamp(60vh, 80vw, 80vh)",
                    border: "none",
                    borderRadius: "1rem",
                    transformOrigin: "center",
                    willChange: "transform, opacity",
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Resume;