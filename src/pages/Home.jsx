import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import profile from "../assets/profile.jpg";
import Navbar from "../components/Navbar";
import "./Home.css";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.35 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.7, ease: [0.5, 0.1, 0.2, 0.95] },
  },
};

const hoverPulse = {
  whileHover: { scale: 1.12, boxShadow: "0 0 25px rgba(255, 51, 153, 0.9)" },
  whileTap: { scale: 0.93, rotate: -7 },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: "easeOut" },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [motionPermission, setMotionPermission] = React.useState("default");
  const { scrollYProgress } = useScroll();
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Handle device orientation for 3D tilt effect
  const handleOrientation = (event) => {
    const { beta, gamma } = event;
    const rotateX = (beta - 45) / 8;
    const rotateY = gamma / 8;
    const card = document.querySelector(".hero-glass-card");
    if (card) {
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${Math.abs(rotateX) + Math.abs(rotateY)}px)`;
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

  // Inline styles
  const styles = {
    wrapper: {
      position: "relative",
      background: "linear-gradient(135deg, #0a001a, #1a0040)",
      minHeight: "100vh",
      overflowX: "hidden",
      color: "#e0e6f0",
    },
    heroCard: {
      background: "rgba(20, 10, 40, 0.2)",
      backdropFilter: "blur(18px)",
      border: "2px solid rgba(0, 191, 255, 0.4)",
      borderRadius: "30px",
      padding: "3.5rem",
      margin: "2.5rem auto",
      maxWidth: "10000px",
      boxShadow: "0 25px 80px rgba(0, 191, 255, 0.3), inset 0 0 20px rgba(0, 191, 255, 0.1)",
      position: "relative",
      overflow: "hidden",
    },
    profilePic: {
      borderRadius: "50%",
      border: "5px solid rgba(0, 191, 255, 0.7)",
      boxShadow: "0 0 40px rgba(0, 191, 255, 0.6)",
      width: "220px",
      height: "220px",
      objectFit: "cover",
      transition: "transform 0.4s ease",
    },
    title: {
      fontSize: "4.2rem",
      textAlign: "center",
      color: "#00bfff",
      textShadow: "0 0 60px rgba(0, 191, 255, 0.8), 0 0 80px rgba(255, 105, 180, 0.5)",
      marginBottom: "1.8rem",
    },
    subtext: {
      fontSize: "1.5rem",
      textAlign: "center",
      color: "#b0c4de",
      maxWidth: "750px",
      margin: "0 auto 3rem",
      lineHeight: "1.8",
    },
    section: {
      margin: "3.5rem 0",
      padding: "2.5rem",
      background: "rgba(10, 5, 20, 0.3)",
      borderRadius: "20px",
      border: "1px solid rgba(0, 191, 255, 0.2)",
      transition: "all 0.5s ease",
    },
    button: {
      padding: "0.9rem 2.2rem",
      background: "linear-gradient(90deg, #00bfff, #ff69b4)",
      color: "#1a0040",
      border: "none",
      borderRadius: "25px",
      fontWeight: "800",
      cursor: "pointer",
      transition: "all 0.4s ease",
    },
    socials: {
      display: "flex",
      gap: "2rem",
      justifyContent: "center",
      marginTop: "2.5rem",
    },
    socialIcon: {
      fontSize: "2rem",
      color: "#00bfff",
      transition: "all 0.4s ease",
      textShadow: "0 0 15px rgba(0, 191, 255, 0.6)",
    },
  };

  return (
    <motion.div
      className="portfolio-home-wrapper"
      style={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Navbar />
      <section id="home">
        <div className="nebula-background" />
        <div className="holo-grid" style={{ y: parallax }} />
        <div className="particle-field">
          {[...Array(10)].map((_, index) => (
            <motion.div
              key={index}
              className="particle"
              animate={{ y: [0, -40, 0], scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
            />
          ))}
        </div>
        <motion.div
          className="rotating-shape hexagon"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="rotating-shape triangle"
          animate={{ rotate: -360, scale: [1, 1.05, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="rotating-shape circle"
          animate={{ rotate: 360, scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="orbiting-light one"
          animate={{ rotate: 360, opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="orbiting-light two"
          animate={{ rotate: -360, opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="hero-glass-card"
          style={styles.heroCard}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={profile}
            alt="G Bhagavan Profile"
            className="profile-pic"
            style={styles.profilePic}
            variants={fadeInUp}
            {...hoverPulse}
          />

          <motion.h1
            className="hero-title"
            style={styles.title}
            variants={fadeInUp}
          >
            👋 Hi I'm <span className="highlight" style={{ color: "#ff69b4" }}>Bhagavan</span>
          </motion.h1>

          <motion.p
            className="hero-subtext"
            style={styles.subtext}
            variants={fadeInUp}
          >
            🚀 Creative Technologist | Full-Stack Engineer | Data Science Enthusiast | AI&ML Developer
          </motion.p>

          <motion.div variants={fadeInUp}>
            <motion.button
              className="hero-btn"
              style={styles.button}
              {...hoverPulse}
              onClick={() => navigate("/Projects")}
            >
              View My Experience →
            </motion.button>
          </motion.div>

          <motion.div
            className="section about-me"
            style={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              style={{ fontSize: "2.2rem", color: "#00bfff" }}
            >
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
            >
              Final Year B.Tech AI&DS Student with a strong foundation in Full Stack Development, Data Science, and
              Python. Passionate about solving real-world problems with innovative and scalable tech solutions.
            </motion.p>
            <motion.button
              className="hero-btn"
              style={styles.button}
              {...hoverPulse}
              onClick={() => navigate("/about")}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
            >
              Learn More →
            </motion.button>
          </motion.div>

          <motion.div
            className="section my-work"
            style={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              style={{ fontSize: "2.2rem", color: "#00bfff" }}
            >
              My Work Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
            >
              Interned at Blackbucks Paid Online in AIML & Data Science. Participated in 24-hour Hackathons and built
              full-stack applications like an Online 2nd Hand Electronics Selling Platform.
            </motion.p>
            <motion.button
              className="hero-btn"
              style={styles.button}
              {...hoverPulse}
              onClick={() => navigate("/Internships")}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
            >
              View Internships →
            </motion.button>
          </motion.div>

          <motion.div
            className="section my-skills"
            style={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              style={{ fontSize: "2.2rem", color: "#00bfff" }}
            >
              My Skills
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
            >
              Proficient in JavaScript, Python, React, Node.js, MongoDB, TensorFlow, and more. Experienced in building
              AI-driven applications and scalable web solutions.
            </motion.p>
          </motion.div>

          <motion.div
            className="section my-achievements"
            style={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              style={{ fontSize: "2.2rem", color: "#00bfff" }}
            >
              Achievements
            </motion.h2>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.12 }}
            >
              <motion.li
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                🏆 Built a Resume Builder with 90%+ ATS Score Support
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                🥇 Won Hackathon in RCE with Brainovision
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                📜 Completed multiple workshops in AI, Web Development, and Mobile App Development
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                💡 Developed AI Chatbot and Career Recommendation System Using MERN Stack
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div
            className="section contact-me"
            style={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              style={{ fontSize: "2.2rem", color: "#00bfff" }}
            >
              Let's Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
            >
              I’m open to freelance projects, internships, and collaboration opportunities. Feel free to reach out on any
              of the platforms below!
            </motion.p>
            <motion.button
              className="hero-btn"
              style={styles.button}
              {...hoverPulse}
              onClick={() => navigate("/contact")}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
            >
              Let's Connect →
            </motion.button>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: motionPermission !== "granted" ? "pointer" : "default",
            }}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onClick={motionPermission !== "granted" ? requestMotionPermission : null}
          >
            <motion.div
              className="scroll-down"
              animate={{ y: [0, 12, 0], opacity: [0.6, 0.95, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            className="hero-socials"
            style={styles.socials}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
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
                style={styles.socialIcon}
                {...hoverPulse}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;