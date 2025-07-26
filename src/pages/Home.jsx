import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import profile from "../assets/profile.jpg";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOrientation = (event) => {
      const { beta, gamma } = event; // beta = front/back, gamma = left/right

      const card = document.querySelector(".hero-glass-card");
      if (card) {
        const rotateX = (beta - 45) / 30;
        const rotateY = gamma / 30;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <motion.div
      className="portfolio-home-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8 }}
    >
      {/* 🌌 Animated Galaxy Background */}
      <div className="stars-bg">
        <div className="stars" />
        <div className="twinkling" />
        <div className="clouds" />
      </div>

      {/* 💫 Hero Section */}
      <section id="home">
        <motion.div
          className="hero-glass-card upgraded"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70, duration: 1.5 }}
        >
          <motion.div
            className="profile-wrapper"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <img src={profile} alt="Rocky" className="profile-pic glow" />
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Hi, I'm <span>Sai</span> 👋
          </motion.h1>

          <motion.p
            className="hero-role"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Full Stack Developer | Deep Learning Enthusiast | Career Builder
          </motion.p>

          <motion.button
            className="hero-btn"
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px #9333ea" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/about")}
          >
            View My Work 🚀
          </motion.button>
        </motion.div>
      </section>

      {/* 🧠 About Section */}
      <section id="about">
        <motion.div
          className="description-section upgraded"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          <div className="card-rotator">
            <motion.div
              className="description-card flip-inner left"
              initial={{ y: 50, opacity: 0, rotate: -2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <h2>About Me</h2>
              <p>
                I’m a passionate B.Tech student with strong MERN stack skills,
                building production-ready tools like resume builders,
                AI-based recommenders, and real-time apps that matter.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 🌟 Vision Section */}
      <section id="vision">
        <motion.div
          className="description-section upgraded"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="card-rotator">
            <motion.div
              className="description-card flip-inner right"
              initial={{ y: 50, opacity: 0, rotate: 2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
            >
              <h2>Vision & Passion</h2>
              <p>
                Blending dev & deep learning, I aim to craft meaningful, smart UIs.
                Every line of code moves me closer to building intelligent,
                human-centric AI solutions.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
