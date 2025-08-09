import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./About.css";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaDatabase, FaGitAlt, FaGithub, FaPython
} from "react-icons/fa";
import {
  SiMongodb, SiTailwindcss, SiExpress, SiFlask, SiTensorflow
} from "react-icons/si";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.25 },
  },
};

const floatIn = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.4, y: 40, rotate: -20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.8,
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, x: ({ isEven }) => (isEven ? -250 : 250) },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

// Data
const techStack = [
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "React", icon: <FaReact /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Python", icon: <FaPython /> },
  { name: "Flask", icon: <SiFlask /> },
  { name: "TensorFlow", icon: <SiTensorflow /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "Database", icon: <FaDatabase /> },
];

const badges = [
  "React.js", "Node.js", "MongoDB", "Express.js", "Python", "Flask",
  "TensorFlow", "Keras", "Scikit-Learn", "OpenCV", "Numpy", "Pandas",
  "Matplotlib", "Seaborn", "AWS Lambda", "Git", "GitHub",
  "REST APIs", "HTML5", "Tailwind CSS", "Bootstrap",
  "SQL", "VS Code", "Postman", "Agile", "CI/CD"
];

const sections = [
  {
    title: "🚀 Real-World Projects",
    items: [
      "Resume Builder (MERN + ATS) – Google/GitHub login, ATS scoring using NLP, PDF/Word export.",
      "Career Recommendation System – ML + Flask app to suggest best-fit careers based on inputs.",
      "Second-Hand Electronics Platform – Full MERN app with secure auth and MongoDB listings.",
      "AI Chatbot (AWS Lex) – Voice/text bot with AWS Lambda integration and NLP logic.",
      "OLX-Style Marketplace – Full-stack marketplace for electronics (search, auth, filters).",
    ],
  },
  {
    title: "📜 Internship Experience",
    items: [
      "AI/ML Intern @ Blackbucks Pvt Ltd – Developed a real-time ML prediction system.",
      "SmartBridge x Eduskills – Created fruit & vegetable classifier with DL + TensorFlow + AWS.",
    ],
  },
  {
    title: "🎯 Career Objectives",
    items: [
      "Seeking roles in Full Stack Development, Machine Learning, or Data Science.",
      "Aim is to apply skills on real-world problems, work in agile teams, and grow as an engineer.",
    ],
  },
  {
    title: "🌟 Why Me?",
    items: [
      "✔ End-to-end delivery (frontend, backend, ML)",
      "✔ Git, GitHub, APIs, CI/CD experience",
      "✔ Agile collaboration & documentation",
      "✔ Fast learner & tech explorer",
    ],
  },
];

// Inline styles for a powerful design
const styles = {
  wrapper: {
    position: "relative",
    background: "linear-gradient(135deg, #0d0026, #1e003b)",
    minHeight: "100vh",
    overflowX: "hidden",
    color: "#f0f0f5",
  },
  orbitingCircle: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(0, 255, 204, 0.1)",
    border: "2px solid #00ffcc",
    top: "10%",
    left: "10%",
    zIndex: 0,
    boxShadow: "0 0 30px rgba(0, 255, 204, 0.5)",
  },
  title: {
    fontSize: "3.5rem",
    textAlign: "center",
    color: "#00ffcc",
    textShadow: "0 0 40px rgba(0, 255, 204, 0.9), 0 0 60px rgba(255, 51, 153, 0.4)",
    marginBottom: "2rem",
    animation: "pulseGlow 2.5s ease-in-out infinite alternate",
  },
  subtitle: {
    fontSize: "1.3rem",
    textAlign: "center",
    color: "#d1d5db",
    maxWidth: "800px",
    margin: "0 auto 3rem",
    lineHeight: "1.6",
  },
  section: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(0, 255, 204, 0.3)",
    borderRadius: "20px",
    padding: "2.5rem",
    margin: "2rem auto",
    maxWidth: "900px",
    boxShadow: "0 15px 50px rgba(0, 0, 0, 0.7)",
    transition: "transform 0.4s ease",
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "1.5rem",
    justifyItems: "center",
    marginTop: "2rem",
  },
  techItem: {
    textAlign: "center",
    padding: "1rem",
    background: "rgba(0, 255, 204, 0.1)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },
  badgeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  badge: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    background: "rgba(255, 255, 255, 0.08)",
    borderRadius: "15px",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
};

