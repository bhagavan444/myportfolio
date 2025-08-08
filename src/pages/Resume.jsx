import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resumePDF from "../assets/bhagavanresume.pdf";
import "../styles/Resume.css";

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  return (
    <section className="resume-container">
      <motion.article
        className="resume-card"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        whileHover={{ 
          scale: 1.02, 
          rotateX: 2, 
          rotateY: 2,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)"
        }}
        role="article"
        aria-label="Resume Card"
      >
        <motion.h2
          className="resume-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        >
          🚀 Bhagavan's Professional Resume
        </motion.h2>

        <motion.p
          className="resume-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Explore my full-stack development journey, showcasing impactful projects, 
          collaborative internships, and robust problem-solving skills, crafted to deliver 
          scalable, high-quality solutions in dynamic environments.
        </motion.p>

        <div className="resume-btn-group">
          <motion.button
            className="resume-btn preview-btn"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 25px rgba(14, 165, 233, 0.7)",
              backgroundPosition: "right center"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            aria-label="Preview Resume"
          >
            👀 Preview Resume
          </motion.button>

          <motion.a
            href={resumePDF}
            download
            className="resume-btn download-btn"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 25px rgba(16, 185, 129, 0.7)",
              backgroundPosition: "right center"
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Download Resume PDF"
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsModalOpen(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-label="Resume Preview Modal"
          >
            <motion.div
              className="resume-modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="resume-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Resume Modal"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✖
              </motion.button>
              {isLoading ? (
                <motion.div
                  className="resume-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Loading...
                </motion.div>
              ) : (
                <motion.iframe
                  src={resumePDF}
                  title="Bhagavan's Resume Viewer"
                  className="resume-iframe"
                  frameBorder="0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
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