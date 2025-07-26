import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import profile from "../assets/profile.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [motionPermission, setMotionPermission] = useState("default");

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
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
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
    if (motionPermission === "granted") {
      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, [motionPermission]);

  return (
    <motion.div
      className="portfolio-home-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="stars-bg" />
      <section id="home">
        <motion.div
          className="hero-glass-card upgraded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <motion.div
            className="profile-wrapper"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 10,
              duration: 1.5,
            }}
          >
            <motion.img
              src={profile}
              alt="Sai"
              className="profile-pic glow"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.h1
            className="hero-title blinking"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 8,
            }}
          >
            Hi, I'm <span>Siva Satya Sai Bhagavan GopalaJosyula</span> 👋
          </motion.h1>

          <motion.p
            className="hero-role blinking"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
          >
            Full Stack Developer | Data Science Enthusiast | AI & ML Developer
          </motion.p>

          {/* 🌟 New About Matter Section */}
          <motion.div
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            <p style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto", fontSize: "1rem", lineHeight: "1.6" }}>
              I specialize in crafting efficient, scalable web apps with rich UI/UX experiences using the MERN stack. <br />
              Passionate about solving real-world problems through AI and deep learning. Let's build something extraordinary together!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, type: "spring", bounce: 0.4 }}
          >
            {motionPermission !== "granted" ? (
              <motion.button
                className="hero-btn blinking"
                whileHover={{ scale: 1.1, boxShadow: "0 0 25px #9333ea" }}
                whileTap={{ scale: 0.95 }}
                onClick={requestMotionPermission}
              >
                Enable 3D Experience 🌌
              </motion.button>
            ) : (
              <motion.button
                className="hero-btn blinking"
                whileHover={{ scale: 1.1, boxShadow: "0 0 25px #9333ea" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/about")}
              >
                View My Work 🚀
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
