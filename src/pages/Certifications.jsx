import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaStar, FaLink, FaExternalLinkAlt } from 'react-icons/fa';

// Certifications data
const certifications = [
  { name: 'C for Everyone – Coursera', file: 'https://drive.google.com/file/d/1_icpofMdYi5iGjbELOY0VHMBloGJDhAA/view?usp=drive_link', issuer: 'Coursera', category: 'Programming' },
  { name: 'Python for Everyone – Coursera', file: 'https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link', issuer: 'Coursera', category: 'Programming' },
  { name: 'Python Django - Infosys Spring Board', file: 'https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view?usp=drive_link', issuer: 'Infosys', category: 'Web Development' },
  { name: 'JavaScript - Infosys Spring Board', file: 'https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link', issuer: 'Infosys', category: 'Web Development' },
  { name: 'Skill Up in Java - Infosys Spring Board', file: 'https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link', issuer: 'Infosys', category: 'Programming' },
  { name: 'React - Infosys Spring Board', file: 'https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link', issuer: 'Infosys', category: 'Web Development' },
  { name: 'MLOps - Infosys Spring Board', file: 'https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link', issuer: 'Infosys', category: 'Machine Learning' },
  { name: 'ServiceNow - Infosys Spring Board', file: 'https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view?usp=drive_link', issuer: 'Infosys', category: 'Platform Development' },
  { name: 'ML using Python - Infosys Spring Board', file: 'https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view?usp=drive_link', issuer: 'Infosys', category: 'Machine Learning' },
  { name: 'HTML - Infosys Spring Board', file: 'https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link', issuer: 'Infosys', category: 'Web Development' },
  { name: 'CSS - Infosys Spring Board', file: 'https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link', issuer: 'Infosys', category: 'Web Development' },
  { name: 'AWS Certified', file: 'https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view?usp=drive_link', issuer: 'AWS', category: 'Cloud Computing' },
  { name: 'Mastering Python - Infosys Spring Board', file: 'https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link', issuer: 'Infosys', category: 'Programming' },
  { name: 'R Programming - Infosys Spring Board', file: 'https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing', issuer: 'Infosys', category: 'Programming' },
  { name: 'Continuous Integration and Continuous Delivery - Infosys Spring Board', file: 'https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing', issuer: 'Infosys', category: 'DevOps' },
  { name: 'Large Language Model - IBM Skills', file: 'https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing', issuer: 'IBM', category: 'Machine Learning' },
  { name: 'Mastering the Art of Programming - IBM Skills', file: 'https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing', issuer: 'IBM', category: 'Programming' },
  { name: 'Build Your First Chatbot - IBM Skills', file: 'https://drive.google.com/file/d/1HOr1qGDbIZ_t-Uw3KJU9PGYk65xCW41R/view?usp=sharing', issuer: 'IBM', category: 'AI Development' },
  { name: 'Software Engineering - Infosys Spring Board', file: 'https://drive.google.com/file/d/1siy3p3J8Y9yr8oSzrXMjf0fZ7V7iNKcl/view?usp=sharing', issuer: 'Infosys', category: 'Software Engineering' },
];

