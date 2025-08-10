import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaDatabase, FaGitAlt, FaGithub, FaPython
} from 'react-icons/fa';
import {
  SiMongodb, SiTailwindcss, SiExpress, SiFlask, SiTensorflow
} from 'react-icons/si';

// Tech/Skills icon mapping function
const getTechIcons = (tech) => {
  const iconMap = {
    HTML5: { icon: <FaHtml5 />, label: 'HTML5' },
    CSS3: { icon: <FaCss3Alt />, label: 'CSS3' },
    JavaScript: { icon: <FaJs />, label: 'JavaScript' },
    React: { icon: <FaReact />, label: 'React' },
    'Node.js': { icon: <FaNodeJs />, label: 'Node.js' },
    Express: { icon: <SiExpress />, label: 'Express' },
    MongoDB: { icon: <SiMongodb />, label: 'MongoDB' },
    'Tailwind CSS': { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
    Python: { icon: <FaPython />, label: 'Python' },
    Flask: { icon: <SiFlask />, label: 'Flask' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow' },
    Git: { icon: <FaGitAlt />, label: 'Git' },
    GitHub: { icon: <FaGithub />, label: 'GitHub' },
    Database: { icon: <FaDatabase />, label: 'Database' },
    'React.js': { icon: <FaReact />, label: 'React.js' },
    'Express.js': { icon: <SiExpress />, label: 'Express.js' },
    Keras: { icon: null, label: 'Keras' },
    'Scikit-Learn': { icon: null, label: 'Scikit-Learn' },
    OpenCV: { icon: null, label: 'OpenCV' },
    Numpy: { icon: null, label: 'Numpy' },
    Pandas: { icon: null, label: 'Pandas' },
    Matplotlib: { icon: null, label: 'Matplotlib' },
    Seaborn: { icon: null, label: 'Seaborn' },
    'AWS Lambda': { icon: null, label: 'AWS Lambda' },
    'REST APIs': { icon: null, label: 'REST APIs' },
    Bootstrap: { icon: null, label: 'Bootstrap' },
    SQL: { icon: null, label: 'SQL' },
    'VS Code': { icon: null, label: 'VS Code' },
    Postman: { icon: null, label: 'Postman' },
    Agile: { icon: null, label: 'Agile' },
    'CI/CD': { icon: null, label: 'CI/CD' },
  };

  return tech.split(', ').map((t, i) => (
    <motion.span
      key={i}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'clamp(6px, 1vw, 8px)',
        margin: 'clamp(4px, 0.8vw, 6px)',
        padding: 'clamp(4px, 0.8vw, 6px) clamp(8px, 1.5vw, 10px)',
        background: 'rgba(76, 29, 149, 0.15)',
        borderRadius: 'clamp(8px, 1.2vw, 10px)',
        border: '1px solid rgba(76, 29, 149, 0.3)',
      }}
      whileHover={{
        scale: 1.15,
        boxShadow: '0 0 15px rgba(76, 29, 149, 0.7)',
        background: 'rgba(76, 29, 149, 0.3)',
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {iconMap[t] ? (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            style={{ color: '#c026d3', textShadow: '0 0 10px rgba(76, 29, 149, 0.5)' }}
          >
            {iconMap[t].icon}
          </motion.span>
          <span style={{ color: '#e0e7ff', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
            {iconMap[t].label}
          </span>
        </>
      ) : (
        <span style={{ color: '#d1d5db', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>{t}</span>
      )}
    </motion.span>
  ));
};

// Data
const aboutData = [
  {
    title: '🚀 Real-World Projects',
    items: [
      'Resume Builder (MERN + ATS) – Google/GitHub login, ATS scoring using NLP, PDF/Word export.',
      'Career Recommendation System – ML + Flask app to suggest best-fit careers based on inputs.',
      'Second-Hand Electronics Platform – Full MERN app with secure auth and MongoDB listings.',
      'AI Chatbot (AWS Lex) – Voice/text bot with AWS Lambda integration and NLP logic.',
      'OLX-Style Marketplace – Full-stack marketplace for electronics (search, auth, filters).',
    ],
    skills: 'React.js, Node.js, MongoDB, Express.js, Python, Flask, TensorFlow, AWS Lambda, REST APIs',
    icon: FaStar,
  },
  {
    title: '📜 Internship Experience',
    items: [
      'AI/ML Intern @ Blackbucks Pvt Ltd – Developed a real-time ML prediction system.',
      'SmartBridge x Eduskills – Created fruit & vegetable classifier with DL + TensorFlow + AWS.',
    ],
    skills: 'Python, TensorFlow, Scikit-Learn, AWS Lambda',
    icon: FaStar,
  },
  {
    title: '🎯 Career Objectives',
    items: [
      'Seeking roles in Full Stack Development, Machine Learning, or Data Science.',
      'Aim is to apply skills on real-world problems, work in agile teams, and grow as an engineer.',
    ],
    skills: 'Agile, CI/CD',
    icon: FaStar,
  },
  {
    title: '🌟 Why Me?',
    items: [
      '✔ End-to-end delivery (frontend, backend, ML)',
      '✔ Git, GitHub, APIs, CI/CD experience',
      '✔ Agile collaboration & documentation',
      '✔ Fast learner & tech explorer',
    ],
    skills: 'Git, GitHub, REST APIs, Agile, CI/CD',
    icon: FaStar,
  },
  {
    title: '🚀 Core Technologies',
    skills: 'HTML5, CSS3, JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, Python, Flask, TensorFlow, Git, GitHub, Database',
    items: [],
    icon: FaStar,
  },
  {
    title: '📚 Other Tools & Skills',
    skills: 'React.js, Node.js, MongoDB, Express.js, Python, Flask, TensorFlow, Keras, Scikit-Learn, OpenCV, Numpy, Pandas, Matplotlib, Seaborn, AWS Lambda, Git, GitHub, REST APIs, HTML5, Tailwind CSS, Bootstrap, SQL, VS Code, Postman, Agile, CI/CD',
    items: [],
    icon: FaStar,
  },
];

// Inline Styles (from EducationEnhanced.jsx)
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3rem)',
    background: 'linear-gradient(155deg, #1a0033, #2a0055, #3b0088, #4c00bb)',
    backgroundSize: '500% 500%',
    color: '#f5f7fa',
    overflowX: 'hidden',
    position: 'relative',
    fontFamily: "'Inter', 'Montserrat', sans-serif",
    willChange: 'background',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 10% 15%, rgba(76, 29, 149, 0.3), transparent 50%),
      radial-gradient(circle at 90% 85%, rgba(192, 38, 211, 0.3), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(400px, 60vw, 700px)',
    height: 'clamp(400px, 60vw, 700px)',
    background: 'radial-gradient(circle, rgba(76, 29, 149, 0.35), transparent 60%)',
    top: '-15%',
    left: '-15%',
    filter: 'blur(120px)',
    zIndex: -1,
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(2.5rem, 4.5vw, 4rem)',
    background: 'rgba(10, 0, 30, 0.85)',
    border: '1px solid rgba(76, 29, 149, 0.4)',
    borderRadius: 'clamp(16px, 2.2vw, 20px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(76, 29, 149, 0.3)',
    backdropFilter: 'blur(16px)',
    maxWidth: 'clamp(700px, 90vw, 1100px)',
    margin: '0 auto clamp(3rem, 6vw, 5rem)',
  },
  title: {
    fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3, #3b82f6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 35px rgba(76, 29, 149, 0.7), 0 0 60px rgba(192, 38, 211, 0.5)',
    marginBottom: 'clamp(0.6rem, 1.8vw, 1.2rem)',
    letterSpacing: '0.12em',
  },
  titleUnderline: {
    width: 'clamp(160px, 30vw, 240px)',
    height: '5px',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3)',
    borderRadius: '5px',
    margin: '0.6rem auto',
    boxShadow: '0 0 20px rgba(76, 29, 149, 0.7)',
  },
  introText: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    maxWidth: 'clamp(500px, 80vw, 800px)',
    margin: '0 auto clamp(1rem, 2vw, 1.5rem)',
    lineHeight: '1.7',
    textShadow: '0 0 10px rgba(76, 29, 149, 0.4)',
  },
  timeline: {
    position: 'relative',
    maxWidth: 'clamp(800px, 95vw, 1600px)',
    margin: '0 auto',
    padding: '0 clamp(0.5rem, 2vw, 1.5rem)',
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 'clamp(3px, 0.5vw, 7px)',
    background: 'linear-gradient(to bottom, #4c1d95, #c026d3)',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 20px rgba(76, 29, 149, 0.7)',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 'clamp(1.8rem, 3.5vw, 3rem)',
  },
  content: {
    background: 'rgba(10, 0, 30, 0.9)',
    border: '1px solid rgba(76, 29, 149, 0.3)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 4vw, 3rem)',
    width: 'clamp(300px, 45%, 600px)',
    textAlign: 'left',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(76, 29, 149, 0.25)',
    position: 'relative',
    overflow: 'hidden',
  },
  contentLeft: { marginRight: 'auto' },
  contentRight: { marginLeft: 'auto' },
  contentOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(76, 29, 149, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    zIndex: -1,
    opacity: 0.45,
  },
  cardTitle: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
    color: '#4c1d95',
    textShadow: '0 0 18px rgba(76, 29, 149, 0.6)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  cardDescription: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
    lineHeight: '1.7',
    textShadow: '0 0 10px rgba(76, 29, 149, 0.4)',
  },
  techLabel: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#c026d3',
    fontWeight: 'bold',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(76, 29, 149, 0.4)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(10px, 2vw, 12px)',
    marginTop: 'clamp(0.8rem, 2vw, 1rem)',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
  },
  iconWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #4c1d95, #c026d3)',
    borderRadius: '50%',
    padding: 'clamp(0.5rem, 1.2vw, 1rem)',
    boxShadow: '0 0 25px rgba(76, 29, 149, 0.9)',
    zIndex: 3,
  },
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.8vw, 1.2rem)' },
      content: { padding: 'clamp(2rem, 3.5vw, 2.8rem)', width: 'clamp(320px, 45%, 600px)' },
      cardTitle: { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)' },
      cardDescription: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 700px)', height: 'clamp(400px, 55vw, 700px)', top: '-15%', left: '-15%' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.5vw, 1rem)' },
      content: { padding: 'clamp(1.8rem, 3vw, 2.5rem)', width: 'clamp(280px, 45%, 500px)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.2vw, 0.8rem)' },
      content: { padding: 'clamp(1.5rem, 2.5vw, 2rem)', width: 'clamp(260px, 80%, 400px)' },
      cardTitle: { fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)' },
      cardDescription: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)' },
      holographicGlow: { width: 'clamp(250px, 40vw, 400px)', height: 'clamp(250px, 40vw, 400px)', top: '-10%', left: '-10%' },
    },
  },
};

