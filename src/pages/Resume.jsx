import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resumePDF from "../assets/bhagavanresume.pdf";
import "../styles/Resume.css";

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="resume-container">
      <motion.article
        className="resume-card"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        whileHover={{ scale: 1.015 }}
      >
        <motion.h2
          className="resume-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          🚀 Bhagavan's Professional Resume
        </motion.h2>

        <motion.p
          className="resume-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          Dive into a structured showcase of my full-stack development journey,
          featuring real-world projects, collaborative internships, and solid
          problem-solving skills. I aim to deliver high-quality, scalable, and
          impactful solutions in dynamic software environments.
        </motion.p>

        <div className="resume-btn-group">
          <motion.button
            className="resume-btn preview-btn"
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 20px rgba(14, 165, 233, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            👀 Preview Resume
          </motion.button>

          <motion.a
            href={resumePDF}
            download
            className="resume-btn download-btn"
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            📥 Download PDF
          </motion.a>
        </div>
      </motion.article>

      {/* Modal Viewer */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="resume-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="resume-modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
                title="Bhagavan's Resume Viewer"
                className="resume-iframe"
                frameBorder="0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resume;
