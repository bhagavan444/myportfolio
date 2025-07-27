import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resumePDF from "../assets/bhagavanresume.pdf";
import "../styles/Resume.css";

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="resume-container">
      <motion.div
        className="resume-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="resume-title">🚀 Bhagavan's Professional Resume</h2>
        <p className="resume-description">
          Explore a well-structured resume that showcases my journey as a passionate full-stack developer. It features hands-on projects, collaborative internships, strong problem-solving abilities, and my commitment to delivering real-world solutions. 
          This resume reflects my ability to adapt, learn quickly, and contribute to high-impact software development environments.
        </p>

        <div className="resume-btn-group">
          <motion.button
            className="resume-view-btn"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px #06b6d4" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            aria-label="View Resume"
          >
            👀 Preview Resume
          </motion.button>

          <motion.a
            href={resumePDF}
            download
            className="resume-download-btn"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #10b981" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Download Resume"
          >
            📥 Download PDF
          </motion.a>
        </div>
      </motion.div>

      {/* Modal Viewer */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="resume-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <motion.div
              className="resume-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="resume-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Resume Modal"
              >
                ✖
              </button>

              <iframe
                src={resumePDF}
                title="Resume PDF Viewer"
                className="resume-iframe"
                frameBorder="0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resume;
