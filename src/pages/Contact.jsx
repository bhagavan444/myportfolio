import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaPhone, FaExternalLinkAlt } from 'react-icons/fa';

// Contact Icon Component with Enhanced Animation
const ContactIcon = React.memo(({ icon: Icon, label, link, index }) => (
  <motion.a
    href={link || '#'}
    target={link ? '_blank' : '_self'}
    rel={link ? 'noopener noreferrer' : ''}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'clamp(8px, 1.2vw, 10px)',
      margin: 'clamp(6px, 1vw, 8px)',
      padding: 'clamp(6px, 1vw, 8px) clamp(10px, 1.8vw, 12px)',
      background: 'linear-gradient(45deg, rgba(192, 38, 211, 0.3), rgba(76, 29, 149, 0.3))',
      borderRadius: 'clamp(10px, 1.5vw, 12px)',
      border: '2px solid rgba(255, 51, 255, 0.4)',
      boxShadow: '0 0 15px rgba(192, 38, 211, 0.5)',
      textDecoration: 'none',
    }}
    initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ delay: index * 0.08, type: 'spring', stiffness: 180, damping: 14 }}
    whileHover={{
      scale: 1.2,
      rotate: 360,
      boxShadow: '0 0 25px rgba(192, 38, 211, 0.8)',
      background: 'linear-gradient(45deg, rgba(255, 51, 255, 0.5), rgba(59, 130, 246, 0.5))',
      transition: { duration: 0.5 },
    }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08 }}
      style={{ color: '#ff33ff', textShadow: '0 0 15px rgba(192, 38, 211, 0.7)', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}
      whileHover={{ color: '#00ccff', textShadow: '0 0 25px rgba(59, 130, 246, 0.8)', scale: 1.1 }}
    >
      <Icon />
    </motion.span>
    <span style={{ color: '#f0faff', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 600 }}>
      {label}
    </span>
  </motion.a>
));

// Contact Data
const contacts = [
  {
    type: 'email',
    title: '📧 Email',
    description: 'Reach out for professional inquiries or collaboration opportunities.',
    details: 'g.sivasatyasaibhagavan@gmail.com',
    link: 'mailto:g.sivasatyasaibhagavan@gmail.com',
    icon: FaEnvelope,
  },
  {
    type: 'phone',
    title: '📞 Phone',
    description: 'Contact me directly for quick discussions or urgent queries.',
    details: '+91 7569205626',
    link: null,
    icon: FaPhone,
  },
  {
    type: 'linkedin',
    title: '🤝 LinkedIn',
    description: 'Connect with me professionally on LinkedIn.',
    details: 'linkedin.com/in/siva-satya-sai-bhagavan',
    link: 'https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/',
    icon: FaLinkedin,
  },
];

