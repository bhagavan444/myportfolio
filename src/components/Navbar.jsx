import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <motion.div className="nav-logo" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/home">🚀 Rocky</Link>
        </motion.div>

        {/* Hamburger */}
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        {/* Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {/* Static Links */}
          {["Home", "About", "Education", "My Skills", "Workshops", "Resume", "Certifications", "Contact"].map((name, i) => (
            <motion.div
              key={name}
              className="nav-link"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={`/${name.toLowerCase().replace(/\s+/g, "")}`} className={location.pathname.includes(name.toLowerCase()) ? "active-link" : ""}>
                {name}
              </Link>
            </motion.div>
          ))}

          {/* Mega Menu: Internships */}
          <div className="nav-link mega-parent">
            <span>Internships ▾</span>
            <div className="mega-menu">
              <div className="mega-column">
                <h4>Company</h4>
                <Link to="/internships/blackbucks">Blackbucks</Link>
                <Link to="/internships/smart Bridge">Smart Bridge</Link>
              </div>
              <div className="mega-column">
                <h4>Domains</h4>
                <Link to="/internships/aiml">AI/ML</Link>
                <Link to="/internships/webdev">Web Dev</Link>
              </div>
            </div>
          </div>

          {/* Mega Menu: Projects */}
          <div className="nav-link mega-parent">
            <span>Projects ▾</span>
            <div className="mega-menu">
              <div className="mega-column">
                <h4>MERN Stack</h4>
                <Link to="/projects/resume">Resume Builder</Link>
                <Link to="/projects/ecommerce">E-Commerce</Link>
                <Link to="/projects/Chat bot ">AI-Chatbot</Link>
                <Link to="/projects/Carrer">Carrer Recommendation System</Link>
              </div>
              <div className="mega-column">
                <h4>AI/ML</h4>
                <Link to="/projects/fruit-ai">Fruit Classifier</Link>
                <Link to="/projects/heart">Heart Predictor</Link>
                <Link to="/projects/Predictor">Disease Predictor App</Link>
              </div>
              <div className="mega-column">
                <h4>Mini Tools</h4>
                <Link to="/projects/todo">Todo App</Link>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="nav-icons">
            <a href="https://github.com/bhagavan444" target="_blank"><FaGithub /></a>
            <a href="mailto:g.sivasatyasaibhagavan@gmail.com"><FaEnvelope /></a>
            <a href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/" target="_blank"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
