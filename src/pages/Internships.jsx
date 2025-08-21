import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaExternalLinkAlt, FaBriefcase } from 'react-icons/fa';
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

// Enhanced Tech icon mapping function
const getTechIcons = (tech) => {
  const iconMap = {
    MongoDB: { icon: <SiMongodb />, label: 'MongoDB', color: '#47A248' },
    Express: { icon: <SiExpress />, label: 'Express', color: '#000000' },
    'Express.js': { icon: <SiExpress />, label: 'Express.js', color: '#000000' },
    React: { icon: <SiReact />, label: 'React', color: '#61DAFB' },
    'React.js': { icon: <SiReact />, label: 'React.js', color: '#61DAFB' },
    Node: { icon: <SiNodedotjs />, label: 'Node.js', color: '#339933' },
    'Node.js': { icon: <SiNodedotjs />, label: 'Node.js', color: '#339933' },
    Flask: { icon: <SiFlask />, label: 'Flask', color: '#000000' },
    Python: { icon: <SiPython />, label: 'Python', color: '#3776AB' },
    Firebase: { icon: <SiFirebase />, label: 'Firebase', color: '#FFCA28' },
    'Firebase Auth': { icon: <SiFirebase />, label: 'Firebase Auth', color: '#FFCA28' },
    HTML: { icon: <SiHtml5 />, label: 'HTML', color: '#E44D26' },
    CSS: { icon: <SiCss3 />, label: 'CSS', color: '#1572B6' },
    CSS3: { icon: <SiCss3 />, label: 'CSS3', color: '#1572B6' },
    'HTML/CSS': {
      icon: (
        <>
          <SiHtml5 /> <SiCss3 />
        </>
      ),
      label: 'HTML/CSS',
      color: '#E44D26',
    },
    'Scikit-learn': { icon: <SiScikitlearn />, label: 'Scikit-learn', color: '#F7931E' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow', color: '#FF6F00' },
    Pandas: { icon: <SiPandas />, label: 'Pandas', color: '#150458' },
    Numpy: { icon: <SiNumpy />, label: 'Numpy', color: '#013243' },
    Numpys: { icon: <SiNumpy />, label: 'Numpy', color: '#013243' },
    OpenAI: { icon: <SiOpenai />, label: 'OpenAI', color: '#412991' },
    'OpenAI API': { icon: <SiOpenai />, label: 'OpenAI API', color: '#412991' },
    Socket: { icon: <SiSocketdotio />, label: 'Socket.io', color: '#010101' },
    'Socket.io': { icon: <SiSocketdotio />, label: 'Socket.io', color: '#010101' },
    Cloudinary: { icon: <SiCloudinary />, label: 'Cloudinary', color: '#3448C5' },
    TFIDF: { icon: null, label: 'TF-IDF', color: '#6B7280' },
    'TF-IDF': { icon: null, label: 'TF-IDF', color: '#6B7280' },
    NLTK: { icon: null, label: 'NLTK', color: '#6B7280' },
    Keras: { icon: <SiKeras />, label: 'Keras', color: '#D00000' },
    LangChain: { icon: null, label: 'LangChain', color: '#6B7280' },
  };

  return tech.split(', ').map((t, i) => {
    const mapped = iconMap[t] || { icon: null, label: t, color: '#6B7280' };
    return (
      <motion.span
        key={i}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'clamp(8px, 1.2vw, 10px)',
          margin: 'clamp(5px, 1vw, 7px)',
          padding: 'clamp(6px, 1vw, 8px) clamp(10px, 1.8vw, 12px)',
          background: 'rgba(16, 185, 129, 0.15)',
          borderRadius: 'clamp(10px, 1.5vw, 12px)',
          border: `1px solid ${mapped.color}40`,
          cursor: 'pointer',
          position: 'relative',
        }}
        whileHover={{
          scale: 1.2,
          rotate: [0, 8, -8, 0],
          boxShadow: `0 0 20px ${mapped.color}80`,
          background: `${mapped.color}20`,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      >
        {mapped.icon && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ color: mapped.color, textShadow: `0 0 12px ${mapped.color}60` }}
          >
            {mapped.icon}
          </motion.span>
        )}
        <span style={{ color: '#d1fae5', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 500 }}>
          {mapped.label}
        </span>
        <motion.span
          className="tooltip"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(17, 24, 39, 0.95)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap',
            zIndex: 10,
            color: '#d1fae5',
            boxShadow: `0 0 10px ${mapped.color}50`,
          }}
        >
          {mapped.label}
        </motion.span>
      </motion.span>
    );
  });
};

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
    certificateLink:
      'https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view?usp=sharing',
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
    certificateLink:
      'https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view?usp=sharing',
    icon: FaBriefcase,
  },
];

