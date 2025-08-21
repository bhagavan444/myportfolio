import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaStar } from 'react-icons/fa';

// Certifications data remains the same
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

// New color palette and styles with a sleek, modern aesthetic
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)',
    background: 'linear-gradient(135deg, #0f172a, #1e3a8a, #1e1b4b, #312e81)',
    backgroundSize: '1000% 1000%',
    color: '#e2e8f0',
    overflow: 'hidden',
    position: 'relative',
    perspective: '2500px',
    fontFamily: "'Inter', 'Roboto', sans-serif",
    willChange: 'background, transform',
    animation: 'gradientShift 12s ease-in-out infinite',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2), transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.2), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 70%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
    opacity: 0.9,
    animation: 'softPulse 8s ease-in-out infinite',
  },
  glowEffect: {
    position: 'absolute',
    width: 'clamp(500px, 80vw, 900px)',
    height: 'clamp(500px, 80vw, 900px)',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), transparent 60%)',
    top: '-20%',
    left: '-20%',
    filter: 'blur(150px)',
    zIndex: -2,
    animation: 'glowRotate 18s linear infinite',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(3rem, 6vw, 5rem)',
    background: 'rgba(15, 23, 42, 0.95)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9), 0 0 60px rgba(59, 130, 246, 0.4)',
    backdropFilter: 'blur(20px)',
    maxWidth: 'clamp(800px, 90vw, 1400px)',
    margin: '0 auto clamp(4rem, 8vw, 6rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5), transparent)',
    opacity: 0.7,
    zIndex: -1,
  },
  title: {
    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
    fontWeight: 800,
    color: 'transparent',
    background: 'linear-gradient(90deg, #3b82f6, #9333ea, #facc15)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.6)',
    marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
    letterSpacing: '0.15em',
    animation: 'textGlow 2s ease-in-out infinite alternate',
  },
  titleUnderline: {
    width: 'clamp(200px, 40vw, 300px)',
    height: '8px',
    background: 'linear-gradient(90deg, #3b82f6, #9333ea)',
    borderRadius: '8px',
    margin: '1rem auto',
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(1rem, 2.5vw, 2rem)',
    marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
    flexWrap: 'wrap',
    position: 'relative',
  },
  filterBtn: {
    padding: 'clamp(0.7rem, 1.8vw, 1rem) clamp(1.5rem, 2.5vw, 2rem)',
    background: 'rgba(59, 130, 246, 0.15)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: 'clamp(12px, 2vw, 16px)',
    color: '#e2e8f0',
    cursor: 'pointer',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    fontWeight: '600',
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
    position: 'relative',
    overflow: 'hidden',
  },
  activeFilter: {
    background: 'linear-gradient(90deg, #3b82f6, #9333ea)',
    color: '#fff',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
  },
  filterGlow: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4), transparent 70%)',
    opacity: 0,
    zIndex: -1,
    transition: 'opacity 0.3s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(320px, 45vw, 400px), 1fr))',
    gap: 'clamp(2.5rem, 5vw, 4rem)',
    maxWidth: 'clamp(900px, 95vw, 2000px)',
    margin: '0 auto',
    perspective: '2500px',
  },
  card: {
    background: 'rgba(15, 23, 42, 0.95)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    padding: 'clamp(2.5rem, 5vw, 3.5rem)',
    textAlign: 'center',
    backdropFilter: 'blur(25px)',
    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(59, 130, 246, 0.3)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6), transparent)',
    zIndex: -1,
    opacity: 0.7,
    animation: 'borderPulse 2s ease-in-out infinite',
  },
  certName: {
    fontSize: 'clamp(1.3rem, 2.8vw, 1.7rem)',
    color: '#e2e8f0',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    textShadow: '0 0 25px rgba(59, 130, 246, 0.7)',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #e2e8f0, #facc15)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    animation: 'textGlow 2s ease-in-out infinite alternate',
  },
  certIssuer: {
    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
    color: '#9333ea',
    marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    textShadow: '0 0 15px rgba(147, 51, 234, 0.6)',
    fontWeight: '500',
  },
  certButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'clamp(0.5rem, 1vw, 0.8rem)',
    padding: 'clamp(0.8rem, 1.8vw, 1.2rem) clamp(1.8rem, 3vw, 2.5rem)',
    background: 'linear-gradient(90deg, #3b82f6, #9333ea)',
    border: 'none',
    borderRadius: 'clamp(16px, 2.2vw, 20px)',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    fontWeight: '600',
    color: '#fff',
    textDecoration: 'none',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
    transition: 'all 0.3s ease',
  },
  expandedCard: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(500px, 80vw, 900px)',
    maxHeight: '80vh',
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 58, 138, 0.98))',
    borderRadius: 'clamp(24px, 3.5vw, 28px)',
    padding: 'clamp(3rem, 6vw, 4rem)',
    boxShadow: '0 50px 100px rgba(0, 0, 0, 0.9), 0 0 100px rgba(59, 130, 246, 0.6)',
    backdropFilter: 'blur(30px)',
    zIndex: 1000,
    overflowY: 'auto',
  },
  expandedOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    zIndex: 999,
  },
  closeButton: {
    position: 'absolute',
    top: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    right: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    background: 'transparent',
    border: 'none',
    color: '#e2e8f0',
    fontSize: 'clamp(1.6rem, 3vw, 2rem)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)' },
      header: { padding: 'clamp(3rem, 6vw, 5rem)' },
      title: { fontSize: 'clamp(3rem, 7vw, 5.5rem)' },
      grid: { gap: 'clamp(2.5rem, 5vw, 4rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(320px, 45vw, 400px), 1fr))' },
      card: { padding: 'clamp(2.5rem, 5vw, 3.5rem)' },
      certName: { fontSize: 'clamp(1.3rem, 2.8vw, 1.7rem)' },
      certButton: { padding: 'clamp(0.8rem, 1.8vw, 1.2rem) clamp(1.8rem, 3vw, 2.5rem)' },
      glowEffect: { width: 'clamp(500px, 80vw, 900px)', height: 'clamp(500px, 80vw, 900px)' },
      expandedCard: { width: 'clamp(500px, 80vw, 900px)', padding: 'clamp(3rem, 6vw, 4rem)' },
    },
    medium: {
      container: { padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem)' },
      header: { padding: 'clamp(2rem, 4.5vw, 3.5rem)' },
      title: { fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' },
      grid: { gap: 'clamp(2rem, 4vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 40vw, 360px), 1fr))' },
      card: { padding: 'clamp(2rem, 4vw, 3rem)' },
      certName: { fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' },
      certButton: { padding: 'clamp(0.7rem, 1.5vw, 1rem) clamp(1.5rem, 2.5vw, 2rem)' },
      glowEffect: { width: 'clamp(400px, 70vw, 700px)', height: 'clamp(400px, 70vw, 700px)' },
      expandedCard: { width: 'clamp(400px, 80vw, 700px)', padding: 'clamp(2rem, 4vw, 3rem)' },
    },
    small: {
      container: { padding: 'clamp(2rem, 6vw, 4rem) clamp(0.8rem, 2.5vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3.5vw, 2.5rem)' },
      title: { fontSize: 'clamp(2rem, 5vw, 3.5rem)' },
      grid: { gap: 'clamp(1.5rem, 3vw, 2.5rem)', gridTemplateColumns: '1fr' },
      card: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      certName: { fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' },
      certButton: { padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)' },
      glowEffect: { width: 'clamp(300px, 60vw, 600px)', height: 'clamp(300px, 60vw, 600px)' },
      expandedCard: { width: 'clamp(280px, 90vw, 500px)', padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
    },
  },
};

// Updated animation styles with a modern, subtle aesthetic
const animationStyles = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes softPulse {
    0%, 100% { opacity: 0.9; }
    50% { opacity: 1; }
  }
  @keyframes glowRotate {
    0% { transform: rotate(0deg); filter: brightness(1); }
    50% { transform: rotate(180deg); filter: brightness(1.2); }
    100% { transform: rotate(360deg); filter: brightness(1); }
  }
  @keyframes textGlow {
    0%, 100% { opacity: 1; text-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.6); }
    50% { opacity: 0.9; text-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 45px rgba(147, 51, 234, 0.5); }
  }
  @keyframes borderPulse {
    0%, 100% { border-color: rgba(59, 130, 246, 0.3); box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
    50% { border-color: rgba(59, 130, 246, 0.7); box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
  }
  @keyframes particleFloat {
    0% { transform: translateY(0) scale(1); opacity: 0.7; }
    50% { transform: translateY(-50px) scale(1.2); opacity: 0.4; }
    100% { transform: translateY(-100px) scale(1); opacity: 0; }
  }
  @keyframes buttonShine {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.7), 0 0 30px rgba(147, 51, 234, 0.5); }
    50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.9), 0 0 45px rgba(147, 51, 234, 0.7); }
  }
