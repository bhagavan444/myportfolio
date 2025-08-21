import React, { useState, useEffect, useCallback, useMemo, useRef, Suspense, Component } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaBrain, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
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

// Tech Icon Component with Carousel Effect
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
    animation: 'pulseBorder 2s ease-in-out infinite',
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
  cardDescription: {
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
  visitBtn: {
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
      cardTitle: { fontSize: 'clamp(1.8rem,4vw,2.6rem)' },
      cardDescription: { fontSize: 'clamp(1.1rem,2.5vw,1.4rem)' },
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
      cardDescription: { fontSize: 'clamp(1rem,2.2vw,1.3rem)' },
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
      cardDescription: { fontSize: 'clamp(0.9rem,2vw,1.2rem)' },
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
  @keyframes spin {
    0% { transform: rotate(0deg); border-top-color: #ff33ff; }
    100% { transform: rotate(360deg); border-top-color: #3b82f6; }
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

// Lazy-loaded Project Card
const ProjectCard = React.lazy(() => Promise.resolve({
  default: ({ project, index, handleCardClick, styles, responsiveStyles }) => (
    <ProjectCardErrorBoundary>
      <motion.article
        style={{
          ...styles.card,
          ...responsiveStyles.card,
        }}
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
        <motion.div style={{ ...styles.cardOverlay, animation: 'pulseBorder 2s ease-in-out infinite' }} />
        <motion.h3
          style={{
            ...styles.cardTitle,
            ...responsiveStyles.cardTitle,
          }}
          variants={cardChildVariants}
          transition={{ delay: index * 0.2 + 0.2 }}
        >
          <FaCode style={{ fontSize: 'clamp(1.6rem,3vw,2rem)' }} />
          #{index + 1} • {project.title}
        </motion.h3>
        <motion.p
          style={{
            ...styles.cardDescription,
            ...responsiveStyles.cardDescription,
          }}
          variants={cardChildVariants}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <span style={{ fontWeight: 'bold' }}>Description:</span> {project.description}
        </motion.p>
        <motion.p
          style={styles.techLabel}
          variants={cardChildVariants}
          transition={{ delay: index * 0.2 + 0.4 }}
        >
          🔧 Tech Used:
        </motion.p>
        <motion.div
          style={styles.techContainer}
          variants={cardChildVariants}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          <TechIcon tech={project.tech} index={index} />
        </motion.div>
        <motion.a
          href={project.link}
          style={styles.visitBtn}
          target="_blank"
          rel="noreferrer"
          variants={cardChildVariants}
          transition={{ delay: index * 0.2 + 0.6 }}
          onClick={(e) => e.stopPropagation()}
        >
          <FaExternalLinkAlt style={{ marginRight: 'clamp(0.5rem,1.2vw,0.8rem)' }} />
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
      aria-label="Projects section"
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
          🚀 My Project Showcase
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
          {typeOptions.map((type, index) => (
            <motion.button
              key={type}
              style={{
                ...styles.filterBtn,
                ...(filter === type ? styles.activeFilter : {}),
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
            <div style={{ textAlign: 'center', color: '#f0faff', padding: '2rem' }}>
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
              aria-label={`${selectedProject.title} details`}
            >
              <motion.div style={{ ...styles.cardOverlay, animation: 'rotateGlow 10s linear infinite' }} />
              <button
                style={styles.closeButton}
                onClick={handleClose}
                aria-label="Close project details"
              >
                ✕
              </button>
              <motion.h3
                style={{
                  ...styles.cardTitle,
                  fontSize: 'clamp(2rem,5vw,3rem)',
                  marginBottom: 'clamp(1.5rem,3.5vw,2rem)',
                }}
                variants={cardChildVariants}
              >
                <FaCode style={{ fontSize: 'clamp(1.8rem,3.5vw,2.2rem)' }} />
                #{projectData.indexOf(selectedProject) + 1} • {selectedProject.title}
              </motion.h3>
              <motion.p
                style={{
                  ...styles.cardDescription,
                  fontSize: 'clamp(1.2rem,2.8vw,1.6rem)',
                  lineHeight: '2',
                }}
                variants={cardChildVariants}
              >
                <span style={{ fontWeight: 'bold' }}>Description:</span> {selectedProject.description}
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
                style={{ display: 'flex', gap: 'clamp(1rem,2vw,1.5rem)', marginTop: 'clamp(1.5rem,3.5vw,2rem)' }}
                variants={cardChildVariants}
              >
                <motion.a
                  href={selectedProject.link}
                  style={styles.visitBtn}
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
                  View Project
                </motion.a>
                <motion.button
                  style={{
                    ...styles.copyButton,
                    ...(isCopying ? styles.loadingButton : {}),
                  }}
                  onClick={() => handleCopyLink(selectedProject.link)}
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

export default React.memo(Projects);