// Enhanced Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 4vw, 3.5rem)',
    background: 'linear-gradient(135deg, #0f172a, #1e293b, #475569, #10b981)',
    backgroundSize: '800% 800%',
    color: '#d1fae5',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '2000px',
    fontFamily: "'Inter', 'Roboto', sans-serif",
    willChange: 'background, transform',
    animation: 'gradientShift 20s ease-in-out infinite',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.4), transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.4), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), transparent 70%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
    opacity: 0.9,
    animation: 'ambientGlow 12s ease-in-out infinite',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(500px, 70vw, 900px)',
    height: 'clamp(500px, 70vw, 900px)',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.5), rgba(239, 68, 68, 0.3), transparent 60%)',
    top: '-20%',
    left: '-20%',
    filter: 'blur(150px)',
    zIndex: -2,
    animation: 'glowOrbit 18s linear infinite',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(3rem, 6vw, 5rem)',
    background: 'rgba(17, 24, 39, 0.95)',
    border: '1px solid rgba(16, 185, 129, 0.4)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 60px rgba(16, 185, 129, 0.5)',
    backdropFilter: 'blur(20px)',
    maxWidth: 'clamp(800px, 90vw, 1400px)',
    margin: '0 auto clamp(4rem, 8vw, 6rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    background: 'conic-gradient(from 45deg, rgba(16, 185, 129, 0.6), rgba(239, 68, 68, 0.6), transparent)',
    opacity: 0.7,
    zIndex: -1,
    animation: 'rotateGlow 10s linear infinite',
  },
  title: {
    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
    fontWeight: 800,
    color: 'transparent',
    background: 'linear-gradient(90deg, #10b981, #ef4444, #facc15)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(239, 68, 68, 0.6)',
    marginBottom: 'clamp(1rem, 2.5vw, 1.8rem)',
    letterSpacing: '0.15em',
    animation: 'textShine 2.5s ease-in-out infinite alternate',
  },
  titleUnderline: {
    width: 'clamp(200px, 40vw, 300px)',
    height: '8px',
    background: 'linear-gradient(90deg, #10b981, #ef4444)',
    borderRadius: '8px',
    margin: '1rem auto',
    boxShadow: '0 0 30px rgba(16, 185, 129, 0.8)',
  },
  introText: {
    fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
    color: '#d1fae5',
    maxWidth: 'clamp(600px, 80vw, 900px)',
    margin: '0 auto clamp(1.5rem, 3vw, 2rem)',
    lineHeight: '1.7',
    textShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
  },
  timeline: {
    position: 'relative',
    maxWidth: 'clamp(900px, 95vw, 1800px)',
    margin: '0 auto',
    padding: '0 clamp(0.8rem, 2vw, 1.8rem)',
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 'clamp(4px, 0.6vw, 8px)',
    background: 'linear-gradient(to bottom, #10b981, #ef4444)',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 25px rgba(16, 185, 129, 0.8)',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
  },
  content: {
    background: 'rgba(17, 24, 39, 0.95)',
    border: '1px solid rgba(16, 185, 129, 0.4)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    padding: 'clamp(2.5rem, 5vw, 3.5rem)',
    textAlign: 'left',
    backdropFilter: 'blur(25px)',
    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.9), inset 0 0 15px rgba(16, 185, 129, 0.3)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s ease',
  },
  contentLeft: { marginRight: 'auto' },
  contentRight: { marginLeft: 'auto' },
  contentOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(16, 185, 129, 0.6), rgba(239, 68, 68, 0.6), transparent)',
    zIndex: -1,
    opacity: 0.7,
    animation: 'borderGlow 2s ease-in-out infinite',
  },
  cardTitle: {
    fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
    color: '#10b981',
    textShadow: '0 0 20px rgba(16, 185, 129, 0.7)',
    marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.5rem, 1vw, 0.8rem)',
  },
  cardDescription: {
    fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
    color: '#d1fae5',
    marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    lineHeight: '1.7',
    textShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
  },
  techLabel: {
    fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
    color: '#ef4444',
    fontWeight: '600',
    marginTop: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    textShadow: '0 0 15px rgba(239, 68, 68, 0.6)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 2.2vw, 14px)',
    marginTop: 'clamp(1rem, 2vw, 1.5rem)',
    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
  },
  label: {
    color: '#ef4444',
    fontWeight: '600',
    marginRight: 'clamp(0.4rem, 1vw, 0.8rem)',
  },
  certificateLink: {
    display: 'inline-flex',
    padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(1.5rem, 2.5vw, 2rem)',
    background: 'linear-gradient(90deg, #10b981, #ef4444)',
    color: '#f0fdfa',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)',
    alignItems: 'center',
    gap: 'clamp(0.5rem, 1vw, 0.8rem)',
    transition: 'all 0.4s ease',
  },
  iconWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #10b981, #ef4444)',
    borderRadius: '50%',
    padding: 'clamp(0.8rem, 1.5vw, 1.2rem)',
    boxShadow: '0 0 30px rgba(16, 185, 129, 0.9)',
    zIndex: 3,
  },
  responsive: {
    large: {
      container: { padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 4vw, 3.5rem)' },
      header: { padding: 'clamp(3rem, 6vw, 5rem)' },
      title: { fontSize: 'clamp(2.5rem, 7vw, 5rem)' },
      introText: { fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' },
      timeline: { padding: '0 clamp(0.8rem, 2vw, 1.8rem)' },
      content: { padding: 'clamp(2.5rem, 5vw, 3.5rem)', width: 'clamp(350px, 45%, 650px)' },
      cardTitle: { fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' },
      cardDescription: { fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' },
      holographicGlow: { width: 'clamp(500px, 70vw, 900px)', height: 'clamp(500px, 70vw, 900px)' },
    },
    medium: {
      container: { padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4.5vw, 3.5rem)' },
      title: { fontSize: 'clamp(2rem, 6vw, 4rem)' },
      introText: { fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' },
      timeline: { padding: '0 clamp(0.6rem, 1.5vw, 1.2rem)' },
      content: { padding: 'clamp(2rem, 4vw, 3rem)', width: 'clamp(300px, 45%, 550px)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      cardDescription: { fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(400px, 60vw, 700px)', height: 'clamp(400px, 60vw, 700px)' },
    },
    small: {
      container: { padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 2.5vw, 1.8rem)' },
      header: { padding: 'clamp(1.5rem, 3.5vw, 2.5rem)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      introText: { fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.2vw, 1rem)' },
      content: { padding: 'clamp(1.5rem, 3vw, 2.5rem)', width: 'clamp(280px, 85%, 450px)' },
      cardTitle: { fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' },
      holographicGlow: { width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)' },
    },
  },
};

// Enhanced Animation Styles
const animationStyles = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes ambientGlow {
    0%, 100% { opacity: 0.9; }
    50% { opacity: 1; }
  }
  @keyframes glowOrbit {
    0% { transform: rotate(0deg); filter: brightness(1); }
    50% { transform: rotate(180deg); filter: brightness(1.4); }
    100% { transform: rotate(360deg); filter: brightness(1); }
  }
  @keyframes textShine {
    0%, 100% { opacity: 1; text-shadow: 0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(239, 68, 68, 0.6); }
    50% { opacity: 0.9; text-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 45px rgba(239, 68, 68, 0.5); }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: rgba(16, 185, 129, 0.4); box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); }
    50% { border-color: rgba(16, 185, 129, 0.7); box-shadow: 0 0 35px rgba(16, 185, 129, 0.9); }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes particleDrift {
    0% { transform: translateY(0) scale(1); opacity: 0.8; }
    50% { transform: translateY(-80px) scale(1.4); opacity: 0.5; }
    100% { transform: translateY(-160px) scale(1); opacity: 0; }
  }
  @keyframes floatGlow {
    0% { transform: translateY(0px); box-shadow: 0 0 25px rgba(16, 185, 129, 0.8); }
    50% { transform: translateY(-15px); box-shadow: 0 0 40px rgba(16, 185, 129, 1); }
    100% { transform: translateY(0px); box-shadow: 0 0 25px rgba(16, 185, 129, 0.8); }
  }
`;

// Enhanced Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 2.5,
      ease: 'easeOut',
      staggerChildren: 0.3,
      when: 'beforeChildren',
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -150, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1.8,
      type: 'spring',
      stiffness: 180,
      damping: 22,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 150, scale: 0.7, rotateY: -30 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1.2,
      type: 'spring',
      stiffness: 160,
      damping: 20,
    },
  },

};

const contentChildVariants = {
  hidden: { opacity: 0, x: -60, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const Internships = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 120, damping: 25 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.8, 1]), { stiffness: 120, damping: 25 });

  const responsiveStyles = windowWidth <= 480 ? styles.responsive.small :
                         windowWidth <= 768 ? styles.responsive.medium :
                         styles.responsive.large;

  return (
    <motion.section
      style={{ ...styles.container, ...responsiveStyles.container, opacity, scale }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Internships section"
    >
      <style>{animationStyles}</style>
      {/* Enhanced Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.6rem, calc(0.1vw + ${0.8 + i * 0.2}rem), ${1.2 + i * 0.25}rem)`,
            height: `clamp(0.6rem, calc(0.1vw + ${0.8 + i * 0.2}rem), ${1.2 + i * 0.25}rem)`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(16, 185, 129, 0.5))',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
            zIndex: -2,
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0.8, 0.5, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeOut', delay: Math.random() * 2 }}
        />
      ))}
      {/* Holographic Glow */}
      <motion.div
        style={{ ...styles.holographicGlow, ...responsiveStyles.holographicGlow }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [-40, 40, -40],
          y: [-40, 40, -40],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Header Section */}
      <motion.div
        style={{ ...styles.header, ...responsiveStyles.header }}
        variants={headerVariants}
      >
        <div style={styles.headerGlow} />
        <h2 style={{ ...styles.title, ...responsiveStyles.title }}>
          💼 My Internship Journey
        </h2>
        <motion.div
          style={styles.titleUnderline}
          animate={{ scaleX: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <p style={{ ...styles.introText, ...responsiveStyles.introText }}>
          A showcase of my professional experience, highlighting my contributions to real-world projects in AI, Machine Learning, and Data Science during internships.
        </p>
      </motion.div>
      {/* Timeline Section */}
      <motion.div
        style={{ ...styles.timeline, ...responsiveStyles.timeline }}
        variants={containerVariants}
      >
        <motion.div
          style={styles.timelineLine}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '100%', opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.7, ease: 'easeInOut' }}
        />
        <AnimatePresence>
          {internshipData.map((intern, index) => {
            const IconComp = intern.icon;
            return (
              <motion.div
                key={intern.sno}
                style={styles.item}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                whileHover="hover"
              >
                <motion.div
                  style={{
                    ...styles.content,
                    ...responsiveStyles.content,
                    ...(index % 2 === 0 ? styles.contentLeft : styles.contentRight),
                  }}
                  animate={{ animation: 'floatGlow 4.5s ease-in-out infinite' }}
                >
                  <motion.div style={styles.contentOverlay} />
                  <motion.h3
                    style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    <IconComp style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.8rem)' }} />
                    #{intern.sno} • {intern.title}
                  </motion.h3>
                  <motion.p
                    style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    <span style={styles.label}>Company:</span> {intern.company}
                  </motion.p>
                  <motion.p
                    style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.15 + 0.4 }}
                  >
                    <span style={styles.label}>Duration:</span> {intern.duration}
                  </motion.p>
                  <motion.p
                    style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.15 + 0.5 }}
                  >
                    <span style={styles.label}>Description:</span> {intern.description}
                  </motion.p>
                  <motion.p
                    style={styles.techLabel}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.15 + 0.6 }}
                  >
                    🔧 Tech Used:
                  </motion.p>
                  <motion.div
                    style={styles.techContainer}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.15 + 0.7 }}
                  >
                    {getTechIcons(intern.tech)}
                  </motion.div>
                  {intern.certificateLink && (
                    <motion.a
                      href={intern.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.certificateLink}
                      variants={contentChildVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.15 + 0.8 }}
                      whileHover={{
                        scale: 1.2,
                        boxShadow: '0 20px 60px rgba(239, 68, 68, 0.7)',
                        translateY: -5,
                        background: 'linear-gradient(90deg, #14b8a6, #f43f5e)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View certificate for ${intern.title}`}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)' }} />
                      View Certificate
                    </motion.a>
                  )}
                </motion.div>
                <motion.div
                  style={styles.iconWrapper}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  variants={contentChildVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.15 + 0.9 }}
                >
                  <IconComp size="clamp(20px, 2.5vw, 32px)" color="#0f172a" />
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default Internships;