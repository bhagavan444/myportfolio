import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { label: "Home", path: "home" },
    { label: "About", path: "about" },
    { label: "Education", path: "education" },
    { label: "Internships", path: "Internships" },
    { label: "Workshops", path: "workshops" },
     { label: "Hackathons", path: "Hackathons" },
    { label: "Skills", path: "myskills" },
     { label: "Projects", path: "projects" },
     // ✅ Custom label but actual path is workshops.jsx
    { label: "Resume", path: "resume" },
    { label: "Certifications", path: "certifications" },
    { label: "Contact", path: "contact" },
  ];

  return (
    <nav className="animated-navbar">
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/home">Bhagavan's Portfolio</Link>
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
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  className="nav-link"
                  whileHover={{ scale: 1.15 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <a href="https://github.com/bhagavan444" target="_blank" rel="noreferrer"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                <a href="mailto:satyasaibhagavan444@gmail.com"><FaEnvelope /></a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
