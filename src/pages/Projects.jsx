import React, { useState, useEffect, useCallback, useMemo, useRef, Suspense, Component } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaCode, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
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
        <div style={{ textAlign: 'center', color: '#e0e7ff', padding: '2rem', background: 'rgba(10, 0, 30, 0.9)', borderRadius: '12px' }}>
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
    'Express.js': { icon: <SiExpress />, label: 'Express.js' },
    React: { icon: <SiReact />, label: 'React.js' },
    'React.js': { icon: <SiReact />, label: 'React.js' },
    Node: { icon: <SiNodedotjs />, label: 'Node.js' },
    'Node.js': { icon: <SiNodedotjs />, label: 'Node.js' },
    Flask: { icon: <SiFlask />, label: 'Flask' },
    Python: { icon: <SiPython />, label: 'Python' },
    Firebase: { icon: <SiFirebase />, label: 'Firebase' },
    'Firebase Auth': { icon: <SiFirebase />, label: 'Firebase Auth' },
    HTML: { icon: <SiHtml5 />, label: 'HTML' },
    CSS: { icon: <SiCss3 />, label: 'CSS3' },
    CSS3: { icon: <SiCss3 />, label: 'CSS3' },
    'HTML/CSS': { icon: [<SiHtml5 key="html" />, <SiCss3 key="css" />], label: 'HTML/CSS' },
    'Scikit-learn': { icon: <SiScikitlearn />, label: 'Scikit-learn' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow' },
    Pandas: { icon: <SiPandas />, label: 'Pandas' },
    Numpy: { icon: <SiNumpy />, label: 'Numpy' },
    Numpys: { icon: <SiNumpy />, label: 'Numpy' },
    'TF-IDF': { icon: <FaCode />, label: 'TF-IDF' },
    NLTK: { icon: <FaCode />, label: 'NLTK' },
    Keras: { icon: <FaCode />, label: 'Keras' },
    LangChain: { icon: <FaCode />, label: 'LangChain' },
    'Cloud Computing': { icon: <SiAmazon />, label: 'Cloud Computing' },
    Django: { icon: <SiDjango />, label: 'Django' },
    'Tailwind CSS': { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
  }), []);

  const techs = tech.split(', ');
  return (
    <motion.div
      style={{ display: 'flex', width: `${techs.length * 100}%`, animation: techs.length > 3 ? 'techCarousel 20s linear infinite' : 'none' }}
    >
      {techs.concat(techs).map((t, i) => (
        <motion.span
          key={`${t}-${i}`}
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
          transition={{ delay: index * 0.08 + i * 0.06, type: 'spring', stiffness: 180, damping: 14 }}
        >
          {iconMap[t]?.icon && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 + i * 0.06 }}
              style={{ color: '#ff33ff', textShadow: '0 0 15px rgba(192,38,211,0.7)' }}
            >
              {Array.isArray(iconMap[t].icon) ? iconMap[t].icon : iconMap[t].icon}
            </motion.span>
          )}
          <span style={{ color: '#f0faff', fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontWeight: 600 }}>
            {iconMap[t]?.label || t}
          </span>
        </motion.span>
      ))}
    </motion.div>
  );
});

