import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Certifications data remains the same
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

// New Inline Styles with cosmic theme
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(4rem, 9vw, 8rem) clamp(2rem, 4vw, 4rem)',
    background: 'linear-gradient(135deg, #000033, #000066, #000099, #330066)',
    backgroundSize: '600% 600%',
    color: '#e0f7fa',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '2000px',
    fontFamily: "'Roboto', 'Helvetica', sans-serif",
    willChange: 'background, transform',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.2), transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.2), transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0.15), transparent 60%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
  },
  cosmicGlow: {
    position: 'absolute',
    width: 'clamp(500px, 70vw, 800px)',
    height: 'clamp(500px, 70vw, 800px)',
    background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3), transparent 50%)',
    top: '-20%',
    left: '-20%',
    filter: 'blur(150px)',
    zIndex: -1,
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(2.5rem, 5vw, 4rem)',
    background: 'rgba(0, 0, 51, 0.85)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: 'clamp(20px, 3vw, 25px)',
    boxShadow: '0 30px 70px rgba(0, 0, 0, 0.9), 0 0 60px rgba(0, 255, 255, 0.4)',
    backdropFilter: 'blur(20px)',
    maxWidth: 'clamp(800px, 95vw, 1200px)',
    margin: '0 auto clamp(4rem, 7vw, 6rem)',
  },
  title: {
    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
    fontWeight: 800,
    color: 'transparent',
    background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 40px rgba(0, 255, 255, 0.8), 0 0 70px rgba(255, 0, 255, 0.6)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.5rem)',
    letterSpacing: '0.15em',
  },
  titleUnderline: {
    width: 'clamp(200px, 35vw, 300px)',
    height: '6px',
    background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
    borderRadius: '6px',
    margin: '0.8rem auto',
    boxShadow: '0 0 25px rgba(0, 255, 255, 0.8)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 50vw, 380px), 1fr))',
    gap: 'clamp(2rem, 4vw, 3.5rem)',
    maxWidth: 'clamp(900px, 98vw, 1800px)',
    margin: '0 auto',
    perspective: '2000px',
  },
  card: {
    background: 'rgba(0, 0, 51, 0.9)',
    border: '1px solid rgba(0, 255, 255, 0.25)',
    borderRadius: 'clamp(16px, 3vw, 24px)',
    padding: 'clamp(2rem, 4vw, 3rem)',
    textAlign: 'center',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(0, 255, 255, 0.3)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 30deg, rgba(0, 255, 255, 0.4), rgba(255, 0, 255, 0.4), transparent)',
    zIndex: -1,
    opacity: 0.5,
  },
  certName: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    color: '#e0f7fa',
    marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    textShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #e0f7fa, #fff59d)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
  },
  certButton: {
    display: 'inline-block',
    padding: 'clamp(0.7rem, 1.5vw, 1rem) clamp(1.5rem, 2.5vw, 2rem)',
    background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
    border: 'none',
    borderRadius: 'clamp(14px, 2vw, 18px)',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    fontWeight: '700',
    color: '#000033',
    textDecoration: 'none',
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.6)',
    transition: 'all 0.4s ease',
  },
  // Updated Responsive styles
  responsive: {
    large: {
      container: { padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 4vw, 3.5rem)' },
      header: { padding: 'clamp(2.5rem, 5vw, 4rem)' },
      title: { fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)' },
      grid: { gap: 'clamp(2rem, 4vw, 3.5rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(320px, 50vw, 400px), 1fr))' },
      card: { padding: 'clamp(2.2rem, 4vw, 3.2rem)' },
      certName: { fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' },
      certButton: { padding: 'clamp(0.7rem, 1.5vw, 1rem) clamp(1.5rem, 2.5vw, 2rem)' },
      cosmicGlow: { width: 'clamp(500px, 65vw, 800px)', height: 'clamp(500px, 65vw, 800px)' },
    },
    medium: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3.5vw, 3rem)' },
      header: { padding: 'clamp(2rem, 4.5vw, 3.5rem)' },
      title: { fontSize: 'clamp(2rem, 6vw, 4rem)' },
      grid: { gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 50vw, 360px), 1fr))', gap: 'clamp(1.8rem, 3.5vw, 3rem)' },
      card: { padding: 'clamp(2rem, 3.5vw, 2.8rem)' },
      certName: { fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' },
      certButton: { padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)' },
      cosmicGlow: { width: 'clamp(400px, 55vw, 600px)', height: 'clamp(400px, 55vw, 600px)' },
    },
    small: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 4vw, 3rem)' },
      title: { fontSize: 'clamp(1.8rem, 5.5vw, 3.5rem)' },
      grid: { gridTemplateColumns: '1fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)' },
      card: { padding: 'clamp(1.8rem, 3vw, 2.5rem)' },
      certName: { fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' },
      certButton: { padding: 'clamp(0.5rem, 1vw, 0.7rem) clamp(1rem, 1.8vw, 1.4rem)' },
      cosmicGlow: { width: 'clamp(300px, 50vw, 500px)', height: 'clamp(300px, 50vw, 500px)' },
    },
  },
};

