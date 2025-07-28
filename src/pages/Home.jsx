import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { TypeAnimation } from "react-type-animation";
import VanillaTilt from "vanilla-tilt";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import profile from "../assets/profile.jpg";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [motionPermission, setMotionPermission] = useState("default");
  const particleRef = useRef(null);
  const tiltRef = useRef(null);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 600,
        glare: true,
        "max-glare": 0.4,
        scale: 1.1,
      });
    }
  }, []);

  const handleOrientation = (event) => {
    const { beta, gamma } = event;
    const rotateX = (beta - 45) / 15;
    const rotateY = gamma / 15;
    const card = document.querySelector(".description-card");
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

  const badges = [
    "🚀 React & Node.js",
    "🤖 TensorFlow & PyTorch",
    "☁️ AWS",
    "🧠 Deep Learning",
    "📊 Data Visualization",
    "⚙️ DevOps",
    "🐍 Python",
    "☕ Java",
    "📈 Machine Learning",
  ];

  return (
    <motion.div
      className="portfolio-home-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        ref={particleRef}
        options={{
          fullScreen: { enable: true },
          background: { color: "#070707" },
          particles: {
            number: { value: 100 },
            color: { value: ["#0ff", "#f0f", "#fff"] },
            shape: { type: "circle" },
            opacity: { value: 0.2 },
            size: { value: { min: 1, max: 4 } },
            move: { enable: true, speed: 2 },
            links: {
              enable: true,
              distance: 130,
              color: "#ffffff",
              opacity: 0.2,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "repulse" },
            },
            modes: {
              repulse: { distance: 100 },
              grab: { distance: 140 },
            },
          },
        }}
      />

      <section id="home">
        <motion.div
          ref={tiltRef}
          className="hero-glass-card beast description-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <motion.img
            src={profile}
            alt="Sai Profile"
            className="profile-pic neon-border"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

          <motion.h1
            className="hero-title neon-text"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Hi, I'm <span>Siva Satya Sai Bhagavan GopalaJosyula</span>
          </motion.h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <TypeAnimation
              sequence={[
                "Full Stack Developer 🛠️",
                2000,
                "AI/ML Developer 🤖",
                2000,
                "Data Science Developer 🎨",
                2000,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              style={{ fontSize: "1.3rem", color: "#0ff" }}
            />
            <p className="subtitle">Shaping the digital tomorrow — one innovation at a time.</p>
          </motion.div>

          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            I create immersive full-stack experiences with MERN, craft smart solutions with AI, and write elegant code for complex problems.
          </motion.p>

          <div className="highlight-badges">
            {badges.map((badge, idx) => (
              <span className="badge" key={idx}>{badge}</span>
            ))}
          </div>

          <motion.blockquote
            className="cta-quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            "Code like art. Deploy like a pro."
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              className="hero-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={
                motionPermission !== "granted"
                  ? requestMotionPermission
                  : () => navigate("/about")
              }
            >
              {motionPermission !== "granted" ? "Enable 3D Experience" : "Start My Journey 🚀"}
            </motion.button>
          </motion.div>

          <div className="hero-socials">
            <a
              href="https://github.com/bhagavan444"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a href="mailto:g.sivasatyasaibhagavan@gmail.com">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