`;

// Updated animation variants for smoother transitions
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 2,
      ease: 'easeOut',
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -150, rotateX: -25, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      type: 'spring',
      stiffness: 180,
      damping: 20,
    },
  },
};

const filterBtnVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, type: 'spring', stiffness: 160, damping: 12 },
  },
  active: {
    scale: [1, 1.15, 1],
    boxShadow: ['0 0 10px rgba(59, 130, 246, 0.5)', '0 0 25px rgba(59, 130, 246, 0.9)', '0 0 10px rgba(59, 130, 246, 0.5)'],
    transition: { duration: 0.6, repeat: Infinity, repeatType: 'reverse' },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 200, scale: 0.7, rotateY: -45, rotateX: 20 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    transition: {
      duration: 1,
      type: 'spring',
      stiffness: 160,
      damping: 18,
    },
  },
  hover: {
    scale: 1.1,
    rotateY: 10,
    rotateX: -10,
    boxShadow: '0 50px 100px rgba(0, 0, 0, 0.9), 0 0 80px rgba(59, 130, 246, 0.7)',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.15,
    background: 'linear-gradient(90deg, #9333ea, #3b82f6, #facc15)',
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.9), 0 0 45px rgba(147, 51, 234, 0.7)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const expandedCardVariants = {
  hidden: { opacity: 0, scale: 0.6, rotateY: 45, x: '-50%', y: '-50%' },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.7, type: 'spring', stiffness: 140, damping: 14 },
  },
  exit: { opacity: 0, scale: 0.6, rotateY: -45, transition: { duration: 0.3 } },
};

const Certifications = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [filter, setFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 140, damping: 22 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.8, 1]), { stiffness: 140, damping: 22 });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5], [20, 0]), { stiffness: 140, damping: 22 });
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

  const categories = ['All', ...new Set(certifications.map(cert => cert.category))].sort();
  const filteredCerts = filter === 'All' ? certifications : certifications.filter(cert => cert.category === filter);

  const responsiveStyles = windowWidth <= 480 ? styles.responsive.small :
                         windowWidth <= 768 ? styles.responsive.medium :
                         styles.responsive.large;

  const handleCardClick = (cert) => {
    setSelectedCert(cert);
  };

  const handleClose = () => {
    setSelectedCert(null);
  };

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
      {/* Background Overlay */}
      <motion.div style={styles.overlay} />
      {/* Background Particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.5rem, calc(0.1vw + ${0.5 + i * 0.15}rem), ${1 + i * 0.2}rem)`,
            height: `clamp(0.5rem, calc(0.1vw + ${0.5 + i * 0.15}rem), ${1 + i * 0.2}rem)`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(59, 130, 246, 0.4))',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
            zIndex: -2,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
          }}
          animate={{
            y: [0, -80, -160],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.7, 0.4, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, ease: 'easeOut', delay: Math.random() * 1.5 }}
        />
      ))}
      {/* Glow Effect */}
      <motion.div
        style={{ ...styles.glowEffect, ...responsiveStyles.glowEffect }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [-50, 50, -50],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Header Section */}
      <motion.div
        style={{ ...styles.header, ...responsiveStyles.header }}
        variants={headerVariants}
      >
        <div style={styles.headerGlow} />
        <h2 style={{ ...styles.title, ...responsiveStyles.title }}>
          <FaStar style={{ marginRight: '0.5rem', color: '#facc15' }} /> Certifications
        </h2>
        <motion.div
          style={styles.titleUnderline}
          animate={{ scaleX: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      {/* Filter Bar */}
      <motion.div style={styles.filterBar} variants={containerVariants}>
        <AnimatePresence>
          {categories.map((category, index) => (
            <motion.button
              key={category}
              style={{ ...styles.filterBtn, ...(filter === category ? styles.activeFilter : {}) }}
              onClick={() => setFilter(category)}
              variants={filterBtnVariants}
              initial="hidden"
              animate={filter === category ? 'active' : 'visible'}
              
              whileTap={{ scale: 0.95 }}
              aria-pressed={filter === category}
              aria-current={filter === category ? 'true' : 'false'}
              aria-label={`Filter by ${category}`}
            >
              <span style={styles.filterGlow} />
              {category}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Certifications Grid */}
      <motion.div
        style={{ ...styles.grid, ...responsiveStyles.grid }}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredCerts.map((cert, index) => (
            <motion.div
              key={index}
              style={{ ...styles.card, ...responsiveStyles.card }}
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(cert)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${cert.name}`}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(cert)}
            >
              <motion.div style={styles.cardOverlay} />
              <p style={{ ...styles.certName, ...responsiveStyles.certName }} title={cert.name}>
                <FaCertificate style={{ marginRight: '0.5rem', color: '#3b82f6' }} /> {cert.name}
              </p>
              <p style={styles.certIssuer}>Issued by: {cert.issuer}</p>
              <motion.a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.certButton, ...responsiveStyles.certButton }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                animate={{ animation: 'buttonShine 2s ease-in-out infinite' }}
                onClick={(e) => e.stopPropagation()}
              >
                View Certificate
              </motion.a>
            </motion.div>
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
              style={{ ...styles.expandedCard, ...responsiveStyles.expandedCard }}
              variants={expandedCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              tabIndex={-1}
              role="dialog"
              aria-label={`${selectedCert.name} details`}
            >
              <motion.div style={styles.cardOverlay} />
              <motion.button
                style={styles.closeButton}
                onClick={handleClose}
                aria-label="Close certification details"
                whileHover={{ scale: 1.2, rotate: 90, color: '#9333ea' }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              <motion.p
                style={{
                  ...styles.certName,
                  fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
                  marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
                }}
                variants={cardVariants}
              >
                <FaCertificate style={{ marginRight: '0.5rem', color: '#3b82f6' }} /> {selectedCert.name}
              </motion.p>
              <motion.p
                style={{
                  ...styles.certIssuer,
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
                }}
                variants={cardVariants}
              >
                Issued by: {selectedCert.issuer}
              </motion.p>
              <motion.p
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                  color: '#e2e8f0',
                  marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                  textShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
                }}
                variants={cardVariants}
              >
                Category: {selectedCert.category}
              </motion.p>
              <motion.a
                href={selectedCert.file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.certButton, ...responsiveStyles.certButton }}
                variants={buttonVariants}
                
                whileTap="tap"
                animate={{ animation: 'buttonShine 2s ease-in-out infinite' }}
              >
                View Certificate
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Certifications;