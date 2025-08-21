import React, { useState, useEffect, useCallback, useMemo, useRef, Suspense, Component } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaBrain, FaLink } from 'react-icons/fa';
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
  SiAmazon,
  SiDjango,
  SiTailwindcss,
} from 'react-icons/si';

// Error Boundary Component
class ProjectCardErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-white p-8 bg-gray-900/50 rounded-xl">
          Error loading project card. Please try again.
        </div>
      );
    }
    return this.props.children;
  }
}

// Tech Icon Component
const TechIcon = React.memo(({ tech, index }) => {
  const iconMap = useMemo(() => ({
    MongoDB: { icon: <SiMongodb />, label: 'MongoDB' },
    Express: { icon: <SiExpress />, label: 'Express.js' },
    React: { icon: <SiReact />, label: 'React.js' },
    Node: { icon: <SiNodedotjs />, label: 'Node.js' },
    Flask: { icon: <SiFlask />, label: 'Flask' },
    Python: { icon: <SiPython />, label: 'Python' },
    Firebase: { icon: <SiFirebase />, label: 'Firebase' },
    'Firebase Auth': { icon: <SiFirebase />, label: 'Firebase Auth' },
    HTML: { icon: <SiHtml5 />, label: 'HTML' },
    CSS: { icon: <SiCss3 />, label: 'CSS3' },
    'HTML/CSS': { icon: [<SiHtml5 key="html" />, <SiCss3 key="css" />], label: 'HTML/CSS' },
    'Scikit-learn': { icon: <SiScikitlearn />, label: 'Scikit-learn' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow' },
    Pandas: { icon: <SiPandas />, label: 'Pandas' },
    Numpy: { icon: <SiNumpy />, label: 'Numpy' },
    'TF-IDF': { icon: <FaBrain />, label: 'TF-IDF' },
    NLTK: { icon: <FaBrain />, label: 'NLTK' },
    Keras: { icon: <FaBrain />, label: 'Keras' },
    LangChain: { icon: <FaBrain />, label: 'LangChain' },
    'Cloud Computing': { icon: <SiAmazon />, label: 'Cloud Computing' },
    Django: { icon: <SiDjango />, label: 'Django' },
    'Tailwind CSS': { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
  }), []);

  return tech.split(', ').map((t, i) => (
    <motion.span
      key={`${t}-${i}`}
      className="inline-flex items-center gap-2 px-3 py-1.5 m-1.5 bg-gradient-to-r from-pink-600/40 to-indigo-600/40 border border-pink-400/60 rounded-full text-sm font-semibold text-white shadow-lg"
      whileHover={{
        scale: 1.2,
        rotate: [0, 5, -5, 0],
        background: 'linear-gradient(to right, rgba(236, 72, 153, 0.7), rgba(99, 102, 241, 0.7))',
        boxShadow: '0 0 25px rgba(236, 72, 153, 0.9)',
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.1 + i * 0.06, type: 'spring', stiffness: 200, damping: 12 }}
    >
      {iconMap[t]?.icon && (
        <motion.span
          className="text-pink-300"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + i * 0.06 + 0.1 }}
        >
          {Array.isArray(iconMap[t].icon) ? iconMap[t].icon : iconMap[t].icon}
        </motion.span>
      )}
      <span>{iconMap[t]?.label || t}</span>
    </motion.span>
  ));
});

