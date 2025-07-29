import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import profile from "../assets/profile.jpg";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [motionPermission, setMotionPermission] = useState("default");

  const handleOrientation = (event) => {
    const { beta, gamma } = event;
    const rotateX = (beta - 45) / 15;
    const rotateY = gamma / 15;
    const card = document.querySelector(".hero-glass-card");
    if (card) {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const requestMotionPermission = () => {
    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            setMotionPermission("granted");
            window.addEventListener("deviceorientation", handleOrientation, true);
          } else {
            setMotionPermission("denied");
          }
        })
        .catch(console.error);
    } else {
      setMotionPermission("granted");
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
  };

  return (
    <motion.div
      className="portfolio-home-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Navbar />

      <section id="home">
        <motion.div
          className="hero-glass-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <motion.img
            src={profile}
            alt="G Bhagavan Profile"
            className="profile-pic"
          />

          <motion.h1
            className="hero-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            I'm Bhagavan ~ 
          </motion.h1>

          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            🚀 Creative Technologist | Full-Stack Engineer | Data Science Enthusiast| AI&ML Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <motion.button
              className="hero-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/Internships")}
            >
              View My Experience →
            </motion.button>
          </motion.div>

          {/* About Me Section */}
          <div className="section about-me">
            <h2>About Me</h2>
            <p>
              Final Year B.Tech AI&DS Student with a strong foundation in Full Stack Development, Data Science, and Python.
              Passionate about solving real-world problems with innovative and scalable tech solutions.
            </p>
            <motion.button
              className="hero-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/about")}
            >
              Learn More →
            </motion.button>
          </div>

          {/* Work Experience Section */}
          <div className="section my-work">
            <h2>My Work Experience</h2>
            <p>
              Interned at Blackbucks Paid Online in AIML & Data Science. Participated in 24-hour Hackathons and built
              full-stack applications like an Online 2nd Hand Electronics Selling Platform.
            </p>
            <motion.button
              className="hero-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/projects")}
            >
              View Projects →
            </motion.button>
          </div>

          {/* Skills Section */}
          

          {/* Achievements Section */}
          <div className="section my-achievements">
            <h2>Achievements</h2>
            <ul>
              <li>🏆 Built a Resume Builder with 90%+ ATS Score Support</li>
              <li>🥇 Won Hackathon in RCE with Brainovision</li>
              <li>📜 Completed multiple workshops in AI, Web Development, and Mobile App Development</li>
              <li>💡 Developed Fruit & Vegetable Rot Detection App using MobileNetV2</li>
            </ul>
          </div>

          {/* Contact Section */}
<div className="section contact-me">
  <h2>Let's Connect</h2>
  <p>
    I’m open to freelance projects, internships, and collaboration opportunities.
    Feel free to reach out on any of the platforms below!
  </p>
  <motion.button
    className="hero-btn"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => navigate("/contact")}
  >
    Let's Connect →
  </motion.button>
</div>


          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={motionPermission !== "granted" ? requestMotionPermission : null}
          >
            <div className="scroll-down"></div>
          </motion.div>

          {/* Social Icons */}
          <div className="hero-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
