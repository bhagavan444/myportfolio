import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaUser, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaEnvelope, FaHeartbeat, FaUsers } from 'react-icons/fa';

// Personal Details Data
const personalDetails = [
  { label: 'Name', value: 'Gopalajosyula Siva Satya Sai Bhagavan', icon: <FaUser /> },
  { label: 'Phone Number', value: '+91-7569205626', icon: <FaPhone /> },
  {
    label: 'Address',
    value: 'H.No: 20/471, Sri Nagar Colony, Near Anjaneyaswami Temple, Gudivada, Andhra Pradesh - 521301',
    icon: <FaMapMarkerAlt />,
  },
  { label: 'Date of Birth', value: '16th October 2004', icon: <FaBirthdayCake /> },
  { label: 'Email', value: 'g.sivasatyasaibhagavan.com', icon: <FaEnvelope /> },
  { label: 'Blood Group', value: 'O Positive', icon: <FaHeartbeat /> },
  { label: 'Father\'s Name', value: 'Gopalajosyula Sridharbabu', icon: <FaUsers /> },
  { label: 'Mother\'s Name', value: 'Gopalajosyula Vijayalakshmi Madhavi', icon: <FaUsers /> },
  { label: 'Brother\'s Name', value: 'Gopalajosyula Avinash Babu (25 yrs)', icon: <FaUsers /> },
];

// Inline Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)',
    background: 'linear-gradient(155deg, #0d0026, #1a0033, #2a0055, #3b0088)',
    backgroundSize: '600% 600%',
    color: '#f5f7fa',
    overflow: 'hidden',
    position: 'relative',
    perspective: '2000px',
    fontFamily: "'Inter', 'Montserrat', sans-serif",
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.4), transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(192, 38, 211, 0.4), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.3), transparent 70%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(500px, 65vw, 800px)',
    height: 'clamp(500px, 65vw, 800px)',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45), transparent 60%)',
    top: '-20%',
    left: '-20%',
    filter: 'blur(150px)',
    zIndex: -1,
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(2rem, 4vw, 3.5rem)',
    background: 'rgba(10, 0, 30, 0.85)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(16px, 2.2vw, 20px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(59, 130, 246, 0.3)',
    backdropFilter: 'blur(16px)',
    maxWidth: 'clamp(700px, 90vw, 1100px)',
    margin: '0 auto clamp(3rem, 6vw, 5rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    opacity: 0.45,
    zIndex: -1,
  },
  title: {
    fontSize: 'clamp(2rem, 5.5vw, 4rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3, #4c1d95)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 35px rgba(59, 130, 246, 0.7), 0 0 60px rgba(192, 38, 211, 0.5)',
    marginBottom: 'clamp(0.6rem, 1.8vw, 1.2rem)',
    letterSpacing: '0.12em',
  },
  titleUnderline: {
    width: 'clamp(160px, 30vw, 240px)',
    height: '5px',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3)',
    borderRadius: '5px',
    margin: '0.6rem auto',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
  },
  introText: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    maxWidth: 'clamp(500px, 80vw, 800px)',
    margin: '0 auto clamp(1rem, 2vw, 1.5rem)',
    lineHeight: '1.7',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 40vw, 360px), 1fr))',
    gap: 'clamp(1.5rem, 3vw, 2.5rem)',
    maxWidth: 'clamp(800px, 95vw, 1400px)',
    margin: '0 auto',
    perspective: '2000px',
  },
  card: {
    background: 'rgba(10, 0, 30, 0.9)',
    borderRadius: 'clamp(14px, 2vw, 18px)',
    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
    textAlign: 'left',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(59, 130, 246, 0.25)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    zIndex: -1,
    opacity: 0.45,
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.8rem, 1.5vw, 1.2rem)',
    padding: 'clamp(0.8rem, 1.5vw, 1.2rem)',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 'clamp(10px, 1.5vw, 12px)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)',
  },
  icon: {
    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
    color: '#3b82f6',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
  },
  label: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    fontWeight: '600',
    color: '#c026d3',
    textShadow: '0 0 10px rgba(192, 38, 211, 0.4)',
    flex: '0 0 auto',
    minWidth: 'clamp(100px, 25vw, 140px)',
  },
  value: {
    fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
    color: '#e0e7ff',
    lineHeight: '1.5',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
    wordBreak: 'break-word',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: 'clamp(700px, 90vw, 1100px)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      introText: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)', maxWidth: 'clamp(500px, 80vw, 800px)' },
      grid: { gap: 'clamp(1.5rem, 3vw, 2.5rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 40vw, 360px), 1fr))' },
      card: { padding: 'clamp(1.5rem, 2.5vw, 2rem)' },
      detailItem: { padding: 'clamp(0.8rem, 1.5vw, 1.2rem)' },
      label: { fontSize: 'clamp(1rem, 2vw, 1.2rem)', minWidth: 'clamp(100px, 25vw, 140px)' },
      value: { fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' },
      holographicGlow: { width: 'clamp(500px, 65vw, 800px)', height: 'clamp(500px, 65vw, 800px)', top: '-20%', left: '-20%' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)', maxWidth: 'clamp(600px, 85vw, 900px)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      introText: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', maxWidth: 'clamp(400px, 75vw, 600px)' },
      grid: { gap: 'clamp(1.2rem, 2.5vw, 2rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(260px, 38vw, 320px), 1fr))' },
      card: { padding: 'clamp(1.3rem, 2.2vw, 1.8rem)' },
      detailItem: { padding: 'clamp(0.7rem, 1.3vw, 1rem)' },
      label: { fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', minWidth: 'clamp(90px, 22vw, 120px)' },
      value: { fontSize: 'clamp(0.9rem, 1.7vw, 1.1rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 600px)', height: 'clamp(400px, 55vw, 600px)', top: '-15%', left: '-15%' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 'clamp(500px, 80vw, 700px)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      introText: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', maxWidth: 'clamp(300px, 70vw, 500px)' },
      grid: { gap: 'clamp(1rem, 2vw, 1.8rem)', gridTemplateColumns: '1fr' },
      card: { padding: 'clamp(1.2rem, 2vw, 1.6rem)' },
      detailItem: { padding: 'clamp(0.6rem, 1.2vw, 0.9rem)' },
      label: { fontSize: 'clamp(0.9rem, 1.7vw, 1rem)', minWidth: 'clamp(80px, 20vw, 100px)' },
      value: { fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
    },
  },
};

