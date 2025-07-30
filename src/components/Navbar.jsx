import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle state
  };

  const navLinks = [
    { label: "Home", path: "home" },
    { label: "About", path: "about" },
    { label: "Education", path: "education" },
    { label: "Internships", path: "Internships" },
    { label: "Workshops", path: "workshops" },
    { label: "Hackathons", path: "Hackathons" },
    { label: "Skills", path: "myskills" },
    { label: "Projects", path: "projects" },
    { label: "Resume", path: "resume" },
    { label: "Certifications", path: "certifications" },
    { label: "Contact", path: "contact" },
  ];

  return (
    <nav className="animated-navbar">
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link to="/home">Bhagavan</Link>
        </motion.div>

        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <AnimatePresence>
          {(menuOpen || window.innerWidth > 768) && (
            <motion.div
              className={`nav-links ${menuOpen ? "open" : ""}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} // Added exit animation
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  className="nav-link"
                  style={{ '--index': index }} // For staggered animation
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} // Added exit animation
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={`/${link.path}`}
                    className={location.pathname.includes(link.path) ? "active-link" : ""}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="nav-icons"
                style={{ '--icon-count': navLinks.length }} // For staggered animation
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }} // Added exit animation
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 + 0.1 }}
              >
                <motion.a
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, color: "#00f7ff", textShadow: "0 0 10px rgba(0, 247, 255, 0.7)" }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, color: "#00f7ff", textShadow: "0 0 10px rgba(0, 247, 255, 0.7)" }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  href="mailto:satyasaibhagavan444@gmail.com"
                  whileHover={{ scale: 1.2, color: "#00f7ff", textShadow: "0 0 10px rgba(0, 247, 255, 0.7)" }}
                >
                  <FaEnvelope />
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;