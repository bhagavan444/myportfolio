
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { label: "Home", path: "home" },
    { label: "About", path: "about" },
    { label: "Education", path: "education" },
    { label: "Workshops", path: "workshops" },
    { label: "Skills", path: "myskills" },
    { label: "Certifications", path: "certifications" },
    { label: "Internships", path: "Internships" },
    { label: "Hackathons", path: "Hackathons" },
    { label: "Projects", path: "projects" },
    { label: "Resume", path: "resume" },
    { label: "Contact", path: "contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.3,
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

  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "1.5rem 0",
    background: isScrolled ? "rgba(0, 15, 30, 0.9)" : "transparent",
    backdropFilter: isScrolled ? "blur(20px)" : "none",
    WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
    boxShadow: isScrolled
      ? "0 8px 30px rgba(0, 191, 255, 0.4), 0 -2px 15px rgba(255, 105, 180, 0.3)"
      : "none",
    transition: "all 0.4s ease",
    transform: isScrolled ? "perspective(1000px) translateZ(0)" : "none",
    ":hover": {
      background: "rgba(0, 15, 30, 0.7)",
      boxShadow: "0 10px 40px rgba(0, 191, 255, 0.5), 0 -3px 20px rgba(255, 105, 180, 0.4)",
      transform: "perspective(1000px) translateZ(5px)",
    },
  };

  const logoStyle = {
    fontSize: "1.8rem",
    fontWeight: 900,
    background: "linear-gradient(45deg, #ff4500, #ff69b4, #00bfff, #a855f7)",
    backgroundSize: "300%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textDecoration: "none",
    animation: "gradientFlow 6s linear infinite",
    textShadow: "0 0 15px rgba(0, 191, 255, 0.7), 0 0 25px rgba(255, 105, 180, 0.5)",
    transition: "transform 0.4s ease, text-shadow 0.4s ease",
    transformOrigin: "center",
    ":hover": {
      transform: "scale(1.12) rotate(5deg)",
      textShadow: "0 0 20px rgba(0, 191, 255, 0.9), 0 0 30px rgba(255, 105, 180, 0.7)",
    },
  };

  const navLinkStyle = (isActive) => ({
    fontSize: "1.1rem",
    fontWeight: 700,
    background: "linear-gradient(90deg, #3b82f6, #a855f7, #facc15, #00ffcc)",
    backgroundSize: "300%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textDecoration: "none",
    padding: "0.8rem 0.5rem",
    transition: "all 0.4s ease, transform 0.4s ease",
    textShadow: "0 0 10px rgba(0, 255, 204, 0.5)",
    ":hover": {
      transform: "translateY(-4px) scale(1.1)",
      textShadow: "0 0 20px rgba(0, 255, 204, 0.8), 0 0 25px rgba(255, 105, 180, 0.6)",
    },
    ...(isActive && {
      textShadow: "0 0 20px rgba(0, 255, 204, 0.9), 0 0 30px rgba(255, 105, 180, 0.7)",
    }),
  });

  const iconStyle = {
    fontSize: "1.8rem",
    background: "linear-gradient(90deg, #00ffcc, #ff33cc, #00ffcc)",
    backgroundSize: "300%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    transition: "all 0.4s ease, transform 0.4s ease",
    textShadow: "0 0 10px rgba(0, 255, 204, 0.5)",
    ":hover": {
      transform: "scale(1.25) rotate(10deg)",
      textShadow: "0 0 25px rgba(0, 255, 204, 0.9), 0 0 35px rgba(255, 105, 180, 0.7)",
    },
  };

  const hamburgerStyle = {
    cursor: "pointer",
    fontSize: "2.2rem",
    color: "#00ffcc",
    background: "linear-gradient(45deg, #00ffcc, #ff33cc)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    padding: "0.5rem",
    borderRadius: "50%",
    transition: "all 0.4s ease",
    transformOrigin: "center",
    ":hover": {
      color: "#ff69b4",
      transform: "scale(1.2) rotate(90deg)",
      textShadow: "0 0 20px rgba(255, 105, 180, 0.8)",
    },
  };

  return (
    <motion.nav
      className="animated-navbar"
      style={navbarStyle}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.1 }}
        >
          <Link to="/home" style={logoStyle} onMouseEnter={(e) => (e.target.style.transform = "scale(1.12) rotate(5deg)")} onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}>
            G.Bhagavan
          </Link>
        </motion.div>

        <motion.div className="hamburger" onClick={toggleMenu} style={hamburgerStyle}>
          <motion.div
            initial={false}
            animate={{ rotate: menuOpen ? 360 : 0, scale: menuOpen ? 1.1 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {(menuOpen || window.innerWidth > 768) && (
            <motion.div
              className={`nav-links ${menuOpen ? "open" : ""}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{
                position: menuOpen ? "absolute" : "static",
                top: menuOpen ? "100%" : "auto",
                left: menuOpen ? 0 : "auto",
                width: menuOpen ? "100vw" : "auto",
                background: menuOpen ? "rgba(0, 15, 30, 0.9)" : "transparent",
                padding: menuOpen ? "2rem 1.5rem" : 0,
                boxShadow: menuOpen ? "0 8px 25px rgba(0, 0, 0, 0.7)" : "none",
                borderRadius: menuOpen ? "0 0 15px 15px" : 0,
                transform: menuOpen ? "translateY(0)" : "none",
                transition: "all 0.4s ease",
              }}
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
                    style={navLinkStyle(location.pathname.includes(link.path))}
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
                  <FaGithub size={24} style={iconStyle} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.3, color: "#00f7ff", textShadow: "0 0 15px rgba(0, 247, 255, 0.9)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin size={24} style={iconStyle} />
                </motion.a>
                <motion.a
                  href="mailto:satyasaibhagavan444@gmail.com"
                  whileHover={{ scale: 1.3, color: "#00f7ff", textShadow: "0 0 15px rgba(0, 247, 255, 0.9)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope size={24} style={iconStyle} />
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;