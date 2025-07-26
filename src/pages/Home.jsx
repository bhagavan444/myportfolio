import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { TypeAnimation } from "react-type-animation";
import VanillaTilt from "vanilla-tilt";
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
    if (motionPermission === "granted") {
      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, [motionPermission]);

  useEffect(() => {
    const tiltNode = document.querySelector(".hero-glass-card.upgraded");
    if (tiltNode) {
      VanillaTilt.init(tiltNode, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
      });
    }
  }, []);

  return (
    <motion.div
      className="portfolio-home-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true },
          background: { color: "#0a0a0a" },
          particles: {
            number: { value: 50 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
          },
        }}
      />

      <div className="floating-bubbles"></div>

      <section id="home">
        <motion.div
          className="hero-glass-card upgraded description-card" // Removed rotating-card
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="content-rotator"> {/* Added wrapper for rotating content */}
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
              className="hero-title blinking bouncing-text"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 8,
              }}
            >
              Hi, I'm <span>Siva Satya Sai Bhagavan GopalaJosyula</span>
            </motion.h1>

            <motion.div
              className="hero-role blinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  1500,
                  "Data Science Enthusiast",
                  1500,
                  "AI & ML Developer",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ fontSize: "1.2rem", display: "inline-block" }}
              />
            </motion.div>

            <motion.div
              className="hero-subtext moving-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              <p
                style={{
                  textAlign: "center",
                  maxWidth: "700px",
                  margin: "0 auto",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                I specialize in crafting efficient, scalable web apps with rich UI/UX experiences using the MERN stack.
                <br />
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={requestMotionPermission}
                >
                  Enable 3D Experience 🌌
                </motion.button>
              ) : (
                <motion.button
                  className="hero-btn blinking"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/about")}
                >
                  View My Work 🚀
                </motion.button>
              )}
            </motion.div>
          </div> {/* End of content-rotator */}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;