import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import {
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaTiktok,
  FaGithub,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Updated links
const links = [
  "Home",
  "Education",
  "MySkills",
  "Projects",
  "Internships", // 👈 Added here
  "Certifications",
  "Resume",
  "Workshops & Hacathons",
  "Personal Details",
  "Contact",
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((prev) => !prev);

  // ✅ Utility function to format paths correctly
  const formatLinkPath = (link) => {
    if (link === "Home") return "/";
    if (link === "Workshops & Hacathons") return "/workshops-hackathons";
    return `/${link.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`;
  };

  return (
    <header className="fixed w-full top-0 left-0 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-extrabold text-2xl tracking-wide select-none"
        >
          Siva Satya Sai Bhagavan GopalaJosyula
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          {links.map((link) => (
            <li key={link}>
              <Link
                to={formatLinkPath(link)}
                className="relative px-4 py-2 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-purple-700 hover:shadow-lg hover:scale-105"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="hidden md:flex space-x-5 text-white text-xl">
          <a
            href="mailto:your@email.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400 transition-colors duration-300"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300 transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-400 transition-colors duration-300"
            aria-label="TikTok"
          >
            <FaTiktok />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={handleToggle}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 shadow-inner overflow-hidden"
          >
            {links.map((link) => (
              <li
                key={link}
                className="border-b border-white/30 last:border-none"
              >
                <Link
                  to={formatLinkPath(link)}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 text-white font-semibold hover:bg-white hover:text-purple-700 transition-colors duration-300"
                >
                  {link}
                </Link>
              </li>
            ))}

            {/* Mobile social icons */}
            <li className="flex justify-center space-x-6 py-4">
              <a
                href="mailto:your@email.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-400 transition-colors duration-300 text-xl"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors duration-300 text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 transition-colors duration-300 text-xl"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition-colors duration-300 text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-400 transition-colors duration-300 text-xl"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
