import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Skill categories data
const skillCategories = [
  {
    title: '🧠 Programming Languages',
    delay: 0,
    skills: ['C', 'Java', 'Python', 'R', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: '🌐 Web & Mobile Technologies',
    delay: 0.2,
    skills: ['HTML5', 'CSS3', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Firebase'],
  },
  {
    title: '⚙️ Frameworks & Platforms',
    delay: 0.4,
    skills: ['Flask', 'Django', 'MERN Stack', 'Git & GitHub', 'AWS', 'Cloud Computing'],
  },
  {
    title: '🧩 AI, ML & Data Science',
    delay: 0.6,
    skills: ['Scikit-learn', 'TensorFlow', 'Pandas', 'Numpy', 'AI & ML Concepts', 'Data Visualization'],
  },
  {
    title: '💼 Professional & Soft Skills',
    delay: 0.8,
    skills: [
      'Effective Communication',
      'Problem Solving',
      'Team Collaboration',
      'Leadership',
      'Critical Thinking',
      'Adaptability',
      'Time Management',
    ],
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
    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
    color: '#e0e7ff',
    maxWidth: 'clamp(600px, 80vw, 900px)',
    margin: '0 auto',
    lineHeight: '1.9',
    textShadow: '0 0 12px rgba(76, 29, 149, 0.4)',
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
    textAlign: 'center',
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
    fontSize: 'clamp(1.4rem, 3.2vw, 2rem)',
    color: '#4c1d95',
    textShadow: '0 0 18px rgba(76, 29, 149, 0.6)',
    marginBottom: 'clamp(1rem, 2.2vw, 1.5rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
  },
  skillList: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 'clamp(0.6rem, 1.5vw, 1rem)',
  },
  skillItem: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(0.5rem, 1.2vw, 0.8rem)',
    background: 'rgba(76, 29, 149, 0.15)',
    borderRadius: 'clamp(10px, 1.5vw, 14px)',
    border: '1px solid rgba(76, 29, 149, 0.2)',
    textShadow: '0 0 10px rgba(76, 29, 149, 0.4)',
  },
  skillIcon: {
    color: '#c026d3',
    marginRight: 'clamp(0.5rem, 1.2vw, 0.8rem)',
    fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
  },
  // Responsive styles
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      grid: { gap: 'clamp(1.8rem, 3.5vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(320px, 45vw, 380px), 1fr))' },
      card: { padding: 'clamp(2rem, 3.5vw, 2.8rem)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3vw, 2rem)' },
      skillItem: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 700px)', height: 'clamp(400px, 55vw, 700px)', top: '-15%', left: '-15%' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      grid: { gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 340px), 1fr))', gap: 'clamp(1.5rem, 3vw, 2.5rem)' },
      card: { padding: 'clamp(1.8rem, 3vw, 2.5rem)' },
      cardTitle: { fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)' },
      skillItem: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      grid: { gridTemplateColumns: '1fr', gap: 'clamp(1.2rem, 2.5vw, 2rem)' },
      card: { padding: 'clamp(1.5rem, 2.5vw, 2rem)' },
      cardTitle: { fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' },
      skillItem: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)' },
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

const skillItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const MySkills = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
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
      aria-label='Skills section'
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
      {/* Header Section */}
      <motion.div
        style={{ ...styles.header, ...responsiveStyles.header }}
        variants={headerVariants}
      >
        <h1 style={{ ...styles.title, ...responsiveStyles.title, animation: 'holographicPulse 2s ease-in-out infinite alternate' }}>
          🚀 My Skill Set
        </h1>
        <div style={styles.titleUnderline} />
        <p style={{ ...styles.introText, ...responsiveStyles.introText }}>
          I bring a diverse arsenal of technical expertise paired with exceptional interpersonal skills to craft scalable solutions, empower teams, and thrive in dynamic tech ecosystems.
        </p>
      </motion.div>
      {/* Skills Grid Section */}
      <motion.div
        style={{ ...styles.grid, ...responsiveStyles.grid }}
        variants={containerVariants}
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            style={{ ...styles.card, ...responsiveStyles.card }}
            variants={cardVariants}
          >
            <motion.div
              style={{ ...styles.cardOverlay, animation: 'rotateGlow 10s linear infinite' }}
            />
            <h2 style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}>
              {category.title}
            </h2>
            <ul style={styles.skillList}>
              {category.skills.map((skill, idx) => (
                <motion.li
                  key={idx}
                  style={{ ...styles.skillItem, ...responsiveStyles.skillItem }}
                  variants={skillItemVariants}
                  whileHover={{
                    scale: 1.06,
                    background: 'rgba(76, 29, 149, 0.25)',
                    boxShadow: '0 0 12px rgba(76, 29, 149, 0.5)',
                    color: '#f5f7fa',
                  }}
                  whileTap={{ scale: 0.94 }}
                >
                  <span style={styles.skillIcon}>✅</span>
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default MySkills;