// Animation keyframes (to be added to About.css)
const animationStyles = `
  @keyframes pulseGlow {
    from { text-shadow: 0 0 20px rgba(0, 255, 204, 0.6); }
    to { text-shadow: 0 0 50px rgba(0, 255, 204, 0.9), 0 0 70px rgba(255, 51, 153, 0.6); }
  }
`;

const About = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div className="about-wrapper" style={styles.wrapper}>
      <style>{animationStyles}</style>
      <motion.div
        className="orbiting-circle"
        style={{ ...styles.orbitingCircle, scale }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Intro Section */}
      <motion.section
        className="fullscreen-card"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          className="beast-about-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="beast-about-title" variants={floatIn} style={styles.title}>
            👋 Hi, I'm <span className="highlight" style={{ color: "#ff33cc" }}>Siva Satya Sai Bhagavan</span>
          </motion.h2>
          <motion.p className="beast-about-subtitle" variants={floatIn} style={styles.subtitle}>
            Final Year B.Tech AI&DS Student | MERN Stack Developer | Python & Data Science Enthusiast
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Info Sections */}
      {sections.map((section, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { margin: "-50% 0px -50% 0px", once: false });
        const isEven = index % 2 === 0;

        return (
          <motion.section
            ref={ref}
            key={section.title}
            className="fullscreen-card"
            custom={{ isEven }}
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 60px rgba(0, 255, 204, 0.8)" }}
            style={styles.section}
          >
            <motion.div className="beast-about-section" whileHover={{ scale: 1.02 }}>
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                style={{ fontSize: "2.2rem", color: "#00ffcc", textShadow: "0 0 15px rgba(0, 255, 204, 0.6)" }}
              >
                {section.title}
              </motion.h3>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, staggerChildren: 0.1 }}
              >
                {section.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: "1.1rem", margin: "0.8rem 0", color: "#d1d5db" }}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.section>
        );
      })}

      {/* Tech Stack */}
      <motion.section
        className="fullscreen-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        <motion.div className="tech-stack-section" variants={floatIn} style={styles.section}>
          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ fontSize: "2rem", color: "#00ffcc", textShadow: "0 0 15px rgba(0, 255, 204, 0.6)" }}
          >
            🚀 Core Technologies
          </motion.h4>
          <motion.div className="tech-stack-grid" style={styles.techGrid}>
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="tech-icon-with-label"
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(0, 255, 204, 0.8)",
                  color: "#ff33cc",
                }}
                style={styles.techItem}
              >
                <div className="icon" style={{ fontSize: "2rem" }}>
                  {React.cloneElement(tech.icon, { style: { color: "#00ffcc", textShadow: "0 0 10px rgba(0, 255, 204, 0.5)" } })}
                </div>
                <div className="tech-label" style={{ fontSize: "0.9rem", color: "#f0f0f5" }}>
                  {tech.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Skills & Tools */}
      <motion.section
        className="fullscreen-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        <motion.div className="beast-about-badges" style={styles.section}>
          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ fontSize: "2rem", color: "#00ffcc", textShadow: "0 0 15px rgba(0, 255, 204, 0.6)" }}
          >
            📚 Other Tools & Skills
          </motion.h4>
          <motion.div className="badge-grid" style={styles.badgeGrid}>
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                className="badge"
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                whileHover={{
                  scale: 1.15,
                  background: "rgba(0, 255, 204, 0.2)",
                  color: "#ff33cc",
                  y: -8,
                }}
                style={styles.badge}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;