// Inline Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 4vw, 4rem)',
    background: 'linear-gradient(165deg, #0d001a, #1a0033, #2a0055, #3b0088)',
    backgroundSize: '800% 800%',
    color: '#f0faff',
    overflow: 'hidden',
    position: 'relative',
    perspective: '2500px',
    fontFamily: "'Orbitron', 'Inter', sans-serif",
    willChange: 'background, transform',
    animation: 'shimmer 12s ease-in-out infinite',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 15% 5%, rgba(255, 51, 255, 0.5), transparent 40%),
      radial-gradient(circle at 85% 95%, rgba(76, 29, 149, 0.5), transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4), transparent 60%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
    animation: 'glowShift 8s ease-in-out infinite',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(500px, 70vw, 1000px)',
    height: 'clamp(500px, 70vw, 1000px)',
    background: 'linear-gradient(45deg, rgba(255, 51, 255, 0.5), rgba(76, 29, 149, 0.5), transparent)',
    top: '-25%',
    left: '-25%',
    filter: 'blur(160px)',
    zIndex: -2,
    animation: 'rotateGlow 15s linear infinite',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(3rem, 5vw, 5rem)',
    background: 'rgba(10, 0, 30, 0.95)',
    borderRadius: 'clamp(20px, 2.5vw, 24px)',
    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.9), 0 0 80px rgba(255, 51, 255, 0.5)',
    backdropFilter: 'blur(25px)',
    maxWidth: 'clamp(800px, 95vw, 1400px)',
    margin: '0 auto clamp(4rem, 8vw, 6rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    background: 'conic-gradient(from 45deg, rgba(255, 51, 255, 0.4), rgba(76, 29, 149, 0.4), transparent)',
    opacity: 0.6,
    zIndex: -1,
  },
  title: {
    fontSize: 'clamp(3rem, 7vw, 6rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #ff33ff, #3b82f6, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 50px rgba(255, 51, 255, 0.9), 0 0 80px rgba(76, 29, 149, 0.7)',
    marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
    letterSpacing: '0.2em',
    animation: 'neonFlicker 4s ease-in-out infinite alternate',
  },
  titleUnderline: {
    width: 'clamp(200px, 40vw, 320px)',
    height: '8px',
    background: 'linear-gradient(90deg, #ff33ff, #3b82f6)',
    borderRadius: '8px',
    margin: '1rem auto',
    boxShadow: '0 0 30px rgba(255, 51, 255, 0.9)',
  },
  introText: {
    fontSize: 'clamp(1.1rem, 2.8vw, 1.5rem)',
    color: '#f0faff',
    maxWidth: 'clamp(600px, 85vw, 1000px)',
    margin: '0 auto clamp(1.5rem, 3vw, 2rem)',
    lineHeight: '1.9',
    textShadow: '0 0 15px rgba(255, 51, 255, 0.6)',
  },
  contactSection: {
    background: 'rgba(10, 0, 30, 0.9)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    padding: 'clamp(2.5rem, 5vw, 3.5rem)',
    textAlign: 'center',
    backdropFilter: 'blur(30px)',
    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(255, 51, 255, 0.4)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: 'clamp(800px, 95vw, 1400px)',
    margin: '0 auto',
  },
  sectionOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(255, 51, 255, 0.5), rgba(76, 29, 149, 0.5), transparent)',
    zIndex: -1,
    opacity: 0.6,
    animation: 'rotateGlow 10s linear infinite',
  },
  sectionTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
    color: '#ff33ff',
    textShadow: '0 0 25px rgba(255, 51, 255, 0.8)',
    marginBottom: 'clamp(1.2rem, 3vw, 1.8rem)',
    fontWeight: '800',
  },
  sectionDescription: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
    color: '#f0faff',
    marginBottom: 'clamp(1.5rem, 3.5vw, 2rem)',
    lineHeight: '1.9',
    textShadow: '0 0 15px rgba(255, 51, 255, 0.6)',
    maxWidth: 'clamp(600px, 85vw, 1000px)',
    margin: '0 auto clamp(1.5rem, 3vw, 2rem)',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1.5rem, 3vw, 2rem)',
    alignItems: 'center',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 4vw, 4rem)' },
      header: { padding: 'clamp(3rem, 5vw, 5rem)' },
      title: { fontSize: 'clamp(3rem, 7vw, 6rem)' },
      contactSection: { padding: 'clamp(2.5rem, 5vw, 3.5rem)' },
      sectionTitle: { fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' },
      sectionDescription: { fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' },
      holographicGlow: { width: 'clamp(500px, 70vw, 1000px)', height: 'clamp(500px, 70vw, 1000px)', top: '-25%', left: '-25%' },
    },
    medium: {
      container: { padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 3vw, 3rem)' },
      header: { padding: 'clamp(2rem, 4vw, 4rem)' },
      title: { fontSize: 'clamp(2.5rem, 6vw, 5rem)' },
      contactSection: { padding: 'clamp(2rem, 4vw, 3rem)' },
      sectionTitle: { fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' },
      sectionDescription: { fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' },
      holographicGlow: { width: 'clamp(400px, 60vw, 800px)', height: 'clamp(400px, 60vw, 800px)', top: '-20%', left: '-20%' },
    },
    small: {
      container: { padding: 'clamp(2rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.5rem, 3.5vw, 3rem)' },
      title: { fontSize: 'clamp(2rem, 5vw, 4rem)' },
      contactSection: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      sectionTitle: { fontSize: 'clamp(1.4rem, 3vw, 2rem)' },
      sectionDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)', top: '-15%', left: '-15%' },
    },
  },
};

// Enhanced Inline Animation Styles
const animationStyles = `
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    50% { transform: translate(100px, 100px) scale(1.2); opacity: 0.8; }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes neonFlicker {
    0%, 100% { opacity: 1; text-shadow: 0 0 50px rgba(255, 51, 255, 0.9), 0 0 80px rgba(76, 29, 149, 0.7); filter: brightness(100%); }
    50% { opacity: 0.85; text-shadow: 0 0 30px rgba(255, 51, 255, 0.7), 0 0 50px rgba(76, 29, 149, 0.5); filter: brightness(150%); }
  }
  @keyframes pulseBorder {
    0%, 100% { border-color: rgba(255, 51, 255, 0.4); box-shadow: 0 0 15px rgba(255, 51, 255, 0.5); }
    50% { border-color: rgba(255, 51, 255, 0.9); box-shadow: 0 0 30px rgba(255, 51, 255, 0.9); }
  }
  @keyframes particleExplosion {
    0% { transform: scale(1) translate(0, 0); opacity: 1; }
    100% { transform: scale(0.2) translate(calc(50vw * ${Math.random() * 2 - 1}), calc(50vh * ${Math.random() * 2 - 1})); opacity: 0; }
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(2px, -2px); }
    60% { transform: translate(-1px, 1px); }
    80% { transform: translate(1px, -1px); }
    100% { transform: translate(0); }
  }
`;

