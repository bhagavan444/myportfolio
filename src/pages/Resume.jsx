import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resumePDF from "../assets/ats.pdf";

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
        <h2 className="resume-title">📄 Bhagavan Resume</h2>
        <p className="resume-description">
          Explore my journey, skills, and experiences below.
        </p>

        <div className="resume-btn-group">
          <motion.button
            className="resume-view-btn"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px #06b6d4" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            aria-label="View Resume"
          >
            👀 View Resume
          </motion.button>

          <motion.a
            href={resumePDF}
            download
            className="resume-download-btn"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #10b981" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Download Resume"
          >
            📥 Download Resume
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
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
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
