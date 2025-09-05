import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css"; // Ensure this path is correct

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll to apply background/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Define navigation links
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

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.08, // Slightly faster stagger
        delayChildren: 0.1,    // Slightly faster delay
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2, // Faster exit transition
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150, // Slightly more springy
        damping: 15,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav
      className={`animated-navbar ${isScrolled ? "scrolled" : ""}`} // Apply 'scrolled' class
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
          <Link to="/home">
            G.Bhagavan
          </Link>
        </motion.div>

        <motion.div
          className="hamburger"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: menuOpen ? 90 : 0, scale: menuOpen ? 1.1 : 1 }} // More distinct rotation
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {(menuOpen || window.innerWidth > 768) && (
            <motion.div
              id="mobile-nav-menu" // Add ID for accessibility
              className={`nav-links ${menuOpen ? "open" : ""}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit" // Use "exit" for AnimatePresence
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  className="nav-link-wrapper" // Wrapper for individual link animations
                  variants={itemVariants}
                  custom={index}
                >
                  <Link
                    to={`/${link.path}`}
                    className={location.pathname.includes(link.path) ? "active-link" : ""}
                    onClick={() => setMenuOpen(false)} // Close menu on link click
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;