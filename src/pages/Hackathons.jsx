import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaExternalLinkAlt, FaTrophy } from 'react-icons/fa';
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiFlask,
  SiPython,
  SiFirebase,
  SiHtml5,
  SiCss3,
  SiScikitlearn,
  SiTensorflow,
  SiPandas,
  SiOpenai,
  SiSocketdotio,
  SiCloudinary,
  SiNumpy,
} from 'react-icons/si';

// Tech icon mapping function
const getTechIcons = (tech) => {
  const iconMap = {
    MongoDB: { icon: <SiMongodb />, label: 'MongoDB' },
    Express: { icon: <SiExpress />, label: 'Express' },
    'Express.js': { icon: <SiExpress />, label: 'Express.js' },
    React: { icon: <SiReact />, label: 'React' },
    'React.js': { icon: <SiReact />, label: 'React.js' },
    Node: { icon: <SiNodedotjs />, label: 'Node.js' },
    'Node.js': { icon: <SiNodedotjs />, label: 'Node.js' },
    Flask: { icon: <SiFlask />, label: 'Flask' },
    Python: { icon: <SiPython />, label: 'Python' },
    Firebase: { icon: <SiFirebase />, label: 'Firebase' },
    'Firebase Auth': { icon: <SiFirebase />, label: 'Firebase Auth' },
    HTML: { icon: <SiHtml5 />, label: 'HTML' },
    CSS: { icon: <SiCss3 />, label: 'CSS' },
    CSS3: { icon: <SiCss3 />, label: 'CSS3' },
    'HTML/CSS': {
      icon: (
        <>
          <SiHtml5 /> <SiCss3 />
        </>
      ),
      label: 'HTML/CSS',
    },
    'Scikit-learn': { icon: <SiScikitlearn />, label: 'Scikit-learn' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow' },
    Pandas: { icon: <SiPandas />, label: 'Pandas' },
    Numpy: { icon: <SiNumpy />, label: 'Numpy' },
    Numpys: { icon: <SiNumpy />, label: 'Numpy' },
    OpenAI: { icon: <SiOpenai />, label: 'OpenAI' },
    'OpenAI API': { icon: <SiOpenai />, label: 'OpenAI API' },
    Socket: { icon: <SiSocketdotio />, label: 'Socket.io' },
    'Socket.io': { icon: <SiSocketdotio />, label: 'Socket.io' },
    Cloudinary: { icon: <SiCloudinary />, label: 'Cloudinary' },
    TFIDF: { icon: null, label: 'TF-IDF' },
    'TF-IDF': { icon: null, label: 'TF-IDF' },
    NLTK: { icon: null, label: 'NLTK' },
    Keras: { icon: null, label: 'Keras' },
    LangChain: { icon: null, label: 'LangChain' },
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

// Hackathon Data
const hackathons = [
  {
    type: 'hackathon',
    title: '🚀 Hackathon - Brainovision x RCE 2025',
    description:
      'Led a high-performing team to victory in a 24-hour Hackathon hosted by Brainovision & RCE, developing a scalable MERN full-stack application for a second-hand electronics marketplace, outperforming 15+ teams with innovative UI/UX and robust backend optimization.',
    tech: 'MongoDB, Express.js, React.js, Node.js, Cloudinary, Socket.io',
    certLink: 'https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view?usp=sharing',
    projLink: 'https://github.com/bhagavan444/hackathon-project',
    tag: '#MERN #Hackathon #Leadership #FullStack #Innovation',
    icon: FaTrophy,
  },
];

// Inline Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3rem)',
    background: 'linear-gradient(155deg, #1a0033, #2a0055, #3b0088, #4c00bb)',
    backgroundSize: '500% 500%',
    color: '#f5f7fa',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '1600px',
    fontFamily: "'Inter', 'Montserrat', sans-serif",
    willChange: 'background, transform',
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
  filterBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    marginBottom: 'clamp(2rem, 4vw, 3rem)',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)',
    background: 'rgba(76, 29, 149, 0.2)',
    border: '1px solid rgba(76, 29, 149, 0.4)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    color: '#e0e7ff',
    cursor: 'pointer',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    fontWeight: '600',
    boxShadow: '0 0 10px rgba(76, 29, 149, 0.3)',
  },
  activeFilter: {
    background: 'linear-gradient(90deg, #4c1d95, #c026d3)',
    color: '#f5f7fa',
    boxShadow: '0 0 15px rgba(76, 29, 149, 0.7)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 45vw, 360px), 1fr))',
    gap: 'clamp(1.8rem, 3.5vw, 3rem)',
    maxWidth: 'clamp(800px, 95vw, 1600px)',
    margin: '0 auto',
    perspective: '1600px',
  },
  card: {
    background: 'rgba(10, 0, 30, 0.9)',
    border: '1px solid rgba(76, 29, 149, 0.3)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 4vw, 3rem)',
    textAlign: 'left',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(76, 29, 149, 0.25)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
  },
  cardOverlay: {
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
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
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
  linkContainer: {
    display: 'flex',
    gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
    flexWrap: 'wrap',
  },
  link: {
    display: 'inline-flex',
    padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3)',
    color: '#f5f7fa',
    borderRadius: 'clamp(10px, 1.5vw, 14px)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    boxShadow: '0 0 10px rgba(76, 29, 149, 0.5)',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.7vw, 0.5rem)',
  },
  tag: {
    fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
    color: '#d1d5db',
    marginTop: 'clamp(0.5rem, 1.2vw, 0.8rem)',
    textShadow: '0 0 8px rgba(76, 29, 149, 0.2)',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      grid: { gap: 'clamp(1.8rem, 3.5vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(320px, 45vw, 380px), 1fr))' },
      card: { padding: 'clamp(2rem, 3.5vw, 2.8rem)' },
      cardTitle: { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)' },
      cardDescription: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 700px)', height: 'clamp(400px, 55vw, 700px)', top: '-15%', left: '-15%' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      grid: { gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 340px), 1fr))', gap: 'clamp(1.5rem, 3vw, 2.5rem)' },
      card: { padding: 'clamp(1.8rem, 3vw, 2.5rem)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      grid: { gridTemplateColumns: '1fr', gap: 'clamp(1.2rem, 2.5vw, 2rem)' },
      card: { padding: 'clamp(1.5rem, 2.5vw, 2rem)' },
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
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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

const filterBtnVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.82, rotateY: -20 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.9, type: 'spring', stiffness: 120, damping: 15 },
  },
};

const cardChildVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Hackathons = () => {
  const [filter, setFilter] = useState('All');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);

  const typeOptions = [
    'All',
    ...Array.from(new Set(hackathons.map((h) => h.type))).sort(),
  ];

  const filteredHackathons = filter === 'All' ? hackathons : hackathons.filter((h) => h.type === filter);

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
      aria-label='Hackathons section'
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
          ⚡ Hackathon Achievements
        </h2>
        <div style={styles.titleUnderline} />
        <p style={{ ...styles.introText, ...responsiveStyles.introText }}>
          Showcasing my ability to deliver cutting-edge solutions under pressure, these hackathon successes highlight my technical expertise, teamwork, and innovative mindset.
        </p>
      </motion.div>
      {/* Filter Bar */}
      <motion.div
        style={{ ...styles.filterBar, ...responsiveStyles.filterBar }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {typeOptions.map((type, index) => (
            <motion.button
              key={type}
              style={{ ...styles.filterBtn, ...(filter === type ? styles.activeFilter : {}), ...responsiveStyles.filterBtn }}
              onClick={() => setFilter(type)}
              variants={filterBtnVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              
            >
              {type}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Hackathons Grid */}
      <motion.div
        style={{ ...styles.grid, ...responsiveStyles.grid }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredHackathons.map((hackathon, index) => {
            const IconComp = hackathon.icon;
            return (
              <motion.div
                key={hackathon.title}
                style={{ ...styles.card, ...responsiveStyles.card }}
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-50px' }}
                
              >
                <motion.div
                  style={{ ...styles.cardOverlay, animation: 'rotateGlow 10s linear infinite' }}
                />
                <motion.h3
                  style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.12 + 0.2 }}
                >
                  <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                  {hackathon.title}
                </motion.h3>
                <motion.p
                  style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.12 + 0.3 }}
                >
                  {hackathon.description}
                </motion.p>
                <motion.p
                  style={styles.techLabel}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.12 + 0.4 }}
                >
                  🔧 Tech Used:
                </motion.p>
                <motion.div
                  style={styles.techContainer}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.12 + 0.5 }}
                >
                  {getTechIcons(hackathon.tech)}
                </motion.div>
                <motion.div
                  style={styles.linkContainer}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.12 + 0.6 }}
                >
                  {hackathon.projLink && (
                    <motion.a
                      href={hackathon.projLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      style={styles.link}
                      whileHover={{
                        scale: 1.15,
                        boxShadow: '0 15px 50px rgba(192, 38, 211, 0.6)',
                        translateY: -3,
                      }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View project for ${hackathon.title}`}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)' }} />
                      View Project
                    </motion.a>
                  )}
                  {hackathon.certLink && (
                    <motion.a
                      href={hackathon.certLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      style={styles.link}
                      whileHover={{
                        scale: 1.15,
                        boxShadow: '0 15px 50px rgba(192, 38, 211, 0.6)',
                        translateY: -3,
                      }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View certificate for ${hackathon.title}`}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)' }} />
                      View Certificate
                    </motion.a>
                  )}
                </motion.div>
                <motion.p
                  style={styles.tag}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.12 + 0.7 }}
                >
                  {hackathon.tag}
                </motion.p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default Hackathons;