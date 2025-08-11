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

// Enhanced Tech icon mapping function with more icons
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
          gap: 'clamp(6px, 1vw, 8px)',
          margin: 'clamp(4px, 0.8vw, 6px)',
          padding: 'clamp(4px, 0.8vw, 6px) clamp(8px, 1.5vw, 10px)',
          background: 'rgba(76, 29, 149, 0.15)',
          borderRadius: 'clamp(8px, 1.2vw, 10px)',
          border: '1px solid rgba(76, 29, 149, 0.3)',
          cursor: 'pointer',
        }}
        whileHover={{
          scale: 1.15,
          rotate: [0, 5, -5, 0],
          boxShadow: `0 0 15px ${mapped.color}80`,
          background: `rgba(76, 29, 149, 0.3)`,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {mapped.icon && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{ color: mapped.color, textShadow: `0 0 10px ${mapped.color}50` }}
          >
            {mapped.icon}
          </motion.span>
        )}
        <span style={{ color: '#e0e7ff', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
          {mapped.label}
        </span>
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

// Inline Styles with enhancements
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3rem)',
    background: 'linear-gradient(155deg, #1a0033, #2a0055, #3b0088, #4c00bb)',
    backgroundSize: '500% 500%',
    color: '#f5f7fa',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '1600px',
    fontFamily: "'Inter', 'Montserrat', sans-serif",
    willChange: 'background, transform',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 10% 15%, rgba(76, 29, 149, 0.3), transparent 50%),
      radial-gradient(circle at 90% 85%, rgba(192, 38, 211, 0.3), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(400px, 60vw, 700px)',
    height: 'clamp(400px, 60vw, 700px)',
    background: 'radial-gradient(circle, rgba(76, 29, 149, 0.35), transparent 60%)',
    top: '-15%',
    left: '-15%',
    filter: 'blur(120px)',
    zIndex: -1,
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(2.5rem, 4.5vw, 4rem)',
    background: 'rgba(10, 0, 30, 0.85)',
    border: '1px solid rgba(76, 29, 149, 0.4)',
    borderRadius: 'clamp(16px, 2.2vw, 20px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(76, 29, 149, 0.3)',
    backdropFilter: 'blur(16px)',
    maxWidth: 'clamp(700px, 90vw, 1100px)',
    margin: '0 auto clamp(3rem, 6vw, 5rem)',
  },
  title: {
    fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3, #3b82f6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 35px rgba(76, 29, 149, 0.7), 0 0 60px rgba(192, 38, 211, 0.5)',
    marginBottom: 'clamp(0.6rem, 1.8vw, 1.2rem)',
    letterSpacing: '0.12em',
  },
  titleUnderline: {
    width: 'clamp(160px, 30vw, 240px)',
    height: '5px',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3)',
    borderRadius: '5px',
    margin: '0.6rem auto',
    boxShadow: '0 0 20px rgba(76, 29, 149, 0.7)',
  },
  introText: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    maxWidth: 'clamp(500px, 80vw, 800px)',
    margin: '0 auto clamp(1rem, 2vw, 1.5rem)',
    lineHeight: '1.7',
    textShadow: '0 0 10px rgba(76, 29, 149, 0.4)',
  },
  timeline: {
    position: 'relative',
    maxWidth: 'clamp(800px, 95vw, 1600px)',
    margin: '0 auto',
    padding: '0 clamp(0.5rem, 2vw, 1.5rem)',
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 'clamp(3px, 0.5vw, 7px)',
    background: 'linear-gradient(to bottom, #4c1d95, #c026d3)',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 20px rgba(76, 29, 149, 0.7)',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 'clamp(1.8rem, 3.5vw, 3rem)',
  },
  content: {
    background: 'rgba(10, 0, 30, 0.9)',
    border: '1px solid rgba(76, 29, 149, 0.3)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 4vw, 3rem)',
    textAlign: 'left',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(76, 29, 149, 0.25)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  contentLeft: { marginRight: 'auto' },
  contentRight: { marginLeft: 'auto' },
  contentOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(76, 29, 149, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    zIndex: -1,
    opacity: 0.45,
  },
  cardTitle: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
    color: '#4c1d95',
    textShadow: '0 0 18px rgba(76, 29, 149, 0.6)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  cardDescription: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
    lineHeight: '1.7',
    textShadow: '0 0 10px rgba(76, 29, 149, 0.4)',
  },
  techLabel: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#c026d3',
    fontWeight: 'bold',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(76, 29, 149, 0.4)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(10px, 2vw, 12px)',
    marginTop: 'clamp(0.8rem, 2vw, 1rem)',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
  },
  label: {
    color: '#c026d3',
    fontWeight: '700',
    marginRight: 'clamp(0.3rem, 0.8vw, 0.6rem)',
  },
  certificateLink: {
    display: 'inline-flex',
    padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3)',
    color: '#f5f7fa',
    borderRadius: 'clamp(10px, 1.5vw, 14px)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    boxShadow: '0 0 10px rgba(76, 29, 149, 0.5)',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.7vw, 0.5rem)',
    transition: 'all 0.3s ease',
  },
  iconWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #4c1d95, #c026d3)',
    borderRadius: '50%',
    padding: 'clamp(0.5rem, 1.2vw, 1rem)',
    boxShadow: '0 0 25px rgba(76, 29, 149, 0.9)',
    zIndex: 3,
  },
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.8vw, 1.2rem)' },
      content: { padding: 'clamp(2rem, 3.5vw, 2.8rem)', width: 'clamp(320px, 45%, 600px)' },
      cardTitle: { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)' },
      cardDescription: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 700px)', height: 'clamp(400px, 55vw, 700px)', top: '-15%', left: '-15%' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.5vw, 1rem)' },
      content: { padding: 'clamp(1.8rem, 3vw, 2.5rem)', width: 'clamp(280px, 45%, 500px)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.2vw, 0.8rem)' },
      content: { padding: 'clamp(1.5rem, 2.5vw, 2rem)', width: 'clamp(260px, 80%, 400px)' },
      cardTitle: { fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)' },
      cardDescription: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)' },
      holographicGlow: { width: 'clamp(250px, 40vw, 400px)', height: 'clamp(250px, 40vw, 400px)', top: '-10%', left: '-10%' },
    },
  },
};