// Styles adapted from Projects UI
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(4rem,10vw,8rem) clamp(2rem,4vw,4rem)',
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
      radial-gradient(circle at 15% 5%, rgba(255,51,255,0.5), transparent 40%),
      radial-gradient(circle at 85% 95%, rgba(76,29,149,0.5), transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(59,130,246,0.4), transparent 60%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
    animation: 'glowShift 8s ease-in-out infinite',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(500px,70vw,1000px)',
    height: 'clamp(500px,70vw,1000px)',
    background: 'linear-gradient(45deg, rgba(255,51,255,0.5), rgba(76,29,149,0.5), transparent)',
    top: '-25%',
    left: '-25%',
    filter: 'blur(160px)',
    zIndex: -2,
    animation: 'rotateGlow 15s linear infinite',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(3rem,5vw,5rem)',
    background: 'rgba(10,0,30,0.95)',
    borderRadius: 'clamp(20px,2.5vw,24px)',
    boxShadow: '0 40px 80px rgba(0,0,0,0.9), 0 0 80px rgba(255,51,255,0.5)',
    backdropFilter: 'blur(25px)',
    maxWidth: 'clamp(800px,95vw,1400px)',
    margin: '0 auto clamp(4rem,8vw,6rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    background: 'conic-gradient(from 45deg, rgba(255,51,255,0.4), rgba(76,29,149,0.4), transparent)',
    opacity: 0.6,
    zIndex: -1,
  },
  title: {
    fontSize: 'clamp(3rem,7vw,6rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #ff33ff, #3b82f6, #00ccff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 50px rgba(255,51,255,0.9), 0 0 80px rgba(76,29,149,0.7)',
    marginBottom: 'clamp(1rem,2.5vw,2rem)',
    letterSpacing: '0.2em',
    animation: 'neonFlicker 4s ease-in-out infinite alternate',
  },
  titleUnderline: {
    width: 'clamp(200px,40vw,320px)',
    height: '8px',
    background: 'linear-gradient(90deg, #ff33ff, #3b82f6)',
    borderRadius: '8px',
    margin: '1rem auto',
    boxShadow: '0 0 30px rgba(255,51,255,0.9)',
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(1.2rem,2.5vw,2rem)',
    marginBottom: 'clamp(3rem,6vw,5rem)',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: 'clamp(0.8rem,1.8vw,1.2rem) clamp(1.8rem,3vw,2.5rem)',
    background: 'rgba(255,51,255,0.2)',
    border: '2px solid rgba(255,51,255,0.4)',
    borderRadius: 'clamp(16px,2.2vw,20px)',
    color: '#f0faff',
    cursor: 'pointer',
    fontSize: 'clamp(1.1rem,2.2vw,1.3rem)',
    fontWeight: '700',
    boxShadow: '0 0 15px rgba(255,51,255,0.5)',
    transition: 'all 0.3s ease',
  },
  activeFilter: {
    background: 'linear-gradient(90deg, #ff33ff, #3b82f6)',
    color: '#f0faff',
    boxShadow: '0 0 30px rgba(255,51,255,0.9)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(340px,50vw,420px), 1fr))',
    gap: 'clamp(2.5rem,5vw,4rem)',
    maxWidth: 'clamp(900px,95vw,2000px)',
    margin: '0 auto',
    perspective: '2500px',
  },
  card: {
    background: 'rgba(10,0,30,0.9)',
    borderRadius: 'clamp(20px,3vw,24px)',
    padding: 'clamp(2.5rem,5vw,3.5rem)',
    textAlign: 'center',
    backdropFilter: 'blur(30px)',
    boxShadow: '0 40px 80px rgba(0,0,0,0.9), inset 0 0 20px rgba(255,51,255,0.4)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(255,51,255,0.5), rgba(76,29,149,0.5), transparent)',
    zIndex: -1,
    opacity: 0.6,
    animation: 'pulseBorder 2s ease-in-out infinite',
  },
  certName: {
    fontSize: 'clamp(1.8rem,4vw,2.6rem)',
    color: '#ff33ff',
    textShadow: '0 0 25px rgba(255,51,255,0.8)',
    marginBottom: 'clamp(1.2rem,3vw,1.8rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(0.5rem,1.2vw,0.8rem)',
  },
  certIssuer: {
    fontSize: 'clamp(1.1rem,2.5vw,1.4rem)',
    color: '#f0faff',
    marginBottom: 'clamp(1.5rem,3.5vw,2rem)',
    lineHeight: '1.9',
    textShadow: '0 0 15px rgba(255,51,255,0.6)',
  },
  certCategory: {
    fontSize: 'clamp(1.1rem,2.5vw,1.4rem)',
    color: '#3b82f6',
    fontWeight: 'bold',
    marginBottom: 'clamp(1.5rem,3.5vw,2rem)',
    textShadow: '0 0 15px rgba(59,130,246,0.6)',
  },
  certButton: {
    display: 'inline-flex',
    padding: 'clamp(0.8rem,1.8vw,1.2rem) clamp(1.8rem,3vw,2.5rem)',
    background: 'linear-gradient(90deg, #ff33ff, #3b82f6)',
    color: '#f0faff',
    borderRadius: 'clamp(14px,2.2vw,18px)',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: 'clamp(1.1rem,2.2vw,1.3rem)',
    boxShadow: '0 0 20px rgba(255,51,255,0.7)',
    alignItems: 'center',
    gap: 'clamp(0.5rem,1.2vw,0.8rem)',
  },
  copyButton: {
    display: 'inline-flex',
    padding: 'clamp(0.8rem,1.8vw,1.2rem) clamp(1.8rem,3vw,2.5rem)',
    background: 'rgba(255,51,255,0.2)',
    border: '2px solid rgba(255,51,255,0.4)',
    borderRadius: 'clamp(14px,2.2vw,18px)',
    color: '#f0faff',
    fontSize: 'clamp(1.1rem,2.2vw,1.3rem)',
    fontWeight: '700',
    boxShadow: '0 0 20px rgba(255,51,255,0.7)',
    cursor: 'pointer',
    alignItems: 'center',
    gap: 'clamp(0.5rem,1.2vw,0.8rem)',
  },
  loadingButton: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  spinner: {
    display: 'inline-block',
    width: 'clamp(1.5rem,3vw,2rem)',
    height: 'clamp(1.5rem,3vw,2rem)',
    border: '4px solid rgba(255,51,255,0.3)',
    borderTop: '4px solid #ff33ff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  expandedCard: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(600px,80vw,1000px)',
    maxHeight: '80vh',
    background: 'rgba(10,0,30,0.95)',
    borderRadius: 'clamp(24px,3.5vw,28px)',
    padding: 'clamp(3rem,6vw,4rem)',
    boxShadow: '0 50px 100px rgba(0,0,0,0.9), 0 0 100px rgba(255,51,255,0.6)',
    backdropFilter: 'blur(30px)',
    zIndex: 1000,
    overflowY: 'auto',
  },
  expandedOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.8)',
    zIndex: 999,
  },
  closeButton: {
    position: 'absolute',
    top: 'clamp(1rem,2vw,1.5rem)',
    right: 'clamp(1rem,2vw,1.5rem)',
    background: 'transparent',
    border: 'none',
    color: '#f0faff',
    fontSize: 'clamp(1.5rem,3vw,2rem)',
    cursor: 'pointer',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(4rem,10vw,8rem) clamp(2rem,4vw,4rem)' },
      header: { padding: 'clamp(3rem,5vw,5rem)' },
      title: { fontSize: 'clamp(3rem,7vw,6rem)' },
      grid: { gap: 'clamp(2.5rem,5vw,4rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(340px,50vw,420px), 1fr))' },
      card: { padding: 'clamp(2.5rem,5vw,3.5rem)' },
      certName: { fontSize: 'clamp(1.8rem,4vw,2.6rem)' },
      certButton: { padding: 'clamp(0.8rem,1.8vw,1.2rem) clamp(1.8rem,3vw,2.5rem)' },
      holographicGlow: { width: 'clamp(500px,70vw,1000px)', height: 'clamp(500px,70vw,1000px)', top: '-25%', left: '-25%' },
      expandedCard: { width: 'clamp(600px,80vw,1000px)', padding: 'clamp(3rem,6vw,4rem)' },
    },
    medium: {
      container: { padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,3vw,3rem)' },
      header: { padding: 'clamp(2rem,4vw,4rem)' },
      title: { fontSize: 'clamp(2.5rem,6vw,5rem)' },
      grid: { gap: 'clamp(2rem,4vw,3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px,45vw,360px), 1fr))' },
      card: { padding: 'clamp(2rem,4vw,3rem)' },
      certName: { fontSize: 'clamp(1.6rem,3.5vw,2.2rem)' },
      certButton: { padding: 'clamp(0.7rem,1.5vw,1rem) clamp(1.5rem,2.5vw,2rem)' },
      holographicGlow: { width: 'clamp(400px,60vw,800px)', height: 'clamp(400px,60vw,800px)', top: '-20%', left: '-20%' },
      expandedCard: { width: 'clamp(500px,80vw,800px)', padding: 'clamp(2.5rem,5vw,3.5rem)' },
    },
    small: {
      container: { padding: 'clamp(2rem,6vw,5rem) clamp(1rem,2.5vw,2rem)' },
      header: { padding: 'clamp(1.5rem,3.5vw,3rem)' },
      title: { fontSize: 'clamp(2rem,5vw,4rem)' },
      grid: { gap: 'clamp(1.5rem,3vw,2.5rem)', gridTemplateColumns: '1fr' },
      card: { padding: 'clamp(1.5rem,3vw,2.5rem)' },
      certName: { fontSize: 'clamp(1.4rem,3vw,2rem)' },
      certButton: { padding: 'clamp(0.6rem,1.2vw,0.8rem) clamp(1.2rem,2vw,1.6rem)' },
      holographicGlow: { width: 'clamp(300px,50vw,600px)', height: 'clamp(300px,50vw,600px)', top: '-15%', left: '-15%' },
      expandedCard: { width: 'clamp(300px,90vw,500px)', padding: 'clamp(2rem,4vw,3rem)' },
    },
  },
};