// Enhanced Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 2.5, ease: 'easeOut', staggerChildren: 0.4 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -120, rotateX: -20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 1.8, type: 'spring', stiffness: 150, damping: 15 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 150, scale: 0.7, rotateY: 180, rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    transition: { duration: 1.5, type: 'spring', stiffness: 140, damping: 16 },
  },
};

const sectionChildVariants = {
  hidden: { opacity: 0, x: -50, rotate: -15, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.8, type: 'spring', stiffness: 160, damping: 15 },
  },
};

const Contact = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getContactIcon = useCallback((contact, index) => (
    <ContactIcon icon={contact.icon} label={contact.details} link={contact.link} index={index} />
  ), []);

  return (
    <motion.section
      ref={containerRef}
      style={{
        ...styles.container,
        ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].container,
        opacity,
        scale,
        rotateX,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Contact section"
    >
      <style>{animationStyles}</style>
      {/* Enhanced Background Particles with Explosion Effect */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.6rem, calc(0.1vw + ${0.8 + i * 0.2}rem), ${1.5 + i * 0.3}rem)`,
            height: `clamp(0.6rem, calc(0.1vw + ${0.8 + i * 0.2}rem), ${1.5 + i * 0.3}rem)`,
            background: `radial-gradient(circle, rgba(255, 51, 255, ${0.6 - i * 0.01}), rgba(76, 29, 149, ${0.4 - i * 0.01}))`,
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
            zIndex: -1,
          }}
          animate={{
            x: [0, Math.random() * 300 - 150, 0],
            y: [0, Math.random() * 300 - 150, 0],
            opacity: [0.3, 1, 0],
            scale: [1, 2, 0.2],
            rotate: [0, 720, 0],
          }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeOut', delay: Math.random() * 4, repeatDelay: Math.random() * 2 }}
        />
      ))}
      {/* Holographic Glow with Dynamic Pulse */}
      <motion.div
        style={{
          ...styles.holographicGlow,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].holographicGlow,
        }}
        animate={{ rotate: 360, scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Header Section with Glitch Effect */}
      <motion.header
        style={{
          ...styles.header,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].header,
        }}
        variants={headerVariants}
        transition={{ type: 'spring', stiffness: 130, damping: 14 }}
      >
        <div style={styles.headerGlow} />
        <motion.h2
          style={{
            ...styles.title,
            ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].title,
          }}
          animate={{ x: [0, -2, 2, -1, 1, 0], opacity: [1, 0.95, 1, 0.98, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', repeatDelay: 2 }}
        >
          🌌 Connect with Me
        </motion.h2>
        <motion.div
          style={styles.titleUnderline}
          initial={{ width: 0, scaleX: 0 }}
          animate={{ width: 'clamp(200px, 40vw, 320px)', scaleX: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          whileHover={{ scale: 1.1, background: 'linear-gradient(90deg, #00ccff, #ff33ff)' }}
        />
        <motion.p
          style={{
            ...styles.introText,
            ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].introText,
          }}
          animate={{ y: [0, -5, 0], opacity: [1, 0.9, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Let's collaborate, discuss ideas, or connect professionally. Reach out through your preferred platform!
        </motion.p>
      </motion.header>
      {/* Unified Contact Section with 3D Tilt and Particle Effects */}
      <motion.div
        style={{
          ...styles.contactSection,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].contactSection,
        }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div style={{ ...styles.sectionOverlay, animation: 'pulseBorder 2s ease-in-out infinite' }} />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              background: 'rgba(255, 51, 255, 0.7)',
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'easeOut' }}
          />
        ))}
        <motion.h3
          style={{
            ...styles.sectionTitle,
            ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].sectionTitle,
          }}
          variants={sectionChildVariants}
          transition={{ delay: 0.2 }}
          whileHover={{ color: '#00ccff', textShadow: '0 0 35px rgba(59, 130, 246, 0.9)', scale: 1.05 }}
        >
          Contact Information
        </motion.h3>
        <motion.p
          style={{
            ...styles.sectionDescription,
            ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].sectionDescription,
          }}
          variants={sectionChildVariants}
          transition={{ delay: 0.3 }}
          whileHover={{ color: '#ffccff', scale: 1.02 }}
        >
          Reach out to me through any of the following channels for professional inquiries, collaborations, or quick discussions.
        </motion.p>
        <motion.div
          style={styles.contactList}
          variants={sectionChildVariants}
          transition={{ delay: 0.4 }}
        >
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.title}
              variants={sectionChildVariants}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              {getContactIcon(contact, index)}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default React.memo(Contact);