
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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

// Tech icon component with carousel effect
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
  introText: {
    fontSize: 'clamp(1.1rem,2.8vw,1.5rem)',
    color: '#f0faff',
    maxWidth: 'clamp(600px,85vw,1000px)',
    margin: '0 auto clamp(1.5rem,3vw,2rem)',
    lineHeight: '1.9',
    textShadow: '0 0 15px rgba(255,51,255,0.6)',
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
    boxShadow: '0 0 25px rgba(255,51,255,0.9)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(340px,50vw,420px), 1fr))',
    gap: 'clamp(2.5rem,5vw,4rem)',
    maxWidth: 'clamp(900px,95vw,2000px)',
    margin: '0 auto',
    perspective: '2500px',
  },
  tile: {
    background: 'rgba(10,0,30,0.9)',
    borderRadius: 'clamp(20px,3vw,24px)',
    padding: 'clamp(2.5rem,5vw,3.5rem)',
    textAlign: 'left',
    backdropFilter: 'blur(30px)',
    boxShadow: '0 40px 80px rgba(0,0,0,0.9), inset 0 0 20px rgba(255,51,255,0.4)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  tileOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(255,51,255,0.5), rgba(76,29,149,0.5), transparent)',
    zIndex: -1,
    opacity: 0.6,
    animation: 'rotateGlow 10s linear infinite',
  },
  tileTitle: {
    fontSize: 'clamp(1.8rem,4vw,2.6rem)',
    color: '#ff33ff',
    textShadow: '0 0 25px rgba(255,51,255,0.8)',
    marginBottom: 'clamp(1.2rem,3vw,1.8rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.5rem,1.2vw,0.8rem)',
  },
  tileDescription: {
    fontSize: 'clamp(1.1rem,2.5vw,1.4rem)',
    color: '#f0faff',
    marginBottom: 'clamp(1.5rem,3.5vw,2rem)',
    lineHeight: '1.9',
    textShadow: '0 0 15px rgba(255,51,255,0.6)',
  },
  techLabel: {
    fontSize: 'clamp(1.2rem,2.5vw,1.5rem)',
    color: '#3b82f6',
    fontWeight: 'bold',
    marginTop: 'clamp(1.5rem,3.5vw,2rem)',
    textShadow: '0 0 15px rgba(59,130,246,0.6)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(15px,3vw,18px)',
    marginTop: 'clamp(1.2rem,3vw,1.8rem)',
    marginBottom: 'clamp(1.5rem,3.5vw,2rem)',
    overflow: 'hidden',
  },
  linkContainer: {
    display: 'flex',
    gap: 'clamp(1rem,2vw,1.5rem)',
    flexWrap: 'wrap',
  },
  link: {
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
  tag: {
    fontSize: 'clamp(1rem,2vw,1.2rem)',
    color: '#d1d5db',
    marginTop: 'clamp(1rem,2vw,1.5rem)',
    textShadow: '0 0 12px rgba(255,51,255,0.4)',
  },
  expandedTile: {
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
      tile: { padding: 'clamp(2.5rem,5vw,3.5rem)' },
      tileTitle: { fontSize: 'clamp(1.8rem,4vw,2.6rem)' },
      tileDescription: { fontSize: 'clamp(1.1rem,2.5vw,1.4rem)' },
      holographicGlow: { width: 'clamp(500px,70vw,1000px)', height: 'clamp(500px,70vw,1000px)', top: '-25%', left: '-25%' },
      expandedTile: { width: 'clamp(600px,80vw,1000px)', padding: 'clamp(3rem,6vw,4rem)' },
    },
    medium: {
      container: { padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,3vw,3rem)' },
      header: { padding: 'clamp(2rem,4vw,4rem)' },
      title: { fontSize: 'clamp(2.5rem,6vw,5rem)' },
      grid: { gap: 'clamp(2rem,4vw,3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px,45vw,360px), 1fr))' },
      tile: { padding: 'clamp(2rem,4vw,3rem)' },
      tileTitle: { fontSize: 'clamp(1.6rem,3.5vw,2.2rem)' },
      tileDescription: { fontSize: 'clamp(1rem,2.2vw,1.3rem)' },
      holographicGlow: { width: 'clamp(400px,60vw,800px)', height: 'clamp(400px,60vw,800px)', top: '-20%', left: '-20%' },
      expandedTile: { width: 'clamp(500px,80vw,800px)', padding: 'clamp(2.5rem,5vw,3.5rem)' },
    },
    small: {
      container: { padding: 'clamp(2rem,6vw,5rem) clamp(1rem,2.5vw,2rem)' },
      header: { padding: 'clamp(1.5rem,3.5vw,3rem)' },
      title: { fontSize: 'clamp(2rem,5vw,4rem)' },
      grid: { gap: 'clamp(1.5rem,3vw,2.5rem)', gridTemplateColumns: '1fr' },
      tile: { padding: 'clamp(1.5rem,3vw,2.5rem)' },
      tileTitle: { fontSize: 'clamp(1.4rem,3vw,2rem)' },
      tileDescription: { fontSize: 'clamp(0.9rem,2vw,1.2rem)' },
      holographicGlow: { width: 'clamp(300px,50vw,600px)', height: 'clamp(300px,50vw,600px)', top: '-15%', left: '-15%' },
      expandedTile: { width: 'clamp(300px,90vw,500px)', padding: 'clamp(2rem,4vw,3rem)' },
    },
  },
};

