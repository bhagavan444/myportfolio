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
    "Home",
    "About",
    "Education",
    "My Skills",
    "Projects",
    "Workshops",
    "Resume",
    "Certifications",
    "Contact"
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <motion.div className="nav-logo" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
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
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((name, i) => (
                <motion.div
                  key={name}
                  className="nav-link"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={`/${name.toLowerCase().replace(/\s+/g, "")}`}
                    className={location.pathname.includes(name.toLowerCase()) ? "active-link" : ""}
                  >
                    {name}
                  </Link>
                </motion.div>
              ))}

              <div className="nav-icons">
                <a href="https://github.com/bhagavan444" target="_blank" rel="noreferrer"><FaGithub /></a>
                <a href="mailto:g.sivasatyasaibhagavan@gmail.com"><FaEnvelope /></a>
                <a href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
