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
      const timer = setTimeout(() => setIsLoading(false), 1500); // Extended load simulation
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
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      transition: { duration: 1.2, type: "spring", stiffness: 70, damping: 12 },
    },
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
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a001a, #1a0040, #2a0060)",
        padding: "5rem 3rem",
        overflow: "hidden",
        willChange: "background, transform",
      }}
    >
      {/* Background Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${5 + i * 2}px`,
            height: `${5 + i * 2}px`,
            background: `radial-gradient(circle, rgba(0, 191, 255, 0.7), transparent)`,
            borderRadius: "50%",
            boxShadow: "0 0 15px rgba(0, 191, 255, 0.8)",
            top: `${10 + i * 8}%`,
            left: `${10 + i * 8}%`,
            willChange: "transform",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 0.9, 0.6],
            rotate: [0, 360],
          }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.article
        className="resume-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          scale: 1.06,
          rotateX: 5,
          rotateY: 5,
          boxShadow: "0 40px 100px rgba(0, 191, 255, 0.7), 0 0 50px rgba(255, 105, 180, 0.5)",
          transition: { duration: 0.6 },
        }}
        whileTap={{ scale: 0.98, rotateZ: 2 }}
        role="article"
        aria-label="Resume Card"
        style={{
          background: "rgba(20, 10, 40, 0.95)",
          border: "3px solid rgba(0, 191, 255, 0.6)",
          borderRadius: "20px",
          padding: "3rem",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          backdropFilter: "blur(12px)",
          transformStyle: "preserve-3d",
          willChange: "transform, box-shadow",
          animation: "cardPulse 5s ease-in-out infinite",
        }}
      >
        <motion.h2
          className="resume-title"
          variants={titleVariants}
          style={{
            fontSize: "2rem",
            color: "#00bfff",
            textShadow: "0 0 25px rgba(0, 191, 255, 0.9), 0 0 40px rgba(255, 105, 180, 0.7)",
            fontWeight: "900",
            marginBottom: "2rem",
            background: "linear-gradient(45deg, #00bfff, #ff69b4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            animation: "gradientFlow 6s linear infinite",
          }}
        >
          🚀 Bhagavan's Professional Resume
        </motion.h2>

        <motion.p
          className="resume-description"
          variants={descVariants}
          style={{
            fontSize: "1.3rem",
            color: "#d0d8e8",
            maxWidth: "700px",
            margin: "0 auto 2.5rem",
            textShadow: "0 0 15px rgba(0, 191, 255, 0.5)",
            lineHeight: "1.7",
            background: "linear-gradient(90deg, #d0d8e8, #a3bffa)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          Dive into my full-stack odyssey, highlighting groundbreaking projects, 
          dynamic internships, and exceptional problem-solving prowess, engineered 
          for delivering cutting-edge, scalable solutions in evolving tech landscapes.
        </motion.p>

        <div
          className="resume-btn-group"
          style={{ display: "flex", gap: "2rem", justifyContent: "center", perspective: "1000px" }}
        >
          <motion.button
            className="resume-btn preview-btn"
            whileHover={{
              scale: 1.2,
              rotateX: 10,
              boxShadow: "0 0 40px rgba(14, 165, 233, 1)",
              background: "linear-gradient(90deg, #0ea5e9, #3b82f6, #1d4ed8)",
            }}
            whileTap={{ scale: 0.9, rotateZ: -5 }}
            onClick={() => setIsModalOpen(true)}
            aria-label="Preview Resume"
            style={{
              padding: "1.2rem 3rem",
              background: "linear-gradient(90deg, #0ea5e9, #1d4ed8)",
              border: "none",
              borderRadius: "30px",
              fontSize: "1.2rem",
              fontWeight: "800",
              color: "#fff",
              cursor: "pointer",
              textShadow: "0 0 15px rgba(14, 165, 233, 0.9)",
              transition: "all 0.5s ease",
              transformStyle: "preserve-3d",
            }}
          >
            👁️‍🗨️ Preview Resume
          </motion.button>

          <motion.a
            href={resumePDF}
            download
            className="resume-btn download-btn"
            whileHover={{
              scale: 1.2,
              rotateX: 10,
              boxShadow: "0 0 40px rgba(16, 185, 129, 1)",
              background: "linear-gradient(90deg, #10b981, #34d399, #047857)",
            }}
            whileTap={{ scale: 0.9, rotateZ: -5 }}
            aria-label="Download Resume PDF"
            style={{
              padding: "1.2rem 3rem",
              background: "linear-gradient(90deg, #10b981, #047857)",
              border: "none",
              borderRadius: "30px",
              fontSize: "1.2rem",
              fontWeight: "800",
              color: "#fff",
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer",
              textShadow: "0 0 15px rgba(16, 185, 129, 0.9)",
              transition: "all 0.5s ease",
              transformStyle: "preserve-3d",
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
              willChange: "opacity, backdrop-filter",
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
                border: "3px solid rgba(0, 191, 255, 0.7)",
                borderRadius: "20px",
                padding: "2.5rem",
                maxWidth: "95vw",
                maxHeight: "95vh",
                overflow: "auto",
                position: "relative",
                boxShadow: "0 30px 80px rgba(0, 191, 255, 0.6), 0 0 40px rgba(255, 105, 180, 0.5)",
                backdropFilter: "blur(8px)",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.button
                className="resume-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Resume Modal"
                whileHover={{ scale: 1.3, rotate: 360, color: "#ff69b4", textShadow: "0 0 20px rgba(255, 105, 180, 0.9)" }}
                whileTap={{ scale: 0.8 }}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "none",
                  border: "none",
                  fontSize: "2rem",
                  color: "#00bfff",
                  cursor: "pointer",
                  transition: "all 0.5s ease",
                  transformStyle: "preserve-3d",
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
                  fontSize: "1.2rem",
                  color: "#d0d8e8",
                  textShadow: "0 0 10px rgba(0, 191, 255, 0.5)",
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
                    fontSize: "1.8rem",
                    color: "#00bfff",
                    textAlign: "center",
                    textShadow: "0 0 20px rgba(0, 191, 255, 0.7)",
                    animation: "loadingSpin 1.5s linear infinite",
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
                    height: "75vh",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "inset 0 0 25px rgba(0, 191, 255, 0.4)",
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