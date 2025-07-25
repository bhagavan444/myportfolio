import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: i => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05 },
  }),
};

const About = () => {
  const badges = [
    "React.js", "Node.js", "MongoDB", "Express.js", "Python", "Flask",
    "TensorFlow", "Keras", "Scikit-Learn", "OpenCV", "Numpy", "Pandas",
    "Matplotlib", "Seaborn", "AWS Lambda" , "Git", "GitHub",
    "REST APIs", "HTML5",  "Tailwind CSS", "Bootstrap",
    "SQL", "VS Code", "Postman", "Agile",  "CI/CD"
  ];

  return (
    <motion.section
      className="beast-about-container"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.h2 className="beast-about-title" variants={fadeIn}>
        👋 Hi, I'm <span className="highlight">Siva Satya Sai Bhagavan</span>
      </motion.h2>

      <motion.p className="beast-about-subtitle" variants={fadeIn}>
        Final Year B.Tech AI&DS Student | MERN Stack Developer| Python & Data Science Enthusiast
      </motion.p>

      <motion.div className="beast-about-box" custom={1} variants={fadeIn}>
        <p>
          I’m a proactive and solution-driven developer with hands-on experience in{" "}
          <strong>Full Stack (MERN)</strong>, <strong>Python</strong>, and{" "}
          <strong>Machine Learning and AI </strong>. I love building scalable web apps and real-time AI solutions. 
          My focus is on delivering clean code and solving real-world challenges.
        </p>
      </motion.div>

      <motion.div className="beast-about-section" custom={2} variants={fadeIn}>
        <h3>🚀 Real-World Projects</h3>
        <ul>
          <li><strong>Resume Builder (MERN + ATS)</strong> – Google/GitHub login, ATS scoring using NLP, PDF/Word export.</li>
          <li><strong>Carrer Recommendation System</strong> – Python, Machine Learning, and Flask to suggest suitable career paths based on user skills and interests.</li>
          <li><strong>Second-Hand Electronics Platform</strong> – Full-stack MERN app with secure auth, product listings, MongoDB.</li>
          <li><strong>AI Chatbot (AWS Lex)</strong> – Deployed chatbot with AWS Lambda, Lex, backend logic for NLP queries.</li>
          <li><strong>OLX-Style Marketplace Platform</strong> – Designed and developed a full-stack web application for buying and selling second-hand electronics with features like product listings, user authentication, and search filters.</li>

        </ul>
      </motion.div>

      <motion.div className="beast-about-section" custom={3} variants={fadeIn}>
        <h3>📜 Internship Experience</h3>
        <ul>
          <li><strong>AI/ML Intern @ Blackbucks Pvt Ltd</strong> – Developed Real -time Ml Project on Prediction.</li>
          <li><strong>SmartBridge x Eduskills (AI/ML + AWS)</strong> – Developed Real-time Project on Fruit and Vegetable Classification using TensorFlow and DL.</li>
        </ul>
      </motion.div>

      <motion.div className="beast-about-section" custom={4} variants={fadeIn}>
        <h3>🎯 Career Objectives</h3>
        <p>
          Seeking roles in <strong>Full Stack Development</strong>,{" "}
          <strong>Machine Learning</strong>, or <strong>Data Science</strong>.
          My goal is to join a tech-driven company where I can apply my skills in real-time projects,
          collaborate with talented teams, and grow into a well-rounded engineer.
        </p>
      </motion.div>

      <motion.div className="beast-about-section" custom={5} variants={fadeIn}>
        <h3>🌟 Why Me?</h3>
        <ul>
          <li>✔ End-to-end project delivery (frontend, backend, ML)</li>
          <li>✔ Experience with Git, GitHub, APIs, and CI/CD pipelines</li>
          <li>✔ Agile team collaboration and documentation experience</li>
          <li>✔ Continuous learner with quick adaptation to new tech</li>
        </ul>
      </motion.div>

      <motion.div className="beast-about-badges" custom={6} variants={fadeIn}>
        <h4>🧠 Tech Stack & Skills</h4>
        <div className="badge-grid">
          {badges.map((badge, i) => (
            <motion.span
              key={badge}
              className="badge"
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;
