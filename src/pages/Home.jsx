import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { TypeAnimation } from "react-type-animation";
import VanillaTilt from "vanilla-tilt";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Home.css";
import profile from "../assets/profile.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [motionPermission, setMotionPermission] = useState("default");

  const particlesInit = async (main) => {
    if (typeof main?.load !== "function") return;
    await loadFull(main);
  };

  const handleOrientation = (event) => {
    const { beta, gamma } = event;
    const rotateX = (beta - 45) / 15;
    const rotateY = gamma / 15;
    const cards = document.querySelectorAll(".description-card");
    cards.forEach((card) => {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
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
      window.addEventListener("deviceorientation", handleOrientation, true);
      setMotionPermission("granted");
    }
  };

  useEffect(() => {
    const tiltNode = document.querySelector(".hero-glass-card.upgraded");
    if (tiltNode) {
      VanillaTilt.init(tiltNode, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
      });
    }
  }, []);

  return (
    <motion.div className="portfolio-home-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true },
          background: { color: "#0a0a0a" },
          particles: {
            number: { value: 60 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.4 },
            size: { value: 3 },
            move: { enable: true, speed: 1.2 },
          },
        }}
      />

      <section id="home">
        <motion.div
          className="hero-glass-card upgraded description-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="content-rotator">
            <motion.img
              src={profile}
              alt="Sai"
              className="profile-pic neon-border"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />

            <motion.h1 className="hero-title neon-text" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
              Hi, I'm <span>Siva Satya Sai Bhagavan GopalaJosyula</span>
            </motion.h1>

            <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <TypeAnimation
                sequence={[
                  "Full Stack Developer 🚀",
                  1500,
                  "AI/ML Enthusiast 🤖",
                  1500,
                  "Creative Problem Solver 💡",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ fontSize: "1.3rem", display: "inline-block", color: "#0ff" }}
              />
              <p style={{ fontSize: "1rem", color: "#ccc", marginTop: "0.5rem" }}>
                Building interactive solutions for the future.
              </p>
            </motion.div>

            <motion.p
              className="hero-subtext"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1 }}
            >
              I develop intelligent, scalable, and stunning applications using MERN & AI tools. Let’s build the future — one line of code at a time.
            </motion.p>

            <div className="highlight-badges">
              <span className="badge">✨ MERN Stack</span>
              <span className="badge">🏅 Machine Learning</span>
              <span className="badge">🏅 Data Science</span>
              <span className="badge">🎯 DSA & Python</span>
              <span className="badge">🧠 Deep Learning</span>
              <span className="badge">🏅 Cloud&AWS</span>
            </div>

            <motion.blockquote
              className="cta-quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              “Simplicity is the soul of efficiency.” – Austin Freeman
            </motion.blockquote>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
              {motionPermission !== "granted" ? (
                <motion.button className="hero-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={requestMotionPermission}>
                  Enable 3D Experience
                </motion.button>
              ) : (
                <motion.button className="hero-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/about")}>
                  Explore My Journey 🚀
                </motion.button>
              )}
            </motion.div>

            <div className="hero-socials">
              <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="mailto:g.sivasatyasaibhagavan@gmail.com"><FaEnvelope /></a>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
