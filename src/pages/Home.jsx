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

  // Handle device orientation for 3D tilt effect
  const handleOrientation = (event) => {
    const { beta, gamma } = event;
    const rotateX = (beta - 45) / 15; // Adjusted for natural tilt
    const rotateY = gamma / 15;
    const card = document.querySelector(".hero-glass-card");
    if (card) {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${Math.abs(rotateX) + Math.abs(rotateY)}px)`;
    }
  };

  // Request motion permission and add event listener
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

  // Clean up event listener on unmount
  useEffect(() => {
    return () => {
      if (motionPermission === "granted") {
        window.removeEventListener("deviceorientation", handleOrientation, true);
      }
    };
  }, [motionPermission]);

  return (
    <motion.div
      className="portfolio-home-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Navbar />
      <section id="home">
        {/* Wave Overlay */}
        <div className="wave-overlay"></div>
        {/* Holographic Grid */}
        <div className="holo-grid"></div>
        {/* Particle Field */}
        <div className="particle-field">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="particle" />
          ))}
        </div>
        {/* Rotating Shapes */}
        <div className="rotating-shape hexagon"></div>
        <div className="rotating-shape triangle"></div>
        <div className="rotating-shape circle"></div>
        <div className="rotating-shape square"></div>
        {/* Floating Objects */}
        <div className="floating-object one"></div>
        <div className="floating-object two"></div>
        <div className="floating-object three"></div>
        {/* Orbiting Lights */}
        <div className="orbiting-light one"></div>
        <div className="orbiting-light two"></div>

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
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.98 }}
          />

          <motion.h1
            className="hero-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            👋 Hi I'm Bhagavan
          </motion.h1>

          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            🚀 Creative Technologist | Full-Stack Engineer | Data Science Enthusiast | AI&ML Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <motion.button
              className="hero-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
              onClick={() => navigate("/Projects")}
            >
              View My Experience →
            </motion.button>
          </motion.div>

          {/* About Me Section */}
          <div className="section about-me">
            <h2>About Me</h2>
            <p>
              Final Year B.Tech AI&DS Student with a strong foundation in Full Stack Development, Data Science, and
              Python. Passionate about solving real-world problems with innovative and scalable tech solutions.
            </p>
            <motion.button
              className="hero-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
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
              whileTap={{ scale: 0.95, rotate: -5 }}
              onClick={() => navigate("/Internships")}
            >
              View Internships →
            </motion.button>
          </div>

          {/* Skills Section */}
          <div className="section my-skills">
            <h2>My Skills</h2>
            <p>
              Proficient in JavaScript, Python, React, Node.js, MongoDB, TensorFlow, and more. Experienced in building
              AI-driven applications and scalable web solutions.
            </p>
          </div>

          {/* Achievements Section */}
          <div className="section my-achievements">
            <h2>Achievements</h2>
            <ul>
              <li>🏆 Built a Resume Builder with 90%+ ATS Score Support</li>
              <li>🥇 Won Hackathon in RCE with Brainovision</li>
              <li>📜 Completed multiple workshops in AI, Web Development, and Mobile App Development</li>
              <li>💡 Developed AI Chatbot and Career Recommendation System Using MERN Stack</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="section contact-me">
            <h2>Let's Connect</h2>
            <p>
              I’m open to freelance projects, internships, and collaboration opportunities. Feel free to reach out on any
              of the platforms below!
            </p>
            <motion.button
              className="hero-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
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
            {[
              { icon: FaFacebookF, href: "https://facebook.com" },
              { icon: FaTwitter, href: "https://twitter.com" },
              { icon: FaInstagram, href: "https://instagram.com" },
              { icon: FaLinkedin, href: "https://linkedin.com" },
              { icon: FaYoutube, href: "https://youtube.com" },
              { icon: FaGithub, href: "https://github.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;