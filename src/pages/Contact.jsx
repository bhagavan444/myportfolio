import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaTwitter } from 'react-icons/fa';

// Inline Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3rem)',
    background: 'linear-gradient(155deg, #0a001a, #1a0033, #2a0055, #4c00bb)',
    backgroundSize: '600% 600%',
    color: '#f5f7fa',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '1800px',
    fontFamily: "'Inter', 'Montserrat', sans-serif",
    willChange: 'background, transform',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 20% 10%, rgba(76, 29, 149, 0.4), transparent 40%),
      radial-gradient(circle at 80% 90%, rgba(192, 38, 211, 0.4), transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 60%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(500px, 70vw, 800px)',
    height: 'clamp(500px, 70vw, 800px)',
    background: 'radial-gradient(circle, rgba(76, 29, 149, 0.4), transparent 55%)',
    top: '-20%',
    left: '-20%',
    filter: 'blur(140px)',
    zIndex: -1,
  },
  card: {
    background: 'rgba(10, 0, 30, 0.85)',
    border: '1px solid rgba(76, 29, 149, 0.4)',
    borderRadius: 'clamp(16px, 3vw, 24px)',
    padding: 'clamp(2.5rem, 5vw, 4rem)',
    maxWidth: 'clamp(800px, 95vw, 1000px)',
    margin: '0 auto',
    textAlign: 'center',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(76, 29, 149, 0.3)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 0deg, rgba(76, 29, 149, 0.4), rgba(192, 38, 211, 0.4), rgba(59, 130, 246, 0.4), transparent)',
    zIndex: -1,
    opacity: 0.5,
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #6b21a8, #d946ef, #3b82f6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 40px rgba(76, 29, 149, 0.8), 0 0 70px rgba(192, 38, 211, 0.6)',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
    letterSpacing: '0.15em',
  },
  titleUnderline: {
    width: 'clamp(160px, 30vw, 240px)',
    height: '6px',
    background: 'linear-gradient(90deg, #6b21a8, #d946ef)',
    borderRadius: '6px',
    margin: '0.8rem auto clamp(2rem, 3vw, 2.5rem)',
    boxShadow: '0 0 25px rgba(76, 29Users/bhagavan444, 149, 0.8)',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    marginTop: 'clamp(2rem, 3.5vw, 2.5rem)',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
    color: '#e0e7ff',
    transition: 'transform 0.3s ease, color 0.3s ease',
  },
  icon: {
    fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
    color: '#d946ef',
    filter: 'drop-shadow(0 0 10px rgba(217, 70, 239, 0.5))',
  },
  socialContainer: {
    display: 'flex',
    gap: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 'clamp(2rem, 3.5vw, 2.5rem)',
  },
  socialIcon: {
    fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
    color: '#e0e7ff',
    textShadow: '0 0 15px rgba(76, 29, 149, 0.6)',
    transition: 'all 0.3s ease',
  },
};

// Inline Animation Styles
const animationStyles = `
  @keyframes holographicPulse {
    0%, 100% { opacity: 0.65; }
    50% { opacity: 1; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(100px, 100px) scale(1.15); }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes neonFlicker {
    0%, 100% { opacity: 1; filter: brightness(100%); }
    50% { opacity: 0.7; filter: brightness(150%); }
  }
  @keyframes orbit {
    0% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
    100% { transform: translate(0, 0); }
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2, ease: 'easeOut', staggerChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 120, scale: 0.8, rotateY: -25 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 140, damping: 16 },
  },
};

const infoVariants = {
  hidden: { opacity: 0, x: -50, rotate: -15 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

const socialVariants = {
  hidden: { scale: 0.7, opacity: 0, rotate: -45 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 160, damping: 12, delayChildren: 0.9 },
  },
};

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [10, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.4], [-10, 0]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = window.innerWidth;
        containerRef.current.style.padding = width <= 480
          ? '2.5rem 1.2rem'
          : width <= 768
          ? '3.5rem 2.2rem'
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
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.9rem, calc(0.15vw + ${1 + i * 0.2}rem), ${1.8 + i * 0.25}rem)`,
            height: `clamp(0.9rem, calc(0.15vw + ${1 + i * 0.2}rem), ${1.8 + i * 0.25}rem)`,
            background: 'radial-gradient(circle, rgba(76, 29, 149, 0.5), rgba(192, 38, 211, 0.3))',
            borderRadius: '50%',
            top: `${5 + i * 5}%`,
            left: `${5 + i * 4}%`,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 10px rgba(76, 29, 149, 0.5))',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.div
        style={{ ...styles.holographicGlow, animation: 'glowShift 12s ease-in-out infinite' }}
      />
      <motion.div
        style={styles.card}
        variants={cardVariants}
        
      >
        <motion.div
          style={{ ...styles.cardOverlay, animation: 'rotateGlow 8s linear infinite' }}
        />
        <motion.h2
          style={{ ...styles.title, animation: 'holographicPulse 1.8s ease-in-out infinite alternate' }}
          variants={infoVariants}
        >
          🌌 Connect with Me
        </motion.h2>
        <motion.div style={styles.titleUnderline} variants={infoVariants} />
        <motion.div style={styles.contactInfo} variants={infoVariants}>
          <motion.div
            style={styles.infoItem}
            variants={infoVariants}
            
          >
            <FaEnvelope style={styles.icon} />
            <span>g.sivasatyasaibhagavan@gmail.com</span>
          </motion.div>
          <motion.div
            style={styles.infoItem}
            variants={infoVariants}
            
          >
            <FaPhone style={styles.icon} />
            <span>+91 7569205626</span>
          </motion.div>
          <motion.div
            style={styles.infoItem}
            variants={infoVariants}
            
          >
            <FaGithub style={styles.icon} />
            <a href="https://github.com/bhagavan444" target="_blank" rel="noreferrer" style={{ color: '#e0e7ff' }}>
              github.com/bhagavan444
            </a>
          </motion.div>
          <motion.div
            style={styles.infoItem}
            variants={infoVariants}
            whileHover={{ scale: 1.05, color: '#d946ef', transition: { duration: 0.3 } }}
          >
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
              style={{ ...styles.socialIcon, animation: 'neonFlicker 2.5s ease-in-out infinite' }}
              variants={socialVariants}
              whileHover={{
                scale: 1.4,
                rotate: 360,
                color: '#d946ef',
                filter: 'drop-shadow(0 0 15px rgba(217, 70, 239, 0.7))',
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -10, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
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