// Project Data
const projectData = [
  {
    title: '🧠 Enhance Resume Builder',
    description: 'An intelligent MERN stack application that allows users to create professional resumes with modern templates, scoring using ATS.',
    tech: 'MongoDB, Express, React, Node, Firebase Auth, HTML/CSS',
    link: 'https://github.com/bhagavan444/resumebuilder',
    category: 'Full Stack',
  },
  {
    title: '🍏 Fruit & Vegetable Disease Classifier',
    description: 'Flask + MobileNetV2-based image classifier to detect fruit/vegetable health. Real-time prediction and animated UI.',
    tech: 'TensorFlow, Keras, Flask, React, CSS, Python',
    link: 'https://github.com/bhagavan444/smartbidgeproject',
    category: 'Machine Learning',
  },
  {
    title: '🎯 Career Recommendation System',
    description: "ML-powered system recommending careers based on user's data. Includes predictions, roadmap, and resources.",
    tech: 'Python, Flask, React, Scikit-learn, Pandas, HTML/CSS',
    link: 'https://github.com/bhagavan444/career-path-project',
    category: 'Machine Learning',
  },
  {
    title: '💻 2nd Hand Electronics Platform',
    description: 'Full-stack app for buying/selling electronics. Built during a hackathon with real-time chat, image uploads, auth.',
    tech: 'MongoDB, Express, React, Node, Cloud Computing, Django',
    link: 'https://github.com/bhagavan444/hackathon-project',
    category: 'Full Stack',
  },
  {
    title: '❌ Fake News Detector',
    description: 'An AI-driven app that detects fake news using TF-IDF, NLP, and classification models.',
    tech: 'Python, Flask, Scikit-learn, TF-IDF, NLTK, HTML/CSS',
    link: 'https://github.com/bhagavan444/fake-news-detector',
    category: 'Machine Learning',
  },
  {
    title: '📖 Smart Career Chatbot',
    description: 'LangChain-based chatbot that recommends careers through interactive dialogue, powered by AI.',
    tech: 'LangChain, Flask, React, Python',
    link: 'https://github.com/bhagavan444/smart-career-chatbot',
    category: 'Machine Learning',
  },
  {
    title: '📑 Diabetes Predictor',
    description: 'A Flask ML app predicting diabetes from user medical data. Simple and elegant UI.',
    tech: 'Python, Flask, Scikit-learn, Pandas, HTML/CSS',
    link: 'https://github.com/bhagavan444/diabetes-predictor-app',
    category: 'Machine Learning',
  },
  {
    title: '📊 ML Projects – Health Risk Predictions',
    description: 'Collection of mini-ML projects including diabetes, heart, and cancer risk predictors.',
    tech: 'Python, Flask, Scikit-learn, Pandas, TensorFlow, Numpy',
    link: 'https://github.com/bhagavan444',
    category: 'Machine Learning',
  },
];