// New Inline Animation Styles with cosmic effects
const animationStyles = `
  @keyframes cosmicPulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes starTwinkle {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes orbit {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes supernovaFlicker {
    0%, 18%, 20%, 25.1%, 26%, 29.1%, 30%, 100% { opacity: 1; }
    18.1%, 19.9%, 25.2%, 25.9%, 29.2%, 29.9% { opacity: 0.7; }
  }
  @keyframes cometTrail {
    0% { transform: translateY(0px) rotateZ(0deg); }
    50% { transform: translateY(-25px) rotateZ(3deg); }
    100% { transform: translateY(0px) rotateZ(0deg); }
  }
  @keyframes buttonNova {
    0% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.6), 0 0 25px rgba(255, 0, 255, 0.4); }
    50% { box-shadow: 0 0 25px rgba(0, 255, 255, 0.9), 0 0 35px rgba(255, 0, 255, 0.7); }
    100% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.6), 0 0 25px rgba(255, 0, 255, 0.4); }
  }
`;

// New Enhanced Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 2.5,
      ease: 'easeOut',
      staggerChildren: 0.15,
      when: 'beforeChildren',
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -120, rotateX: -20, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 1.8,
      type: 'spring',
      stiffness: 160,
      damping: 22,
    },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 150, scale: 0.75, rotateY: -30, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    transition: {
      duration: 1.2,
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
  hover: {
    scale: 1.08,
    rotateY: 8,
    rotateX: -8,
    boxShadow: '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 70px rgba(0, 255, 255, 0.6)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.15,
    background: 'linear-gradient(90deg, #ffff00, #00ffff)',
    boxShadow: '0 0 25px rgba(0, 255, 255, 0.9), 0 0 35px rgba(255, 0, 255, 0.7)',
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.92,
    transition: {
      duration: 0.25,
    },
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
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.6], [0.3, 1]), { stiffness: 120, damping: 25 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.6], [0.8, 1]), { stiffness: 120, damping: 25 });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.6], [15, 0]), { stiffness: 120, damping: 25 });

  // Apply responsive styles based on window width
  const responsiveStyles = windowWidth <= 480 ? styles.responsive.small :
                           windowWidth <= 768 ? styles.responsive.medium :
                           styles.responsive.large;

  return (
    <motion.section
      style={{ ...styles.container, ...responsiveStyles.container, opacity, scale, rotateX }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Certifications section"
    >
      <style>{animationStyles}</style>
      {/* Background Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.5rem, calc(0.05vw + ${0.5 + i * 0.1}rem), ${1 + i * 0.15}rem)`,
            height: `clamp(0.5rem, calc(0.05vw + ${0.5 + i * 0.1}rem), ${1 + i * 0.15}rem)`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(0, 255, 255, 0.3))',
            borderRadius: '50%',
            top: `${10 + i * 5}%`,
            left: `${10 + i * 4}%`,
            pointerEvents: 'none',
            zIndex: -2,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Cosmic Glow */}
      <motion.div
        style={{ ...styles.cosmicGlow, ...responsiveStyles.cosmicGlow }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [-60, 60, -60],
          y: [-60, 60, -60],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Header Section */}
      <motion.div
        style={{ ...styles.header, ...responsiveStyles.header }}
        variants={headerVariants}
      >
        <h2
          style={{
            ...styles.title,
            ...responsiveStyles.title,
            animation: 'cosmicPulse 2.5s ease-in-out infinite alternate, supernovaFlicker 2.5s infinite',
          }}
        >
          🌌 My Certifications
        </h2>
        <motion.div
          style={styles.titleUnderline}
          animate={{ scaleX: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      {/* Certifications Grid */}
      <motion.div
        style={{ ...styles.grid, ...responsiveStyles.grid }}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            style={{ ...styles.card, ...responsiveStyles.card }}
            variants={cardVariants}
            
          >
            <motion.div
              style={{ ...styles.cardOverlay }}
              animate={{
                opacity: [0.5, 0.7, 0.5],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <p
              style={{
                ...styles.certName,
                ...responsiveStyles.certName,
                animation: 'supernovaFlicker 4s infinite',
              }}
              title={cert.name}
            >
              🌟 {cert.name}
            </p>
            <motion.a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.certButton, ...responsiveStyles.certButton }}
              variants={buttonVariants}
              
            >
              View Certificate
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Certifications;