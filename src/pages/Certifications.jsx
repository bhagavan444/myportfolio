import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Certifications data
const certifications = [
  { name: 'C for Everyone – Coursera', file: 'https://drive.google.com/file/d/1_icpofMdYi5iGjbELOY0VHMBloGJDhAA/view?usp=drive_link' },
  { name: 'Python for Everyone – Coursera', file: 'https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link' },
  { name: 'Python Django - Infosys Spring Board', file: 'https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view?usp=drive_link' },
  { name: 'JavaScript - Infosys Spring Board', file: 'https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link' },
  { name: 'Skill Up in Java - Infosys Spring Board', file: 'https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link' },
  { name: 'React - Infosys Spring Board', file: 'https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link' },
  { name: 'MLOps - Infosys Spring Board', file: 'https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link' },
  { name: 'ServiceNow - Infosys Spring Board', file: 'https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view?usp=drive_link' },
  { name: 'ML using Python - Infosys Spring Board', file: 'https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view?usp=drive_link' },
  { name: 'HTML - Infosys Spring Board', file: 'https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link' },
  { name: 'CSS - Infosys Spring Board', file: 'https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link' },
  { name: 'AWS Certified', file: 'https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view?usp=drive_link' },
  { name: 'Mastering Python - Infosys Spring Board', file: 'https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link' },
  { name: 'R Programming - Infosys Spring Board', file: 'https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing' },
  { name: 'Continuous Integration and Continuous Delivery - Infosys Spring Board', file: 'https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing' },
  { name: 'Large Language Model - IBM Skills', file: 'https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing' },
  { name: 'Mastering the Art of Programming - IBM Skills', file: 'https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing' },
  { name: 'Build Your First Chatbot - IBM Skills', file: 'https://drive.google.com/file/d/1HOr1qGDbIZ_t-Uw3KJU9PGYk65xCW41R/view?usp=sharing' },
  { name: 'Software Engineering - Infosys Spring Board', file: 'https://drive.google.com/file/d/1siy3p3J8Y9yr8oSzrXMjf0fZ7V7iNKcl/view?usp=sharing' },
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
    padding: 'clamp(2rem, 4vw, 3.5rem)',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 340px), 1fr))',
    gap: 'clamp(1.8rem, 3.5vw, 3rem)',
    maxWidth: 'clamp(800px, 95vw, 1600px)',
    margin: '0 auto',
    perspective: '1600px',
  },
  card: {
    background: 'rgba(10, 0, 30, 0.9)',
    border: '1px solid rgba(76, 29, 149, 0.3)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(1.8rem, 3.5vw, 2.5rem)',
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
  certName: {
    fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
    color: '#e0e7ff',
    marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
    textShadow: '0 0 15px rgba(76, 29, 149, 0.5)',
    fontWeight: '600',
    background: 'linear-gradient(90deg, #e0e7ff, #a3bffa)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
  },
  certButton: {
    display: 'inline-block',
    padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3)',
    border: 'none',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    fontWeight: '700',
    color: '#f5f7fa',
    textDecoration: 'none',
    boxShadow: '0 0 10px rgba(76, 29, 149, 0.5)',
  },
  // Responsive styles
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      grid: { gap: 'clamp(1.8rem, 3.5vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 45vw, 360px), 1fr))' },
      card: { padding: 'clamp(2rem, 3.5vw, 2.8rem)' },
      certName: { fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' },
      certButton: { padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 700px)', height: 'clamp(400px, 55vw, 700px)' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      grid: { gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 340px), 1fr))', gap: 'clamp(1.5rem, 3vw, 2.5rem)' },
      card: { padding: 'clamp(1.8rem, 3vw, 2.5rem)' },
      certName: { fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' },
      certButton: { padding: 'clamp(0.5rem, 1vw, 0.7rem) clamp(1rem, 1.8vw, 1.4rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      grid: { gridTemplateColumns: '1fr', gap: 'clamp(1.2rem, 2.5vw, 2rem)' },
      card: { padding: 'clamp(1.5rem, 2.5vw, 2rem)' },
      certName: { fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' },
      certButton: { padding: 'clamp(0.5rem, 0.8vw, 0.6rem) clamp(1rem, 1.5vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(250px, 40vw, 400px)', height: 'clamp(250px, 40vw, 400px)' },
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

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
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

const Certifications = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';
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
      aria-label='Certifications section'
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
          📜 My Certifications
        </h2>
        <div style={styles.titleUnderline} />
      </motion.div>
      {/* Certifications Grid */}
      <motion.div
        style={{ ...styles.grid, ...responsiveStyles.grid }}
        variants={gridVariants}
        initial='hidden'
        animate='visible'
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            style={{ ...styles.card, ...responsiveStyles.card }}
            variants={cardVariants}
          
          >
            <motion.div
              style={{ ...styles.cardOverlay, animation: 'rotateGlow 10s linear infinite' }}
            />
            <p
              style={{ ...styles.certName, ...responsiveStyles.certName }}
              title={cert.name}
            >
              📜 {cert.name}
            </p>
            <motion.a
              href={cert.file}
              target='_blank'
              rel='noopener noreferrer'
              style={{ ...styles.certButton, ...responsiveStyles.certButton }}
              
            >
              View PDF
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Certifications;