// Animation Styles
const animationStyles = `
  @keyframes holographicPulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(50px, 50px) scale(1.1); }
    50% { transform: translate(100px, 0) scale(1.15); }
    75% { transform: translate(50px, -50px) scale(1.1); }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.5, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -100, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.2, type: 'spring', stiffness: 150, damping: 18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.8, rotateY: -20 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, type: 'spring', stiffness: 140, damping: 16 },
  },
};

const detailVariants = {
  hidden: { opacity: 0, x: -30, rotate: -10 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.5 } },
};

const PersonalDetails = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 150, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.85, 1]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsiveStyles = useMemo(() =>
    windowWidth <= 480 ? styles.responsive.small :
    windowWidth <= 768 ? styles.responsive.medium :
    styles.responsive.large,
    [windowWidth]
  );

  return (
    <motion.section
      style={{
        ...styles.container,
        ...responsiveStyles.container,
        opacity,
        scale,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Personal Details section"
    >
      <style>{animationStyles}</style>
      {/* Background Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.5rem, calc(0.1vw + ${0.5 + i * 0.1}rem), ${1 + i * 0.15}rem)`,
            height: `clamp(0.5rem, calc(0.1vw + ${0.5 + i * 0.1}rem), ${1 + i * 0.15}rem)`,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5), rgba(192, 38, 211, 0.3))',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Holographic Glow */}
      <motion.div
        style={{
          ...styles.holographicGlow,
          ...responsiveStyles.holographicGlow,
          animation: 'glowShift 12s ease-in-out infinite',
        }}
      />
      {/* Header Section */}
      <motion.header
        style={{
          ...styles.header,
          ...responsiveStyles.header,
        }}
        variants={headerVariants}
      >
        <motion.div style={styles.headerGlow} />
        <h2
          style={{
            ...styles.title,
            ...responsiveStyles.title,
            animation: 'holographicPulse 2.5s ease-in-out infinite alternate',
          }}
        >
          🌟 About My Personal Details
        </h2>
        <motion.div
          style={styles.titleUnderline}
          initial={{ width: 0 }}
          animate={{ width: 'clamp(160px, 30vw, 240px)' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <p
          style={{
            ...styles.introText,
            ...responsiveStyles.introText,
          }}
        >
          Get to know me through my personal details, presented with a touch of futuristic elegance.
        </p>
      </motion.header>
      {/* Details Grid */}
      <motion.div
        style={{
          ...styles.grid,
          ...responsiveStyles.grid,
        }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {personalDetails.map((detail, index) => (
            <motion.article
              key={detail.label}
              style={{
                ...styles.card,
                ...responsiveStyles.card,
              }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              tabIndex={0}
              role="button"
              aria-label={`Detail: ${detail.label}`}
            >
              <motion.div style={{ ...styles.cardOverlay, animation: 'rotateGlow 8s linear infinite' }} />
              <motion.div
                style={{
                  ...styles.detailItem,
                  ...responsiveStyles.detailItem,
                }}
                variants={detailVariants}
                transition={{ delay: index * 0.1 }}
              >
                <motion.span style={styles.icon} variants={detailVariants}>
                  {detail.icon}
                </motion.span>
                <motion.span
                  style={{
                    ...styles.label,
                    ...responsiveStyles.label,
                  }}
                  variants={detailVariants}
                >
                  {detail.label}:
                </motion.span>
                <motion.span
                  style={{
                    ...styles.value,
                    ...responsiveStyles.value,
                  }}
                  variants={detailVariants}
                >
                  {detail.value}
                </motion.span>
              </motion.div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default React.memo(PersonalDetails);