// Inline Animation Styles
const animationStyles = `
  @keyframes holographicPulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(70px, 70px) scale(1.12); }
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, ease: 'easeOut', staggerChildren: 0.25 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -80, rotateX: -12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.2, type: 'spring', stiffness: 130, damping: 16 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.82 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, type: 'spring', stiffness: 120, damping: 15 },
  },
};

const contentChildVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const About = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);

  // Apply responsive styles based on window width
  const responsiveStyles = windowWidth <= 480 ? styles.responsive.small :
                         windowWidth <= 768 ? styles.responsive.medium :
                         styles.responsive.large;

  return (
    <motion.section
      style={{ ...styles.container, ...responsiveStyles.container, opacity, scale }}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      role='region'
      aria-label='About section'
    >
      <style>{animationStyles}</style>
      {/* Background Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.8rem, calc(0.1vw + ${1 + i * 0.15}rem), ${1.5 + i * 0.2}rem)`,
            height: `clamp(0.8rem, calc(0.1vw + ${1 + i * 0.15}rem), ${1.5 + i * 0.2}rem)`,
            background: 'radial-gradient(circle, rgba(76, 29, 149, 0.4), rgba(192, 38, 211, 0.2))',
            borderRadius: '50%',
            top: `${5 + i * 4}%`,
            left: `${5 + i * 3}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Holographic Glow */}
      <motion.div
        style={{ ...styles.holographicGlow, ...responsiveStyles.holographicGlow, animation: 'glowShift 15s ease-in-out infinite' }}
      />
      {/* Header Section */}
      <motion.div
        style={{ ...styles.header, ...responsiveStyles.header }}
        variants={headerVariants}
      >
        <h2 style={{ ...styles.title, ...responsiveStyles.title, animation: 'holographicPulse 2s ease-in-out infinite alternate' }}>
          👋 About Siva Satya Sai Bhagavan
        </h2>
        <div style={styles.titleUnderline} />
        <p style={{ ...styles.introText, ...responsiveStyles.introText }}>
          Final Year B.Tech AI&DS Student | MERN Stack Developer | Python & Data Science Enthusiast
        </p>
      </motion.div>
      {/* Timeline Section */}
      <motion.div
        style={{ ...styles.timeline, ...responsiveStyles.timeline }}
        variants={containerVariants}
      >
        <motion.div
          style={styles.timelineLine}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '100%', opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.6 }}
        />
        <AnimatePresence>
          {aboutData.map((section, index) => {
            const IconComp = section.icon;
            return (
              <motion.div
                key={section.title}
                style={styles.item}
                variants={itemVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-50px' }}
              >
                <motion.div
                  style={{
                    ...styles.content,
                    ...responsiveStyles.content,
                    ...(index % 2 === 0 ? styles.contentLeft : styles.contentRight),
                  }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: '0 30px 70px rgba(76, 29, 149, 0.6), 0 0 90px rgba(192, 38, 211, 0.5)',
                    translateY: -12,
                  }}
                  whileTap={{ scale: 0.92 }}
                >
                  <motion.div
                    style={{ ...styles.contentOverlay }}
                  />
                  <motion.h3
                    style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.12 + 0.2 }}
                  >
                    <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                    {section.title}
                  </motion.h3>
                  {section.items.length > 0 && (
                    <motion.ul
                      style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}
                      variants={contentChildVariants}
                      initial='hidden'
                      animate='visible'
                      transition={{ delay: index * 0.12 + 0.3 }}
                    >
                      {section.items.map((item, i) => (
                        <motion.li
                          key={i}
                          style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                          variants={contentChildVariants}
                          initial='hidden'
                          animate='visible'
                          transition={{ delay: index * 0.12 + 0.4 + i * 0.1 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                  <motion.p
                    style={styles.techLabel}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.12 + 0.7 }}
                  >
                    🔧 Skills & Technologies:
                  </motion.p>
                  <motion.div
                    style={styles.techContainer}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.12 + 0.8 }}
                  >
                    {getTechIcons(section.skills)}
                  </motion.div>
                </motion.div>
                <motion.div
                  style={{
                    ...styles.iconWrapper,
                  }}
                  variants={contentChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.12 + 1.0 }}
                >
                  <IconComp size='clamp(18px, 2.2vw, 28px)' color='#0d0026' />
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default About;