// Project Data
const projectData = [
  {
    title: '🧠 Enhance Resume Builder',
    description: 'An intelligent MERN stack application that allows users to create professional resumes with modern templates, scoring using ATS.',
    tech: 'MongoDB, Express, React, Node, Firebase Auth, HTML/CSS',
    link: 'https://github.com/bhagavan444/resumebuilder',
    video: 'https://drive.google.com/file/d/1Ml9hSjYsHldIIDQQtHvr0gpIn1RTvBhk/view?usp=sharing',
    category: 'Full Stack',
  },
  {
    title: '🍏 Fruit & Vegetable Disease Classifier',
    description: 'Flask + MobileNetV2-based image classifier to detect fruit/vegetable health. Real-time prediction and animated UI.',
    tech: 'TensorFlow, Keras, Flask, React, CSS, Python',
    link: 'https://github.com/bhagavan444/smartbidgeproject',
    video: 'https://drive.google.com/file/d/1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/view?usp=sharing',
    category: 'Machine Learning',
  },
  {
    title: '🎯 Career Recommendation System',
    description: "ML-powered system recommending careers based on user's data. Includes predictions, roadmap, and resources.",
    tech: 'Python, Flask, React, Scikit-learn, Pandas, HTML/CSS',
    link: 'https://github.com/bhagavan444/career-path-project',
    video: 'https://drive.google.com/file/d/1cHQUdThz6tm7uvds_g2OfMcg3j9wHuRS/view?usp=sharing',
    category: 'Machine Learning',
  },
  {
    title: '💻 2nd Hand Electronics Platform',
    description: 'Full-stack app for buying/selling electronics. Built during a hackathon with real-time chat, image uploads, auth.',
    tech: 'MongoDB, Express, React, Node, Cloud Computing, Django',
    link: 'https://github.com/bhagavan444/hackathon-project',
    video: 'https://drive.google.com/file/d/1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/view?usp=sharing',
    category: 'Full Stack',
  },
  {
    title: '❌ Fake News Detector',
    description: 'An AI-driven app that detects fake news using TF-IDF, NLP, and classification models.',
    tech: 'Python, Flask, Scikit-learn, TF-IDF, NLTK, HTML/CSS',
    link: 'https://github.com/bhagavan444/fake-news-detector',
    video: 'https://drive.google.com/file/d/1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/view?usp=sharing',
    category: 'Machine Learning',
  },
  {
    title: '📖 Smart Career Chatbot',
    description: 'LangChain-based chatbot that recommends careers through interactive dialogue, powered by AI.',
    tech: 'LangChain, Flask, React, Python',
    link: 'https://github.com/bhagavan444/smart-career-chatbot',
    video: 'https://drive.google.com/file/d/1pOfpAUaFigPo9w-YB7s4MuIEE3-bdTr0/view?usp=sharing',
    category: 'Machine Learning',
  },
  {
    title: '📑 Diabetes Predictor',
    description: 'A Flask ML app predicting diabetes from user medical data. Simple and elegant UI.',
    tech: 'Python, Flask, Scikit-learn, Pandas, HTML/CSS',
    link: 'https://github.com/bhagavan444/diabetes-predictor-app',
    video: 'https://drive.google.com/',
    category: 'Machine Learning',
  },
  {
    title: '📊 ML Projects – Health Risk Predictions',
    description: 'Collection of mini-ML projects including diabetes, heart, and cancer risk predictors.',
    tech: 'Python, Flask, Scikit-learn, Pandas, TensorFlow, Numpy',
    link: 'https://github.com/bhagavan444',
    video: 'https://drive.google.com/',
    category: 'Machine Learning',
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
  copyButton: {
    display: 'inline-flex',
    padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    color: '#e0e7ff',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    fontWeight: '600',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
    cursor: 'pointer',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  demoButton: {
    display: 'inline-flex',
    padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)',
    background: 'linear-gradient(90deg, #c026d3, #3b82f6)',
    color: '#f0faff',
    borderRadius: 'clamp(10px, 1.8vw, 14px)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    boxShadow: '0 0 15px rgba(192, 38, 211, 0.5)',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  loadingButton: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  spinner: {
    display: 'inline-block',
    width: 'clamp(1rem, 2vw, 1.5rem)',
    height: 'clamp(1rem, 2vw, 1.5rem)',
    border: '3px solid rgba(59, 130, 246, 0.3)',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
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
  @keyframes spin {
    0% { transform: rotate(0deg); border-top-color: #3b82f6; }
    100% { transform: rotate(360deg); border-top-color: #c026d3; }
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

// Lazy-loaded Project Tile
const ProjectTile = React.lazy(() => Promise.resolve({
  default: ({ project, index, handleTileClick, styles, responsiveStyles }) => (
    <ProjectCardErrorBoundary>
      <motion.article
        style={{
          ...styles.tile,
          ...responsiveStyles.tile,
        }}
        variants={tileVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        onClick={() => handleTileClick(project)}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => e.key === 'Enter' && handleTileClick(project)}
      >
        <motion.div style={{ ...styles.tileOverlay, animation: 'rotateGlow 8s linear infinite' }} />
        <motion.h3
          style={{
            ...styles.tileTitle,
            ...responsiveStyles.tileTitle,
          }}
          variants={tileChildVariants}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          <FaCode style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
          #{index + 1} • {project.title}
        </motion.h3>
        <motion.p
          style={{
            ...styles.tileDescription,
            ...responsiveStyles.tileDescription,
          }}
          variants={tileChildVariants}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          {project.description}
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
          <TechIcon tech={project.tech} index={index} />
        </motion.div>
        <motion.div
          style={styles.linkContainer}
          variants={tileChildVariants}
          transition={{ delay: index * 0.15 + 0.6 }}
        >
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
            View Project
          </motion.a>
          <motion.a
            href={project.video}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.demoButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            aria-label={`View demo video for ${project.title}`}
          >
            <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
            Project Demo
          </motion.a>
        </motion.div>
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
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 150, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.85, 1]), { stiffness: 150, damping: 20 });
  const rotate = useSpring(useTransform(scrollYProgress, [0, 0.5], [-5, 0]), { stiffness: 150, damping: 20 });
  const modalRef = useRef(null);
  const videoRef = useRef(null);

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

  const typeOptions = useMemo(() =>
    ['All', ...Array.from(new Set(projectData.map((p) => p.category))).sort()],
    []
  );

  const filteredProjects = useMemo(() =>
    filter === 'All' ? projectData : projectData.filter((p) => p.category === filter),
    [filter]
  );

  const responsiveStyles = useMemo(() =>
    windowWidth <= 480 ? styles.responsive.small :
    windowWidth <= 768 ? styles.responsive.medium :
    styles.responsive.large,
    [windowWidth]
  );

  const handleTileClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleVideoClick = useCallback((video) => {
    window.open(video, '_blank');
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
      style={{
        ...styles.container,
        ...responsiveStyles.container,
        opacity,
        scale,
        rotate,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Projects section"
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
          ...responsiveStyles.holographicGlow,
          animation: 'glowShift 12s ease-in-out infinite',
        }}
      />
      {/* Header Section */}
      <motion.header
        style={{
          ...styles.header,
          ...responsiveStyles.header,
        }}
        variants={headerVariants}
      >
        <motion.div style={styles.headerGlow} />
        <h2
          style={{
            ...styles.title,
            ...responsiveStyles.title,
            animation: 'holographicPulse 2.5s ease-in-out infinite alternate',
          }}
        >
          🚀 My Project Showcase
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
            ...responsiveStyles.introText,
          }}
        >
          Explore my collection of innovative projects, showcasing expertise in Full Stack development and Machine Learning with cutting-edge technologies.
        </p>
      </motion.header>
      {/* Filter Bar */}
      <motion.div
        style={{
          ...styles.filterBar,
          ...responsiveStyles.filterBar,
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
                ...responsiveStyles.filterBtn,
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
      {/* Projects Grid */}
      <motion.div
        style={{
          ...styles.grid,
          ...responsiveStyles.grid,
        }}
        variants={containerVariants}
      >
        <AnimatePresence>
          <Suspense fallback={
            <div style={{ textAlign: 'center', color: '#e0e7ff', padding: '2rem' }}>
              <span style={styles.spinner} /> Loading projects...
            </div>
          }>
            {filteredProjects.map((project, index) => (
              <ProjectTile
                key={project.title}
                project={project}
                index={index}
                handleTileClick={handleTileClick}
                styles={styles}
                responsiveStyles={responsiveStyles}
              />
            ))}
          </Suspense>
        </AnimatePresence>
      </motion.div>
      {/* Expanded Tile Modal */}
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
              style={{
                ...styles.expandedTile,
                ...responsiveStyles.expandedTile,
              }}
              variants={expandedTileVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              tabIndex={-1}
              role="dialog"
              aria-label={`${selectedProject.title} details`}
            >
              <motion.div style={{ ...styles.tileOverlay, animation: 'rotateGlow 8s linear infinite' }} />
              <motion.button
                style={styles.closeButton}
                onClick={handleClose}
                aria-label="Close project details"
                whileHover={{ scale: 1.2, rotate: 90, color: '#3b82f6' }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              <motion.h3
                style={{
                  ...styles.tileTitle,
                  fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                  marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
                }}
                variants={tileChildVariants}
              >
                <FaCode style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                #{projectData.indexOf(selectedProject) + 1} • {selectedProject.title}
              </motion.h3>
              <motion.p
                style={{
                  ...styles.tileDescription,
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                  lineHeight: '1.7',
                }}
                variants={tileChildVariants}
              >
                {selectedProject.description}
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
                <TechIcon tech={selectedProject.tech} index={0} />
              </motion.div>
              <motion.div
                style={styles.linkContainer}
                variants={tileChildVariants}
              >
                <motion.a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                  View Project
                </motion.a>
                <motion.a
                  href={selectedProject.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.demoButton}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(192, 38, 211, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View demo video for ${selectedProject.title}`}
                >
                  <FaExternalLinkAlt style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
                  Project Demo
                </motion.a>
                <motion.button
                  style={{
                    ...styles.copyButton,
                    ...(isCopying ? styles.loadingButton : {}),
                  }}
                  onClick={() => handleCopyLink(selectedProject.link)}
                  disabled={isCopying}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLink style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }} />
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