// Enhanced Inline Animation Styles
const animationStyles = `
  @keyframes holographicPulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(70px, 70px) scale(1.12); }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes rotateIcon {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes neonFlicker {
    0%, 19.9%, 22%, 62.9%, 64%, 64.9%, 70%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(76, 29, 149, 0.5); }
    20%, 21.9%, 63%, 63.9%, 65%, 69.9% { opacity: 0.6; text-shadow: 0 0 5px rgba(76, 29, 149, 0.3); }
  }
  @keyframes floatGlow {
    0% { transform: translateY(0px); box-shadow: 0 0 20px rgba(76, 29, 149, 0.7); }
    50% { transform: translateY(-10px); box-shadow: 0 0 30px rgba(76, 29, 149, 1); }
    100% { transform: translateY(0px); box-shadow: 0 0 20px rgba(76, 29, 149, 0.7); }
  }
`;

// Enhanced Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.85, rotateX: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 2, ease: 'easeOut', staggerChildren: 0.2, when: 'beforeChildren' },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -100, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.5, type: 'spring', stiffness: 150, damping: 20 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 120, scale: 0.8, rotateY: -25 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1, type: 'spring', stiffness: 140, damping: 18 },
  },
};

const contentChildVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Internships = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 100, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.85, 1]), { stiffness: 100, damping: 20 });

  // Apply responsive styles based on window width
  const responsiveStyles = windowWidth <= 480 ? styles.responsive.small :
                         windowWidth <= 768 ? styles.responsive.medium :
                         styles.responsive.large;

  return (
    <motion.section
      style={{ ...styles.container, ...responsiveStyles.container, opacity, scale }}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      role='region'
      aria-label='Internships section'
    >
      <style>{animationStyles}</style>
      {/* Enhanced Background Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.8rem, calc(0.1vw + ${1 + i * 0.15}rem), ${1.5 + i * 0.2}rem)`,
            height: `clamp(0.8rem, calc(0.1vw + ${1 + i * 0.15}rem), ${1.5 + i * 0.2}rem)`,
            background: 'radial-gradient(circle, rgba(76, 29, 149, 0.4), rgba(192, 38, 211, 0.2))',
            borderRadius: '50%',
            top: `${5 + i * 4}%`,
            left: `${5 + i * 3}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Holographic Glow */}
      <motion.div
        style={{ ...styles.holographicGlow, ...responsiveStyles.holographicGlow }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.5, 0.35],
          x: [-30, 30, -30],
          y: [-30, 30, -30],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Header Section */}
      <motion.div
        style={{ ...styles.header, ...responsiveStyles.header }}
        variants={headerVariants}
      >
        <h2 style={{ ...styles.title, ...responsiveStyles.title, animation: 'holographicPulse 2s ease-in-out infinite alternate, neonFlicker 3s infinite' }}>
          💼 My Internship Journey
        </h2>
        <motion.div 
          style={styles.titleUnderline}
          animate={{ scaleX: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
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
          transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
        />
        <AnimatePresence>
          {internshipData.map((intern, index) => {
            const IconComp = intern.icon;
            return (
              <motion.div
                key={intern.sno}
                style={styles.item}
                variants={itemVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-50px' }}
              >
                <motion.div
                  style={{
                    ...styles.content,
                    ...responsiveStyles.content,
                    ...(index % 2 === 0 ? styles.contentLeft : styles.contentRight),
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5, 
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 60px rgba(76, 29, 149, 0.5)' 
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ animation: 'floatGlow 4s ease-in-out infinite' }}
                >
                  <motion.div
                    style={{ ...styles.contentOverlay }}
                    animate={{ opacity: [0.45, 0.65, 0.45], rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.h3
                    style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.12 + 0.2 }}
                  >
                    <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                    #{intern.sno} • {intern.title}
                  </motion.h3>
                  <motion.p
                    style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.12 + 0.3 }}
                  >
                    <span style={styles.label}>Company:</span> {intern.company}
                  </motion.p>
                  <motion.p
                    style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.12 + 0.4 }}
                  >
                    <span style={styles.label}>Duration:</span> {intern.duration}
                  </motion.p>
                  <motion.p
                    style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.12 + 0.5 }}
                  >
                    <span style={styles.label}>Description:</span> {intern.description}
                  </motion.p>
                  <motion.p
                    style={styles.techLabel}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.12 + 0.6 }}
                  >
                    🔧 Tech Used:
                  </motion.p>
                  <motion.div
                    style={styles.techContainer}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.12 + 0.7 }}
                  >
                    {getTechIcons(intern.tech)}
                  </motion.div>
                  {intern.certificateLink && (
                    <motion.a
                      href={intern.certificateLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      style={styles.certificateLink}
                      variants={contentChildVariants}
                      initial='hidden'
                      animate='visible'
                      transition={{ delay: index * 0.12 + 0.8 }}
                      whileHover={{
                        scale: 1.15,
                        boxShadow: '0 15px 50px rgba(192, 38, 211, 0.6)',
                        translateY: -3,
                        background: 'linear-gradient(90deg, #7c3aed, #d946ef)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View certificate for ${intern.title}`}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)' }} />
                      View Certificate
                    </motion.a>
                  )}
                </motion.div>
                <motion.div
                  style={{
                    ...styles.iconWrapper,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  variants={contentChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.12 + 0.9 }}
                >
                  <IconComp size='clamp(18px, 2.2vw, 28px)' color='#0d0026' />
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