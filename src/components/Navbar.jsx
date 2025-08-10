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
    setMenuOpen((prev) => !prev);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <nav className="animated-navbar">
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.1 }}
        >
          <Link to="/home" className="logo-text">MyPortfolio</Link>
        </motion.div>

        <div className="hamburger" onClick={toggleMenu}>
          <motion.div
            initial={false}
            animate={{ rotate: menuOpen ? 360 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </motion.div>
        </div>

        <AnimatePresence>
          {(menuOpen || window.innerWidth > 768) && (
            <motion.div
              className={`nav-links ${menuOpen ? "open" : ""}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  className="nav-link"
                  variants={itemVariants}
                  custom={index}
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
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.a
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.3, color: "#00f7ff", textShadow: "0 0 15px rgba(0, 247, 255, 0.9)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub size={24} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.3, color: "#00f7ff", textShadow: "0 0 15px rgba(0, 247, 255, 0.9)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin size={24} />
                </motion.a>
                <motion.a
                  href="mailto:satyasaibhagavan444@gmail.com"
                  whileHover={{ scale: 1.3, color: "#00f7ff", textShadow: "0 0 15px rgba(0, 247, 255, 0.9)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope size={24} />
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