// Inline Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(4rem,10vw,8rem) clamp(2rem,4vw,4rem)',
    background: 'linear-gradient(165deg, #0f001e, #1e0038, #2e005c, #420099, #5b00cc)',
    backgroundSize: '1000% 1000%',
    color: '#fefefe',
    overflow: 'hidden',
    position: 'relative',
    perspective: '3000px',
    fontFamily: "'Orbitron', 'Inter', sans-serif",
    willChange: 'background, transform',
    animation: 'shimmerEnhanced 10s ease-in-out infinite',
  },
  scanlineOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, transparent, rgba(236,72,153,0.15) 40%, transparent)',
    pointerEvents: 'none',
    zIndex: 1,
    animation: 'scanlineEnhanced 5s linear infinite',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(600px,80vw,1200px)',
    height: 'clamp(600px,80vw,1200px)',
    background: 'linear-gradient(45deg, rgba(236,72,153,0.6), rgba(99,102,241,0.6), transparent)',
    top: '-30%',
    left: '-30%',
    filter: 'blur(200px)',
    zIndex: -2,
    animation: 'rotateGlowEnhanced 12s linear infinite',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(3rem,5vw,5rem)',
    background: 'rgba(10,0,30,0.98)',
    borderRadius: 'clamp(24px,3vw,28px)',
    boxShadow: '0 50px 100px rgba(0,0,0,0.95), 0 0 100px rgba(236,72,153,0.6)',
    backdropFilter: 'blur(30px)',
    maxWidth: 'clamp(800px,95vw,1400px)',
    margin: '0 auto clamp(4rem,8vw,6rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    background: 'conic-gradient(from 45deg, rgba(236,72,153,0.5), rgba(99,102,241,0.5), transparent)',
    opacity: 0.7,
    zIndex: -1,
  },
  title: {
    fontSize: 'clamp(3rem,7vw,6rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #ec4899, #6366f1, #06b6d4)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 60px rgba(236,72,153,0.95), 0 0 90px rgba(99,102,241,0.8)',
    marginBottom: 'clamp(1rem,2.5vw,2rem)',
    letterSpacing: '0.25em',
    animation: 'neonFlickerEnhanced 3s ease-in-out infinite alternate, glitchEnhanced 1.5s ease-in-out infinite',
  },
  titleUnderline: {
    width: 'clamp(200px,40vw,320px)',
    height: '8px',
    background: 'linear-gradient(90deg, #ec4899, #6366f1)',
    borderRadius: '8px',
    margin: '1rem auto',
    boxShadow: '0 0 40px rgba(236,72,153,0.9)',
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
    background: 'rgba(236,72,153,0.2)',
    border: '2px solid rgba(236,72,153,0.4)',
    borderRadius: 'clamp(16px,2.2vw,20px)',
    color: '#fefefe',
    cursor: 'pointer',
    fontSize: 'clamp(1.1rem,2.2vw,1.3rem)',
    fontWeight: '700',
    boxShadow: '0 0 15px rgba(236,72,153,0.5)',
    position: 'relative',
    overflow: 'hidden',
  },
  activeFilter: {
    background: 'linear-gradient(90deg, #ec4899, #6366f1)',
    color: '#fefefe',
    boxShadow: '0 0 30px rgba(236,72,153,0.9)',
  },
  filterGlow: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.5), transparent 70%)',
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
    perspective: '3000px',
  },
  card: {
    background: 'rgba(10,0,30,0.95)',
    borderRadius: 'clamp(20px,3vw,24px)',
    padding: 'clamp(2.5rem,5vw,3.5rem)',
    textAlign: 'left',
    backdropFilter: 'blur(35px)',
    boxShadow: '0 50px 100px rgba(0,0,0,0.95), inset 0 0 25px rgba(236,72,153,0.5)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(236,72,153,0.6), rgba(99,102,241,0.6), transparent)',
    zIndex: -1,
    opacity: 0.7,
    animation: 'pulseBorderEnhanced 1.8s ease-in-out infinite',
  },
  cardTitle: {
    fontSize: 'clamp(1.8rem,4vw,2.6rem)',
    color: '#ec4899',
    textShadow: '0 0 30px rgba(236,72,153,0.9)',
    marginBottom: 'clamp(1.2rem,3vw,1.8rem)',
    fontWeight: '800',
    animation: 'glitchEnhanced 1.5s ease-in-out infinite',
  },
  cardDescription: {
    fontSize: 'clamp(1rem,2.2vw,1.3rem)',
    color: '#fefefe',
    marginBottom: 'clamp(1.5rem,3vw,2rem)',
    lineHeight: '1.7',
    textShadow: '0 0 20px rgba(236,72,153,0.7)',
  },
  techLabel: {
    fontSize: 'clamp(1.1rem,2.5vw,1.4rem)',
    color: '#ec4899',
    fontWeight: '700',
    marginTop: 'clamp(1.2rem,3vw,1.8rem)',
    textShadow: '0 0 20px rgba(236,72,153,0.7)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(10px,2vw,12px)',
    marginTop: 'clamp(0.8rem,2vw,1rem)',
    marginBottom: 'clamp(1.5rem,3vw,2rem)',
  },
  visitBtn: {
    display: 'inline-flex',
    padding: 'clamp(0.8rem,1.8vw,1.2rem) clamp(1.8rem,3vw,2.5rem)',
    background: 'linear-gradient(90deg, #ec4899, #6366f1)',
    color: '#fefefe',
    borderRadius: 'clamp(12px,1.8vw,16px)',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: 'clamp(1rem,2vw,1.2rem)',
    boxShadow: '0 0 20px rgba(236,72,153,0.6)',
  },
  expandedCard: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(600px,80vw,1000px)',
    maxHeight: '80vh',
    background: 'linear-gradient(135deg, rgba(10,0,30,0.98), rgba(20,10,60,0.98)), url("data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"%3E%3Cdefs%3E%3ClinearGradient id=\"grad\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"%3E%3Cstop offset=\"0%\" stop-color=\"rgba(236,72,153,0.4)\"/%3E%3Cstop offset=\"100%\" stop-color=\"rgba(99,102,241,0.4)\"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"200\" height=\"200\" fill=\"url(%23grad)\"/%3E%3C/svg%3E")',
    backgroundSize: 'cover',
    borderRadius: 'clamp(24px,3.5vw,28px)',
    padding: 'clamp(3rem,6vw,4rem)',
    boxShadow: '0 60px 120px rgba(0,0,0,0.95), 0 0 120px rgba(236,72,153,0.7)',
    backdropFilter: 'blur(35px)',
    zIndex: 1000,
    overflowY: 'auto',
  },
  expandedOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    zIndex: 999,
  },
  closeButton: {
    position: 'absolute',
    top: 'clamp(1rem,2vw,1.5rem)',
    right: 'clamp(1rem,2vw,1.5rem)',
    background: 'transparent',
    border: 'none',
    color: '#fefefe',
    fontSize: 'clamp(1.5rem,3vw,2rem)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  copyButton: {
    display: 'inline-flex',
    padding: 'clamp(0.8rem,1.8vw,1.2rem) clamp(1.8rem,3vw,2.5rem)',
    background: 'rgba(236,72,153,0.2)',
    border: '2px solid rgba(236,72,153,0.4)',
    borderRadius: 'clamp(12px,1.8vw,16px)',
    color: '#fefefe',
    fontSize: 'clamp(1rem,2vw,1.2rem)',
    fontWeight: '700',
    boxShadow: '0 0 20px rgba(236,72,153,0.6)',
    cursor: 'pointer',
    marginLeft: 'clamp(1rem,2vw,1.5rem)',
  },
  loadingButton: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  spinner: {
    display: 'inline-block',
    width: 'clamp(1.5rem,3vw,2rem)',
    height: 'clamp(1.5rem,3vw,2rem)',
    border: '4px solid rgba(236,72,153,0.3)',
    borderTop: '4px solid #ec4899',
    borderRadius: '50%',
    animation: 'spinEnhanced 0.8s linear infinite',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(4rem,10vw,8rem) clamp(2rem,4vw,4rem)' },
      header: { padding: 'clamp(3rem,5vw,5rem)' },
      title: { fontSize: 'clamp(3rem,7vw,6rem)' },
      grid: { gap: 'clamp(2.5rem,5vw,4rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(340px,50vw,420px), 1fr))' },
      card: { padding: 'clamp(2.5rem,5vw,3.5rem)' },
      cardTitle: { fontSize: 'clamp(1.8rem,4vw,2.6rem)' },
      cardDescription: { fontSize: 'clamp(1rem,2.2vw,1.3rem)' },
      holographicGlow: { width: 'clamp(600px,80vw,1200px)', height: 'clamp(600px,80vw,1200px)', top: '-30%', left: '-30%' },
      expandedCard: { width: 'clamp(600px,80vw,1000px)', padding: 'clamp(3rem,6vw,4rem)' },
    },
    medium: {
      container: { padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,3vw,3rem)' },
      header: { padding: 'clamp(2rem,4vw,4rem)' },
      title: { fontSize: 'clamp(2.5rem,6vw,5rem)' },
      grid: { gap: 'clamp(2rem,4vw,3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px,45vw,360px), 1fr))' },
      card: { padding: 'clamp(2rem,4vw,3rem)' },
      cardTitle: { fontSize: 'clamp(1.6rem,3.5vw,2.2rem)' },
      cardDescription: { fontSize: 'clamp(0.95rem,2vw,1.2rem)' },
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
      cardDescription: { fontSize: 'clamp(0.9rem,1.8vw,1.1rem)' },
      holographicGlow: { width: 'clamp(300px,50vw,600px)', height: 'clamp(300px,50vw,600px)', top: '-15%', left: '-15%' },
      expandedCard: { width: 'clamp(300px,90vw,500px)', padding: 'clamp(2rem,4vw,3rem)' },
    },
  },
};

