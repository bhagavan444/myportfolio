import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaExternalLinkAlt, FaBriefcase, FaCogs } from 'react-icons/fa';
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
  SiKeras,
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
    Keras: { icon: <SiKeras />, label: 'Keras' },
    LangChain: { icon: null, label: 'LangChain' },
    Javascript: { icon: null, label: 'Javascript' },
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

// Concept tag component with floating animation
const ConceptTag = React.memo(({ concept, index }) => (
  <motion.span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'clamp(8px,1.2vw,10px)',
      margin: 'clamp(6px,1vw,8px)',
      padding: 'clamp(6px,1vw,8px) clamp(10px,1.8vw,12px)',
      background: 'linear-gradient(45deg, rgba(59,130,246,0.3), rgba(192,38,211,0.3))',
      borderRadius: 'clamp(10px,1.5vw,12px)',
      border: '2px solid rgba(59,130,246,0.4)',
      boxShadow: '0 0 15px rgba(59,130,246,0.5)',
    }}
    initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ delay: index * 0.08, type: 'spring', stiffness: 180, damping: 14 }}
  >
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08 }}
      style={{ color: '#3b82f6', textShadow: '0 0 15px rgba(59,130,246,0.7)' }}
    >
      <FaCogs style={{ fontSize: 'clamp(0.8rem,1.5vw,1rem)' }} />
    </motion.span>
    <span style={{ color: '#f0faff', fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontWeight: 600 }}>
      {concept}
    </span>
  </motion.span>
));

// Internship Data
const internshipData = [
  {
    sno: 1,
    title: 'AI, ML & Data Science Intern (AIML&DS)',
    company: 'Blackbucks Pvt Ltd',
    duration: 'May 2024 - June 2024 (2 Months)',
    description:
      'Completed a certified internship in AI, ML & Data Science (AIMLDS). Worked on real-time datasets, implemented preprocessing, exploratory data analysis (EDA), and built predictive models using Python, Pandas, NumPy, and scikit-learn.',
    tech: 'Python, Pandas, Numpy, Scikit-learn',
    concepts: ['Data Preprocessing', 'Exploratory Data Analysis', 'Predictive Modeling', 'Feature Engineering'],
    certificateLink: 'https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view?usp=sharing',
    githubLink: 'https://github.com/bhagavan444',
    icon: FaBriefcase,
  },
  {
    sno: 2,
    title: 'AI & Machine Learning Intern (AI&ML)',
    company: 'SmartBridge (in collaboration with Eduskills)',
    duration: 'May 2025 – June 2025 (2 Months)',
    description:
      'Successfully completed a certified internship in Artificial Intelligence & Machine Learning focused on image classification. Developed a deep learning-based Fruit and Vegetable Disease Classifier using transfer learning with MobileNetV2. Implemented model training, validation, and Flask-based deployment for real-time disease detection.',
    tech: 'Python, TensorFlow, Keras, Flask, React, CSS3',
    concepts: ['Transfer Learning', 'Image Classification', 'Model Deployment', 'Deep Learning'],
    certificateLink: 'https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view?usp=sharing',
    githubLink: 'https://github.com/bhagavan444/smartbidgeproject',
    icon: FaBriefcase,
  },
];

