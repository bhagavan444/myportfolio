import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { FaGraduationCap, FaSchool, FaUniversity, FaStar, FaExternalLinkAlt, FaCertificate, FaBrain } from 'react-icons/fa';
import {
  SiPython,
  SiR,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiDocker,
  SiKubernetes,
} from 'react-icons/si';

// Enhanced Tech/Skills icon mapping with tooltips and more icons
const getTechIcons = (tech) => {
  const iconMap = {
    Python: { icon: <SiPython />, label: 'Python', tooltip: 'Versatile programming language for AI and data science' },
    R: { icon: <SiR />, label: 'R', tooltip: 'Statistical computing and graphics' },
    HTML: { icon: <SiHtml5 />, label: 'HTML', tooltip: 'Markup language for web structure' },
    CSS: { icon: <SiCss3 />, label: 'CSS', tooltip: 'Styling language for web design' },
    CSS3: { icon: <SiCss3 />, label: 'CSS3', tooltip: 'Advanced CSS features' },
    JavaScript: { icon: <SiJavascript />, label: 'JavaScript', tooltip: 'Dynamic scripting for web interactivity' },
    React: { icon: <SiReact />, label: 'React', tooltip: 'UI library for building interactive apps' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow', tooltip: 'ML framework for deep learning' },
    Pandas: { icon: <SiPandas />, label: 'Pandas', tooltip: 'Data manipulation and analysis library' },
    Numpy: { icon: <SiNumpy />, label: 'Numpy', tooltip: 'Numerical computing library' },
    'Scikit-learn': { icon: <SiScikitlearn />, label: 'Scikit-learn', tooltip: 'Machine learning library in Python' },
    'Data Structures': { icon: <FaBrain />, label: 'Data Structures', tooltip: 'Fundamental data organization techniques' },
    Algorithms: { icon: <FaBrain />, label: 'Algorithms', tooltip: 'Problem-solving methods and efficiency' },
    DBMS: { icon: null, label: 'DBMS', tooltip: 'Database Management Systems' },
    'Operating Systems': { icon: null, label: 'Operating Systems', tooltip: 'System software management' },
    'Computer Networks': { icon: null, label: 'Computer Networks', tooltip: 'Networking principles and protocols' },
    Mathematics: { icon: null, label: 'Mathematics', tooltip: 'Core mathematical concepts' },
    Physics: { icon: null, label: 'Physics', tooltip: 'Physical sciences fundamentals' },
    Chemistry: { icon: null, label: 'Chemistry', tooltip: 'Chemical sciences basics' },
    Docker: { icon: <SiDocker />, label: 'Docker', tooltip: 'Containerization platform' },
    Kubernetes: { icon: <SiKubernetes />, label: 'Kubernetes', tooltip: 'Container orchestration' },
    AWS: { icon: null, label: 'AWS', tooltip: 'Cloud computing services' },
  };

  return tech.split(', ').map((t, i) => (
    <motion.span
      key={i}
      className="inline-flex items-center gap-2 px-3 py-1.5 m-1.5 bg-blue-900/20 border border-blue-500/30 rounded-lg cursor-pointer relative"
      whileHover={{
        scale: 1.2,
        rotate: [0, 5, -5, 0],
        background: 'rgba(59, 130, 246, 0.3)',
        boxShadow: '0 0 25px rgba(59, 130, 246, 0.8)',
        transition: { duration: 0.4 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 15 }}
    >
      {iconMap[t]?.icon && (
        <motion.span
          className="text-blue-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 + 0.1 }}
        >
          {iconMap[t].icon}
        </motion.span>
      )}
      <span className="text-blue-100 text-sm font-medium">{iconMap[t]?.label || t}</span>
      <motion.span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded-md whitespace-nowrap z-10"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {iconMap[t]?.tooltip || t}
      </motion.span>
    </motion.span>
  ));
};

// Updated Education Data with additional entries and skills
const educationData = [
  {
    sno: 1,
    qualification: 'B Tech - Artificial Intelligence And Data Science (Presently pursuing Final Year)',
    board: 'Jawaharlal Nehru Technological University (Kakinada)',
    college: 'Ramachandra College of Engineering',
    cgpa: '7.5 (Present)',
    maxCgpa: 10,
    skills: 'Python, TensorFlow, Pandas, Numpy, Scikit-learn, Data Structures, Algorithms, DBMS, Docker, Kubernetes, AWS',
    certificateLink: null,
    icon: FaUniversity,
    achievements: ['Top 5% in Data Science projects'],
  },
  {
    sno: 2,
    qualification: 'Intermediate - MPC',
    board: 'Board of Intermediate Education',
    college: 'Sri Vidya Junior College',
    cgpa: '8.0 CGPA',
    maxCgpa: 10,
    skills: 'Mathematics, Physics, Chemistry',
    certificateLink: 'https://drive.google.com/file/d/113yi6vME2ZiAfc8kLLvP6Vvfy8VUUMa3/view?usp=sharing',
    icon: FaGraduationCap,
    achievements: ['Top 10% in state exams'],
  },
  {
    sno: 3,
    qualification: 'SSC',
    board: 'Secondary School Certificate',
    school: 'Montessori English Medium High School',
    cgpa: '9.8 GPA',
    maxCgpa: 10,
    skills: 'Mathematics, Science, English',
    certificateLink: 'https://drive.google.com/file/d/1u0T6y17c92h46HUbkMAcDXJhuTxcGkBn/view?usp=sharing',
    icon: FaSchool,
    achievements: ['School topper'],
  },
];

// Enhanced Styles with modern, sleek design
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 4vw, 3rem)',
    background: 'linear-gradient(135deg, #111827, #1f2937, #374151, #10b981)',
    backgroundSize: '1000% 1000%',
    color: '#ecfdf5',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '3000px',
    fontFamily: "'Inter', 'Roboto', sans-serif",
    willChange: 'background, transform',
    animation: 'gradientFlow 20s ease-in-out infinite',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 15% 25%, rgba(16, 185, 129, 0.3), transparent 50%),
      radial-gradient(circle at 85% 75%, rgba(239, 68, 68, 0.3), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
    opacity: 0.85,
    animation: 'ambientPulse 10s ease-in-out infinite',
  },
  glowEffect: {
    position: 'absolute',
    width: 'clamp(600px, 80vw, 1000px)',
    height: 'clamp(600px, 80vw, 1000px)',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4), rgba(239, 68, 68, 0.3), transparent 60%)',
    top: '-25%',
    left: '-25%',
    filter: 'blur(180px)',
    zIndex: -2,
    animation: 'glowOrbit 22s linear infinite',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(3rem, 6vw, 5rem)',
    background: 'rgba(17, 24, 39, 0.95)',
    border: '1px solid rgba(16, 185, 129, 0.4)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9), 0 0 60px rgba(16, 185, 129, 0.5)',
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
    animation: 'rotateGlow 12s linear infinite',
  },
  title: {
    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
    fontWeight: 800,
    color: 'transparent',
    background: 'linear-gradient(90deg, #10b981, #ef4444, #facc15)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(239, 68, 68, 0.6)',
    marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)', // Reduced margin
    letterSpacing: '0.15em',
    animation: 'textGlow 2s ease-in-out infinite alternate',
  },
  titleUnderline: {
    width: 'clamp(200px, 40vw, 300px)',
    height: '8px',
    background: 'linear-gradient(90deg, #10b981, #ef4444)',
    borderRadius: '8px',
    margin: '0.5rem auto 0', // Adjusted margin to remove gap
    boxShadow: '0 0 30px rgba(16, 185, 129, 0.8)',
  },
  introText: {
    fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
    color: '#ecfdf5',
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
  progressContainer: {
    marginTop: 'clamp(0.3rem, 1.5vw, 1rem)',
    background: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 'clamp(4px, 0.8vw, 8px)',
    height: 'clamp(6px, 1vw, 12px)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #10b981, #ef4444)',
    transition: 'width 1s ease-in-out',
  },
  cgpaText: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'clamp(0.2rem, 1vw, 0.5rem)',
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    color: '#ecfdf5',
    textShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
  },
  achievementsLabel: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#10b981',
    fontWeight: '600',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
  },
  achievementList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: 'clamp(0.5rem, 1vw, 1rem)',
  },
  achievementItem: {
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    color: '#d1fae5',
    marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.6vw, 0.5rem)',
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