// Animation styles
const animationStyles = `
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(100px, 100px) scale(1.2); }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes neonFlicker {
    0%, 100% { opacity: 1; text-shadow: 0 0 50px rgba(255,51,255,0.9), 0 0 80px rgba(76,29,149,0.7); }
    50% { opacity: 0.8; text-shadow: 0 0 30px rgba(255,51,255,0.7), 0 0 50px rgba(76,29,149,0.5); }
  }
  @keyframes pulseBorder {
    0%, 100% { border-color: rgba(255,51,255,0.4); }
    50% { border-color: rgba(255,51,255,0.9); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); border-top-color: #ff33ff; }
    100% { transform: rotate(360deg); border-top-color: #3b82f6; }
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2.5, ease: 'easeOut', staggerChildren: 0.4 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -120, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.8, type: 'spring', stiffness: 150, damping: 15 },
  },
};

const filterBtnVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 170, damping: 13 },
  },
  exit: { opacity: 0, scale: 0.7, y: 40, transition: { duration: 0.5 } },
  active: {
    scale: [1, 1.2, 1],
    boxShadow: ['0 0 15px rgba(255,51,255,0.5)', '0 0 30px rgba(255,51,255,0.9)', '0 0 15px rgba(255,51,255,0.5)'],
    transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 150, scale: 0.7, rotateY: 180 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1.2, type: 'spring', stiffness: 140, damping: 16 },
  },
};

const cardChildVariants = {
  hidden: { opacity: 0, x: -50, rotate: -15 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8, type: 'spring', stiffness: 160, damping: 15 },
  },
};

const expandedCardVariants = {
  hidden: { opacity: 0, scale: 0.5, rotateY: 90, x: '-50%', y: '-50%' },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, type: 'spring', stiffness: 120, damping: 14 },
  },
  exit: { opacity: 0, scale: 0.5, rotateY: -90, transition: { duration: 0.6 } },
};

const Certifications = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [filter, setFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCopying, setIsCopying] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.3, 1]), { stiffness: 140, damping: 22 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.8, 1]), { stiffness: 140, damping: 22 });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5], [15, 0]), { stiffness: 140, damping: 22 });
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = selectedCert ? 'hidden' : 'auto';
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedCert]);

  useEffect(() => {
    if (selectedCert && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedCert]);

  const categories = useMemo(() =>
    ['All', ...new Set(certifications.map(cert => cert.category))].sort(),
    []
  );

  const filteredCerts = useMemo(() =>
    filter === 'All' ? certifications : certifications.filter(cert => cert.category === filter),
    [filter]
  );

  const responsiveStyles = useMemo(() =>
    windowWidth <= 480 ? styles.responsive.small :
    windowWidth <= 768 ? styles.responsive.medium :
    styles.responsive.large,
    [windowWidth]
  );

  const handleCardClick = useCallback((cert) => {
    setSelectedCert(cert);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCert(null);
  }, []);

  const handleCopyLink = useCallback((link) => {
    setIsCopying(true);
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
      setIsCopying(false);
    }).catch(() => {
      alert('Failed to copy link.');
      setIsCopying(false);
    });
  }, []);

  return (
    <motion.section
      style={{
        ...styles.container,
        ...responsiveStyles.container,
        opacity,
        scale,
        rotateX,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Certifications section"
    >
      <style>{animationStyles}</style>
      {/* Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.8rem, calc(0.1vw + ${1 + i * 0.3}rem), ${2 + i * 0.4}rem)`,
            height: `clamp(0.8rem, calc(0.1vw + ${1 + i * 0.3}rem), ${2 + i * 0.4}rem)`,
            background: 'radial-gradient(circle, rgba(255,51,255,0.6), rgba(76,29,149,0.4))',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
          }}
          animate={{
            x: [0, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 150 - 75, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 4 }}
        />
      ))}
      {/* Holographic Glow */}
      <motion.div
        style={{
          ...styles.holographicGlow,
          ...responsiveStyles.holographicGlow,
        }}
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      {/* Header Section */}
      <motion.header
        style={{
          ...styles.header,
          ...responsiveStyles.header,
        }}
        variants={headerVariants}
        transition={{ type: 'spring', stiffness: 130, damping: 14 }}
      >
        <div style={styles.headerGlow} />
        <h2
          style={{
            ...styles.title,
            ...responsiveStyles.title,
          }}
        >
          <FaStar style={{ marginRight: 'clamp(0.5rem,1.2vw,0.8rem)', fontSize: 'clamp(2rem,4vw,3rem)' }} />
          Certifications Showcase
        </h2>
        <motion.div
          style={styles.titleUnderline}
          initial={{ width: 0, scaleX: 0 }}
          animate={{ width: 'clamp(200px,40vw,320px)', scaleX: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </motion.header>
      {/* Filter Bar */}
      <motion.div
        style={styles.filterBar}
        variants={containerVariants}
      >
        <AnimatePresence>
          {categories.map((category, index) => (
            <motion.button
              key={category}
              style={{
                ...styles.filterBtn,
                ...(filter === category ? styles.activeFilter : {}),
              }}
              onClick={() => setFilter(category)}
              variants={filterBtnVariants}
              initial="hidden"
              animate={filter === category ? 'active' : 'visible'}
              exit="exit"
              whileTap={{ scale: 0.9 }}
              aria-pressed={filter === category}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Certifications Grid */}
      <motion.div
        style={{
          ...styles.grid,
          ...responsiveStyles.grid,
        }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredCerts.map((cert, index) => (
            <motion.article
              key={cert.name}
              style={{
                ...styles.card,
                ...responsiveStyles.card,
              }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              onClick={() => handleCardClick(cert)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${cert.name}`}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(cert)}
            >
              <motion.div style={{ ...styles.cardOverlay, animation: 'pulseBorder 2s ease-in-out infinite' }} />
              <motion.h3
                style={{
                  ...styles.certName,
                  ...responsiveStyles.certName,
                }}
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.2 }}
              >
                <FaCertificate style={{ fontSize: 'clamp(1.6rem,3vw,2rem)' }} />
                #{index + 1} • {cert.name}
              </motion.h3>
              <motion.p
                style={styles.certIssuer}
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                Issued by: {cert.issuer}
              </motion.p>
              <motion.p
                style={styles.certCategory}
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                Category: {cert.category}
              </motion.p>
              <motion.a
                href={cert.file}
                style={styles.certButton}
                target="_blank"
                rel="noreferrer"
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt style={{ marginRight: 'clamp(0.5rem,1.2vw,0.8rem)' }} />
                View Certificate
              </motion.a>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedCert && (
          <>
            <motion.div
              style={styles.expandedOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              role="button"
              tabIndex={0}
              aria-label="Close certification details"
              onKeyDown={(e) => e.key === 'Enter' && handleClose()}
            />
            <motion.div
              ref={modalRef}
              style={{
                ...styles.expandedCard,
                ...responsiveStyles.expandedCard,
              }}
              variants={expandedCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              tabIndex={-1}
              role="dialog"
              aria-label={`${selectedCert.name} details`}
            >
              <motion.div style={{ ...styles.cardOverlay, animation: 'rotateGlow 10s linear infinite' }} />
              <button
                style={styles.closeButton}
                onClick={handleClose}
                aria-label="Close certification details"
              >
                ✕
              </button>
              <motion.h3
                style={{
                  ...styles.certName,
                  fontSize: 'clamp(2rem,5vw,3rem)',
                  marginBottom: 'clamp(1.5rem,3.5vw,2rem)',
                }}
                variants={cardChildVariants}
              >
                <FaCertificate style={{ fontSize: 'clamp(1.8rem,3.5vw,2.2rem)' }} />
                #{certifications.indexOf(selectedCert) + 1} • {selectedCert.name}
              </motion.h3>
              <motion.p
                style={{
                  ...styles.certIssuer,
                  fontSize: 'clamp(1.2rem,2.8vw,1.6rem)',
                  lineHeight: '2',
                }}
                variants={cardChildVariants}
              >
                Issued by: {selectedCert.issuer}
              </motion.p>
              <motion.p
                style={{
                  ...styles.certCategory,
                  fontSize: 'clamp(1.2rem,2.8vw,1.6rem)',
                  lineHeight: '2',
                }}
                variants={cardChildVariants}
              >
                Category: {selectedCert.category}
              </motion.p>
              <motion.div
                style={{ display: 'flex', gap: 'clamp(1rem,2vw,1.5rem)', marginTop: 'clamp(1.5rem,3.5vw,2rem)' }}
                variants={cardChildVariants}
              >
                <motion.a
                  href={selectedCert.file}
                  style={styles.certButton}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(255,51,255,0.9)',
                    transition: { duration: 0.3 },
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaExternalLinkAlt style={{ marginRight: 'clamp(0.5rem,1.2vw,0.8rem)' }} />
                  View Certificate
                </motion.a>
                <motion.button
                  style={{
                    ...styles.copyButton,
                    ...(isCopying ? styles.loadingButton : {}),
                  }}
                  onClick={() => handleCopyLink(selectedCert.file)}
                  disabled={isCopying}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(255,51,255,0.9)',
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLink style={{ marginRight: 'clamp(0.5rem,1.2vw,0.8rem)' }} />
                  {isCopying ? 'Copying...' : 'Copy Link'}
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default React.memo(Certifications);