// Inline Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3rem)',
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
    width: 'clamp(500px, 70vw, 800px)',
    height: 'clamp(500px, 70vw, 800px)',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45), transparent 60%)',
    top: '-20%',
    left: '-20%',
    filter: 'blur(150px)',
    zIndex: -1,
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(2.5rem, 4.5vw, 4rem)',
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
    fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
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
    padding: 'clamp(2rem, 4vw, 3rem)',
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
    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
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
  conceptsLabel: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#c026d3',
    fontWeight: 'bold',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
  },
  conceptsContainer: {
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

const Internships = () => {
  const [filter, setFilter] = useState('All');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 150, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.85, 1]), { stiffness: 150, damping: 20 });
  const rotate = useSpring(useTransform(scrollYProgress, [0, 0.5], [-5, 0]), { stiffness: 150, damping: 20 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const typeOptions = useMemo(() => [
    'All',
    ...Array.from(new Set(internshipData.map((h) => h.type || 'Internship'))).sort(),
  ], []);

  const filteredInternships = useMemo(() =>
    filter === 'All' ? internshipData : internshipData.filter((h) => h.type === filter),
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

  const getConceptTags = useCallback((concepts) => {
    return (
      <motion.div
        style={{ display: 'flex', width: `${concepts.length * 100}%`, animation: concepts.length > 3 ? 'techCarousel 20s linear infinite' : 'none' }}
      >
        {concepts.concat(concepts).map((c, i) => (
          <ConceptTag key={`${c}-${i}`} concept={c} index={i} />
        ))}
      </motion.div>
    );
  }, []);

  const handleTileClick = useCallback((internship) => {
    setSelectedInternship(internship);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedInternship(null);
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
      role="region"
      aria-label="Internships section"
    >
      <style>{animationStyles}</style>
      {/* Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.5rem, calc(0.1vw + ${0.5 + i * 0.1}rem), ${1 + i * 0.15}rem)`,
            height: `clamp(0.5rem, calc(0.1vw + ${0.5 + i * 0.1}rem), ${1 + i * 0.15}rem)`,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5), rgba(192, 38, 211, 0.3))',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.4, 1],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Holographic Glow */}
      <motion.div
        style={{
          ...styles.holographicGlow,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].holographicGlow,
          animation: 'glowShift 12s ease-in-out infinite',
        }}
      />
      {/* Header Section */}
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
          💼 My Internship Journey
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
          A showcase of my professional experience, highlighting my contributions to real-world projects in AI, Machine Learning, and Data Science during internships.
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
      {/* Internships Grid */}
      <motion.div
        style={{
          ...styles.grid,
          ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].grid,
        }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredInternships.map((internship, index) => {
            const IconComp = internship.icon;
            return (
              <motion.article
                key={internship.sno}
                style={{
                  ...styles.tile,
                  ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].tile,
                }}
                variants={tileVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                onClick={() => handleTileClick(internship)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${internship.title}`}
                onKeyDown={(e) => e.key === 'Enter' && handleTileClick(internship)}
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
                  #{internship.sno} • {internship.title}
                </motion.h3>
                <motion.p
                  style={{
                    ...styles.tileDescription,
                    ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].tileDescription,
                  }}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  <span style={styles.label}>Company:</span> {internship.company}
                </motion.p>
                <motion.p
                  style={{
                    ...styles.tileDescription,
                    ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].tileDescription,
                  }}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  <span style={styles.label}>Duration:</span> {internship.duration}
                </motion.p>
                <motion.p
                  style={{
                    ...styles.tileDescription,
                    ...styles.responsive[windowWidth <= 480 ? 'small' : windowWidth <= 768 ? 'medium' : 'large'].tileDescription,
                  }}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  <span style={styles.label}>Description:</span> {internship.description}
                </motion.p>
                <motion.p
                  style={styles.techLabel}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.6 }}
                >
                  🔧 Tech Used:
                </motion.p>
                <motion.div
                  style={styles.techContainer}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 0.7 }}
                >
                  {getTechIcons(internship.tech)}
                </motion.div>
                {internship.concepts && (
                  <>
                    <motion.p
                      style={styles.conceptsLabel}
                      variants={tileChildVariants}
                      transition={{ delay: index * 0.15 + 0.8 }}
                    >
                      🧠 Concepts Learned:
                    </motion.p>
                    <motion.div
                      style={styles.conceptsContainer}
                      variants={tileChildVariants}
                      transition={{ delay: index * 0.15 + 0.9 }}
                    >
                      {getConceptTags(internship.concepts)}
                    </motion.div>
                  </>
                )}
                <motion.div
                  style={styles.linkContainer}
                  variants={tileChildVariants}
                  transition={{ delay: index * 0.15 + 1.0 }}
                >
                  {internship.certificateLink && (
                    <motion.a
                      href={internship.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                      View Certificate
                    </motion.a>
                  )}
                  {internship.githubLink && (
                    <motion.a
                      href={internship.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                      View GitHub
                    </motion.a>
                  )}
                </motion.div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
      {/* Expanded Tile Modal */}
      <AnimatePresence>
        {selectedInternship && (
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
                <selectedInternship.icon style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                #{selectedInternship.sno} • {selectedInternship.title}
              </motion.h3>
              <motion.p
                style={{
                  ...styles.tileDescription,
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                  lineHeight: '1.7',
                }}
                variants={tileChildVariants}
              >
                <span style={styles.label}>Company:</span> {selectedInternship.company}
              </motion.p>
              <motion.p
                style={{
                  ...styles.tileDescription,
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                  lineHeight: '1.7',
                }}
                variants={tileChildVariants}
              >
                <span style={styles.label}>Duration:</span> {selectedInternship.duration}
              </motion.p>
              <motion.p
                style={{
                  ...styles.tileDescription,
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                  lineHeight: '1.7',
                }}
                variants={tileChildVariants}
              >
                <span style={styles.label}>Description:</span> {selectedInternship.description}
              </motion.p>
              <motion.p style={styles.techLabel} variants={tileChildVariants}>
                🔧 Tech Used:
              </motion.p>
              <motion.div style={styles.techContainer} variants={tileChildVariants}>
                {getTechIcons(selectedInternship.tech)}
              </motion.div>
              {selectedInternship.concepts && (
                <>
                  <motion.p style={styles.conceptsLabel} variants={tileChildVariants}>
                    🧠 Concepts Learned:
                  </motion.p>
                  <motion.div style={styles.conceptsContainer} variants={tileChildVariants}>
                    {getConceptTags(selectedInternship.concepts)}
                  </motion.div>
                </>
              )}
              <motion.div style={styles.linkContainer} variants={tileChildVariants}>
                {selectedInternship.certificateLink && (
                  <motion.a
                    href={selectedInternship.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.link, fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}
                  >
                    <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                    View Certificate
                  </motion.a>
                )}
                {selectedInternship.githubLink && (
                  <motion.a
                    href={selectedInternship.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.link, fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}
                  >
                    <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                    View GitHub
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default React.memo(Internships);