// Inline Animation Styles
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
  @keyframes techCarousel {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
`;

// Animation Variants
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

const tileVariants = {
  hidden: { opacity: 0, y: 150, scale: 0.7, rotateY: 180 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1.2, type: 'spring', stiffness: 140, damping: 16 },
  },
};

const tileChildVariants = {
  hidden: { opacity: 0, x: -50, rotate: -15 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8, type: 'spring', stiffness: 160, damping: 15 },
  },
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
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const containerRef = useRef(null);

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
        rotateX,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Hackathons section"
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
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].holographicGlow,
        }}
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      {/* Header Section */}
      <motion.header
        style={{
          ...styles.header,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].header,
        }}
        variants={headerVariants}
        transition={{ type: 'spring', stiffness: 130, damping: 14 }}
      >
        <div style={styles.headerGlow} />
        <h2
          style={{
            ...styles.title,
            ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].title,
          }}
        >
          ⚡ Hackathon Achievements
        </h2>
        <motion.div
          style={styles.titleUnderline}
          initial={{ width: 0, scaleX: 0 }}
          animate={{ width: 'clamp(200px,40vw,320px)', scaleX: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
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
      {/* Filter Bar */}
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
      {/* Hackathons Grid */}
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
                <motion.div style={{ ...styles.tileOverlay, animation: 'pulseBorder 2s ease-in-out infinite' }} />
                <motion.h3
                  style={{
                    ...styles.tileTitle,
                    ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].tileTitle,
                  }}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.2 + 0.2 }}
                >
                  <IconComp style={{ fontSize: 'clamp(1.6rem,3vw,2rem)' }} />
                  {hackathon.title}
                </motion.h3>
                <motion.p
                  style={{
                    ...styles.tileDescription,
                    ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].tileDescription,
                  }}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {hackathon.description}
                </motion.p>
                <motion.p
                  style={styles.techLabel}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.2 + 0.4 }}
                >
                  🔧 Tech Used:
                </motion.p>
                <motion.div
                  style={styles.techContainer}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  {getTechIcons(hackathon.tech)}
                </motion.div>
                <motion.div
                  style={styles.linkContainer}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.2 + 0.6 }}
                >
                  {hackathon.projLink && (
                    <motion.a
                      href={hackathon.projLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                      
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.9rem,1.8vw,1.2rem)' }} />
                      View Project
                    </motion.a>
                  )}
                  {hackathon.certLink && (
                    <motion.a
                      href={hackathon.certLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                      
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.9rem,1.8vw,1.2rem)' }} />
                      View Certificate
                    </motion.a>
                  )}
                </motion.div>
                <motion.p
                  style={styles.tag}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.2 + 0.7 }}
                >
                  {hackathon.tag}
                </motion.p>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
      {/* Expanded Tile Modal */}
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
              <motion.div style={{ ...styles.tileOverlay, animation: 'rotateGlow 10s linear infinite' }} />
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
                  fontSize: 'clamp(2rem,5vw,3rem)',
                  marginBottom: 'clamp(1.5rem,3.5vw,2rem)',
                }}
                variants={tileChildVariants}
              >
                <selectedHackathon.icon style={{ fontSize: 'clamp(1.8rem,3.5vw,2.2rem)' }} />
                {selectedHackathon.title}
              </motion.h3>
              <motion.p
                style={{
                  ...styles.tileDescription,
                  fontSize: 'clamp(1.2rem,2.8vw,1.6rem)',
                  lineHeight: '2',
                }}
                variants={tileChildVariants}
              >
                {selectedHackathon.description}
              </motion.p>
              <motion.p style={styles.techLabel} variants={tileChildVariants}>
                🔧 Tech Used:
              </motion.p>
              <motion.div style={styles.techContainer} variants={tileChildVariants}>
                {getTechIcons(selectedHackathon.tech)}
              </motion.div>
              <motion.div style={styles.linkContainer} variants={tileChildVariants}>
                {selectedHackathon.projLink && (
                  <motion.a
                    href={selectedHackathon.projLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.link, fontSize: 'clamp(1.2rem,2.5vw,1.5rem)' }}
                    
                  >
                    <FaExternalLinkAlt style={{ fontSize: 'clamp(1rem,2vw,1.3rem)' }} />
                    View Project
                  </motion.a>
                )}
                {selectedHackathon.certLink && (
                  <motion.a
                    href={selectedHackathon.certLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.link, fontSize: 'clamp(1.2rem,2.5vw,1.5rem)' }}
                    
                  >
                    <FaExternalLinkAlt style={{ fontSize: 'clamp(1rem,2vw,1.3rem)' }} />
                    View Certificate
                  </motion.a>
                )}
              </motion.div>
              <motion.p style={styles.tag} variants={tileChildVariants}>
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