import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
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

// Starfield Component (from EducationEnhanced.jsx, adapted to Hackathons colors)
const Starfield = ({ starCount = 120 }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
      {[...Array(starCount)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 2 + 1;
        return (
          <motion.div
            key={`star-${i}`}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: size,
              height: size,
              background: 'white',
              borderRadius: '50%',
              boxShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 0.5] }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 3,
            }}
          />
        );
      })}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`comet-${i}`}
          style={{
            position: 'absolute',
            width: 2,
            height: 2,
            background: 'rgba(59, 130, 246, 0.8)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
          }}
          initial={{ x: '100%', y: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{
            x: '-100%',
            opacity: [0, 1, 0],
            transition: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'linear' },
          }}
        />
      ))}
    </div>
  );
};

// Tech Icon Component with carousel effect
const TechIcon = React.memo(({ tech, index }) => {
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
    'HTML/CSS': { icon: (<><SiHtml5 /><SiCss3 /></>), label: 'HTML/CSS' },
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

  const techData = iconMap[tech] || { icon: null, label: tech };
  return (
    <motion.span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'clamp(8px,1.2vw,10px)',
        margin: 'clamp(6px,1vw,8px)',
        padding: 'clamp(6px,1vw,8px) clamp(10px,1.8vw,12px)',
        background: 'linear-gradient(45deg, rgba(192,38,211,0.3), rgba(76,29,149,0.3))',
        borderRadius: 'clamp(10px,1.5vw,12px)',
        border: '2px solid rgba(255,51,255,0.4)',
        boxShadow: '0 0 15px rgba(192,38,211,0.5)',
      }}
      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 180, damping: 14 }}
    >
      {techData.icon && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.08 }}
          style={{ color: '#ff33ff', textShadow: '0 0 15px rgba(192,38,211,0.7)' }}
        >
          {techData.icon}
        </motion.span>
      )}
      <span style={{ color: '#f0faff', fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontWeight: 600 }}>
        {techData.label}
      </span>
    </motion.span>
  );
});

// Hackathon Data
const hackathons = [
  {
    type: 'hackathon',
    title: '🚀 Hackathon - Brainovision x RCE 2025',
    description:
      'Led a high-performing team to victory in a 24-hour Hackathon hosted by Brainovision & RCE, developing a scalable MERN full-stack application for a second-hand electronics marketplace, outperforming 15+ teams with innovative UI/UX and robust backend optimization.',
    tech: 'MongoDB, Express.js, React.js, Node.js, Cloudinary, Socket.io',
    certLink: 'https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view?usp=sharing',
    projLink: 'https://github.com/bhagavan444/hacakthon-project',
    tag: '#MERN #Hackathon #Leadership #FullStack #Innovation',
    icon: FaTrophy,
  },
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
    willChange: 'background, transform',
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
  filterBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    marginBottom: 'clamp(2rem, 4vw, 3rem)',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    color: '#e0e7ff',
    cursor: 'pointer',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    fontWeight: '600',
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
  },
  activeFilter: {
    background: 'linear-gradient(90deg, #3b82f6, #c026d3)',
    color: '#f0faff',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 45vw, 380px), 1fr))',
    gap: 'clamp(1.8rem, 3.5vw, 3rem)',
    maxWidth: 'clamp(800px, 95vw, 1600px)',
    margin: '0 auto',
    perspective: '2000px',
  },
  tile: {
    background: 'rgba(10, 0, 30, 0.9)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 3.5vw, 2.8rem)',
    textAlign: 'left',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(59, 130, 246, 0.25)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  tileOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    zIndex: -1,
    opacity: 0.45,
  },
  tileTitle: {
    fontSize: 'clamp(1.5rem, 3.2vw, 2rem)',
    color: '#3b82f6',
    textShadow: '0 0 18px rgba(59, 130, 246, 0.6)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  tileDescription: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
    lineHeight: '1.7',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
  },
  techLabel: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#c026d3',
    fontWeight: 'bold',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(10px, 2vw, 12px)',
    marginTop: 'clamp(0.8rem, 2vw, 1rem)',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
    overflow: 'hidden',
  },
  linkContainer: {
    display: 'flex',
    gap: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    flexWrap: 'wrap',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
  },
  link: {
    display: 'inline-flex',
    padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3)',
    color: '#f0faff',
    borderRadius: 'clamp(10px, 1.8vw, 14px)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  tag: {
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    color: '#d1d5db',
    marginTop: 'clamp(0.8rem, 2vw, 1.2rem)',
    textShadow: '0 0 8px rgba(59, 130, 246, 0.3)',
  },
  expandedTile: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(500px, 80vw, 800px)',
    maxHeight: '80vh',
    background: 'rgba(10, 0, 30, 0.95)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    padding: 'clamp(2.5rem, 5vw, 3.5rem)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
    backdropFilter: 'blur(20px)',
    zIndex: 1000,
    overflowY: 'auto',
  },
  expandedOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    zIndex: 999,
  },
  closeButton: {
    position: 'absolute',
    top: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    right: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    background: 'transparent',
    border: 'none',
    color: '#e0e7ff',
    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    cursor: 'pointer',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: 'clamp(700px, 90vw, 1100px)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      introText: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)', maxWidth: 'clamp(500px, 80vw, 800px)' },
      grid: { gap: 'clamp(1.8rem, 3.5vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 45vw, 380px), 1fr))' },
      tile: { padding: 'clamp(2rem, 3.5vw, 2.8rem)' },
      tileTitle: { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)' },
      tileDescription: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(500px, 65vw, 800px)', height: 'clamp(500px, 65vw, 800px)', top: '-20%', left: '-20%' },
      expandedTile: { width: 'clamp(500px, 80vw, 800px)', padding: 'clamp(2.5rem, 5vw, 3.5rem)' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)', maxWidth: 'clamp(600px, 85vw, 900px)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      introText: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', maxWidth: 'clamp(400px, 75vw, 600px)' },
      grid: { gap: 'clamp(1.5rem, 3vw, 2.5rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 40vw, 340px), 1fr))' },
      tile: { padding: 'clamp(1.8rem, 3vw, 2.5rem)' },
      tileTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      tileDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 600px)', height: 'clamp(400px, 55vw, 600px)', top: '-15%', left: '-15%' },
      expandedTile: { width: 'clamp(400px, 80vw, 600px)', padding: 'clamp(2rem, 4vw, 3rem)' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 'clamp(500px, 80vw, 700px)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      introText: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', maxWidth: 'clamp(300px, 70vw, 500px)' },
      grid: { gap: 'clamp(1.2rem, 2.5vw, 2rem)', gridTemplateColumns: '1fr' },
      tile: { padding: 'clamp(1.5rem, 2.5vw, 2rem)' },
      tileTitle: { fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)' },
      tileDescription: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
      expandedTile: { width: 'clamp(300px, 90vw, 500px)', padding: 'clamp(1.8rem, 3.5vw, 2.5rem)' },
    },
  },
};