// Inline Animation Styles
const animationStyles = `
  @keyframes shimmerEnhanced {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes glowShiftEnhanced {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    50% { transform: translate(60px, 60px) scale(1.15); opacity: 0.9; }
  }
  @keyframes rotateGlowEnhanced {
    0% { transform: rotate(0deg); filter: brightness(1); }
    50% { transform: rotate(180deg); filter: brightness(1.3); }
    100% { transform: rotate(360deg); filter: brightness(1); }
  }
  @keyframes neonFlickerEnhanced {
    0%, 100% { opacity: 1; text-shadow: 0 0 50px rgba(236,72,153,0.95), 0 0 80px rgba(99,102,241,0.8); }
    50% { opacity: 0.8; text-shadow: 0 0 30px rgba(236,72,153,0.7), 0 0 50px rgba(99,102,241,0.6); }
  }
  @keyframes pulseBorderEnhanced {
    0%, 100% { border-color: rgba(236,72,153,0.5); box-shadow: 0 0 15px rgba(236,72,153,0.5); }
    50% { border-color: rgba(236,72,153,1); box-shadow: 0 0 40px rgba(236,72,153,1); }
  }
  @keyframes scanlineEnhanced {
    0% { transform: translateY(-100%); opacity: 0.2; }
    100% { transform: translateY(100%); opacity: 0.3; }
  }
  @keyframes glitchEnhanced {
    0% { transform: translate(0); filter: hue-rotate(0deg); }
    20% { transform: translate(-2px, 2px); filter: hue-rotate(10deg); }
    40% { transform: translate(-2px, -2px); filter: hue-rotate(-10deg); }
    60% { transform: translate(2px, 2px); filter: hue-rotate(10deg); }
    80% { transform: translate(2px, -2px); filter: hue-rotate(-10deg); }
    100% { transform: translate(0); filter: hue-rotate(0deg); }
  }
  @keyframes particleTrailEnhanced {
    0% { transform: translateY(0) scale(1); opacity: 0.7; filter: blur(0px); }
    50% { transform: translateY(-50px) scale(1.3); opacity: 0.4; filter: blur(2px); }
    100% { transform: translateY(-100px) scale(1); opacity: 0; filter: blur(4px); }
  }
  @keyframes spinEnhanced {
    0% { transform: rotate(0deg); border-top-color: #ec4899; }
    100% { transform: rotate(360deg); border-top-color: #6366f1; }
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: 'easeOut', staggerChildren: 0.25 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -120, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.2, type: 'spring', stiffness: 160, damping: 12 },
  },
};

const filterBtnVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 180, damping: 10 },
  },
  exit: { opacity: 0, scale: 0.7, y: 40, transition: { duration: 0.3 } },
  active: {
    scale: [1, 1.2, 1],
    boxShadow: ['0 0 15px rgba(236,72,153,0.6)', '0 0 30px rgba(236,72,153,1)', '0 0 15px rgba(236,72,153,0.6)'],
    transition: { duration: 0.7, repeat: Infinity, repeatType: 'reverse' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 150, scale: 0.7, rotateY: 120 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, type: 'spring', stiffness: 140, damping: 13 },
  },
};

const cardChildVariants = {
  hidden: { opacity: 0, x: -50, rotate: -15 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 160, damping: 12 },
  },
};

const expandedCardVariants = {
  hidden: { opacity: 0, scale: 0.5, rotateY: 60, x: '-50%', y: '-50%' },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, type: 'spring', stiffness: 120, damping: 12 },
  },
  exit: { opacity: 0, scale: 0.5, rotateY: -60, transition: { duration: 0.4 } },
};

// Lazy-loaded Project Card
const ProjectCard = React.lazy(() => Promise.resolve({
  default: ({ project, index, handleCardClick, styles, responsiveStyles }) => (
    <ProjectCardErrorBoundary>
      <motion.article
        className="relative"
        style={{ ...styles.card, ...responsiveStyles.card }}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        
        onClick={() => handleCardClick(project)}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick(project)}
      >
        <motion.div style={styles.cardOverlay} />
        <motion.h3
          style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
          variants={cardChildVariants}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
          variants={cardChildVariants}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          {project.description}
        </motion.p>
        <motion.p
          style={styles.techLabel}
          variants={cardChildVariants}
          transition={{ delay: index * 0.15 + 0.4 }}
        >
          🔧 Tech Used:
        </motion.p>
        <motion.div
          style={styles.techContainer}
          variants={cardChildVariants}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          <TechIcon tech={project.tech} index={index} />
        </motion.div>
        <motion.a
          href={project.link}
          style={styles.visitBtn}
          target="_blank"
          rel="noreferrer"
          variants={cardChildVariants}
          transition={{ delay: index * 0.15 + 0.6 }}
          
        >
          View Project
        </motion.a>
      </motion.article>
    </ProjectCardErrorBoundary>
  ),
}));

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCopying, setIsCopying] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedProject]);

  const techOptions = useMemo(() =>
    ['All', ...Array.from(new Set(projectData.flatMap((p) => p.tech.split(', ')))).sort()],
    []
  );

  const categoryOptions = useMemo(() =>
    ['All', ...Array.from(new Set(projectData.map((p) => p.category))).sort()],
    []
  );

  const filteredProjects = useMemo(() =>
    filter === 'All' ? projectData : projectData.filter((p) =>
      filter === p.category || p.tech.includes(filter)
    ),
    [filter]
  );

  const responsiveStyles = useMemo(() =>
    windowWidth <= 480 ? styles.responsive.small :
    windowWidth <= 768 ? styles.responsive.medium :
    styles.responsive.large,
    [windowWidth]
  );

  const handleCardClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
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
      className="relative"
      style={{ ...styles.container, ...responsiveStyles.container, opacity, scale, rotateX }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Projects section"
    >
      <style>{animationStyles}</style>
      {/* Scanline Overlay */}
      <motion.div style={styles.scanlineOverlay} />
      {/* Background Particles with Trails */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.6rem, calc(0.15vw + ${0.7 + i * 0.2}rem), ${1.4 + i * 0.25}rem)`,
            height: `clamp(0.6rem, calc(0.15vw + ${0.7 + i * 0.2}rem), ${1.4 + i * 0.25}rem)`,
            background: 'radial-gradient(circle, rgba(236,72,153,0.7), rgba(99,102,241,0.3))',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
            boxShadow: '0 0 10px rgba(236,72,153,0.5)',
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
      {/* Holographic Glow */}
      <motion.div
        style={{ ...styles.holographicGlow, ...responsiveStyles.holographicGlow }}
        animate={{ rotate: 360, scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      {/* Header Section */}
      <motion.header
        className="relative"
        style={{ ...styles.header, ...responsiveStyles.header }}
        variants={headerVariants}
      >
        <div style={styles.headerGlow} />
        <h2 style={{ ...styles.title, ...responsiveStyles.title }}>
          🚀 My Technical Projects
        </h2>
        <motion.div
          style={styles.titleUnderline}
          initial={{ width: 0, scaleX: 0 }}
          animate={{ width: 'clamp(200px,40vw,320px)', scaleX: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </motion.header>
      {/* Filter Bar */}
      <motion.div style={styles.filterBar} variants={containerVariants}>
        <AnimatePresence>
          {[...categoryOptions, ...techOptions.filter(t => t !== 'All')].map((option, index) => (
            <motion.button
              key={option}
              style={{ ...styles.filterBtn, ...(filter === option ? styles.activeFilter : {}) }}
              onClick={() => setFilter(option)}
              variants={filterBtnVariants}
              initial="hidden"
              animate={filter === option ? 'active' : 'visible'}
              exit="exit"
              
              whileTap={{ scale: 0.95 }}
              aria-pressed={filter === option}
              aria-current={filter === option ? 'true' : 'false'}
              aria-label={`Filter by ${option}`}
            >
              <span style={styles.filterGlow} />
              {option}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Projects Grid */}
      <motion.div style={{ ...styles.grid, ...responsiveStyles.grid }} variants={containerVariants}>
        <AnimatePresence>
          <Suspense fallback={
            <div className="text-center text-white p-8">
              <span style={styles.spinner} /> Loading projects...
            </div>
          }>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                handleCardClick={handleCardClick}
                styles={styles}
                responsiveStyles={responsiveStyles}
              />
            ))}
          </Suspense>
        </AnimatePresence>
      </motion.div>
      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              style={styles.expandedOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              role="button"
              tabIndex={0}
              aria-label="Close project details"
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
              aria-label={`${selectedProject.title} details`}
            >
              <motion.div style={styles.cardOverlay} />
              <motion.button
                style={styles.closeButton}
                onClick={handleClose}
                aria-label="Close project details"
                whileHover={{ scale: 1.2, rotate: 90, color: '#ec4899' }}
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
                variants={cardChildVariants}
              >
                {selectedProject.title}
              </motion.h3>
              <motion.p
                style={{
                  ...styles.cardDescription,
                  fontSize: 'clamp(1.1rem,2.5vw,1.4rem)',
                }}
                variants={cardChildVariants}
              >
                {selectedProject.description}
              </motion.p>
              <motion.p
                style={styles.techLabel}
                variants={cardChildVariants}
              >
                🔧 Tech Used:
              </motion.p>
              <motion.div
                style={styles.techContainer}
                variants={cardChildVariants}
              >
                <TechIcon tech={selectedProject.tech} index={0} />
              </motion.div>
              <motion.div
                style={{ display: 'flex', gap: 'clamp(1rem,2vw,1.5rem)', marginTop: 'clamp(1.5rem,3vw,2rem)' }}
                variants={cardChildVariants}
              >
                <motion.a
                  href={selectedProject.link}
                  style={styles.visitBtn}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(236,72,153,0.9)',
                    transition: { duration: 0.3 }
                  }}
                >
                  View Project
                </motion.a>
                <motion.button
                  style={{ ...styles.copyButton, ...(isCopying ? styles.loadingButton : {}) }}
                  onClick={() => handleCopyLink(selectedProject.link)}
                  disabled={isCopying}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(236,72,153,0.9)',
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLink style={{ marginRight: 'clamp(0.5rem,1vw,0.8rem)' }} />
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

export default React.memo(Projects);