// New Animation Styles
const animationStyles = `
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes ambientPulse {
    0%, 100% { opacity: 0.9; }
    50% { opacity: 1; }
  }
  @keyframes glowOrbit {
    0% { transform: rotate(0deg); filter: brightness(1); }
    50% { transform: rotate(180deg); filter: brightness(1.4); }
    100% { transform: rotate(360deg); filter: brightness(1); }
  }
  @keyframes textGlow {
    0%, 100% { opacity: 1; text-shadow: 0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(239, 68, 68, 0.6); }
    50% { opacity: 0.9; text-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 45px rgba(239, 68, 68, 0.5); }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: rgba(16, 185, 129, 0.3); box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); }
    50% { border-color: rgba(16, 185, 129, 0.7); boxShadow: 0 0 30px rgba(16, 185, 129, 0.8); }
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
  hidden: { opacity: 0, y: -100, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.5, type: 'spring', stiffness: 150, damping: 18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 120, scale: 0.8, rotateY: -25 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1, type: 'spring', stiffness: 140, damping: 16 },
  },
  hover: {
    scale: 1.05,
    rotateY: 10,
    rotateX: -10,
    boxShadow: '0 50px 100px rgba(0, 0, 0, 0.9), 0 0 80px rgba(16, 185, 129, 0.7)',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const contentChildVariants = {
  hidden: { opacity: 0, x: -40, rotate: -10 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6 } },
};

const EducationEnhanced = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);

  const responsiveStyles = windowWidth <= 480 ? styles.responsive.small :
                         windowWidth <= 768 ? styles.responsive.medium :
                         styles.responsive.large;

  return (
    <motion.section
      ref={ref}
      style={{ ...styles.container, ...responsiveStyles.container, opacity, scale, rotate }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      role="region"
      aria-label="Education section"
    >
      <style>{animationStyles}</style>
      {/* Background Particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.5rem, calc(0.1vw + ${0.5 + i * 0.15}rem), ${1 + i * 0.2}rem)`,
            height: `clamp(0.5rem, calc(0.1vw + ${0.5 + i * 0.15}rem), ${1 + i * 0.2}rem)`,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5), rgba(192, 38, 211, 0.3))',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Holographic Glow */}
      <motion.div
        style={{ ...styles.glowEffect, ...responsiveStyles.holographicGlow }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [-50, 50, -50],
          y: [-50, 50, -50],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Header Section */}
      <motion.div
        style={{ ...styles.header, ...responsiveStyles.header }}
        variants={headerVariants}
      >
        <h2 style={{ ...styles.title, ...responsiveStyles.title, animation: 'holographicPulse 2.5s ease-in-out infinite alternate' }}>
          🎓 My Educational Journey
        </h2>
        <div style={styles.titleUnderline} />
        <p style={{ ...styles.introText, ...responsiveStyles.introText }}>
          An interactive timeline of my academic achievements, highlighting skills, knowledge, and key accomplishments in AI, Data Science, and beyond.
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
          transition={{ duration: 2, delay: 0.5 }}
        />
        <AnimatePresence>
          {educationData.map((edu, index) => {
            const cgpaValue = edu.maxCgpa ? parseFloat(edu.cgpa.split(' ')[0]) : null;
            const progress = cgpaValue ? (cgpaValue / edu.maxCgpa) * 100 : 100;
            const IconComp = edu.icon;
            return (
              <motion.div
                key={edu.sno}
                style={styles.item}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                <motion.div
                  style={{
                    ...styles.content,
                    ...responsiveStyles.content,
                    ...(index % 2 === 0 ? styles.contentLeft : styles.contentRight),
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    boxShadow: '0 30px 70px rgba(76, 29, 149, 0.6), 0 0 90px rgba(192, 38, 211, 0.5)',
                    translateY: -12,
                  }}
                  whileTap={{ scale: 0.92 }}
                >
                  <motion.div style={styles.contentOverlay} />
                  <motion.h3
                    style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.12 + 0.2 }}
                  >
                    <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                    #{edu.sno} • {edu.qualification}
                  </motion.h3>
                  <motion.p
                    style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.12 + 0.3 }}
                  >
                    <span style={styles.label}>Board:</span> {edu.board}
                  </motion.p>
                  {edu.college && (
                    <motion.p
                      style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                      variants={contentChildVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.12 + 0.4 }}
                    >
                      <span style={styles.label}>College:</span> {edu.college}
                    </motion.p>
                  )}
                  {edu.school && (
                    <motion.p
                      style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                      variants={contentChildVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.12 + 0.4 }}
                    >
                      <span style={styles.label}>School:</span> {edu.school}
                    </motion.p>
                  )}
                  <motion.div
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.12 + 0.5 }}
                  >
                    <span style={{ ...styles.label, ...styles.cardDescription }}>CGPA:</span> {edu.cgpa}
                    {edu.maxCgpa && (
                      <>
                        <div style={styles.progressContainer}>
                          <motion.div
                            style={{ ...styles.progressBar, width: `${progress}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.2, ease: 'easeInOut', delay: index * 0.12 + 0.6 }}
                          />
                        </div>
                        <p style={styles.cgpaText}>
                          <FaStar style={{ marginRight: '0.5rem', color: '#c026d3' }} />
                          {cgpaValue} / {edu.maxCgpa}
                        </p>
                      </>
                    )}
                  </motion.div>
                  <motion.p
                    style={styles.techLabel}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.12 + 0.7 }}
                  >
                    🔧 Skills Learned:
                  </motion.p>
                  <motion.div
                    style={styles.techContainer}
                    variants={contentChildVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.12 + 0.8 }}
                  >
                    {getTechIcons(edu.skills)}
                  </motion.div>
                  {edu.achievements && (
                    <>
                      <motion.p
                        style={styles.achievementsLabel}
                        variants={contentChildVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.12 + 0.9 }}
                      >
                        🏆 Achievements:
                      </motion.p>
                      <motion.ul
                        style={styles.achievementList}
                        variants={contentChildVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.12 + 1.0 }}
                      >
                        {edu.achievements.map((ach, achIndex) => (
                          <motion.li
                            key={achIndex}
                            style={styles.achievementItem}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.12 + 1.1 + achIndex * 0.1 }}
                          >
                            <FaStar style={{ color: '#3b82f6' }} />
                            {ach}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </>
                  )}
                  {edu.certificateLink && (
                    <motion.a
                      href={edu.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.certificateLink}
                      variants={contentChildVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.12 + 1.2 }}
                      whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(59, 130, 246, 0.7)' }}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)' }} />
                      View Certificate
                    </motion.a>
                  )}
                </motion.div>
                <motion.div
                  style={{
                    ...styles.iconWrapper,
                    animation: 'rotateIcon 12s linear infinite',
                  }}
                  variants={contentChildVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.12 + 1.3 }}
                >
                  <IconComp size="clamp(18px, 2.2vw, 28px)" color="#0d0026" />
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default EducationEnhanced;