// Inline Animation Styles
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
  @keyframes techCarousel {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  @keyframes bgShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 600% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 2, ease: 'easeOut', staggerChildren: 0.3 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -100, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.5, type: 'spring', stiffness: 150, damping: 18 },
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
    scale: [1, 1.15, 1],
    boxShadow: ['0 0 10px rgba(59, 130, 246, 0.3)', '0 0 20px rgba(59, 130, 246, 0.7)', '0 0 10px rgba(59, 130, 246, 0.3)'],
    transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 120, scale: 0.8, rotateY: -25 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1, type: 'spring', stiffness: 140, damping: 16 },
  },
};

const tileChildVariants = {
  hidden: { opacity: 0, x: -40, rotate: -10 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6 } },
};

const expandedTileVariants = {
  hidden: { opacity: 0, scale: 0.5, rotateY: 90, x: '-50%', y: '-50%' },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, type: 'spring', stiffness: 120, damping: 14 },
  },
  exit: { opacity: 0, scale: 0.5, rotateY: -90, transition: { duration: 0.6 } },
};

const Hackathons = () => {
  const [filter, setFilter] = useState('All');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 150, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.85, 1]), { stiffness: 150, damping: 20 });
  const rotate = useSpring(useTransform(scrollYProgress, [0, 0.5], [-5, 0]), { stiffness: 150, damping: 20 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const backgroundGradient = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX + window.innerWidth / 2}px ${
        latestY + window.innerHeight / 2
      }px, rgba(59, 130, 246, 0.25), transparent 40%)`
  );

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const typeOptions = useMemo(() => [
    'All',
    ...Array.from(new Set(hackathons.map((h) => h.type))).sort(),
  ], []);

  const filteredHackathons = useMemo(() =>
    filter === 'All' ? hackathons : hackathons.filter((h) => h.type === filter),
    [filter]
  );

  const getTechIcons = useCallback((tech) => {
    const techs = tech.split(', ');
    return (
      <motion.div
        style={{ display: 'flex', width: `${techs.length * 100}%`, animation: techs.length > 3 ? 'techCarousel 20s linear infinite' : 'none' }}
      >
        {techs.concat(techs).map((t, i) => (
          <TechIcon key={`${t}-${i}`} tech={t} index={i} />
        ))}
      </motion.div>
    );
  }, []);

  const handleTileClick = useCallback((hackathon) => {
    setSelectedHackathon(hackathon);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedHackathon(null);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{
        ...styles.container,
        ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].container,
        opacity,
        scale,
        rotate,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      role="region"
      aria-label="Hackathons section"
    >
      <style>{animationStyles}</style>
      <Starfield />
      <motion.div style={{ position: 'absolute', inset: 0, background: backgroundGradient }} />
      <motion.div
        style={{
          ...styles.holographicGlow,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].holographicGlow,
          animation: 'glowShift 12s ease-in-out infinite',
        }}
      />
      <motion.div style={styles.overlay} />
      <motion.header
        style={{
          ...styles.header,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].header,
        }}
        variants={headerVariants}
      >
        <motion.div style={styles.headerGlow} />
        <h2
          style={{
            ...styles.title,
            ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].title,
            animation: 'holographicPulse 2.5s ease-in-out infinite alternate',
          }}
        >
          ⚡ Hackathon Achievements
        </h2>
        <motion.div
          style={styles.titleUnderline}
          initial={{ width: 0 }}
          animate={{ width: 'clamp(160px, 30vw, 240px)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <p
          style={{
            ...styles.introText,
            ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].introText,
          }}
        >
          Showcasing my ability to deliver cutting-edge solutions under pressure, these hackathon successes highlight my technical expertise, teamwork, and innovative mindset.
        </p>
      </motion.header>
      <motion.div
        style={{
          ...styles.filterBar,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].filterBar,
        }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {typeOptions.map((type, index) => (
            <motion.button
              key={type}
              style={{
                ...styles.filterBtn,
                ...(filter === type ? styles.activeFilter : {}),
                ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].filterBtn,
              }}
              onClick={() => setFilter(type)}
              variants={filterBtnVariants}
              initial="hidden"
              animate={filter === type ? 'active' : 'visible'}
              exit="exit"
              whileTap={{ scale: 0.9 }}
              aria-pressed={filter === type}
              aria-label={`Filter by ${type}`}
            >
              {type}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <motion.div
        style={{
          ...styles.grid,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].grid,
        }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredHackathons.map((hackathon, index) => {
            const IconComp = hackathon.icon;
            return (
              <motion.article
                key={hackathon.title}
                style={{
                  ...styles.tile,
                  ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].tile,
                }}
                variants={tileVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                onClick={() => handleTileClick(hackathon)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${hackathon.title}`}
                onKeyDown={(e) => e.key === 'Enter' && handleTileClick(hackathon)}
              >
                <motion.div style={{ ...styles.tileOverlay, animation: 'rotateGlow 8s linear infinite' }} />
                <motion.h3
                  style={{
                    ...styles.tileTitle,
                    ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].tileTitle,
                  }}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                  {hackathon.title}
                </motion.h3>
                <motion.p
                  style={{
                    ...styles.tileDescription,
                    ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].tileDescription,
                  }}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  {hackathon.description}
                </motion.p>
                <motion.p
                  style={styles.techLabel}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  🔧 Tech Used:
                </motion.p>
                <motion.div
                  style={styles.techContainer}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  {getTechIcons(hackathon.tech)}
                </motion.div>
                <motion.div
                  style={styles.linkContainer}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.6 }}
                >
                  {hackathon.projLink && (
                    <motion.a
                      href={hackathon.projLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                      View Project
                    </motion.a>
                  )}
                  {hackathon.certLink && (
                    <motion.a
                      href={hackathon.certLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                      View Certificate
                    </motion.a>
                  )}
                </motion.div>
                <motion.p
                  style={styles.tag}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.7 }}
                >
                  {hackathon.tag}
                </motion.p>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {selectedHackathon && (
          <>
            <motion.div
              style={styles.expandedOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              role="button"
              tabIndex={0}
              aria-label="Close expanded view"
              onKeyDown={(e) => e.key === 'Enter' && handleClose()}
            />
            <motion.div
              style={{
                ...styles.expandedTile,
                ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].expandedTile,
              }}
              variants={expandedTileVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div style={{ ...styles.tileOverlay, animation: 'rotateGlow 8s linear infinite' }} />
              <button
                style={styles.closeButton}
                onClick={handleClose}
                aria-label="Close expanded view"
              >
                ✕
              </button>
              <motion.h3
                style={{
                  ...styles.tileTitle,
                  fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                  marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
                }}
                variants={tileChildVariants}
              >
                <selectedHackathon.icon style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                {selectedHackathon.title}
              </motion.h3>
              <motion.p
                style={{
                  ...styles.tileDescription,
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                  lineHeight: '1.7',
                }}
                variants={tileChildVariants}
              >
                {selectedHackathon.description}
              </motion.p>
              <motion.p
                style={styles.techLabel}
                variants={tileChildVariants}
              >
                🔧 Tech Used:
              </motion.p>
              <motion.div
                style={styles.techContainer}
                variants={tileChildVariants}
              >
                {getTechIcons(selectedHackathon.tech)}
              </motion.div>
              <motion.div
                style={styles.linkContainer}
                variants={tileChildVariants}
              >
                {selectedHackathon.projLink && (
                  <motion.a
                    href={selectedHackathon.projLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                    View Project
                  </motion.a>
                )}
                {selectedHackathon.certLink && (
                  <motion.a
                    href={selectedHackathon.certLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                    View Certificate
                  </motion.a>
                )}
              </motion.div>
              <motion.p
                style={styles.tag}
                variants={tileChildVariants}
              >
                {selectedHackathon.tag}
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default React.memo(Hackathons);