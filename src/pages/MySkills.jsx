import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaGlobe, FaCogs, FaBrain, FaUsers } from 'react-icons/fa';
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
  SiNumpy,
  SiTypescript,
  SiJavascript,
  SiAmazon,
  SiDjango,
  SiTailwindcss,
} from 'react-icons/si';

// Tech icon component
const TechIcon = React.memo(({ tech, index }) => {
  const iconMap = useMemo(() => ({
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
    HTML5: { icon: <SiHtml5 />, label: 'HTML5' },
    CSS3: { icon: <SiCss3 />, label: 'CSS3' },
    'Scikit-learn': { icon: <SiScikitlearn />, label: 'Scikit-learn' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow' },
    Pandas: { icon: <SiPandas />, label: 'Pandas' },
    Numpy: { icon: <SiNumpy />, label: 'Numpy' },
    C: { icon: <FaCode />, label: 'C' },
    Java: { icon: <FaCode />, label: 'Java' },
    R: { icon: <FaCode />, label: 'R' },
    JavaScript: { icon: <SiJavascript />, label: 'JavaScript' },
    TypeScript: { icon: <SiTypescript />, label: 'TypeScript' },
    SQL: { icon: <FaCode />, label: 'SQL' },
    'Tailwind CSS': { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
    Django: { icon: <SiDjango />, label: 'Django' },
    'MERN Stack': { icon: <SiReact />, label: 'MERN Stack' },
    'Git & GitHub': { icon: <FaCode />, label: 'Git & GitHub' },
    AWS: { icon: <SiAmazon />, label: 'AWS' },
    'Cloud Computing': { icon: <SiAmazon />, label: 'Cloud Computing' },
    'AI & ML Concepts': { icon: <FaBrain />, label: 'AI & ML Concepts' },
    'Data Visualization': { icon: <FaBrain />, label: 'Data Visualization' },
    'Effective Communication': { icon: <FaUsers />, label: 'Effective Communication' },
    'Problem Solving': { icon: <FaUsers />, label: 'Problem Solving' },
    'Team Collaboration': { icon: <FaUsers />, label: 'Team Collaboration' },
    Leadership: { icon: <FaUsers />, label: 'Leadership' },
    'Critical Thinking': { icon: <FaUsers />, label: 'Critical Thinking' },
    Adaptability: { icon: <FaUsers />, label: 'Adaptability' },
    'Time Management': { icon: <FaUsers />, label: 'Time Management' },
  }), []);

  const techData = iconMap[tech] || { icon: <FaCode />, label: tech };
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
      whileHover={{ scale: 1.2, boxShadow: '0 0 25px rgba(255,51,255,0.8)', rotate: 10 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.08 }}
        style={{ color: '#ff33ff', textShadow: '0 0 15px rgba(192,38,211,0.7)', fontSize: 'clamp(1.1rem,2vw,1.3rem)' }}
      >
        {techData.icon}
      </motion.span>
      <span style={{ color: '#f0faff', fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontWeight: 600 }}>
        {techData.label}
      </span>
    </motion.span>
  );
});

// Skill categories data with icons
const skillCategories = [
  {
    title: '🧠 Programming Languages',
    icon: <FaCode />,
    delay: 0,
    skills: ['C', 'Java', 'Python', 'R', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: '🌐 Web & Mobile Technologies',
    icon: <FaGlobe />,
    delay: 0.2,
    skills: ['HTML5', 'CSS3', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Firebase'],
  },
  {
    title: '⚙️ Frameworks & Platforms',
    icon: <FaCogs />,
    delay: 0.4,
    skills: ['Flask', 'Django', 'MERN Stack', 'Git & GitHub', 'AWS', 'Cloud Computing'],
  },
  {
    title: '🧩 AI, ML & Data Science',
    icon: <FaBrain />,
    delay: 0.6,
    skills: ['Scikit-learn', 'TensorFlow', 'Pandas', 'Numpy', 'AI & ML Concepts', 'Data Visualization'],
  },
  {
    title: '💼 Professional & Soft Skills',
    icon: <FaUsers />,
    delay: 0.8,
    skills: [
      'Effective Communication',
      'Problem Solving',
      'Team Collaboration',
      'Leadership',
      'Critical Thinking',
      'Adaptability',
      'Time Management',
    ],
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
  scanlineOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, transparent, rgba(255,51,255,0.1) 50%, transparent)',
    pointerEvents: 'none',
    zIndex: 1,
    animation: 'scanline 6s linear infinite',
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
    animation: 'neonFlicker 4s ease-in-out infinite alternate, glitch 2s ease-in-out infinite',
    position: 'relative',
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
    position: 'relative',
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
    position: 'relative',
    overflow: 'hidden',
  },
  activeFilter: {
    background: 'linear-gradient(90deg, #ff33ff, #3b82f6)',
    color: '#f0faff',
    boxShadow: '0 0 25px rgba(255,51,255,0.9)',
  },
  filterGlow: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(255,51,255,0.5), transparent 70%)',
    opacity: 0,
    zIndex: -1,
    transition: 'opacity 0.3s ease',
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
    textAlign: 'left',
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
    animation: 'rotateGlow 10s linear infinite',
  },
  cardTitle: {
    fontSize: 'clamp(1.8rem,4vw,2.6rem)',
    color: '#ff33ff',
    textShadow: '0 0 25px rgba(255,51,255,0.8)',
    marginBottom: 'clamp(1.2rem,3vw,1.8rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.5rem,1.2vw,0.8rem)',
  },
  skillList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(15px,3vw,18px)',
    marginTop: 'clamp(1.2rem,3vw,1.8rem)',
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
    transition: 'all 0.3s ease',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(4rem,10vw,8rem) clamp(2rem,4vw,4rem)' },
      header: { padding: 'clamp(3rem,5vw,5rem)' },
      title: { fontSize: 'clamp(3rem,7vw,6rem)' },
      grid: { gap: 'clamp(2.5rem,5vw,4rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(340px,50vw,420px), 1fr))' },
      card: { padding: 'clamp(2.5rem,5vw,3.5rem)' },
      cardTitle: { fontSize: 'clamp(1.8rem,4vw,2.6rem)' },
      holographicGlow: { width: 'clamp(500px,70vw,1000px)', height: 'clamp(500px,70vw,1000px)', top: '-25%', left: '-25%' },
      expandedCard: { width: 'clamp(600px,80vw,1000px)', padding: 'clamp(3rem,6vw,4rem)' },
    },
    medium: {
      container: { padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,3vw,3rem)' },
      header: { padding: 'clamp(2rem,4vw,4rem)' },
      title: { fontSize: 'clamp(2.5rem,6vw,5rem)' },
      grid: { gap: 'clamp(2rem,4vw,3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px,45vw,360px), 1fr))' },
      card: { padding: 'clamp(2rem,4vw,3rem)' },
      cardTitle: { fontSize: 'clamp(1.6rem,3.5vw,2.2rem)' },
      holographicGlow: { width: 'clamp(400px,60vw,800px)', height: 'clamp(400px,60vw,800px)', top: '-20%', left: '-20%' },
      expandedCard: { width: 'clamp(500px,80vw,800px)', padding: 'clamp(2.5rem,5vw,3.5rem)' },
    },
    small: {
      container: { padding: 'clamp(2rem,6vw,5rem) clamp(1rem,2.5vw,2rem)' },
      header: { padding: 'clamp(1.5rem,3.5vw,3rem)' },
      title: { fontSize: 'clamp(2rem,5vw,4rem)' },
      grid: { gap: 'clamp(1.5rem,3vw,2.5rem)', gridTemplateColumns: '1fr' },
      card: { padding: 'clamp(1.5rem,3vw,2.5rem)' },
      cardTitle: { fontSize: 'clamp(1.4rem,3vw,2rem)' },
      holographicGlow: { width: 'clamp(300px,50vw,600px)', height: 'clamp(300px,50vw,600px)', top: '-15%', left: '-15%' },
      expandedCard: { width: 'clamp(300px,90vw,500px)', padding: 'clamp(2rem,4vw,3rem)' },
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
  @keyframes particleTrail {
    0% { transform: translateY(0) scale(1); opacity: 0.7; }
    50% { transform: translateY(-50px) scale(1.3); opacity: 0.4; }
    100% { transform: translateY(-100px) scale(1); opacity: 0; }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
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

const skillItemVariants = {
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

const Skills = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filter, setFilter] = useState('All');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const containerRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (selectedCategory && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedCategory]);

  const typeOptions = useMemo(() => [
    'All',
    ...skillCategories.map((category) => category.title),
  ], []);

  const filteredCategories = useMemo(() =>
    filter === 'All' ? skillCategories : skillCategories.filter((category) => category.title === filter),
    [filter]
  );

  const getSkillIcons = useCallback((skills) => {
    return (
      <motion.div
        style={{ display: 'flex', width: `${skills.length * 100}%`, animation: skills.length > 3 ? 'techCarousel 20s linear infinite' : 'none' }}
      >
        {skills.concat(skills).map((skill, i) => (
          <TechIcon key={`${skill}-${i}`} tech={skill} index={i} />
        ))}
      </motion.div>
    );
  }, []);

  const handleCardClick = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const handleFilterClick = useCallback((type) => {
    setFilter(type);
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
      aria-label="Skills section"
    >
      <style>{animationStyles}</style>
      {/* Scanline Overlay */}
      <motion.div style={styles.scanlineOverlay} />
      {/* Background Particles with Trails */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.6rem, calc(0.1vw + ${0.8 + i * 0.2}rem), ${1.5 + i * 0.3}rem)`,
            height: `clamp(0.6rem, calc(0.1vw + ${0.8 + i * 0.2}rem), ${1.5 + i * 0.3}rem)`,
            background: 'radial-gradient(circle, rgba(255,51,255,0.7), rgba(76,29,149,0.3))',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
            boxShadow: '0 0 10px rgba(255,51,255,0.5)',
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.7, 0.4, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeOut', delay: Math.random() * 2, animation: 'particleTrail' }}
        />
      ))}
      {/* Holographic Glow */}
      <motion.div
        style={{
          ...styles.holographicGlow,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].holographicGlow,
        }}
        animate={{ rotate: 360, scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      {/* Header Section */}
      <motion.header
        style={{
          ...styles.header,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].header,
        }}
        variants={headerVariants}
        
      >
        <div style={styles.headerGlow} />
        <h2
          style={{
            ...styles.title,
            ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].title,
          }}
        >
          ⚡ My Skill Set
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
          I bring a diverse arsenal of technical expertise paired with exceptional interpersonal skills to craft scalable solutions, empower teams, and thrive in dynamic tech ecosystems.
        </p>
      </motion.header>
      {/* Filter Bar */}
      <motion.div
        style={styles.filterBar}
        variants={containerVariants}
      >
        <AnimatePresence>
          {typeOptions.map((type, index) => (
            <motion.button
              key={type}
              style={{
                ...styles.filterBtn,
                ...(filter === type ? styles.activeFilter : {}),
              }}
              onClick={() => handleFilterClick(type)}
              variants={filterBtnVariants}
              initial="hidden"
              animate={filter === type ? 'active' : 'visible'}
              exit="exit"
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 30px rgba(255,51,255,0.8)',
                '&:after': { opacity: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              aria-pressed={filter === type}
              aria-current={filter === type ? 'true' : 'false'}
              aria-label={`Filter by ${type}`}
            >
              <span style={styles.filterGlow} />
              {type}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Skills Grid Section */}
      <motion.div
        style={{
          ...styles.grid,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].grid,
        }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredCategories.map((category, index) => (
            <motion.article
              key={category.title}
              style={{
                ...styles.card,
                ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].card,
              }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              
              onClick={() => handleCardClick(category)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${category.title}`}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(category)}
            >
              <motion.div style={{ ...styles.cardOverlay, animation: 'pulseBorder 2s ease-in-out infinite' }} />
              <motion.h3
                style={{
                  ...styles.cardTitle,
                  ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].cardTitle,
                }}
                variants={skillItemVariants}
                transition={{ delay: category.delay + 0.2 }}
              >
                {category.icon}
                {category.title}
              </motion.h3>
              <motion.ul
                style={styles.skillList}
                variants={skillItemVariants}
                transition={{ delay: category.delay + 0.3 }}
              >
                {getSkillIcons(category.skills)}
              </motion.ul>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedCategory && (
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
              ref={modalRef}
              style={{
                ...styles.expandedCard,
                ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].expandedCard,
              }}
              variants={expandedCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              tabIndex={-1}
              role="dialog"
              aria-label={`${selectedCategory.title} details`}
            >
              <motion.div style={{ ...styles.cardOverlay, animation: 'rotateGlow 10s linear infinite' }} />
              <motion.button
                style={styles.closeButton}
                onClick={handleClose}
                aria-label="Close expanded view"
                whileHover={{ scale: 1.2, rotate: 90, color: '#ff33ff' }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              <motion.h3
                style={{
                  ...styles.cardTitle,
                  fontSize: 'clamp(2rem,5vw,3rem)',
                  marginBottom: 'clamp(1.5rem,3.5vw,2rem)',
                }}
                variants={skillItemVariants}
              >
                {selectedCategory.icon}
                {selectedCategory.title}
              </motion.h3>
              <motion.ul style={styles.skillList} variants={skillItemVariants}>
                {getSkillIcons(selectedCategory.skills)}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default React.memo(Skills);