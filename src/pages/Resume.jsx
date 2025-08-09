import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setIsModalOpen(false);
    if (e.key === "+" && isModalOpen) setZoomLevel((prev) => Math.min(prev + 0.2, 2));
    if (e.key === "-" && isModalOpen) setZoomLevel((prev) => Math.max(prev - 0.2, 1));
  };

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

  return (
    <section
      className="resume-container"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #0a001a, #1a0040)",
        padding: "clamp(2rem, 5vw, 5rem) clamp(1rem, 2vw, 3rem)",
        overflow: "hidden",
      }}
    >
      {/* Background Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${3 + i * 1.5}rem`,
            height: `${3 + i * 1.5}rem`,
            background: "rgba(0, 191, 255, 0.4)",
            borderRadius: "50%",
            top: `${10 + i * 6}%`,
            left: `${10 + i * 6}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.article
        className="resume-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.04, boxShadow: "0 20px 60px rgba(0, 191, 255, 0.5)" }}
        whileTap={{ scale: 0.98 }}
        role="article"
        aria-label="Resume Card"
        style={{
          background: "rgba(20, 10, 40, 0.95)",
          border: "2px solid rgba(0, 191, 255, 0.6)",
          borderRadius: "1.25rem",
          padding: "clamp(1.5rem, 3vw, 3rem)",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.h2
          className="resume-title"
          variants={titleVariants}
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "#00bfff",
            marginBottom: "clamp(1rem, 2vw, 2rem)",
          }}
        >
          🚀 Bhagavan's Professional Resume
        </motion.h2>

        <motion.p
          className="resume-description"
          variants={descVariants}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            color: "#d0d8e8",
            maxWidth: "600px",
            margin: "0 auto clamp(1.5rem, 2vw, 2.5rem)",
            lineHeight: 1.6,
          }}
        >
          Dive into my full-stack odyssey, highlighting groundbreaking projects, 
          dynamic internships, and exceptional problem-solving prowess, engineered 
          for delivering cutting-edge, scalable solutions in evolving tech landscapes.
        </motion.p>

        <div
          className="resume-btn-group"
          style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.button
            className="resume-btn preview-btn"
            whileHover={{ scale: 1.1, background: "#1d4ed8" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            aria-label="Preview Resume"
            style={{
              padding: "clamp(0.8rem, 1.5vw, 1.2rem) clamp(1.5rem, 2vw, 3rem)",
              background: "#0ea5e9",
              border: "none",
              borderRadius: "1.5rem",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              fontWeight: "700",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            👁️‍🗨️ Preview Resume
          </motion.button>

          <motion.a
            href={resumePDF}
            download
            className="resume-btn download-btn"
            whileHover={{ scale: 1.1, background: "#047857" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Download Resume PDF"
            style={{
              padding: "clamp(0.8rem, 1.5vw, 1.2rem) clamp(1.5rem, 2vw, 3rem)",
              background: "#10b981",
              border: "none",
              borderRadius: "1.5rem",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              fontWeight: "700",
              color: "#fff",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            📥 Download PDF
          </motion.a>
        </div>
      </motion.article>

      {/* 🪟 Modal Viewer */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="resume-modal-overlay"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsModalOpen(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-label="Resume Preview Modal"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3000,
            }}
          >
            <motion.div
              className="resume-modal-content"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "rgba(20, 10, 40, 0.98)",
                border: "2px solid rgba(0, 191, 255, 0.7)",
                borderRadius: "1.25rem",
                padding: "clamp(1rem, 2vw, 2.5rem)",
                maxWidth: "90vw",
                maxHeight: "90vh",
                overflow: "auto",
                position: "relative",
              }}
            >
              <motion.button
                className="resume-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Resume Modal"
                whileHover={{ scale: 1.2, color: "#ff69b4" }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "#00bfff",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                ✖
              </motion.button>
              <motion.div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
                  color: "#d0d8e8",
                }}
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
                  style={{
                    fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
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
                  animate={{ ...iframeVariants.visible, scale: zoomLevel }}
                  style={{
                    width: "100%",
                    height: "clamp(50vh, 70vw, 75vh)",
                    border: "none",
                    borderRadius: "0.75rem",
                    transformOrigin: "center",
                    willChange: "transform, opacity",
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resume;