import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaTwitter } from 'react-icons/fa';

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
  card: {
    background: 'rgba(10, 0, 30, 0.9)',
    border: '1px solid rgba(76, 29, 149, 0.3)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 4vw, 3rem)',
    maxWidth: 'clamp(700px, 90vw, 900px)',
    margin: '0 auto',
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
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3, #3b82f6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 35px rgba(76, 29, 149, 0.7), 0 0 60px rgba(192, 38, 211, 0.5)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    letterSpacing: '0.12em',
  },
  titleUnderline: {
    width: 'clamp(140px, 25vw, 200px)',
    height: '5px',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3)',
    borderRadius: '5px',
    margin: '0.6rem auto clamp(1.5rem, 2.5vw, 2rem)',
    boxShadow: '0 0 20px rgba(76, 29, 149, 0.7)',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    marginTop: 'clamp(1.5rem, 3vw, 2rem)',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.8rem, 1.5vw, 1.2rem)',
    fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
    color: '#e0e7ff',
  },
  icon: {
    fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
    color: '#c026d3',
  },
  socialContainer: {
    display: 'flex',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 'clamp(1.5rem, 3vw, 2rem)',
  },
  socialIcon: {
    fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
    color: '#e0e7ff',
    textShadow: '0 0 10px rgba(76, 29, 149, 0.5)',
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
  @keyframes neonFlicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
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

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.82, rotateY: -20 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 120, damping: 15 },
  },
};

const infoVariants = {
  hidden: { opacity: 0, x: -40, rotate: -10 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const socialVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.8, type: 'spring', stiffness: 150 },
  },
};

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [5, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = window.innerWidth;
        containerRef.current.style.padding = width <= 480
          ? '2rem 1rem'
          : width <= 768
          ? '3rem 2rem'
          : styles.container.padding;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ ...styles.container, opacity, scale, rotateX, rotateY }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Contact section"
    >
      <style>{animationStyles}</style>
      <div style={styles.overlay} />
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
      <motion.div
        style={{ ...styles.holographicGlow, animation: 'glowShift 15s ease-in-out infinite' }}
      />
      <motion.div
        style={styles.card}
        variants={cardVariants}
        whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02, transition: { duration: 0.4 } }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          style={{ ...styles.cardOverlay, animation: 'rotateGlow 10s linear infinite' }}
        />
        <motion.h2
          style={{ ...styles.title, animation: 'holographicPulse 2s ease-in-out infinite alternate' }}
          variants={infoVariants}
        >
          🌐 Let's Connect
        </motion.h2>
        <motion.div style={styles.titleUnderline} variants={infoVariants} />
        <motion.div style={styles.contactInfo} variants={infoVariants}>
          <motion.div style={styles.infoItem} variants={infoVariants}>
            <FaEnvelope style={styles.icon} />
            <span>g.sivasatyasaibhagavan@gmail.com</span>
          </motion.div>
          <motion.div style={styles.infoItem} variants={infoVariants}>
            <FaPhone style={styles.icon} />
            <span>+91 7569205626</span>
          </motion.div>
          <motion.div style={styles.infoItem} variants={infoVariants}>
            <FaGithub style={styles.icon} />
            <a href="https://github.com/bhagavan444" target="_blank" rel="noreferrer" style={{ color: '#e0e7ff' }}>
              github.com/bhagavan444
            </a>
          </motion.div>
          <motion.div style={styles.infoItem} variants={infoVariants}>
            <FaLinkedin style={styles.icon} />
            <a
              href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#e0e7ff' }}
            >
              linkedin.com/in/siva-satya-sai-bhagavan
            </a>
          </motion.div>
        </motion.div>
        <motion.div style={styles.socialContainer} variants={socialVariants}>
          {[
            { icon: <FaEnvelope />, link: 'mailto:g.sivasatyasaibhagavan@gmail.com', label: 'Email' },
            { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/', label: 'LinkedIn' },
            { icon: <FaGithub />, link: 'https://github.com/bhagavan444', label: 'GitHub' },
            { icon: <FaTwitter />, link: 'https://twitter.com/', label: 'Twitter' },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              style={{ ...styles.socialIcon, animation: 'neonFlicker 3s ease-in-out infinite' }}
              variants={socialVariants}
              whileHover={{ scale: 1.3, rotate: 360, color: '#c026d3', transition: { duration: 0.6 } }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Connect via ${social.label}`}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;