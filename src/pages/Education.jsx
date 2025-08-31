import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FaGraduationCap, FaSchool, FaUniversity, FaStar, FaExternalLinkAlt, FaBrain } from 'react-icons/fa';
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

// Custom Debounce Function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Starfield Component (aligned with About.jsx)
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
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
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
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
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

// Context for Responsive Styles
const ResponsiveContext = React.createContext({});

const useResponsiveStyles = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const handleResize = useCallback(debounce(() => setWindowWidth(window.innerWidth), 100), []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return windowWidth <= 480 ? styles.responsive.small :
         windowWidth <= 768 ? styles.responsive.medium :
         styles.responsive.large;
};

// Enhanced Tech/Skills Icon Component (aligned with About.jsx)
const TechIcon = memo(({ tech, index }) => {
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
    Java: { icon: null, label: 'Java', tooltip: 'General-purpose programming language' },
    'Machine Learning': { icon: null, label: 'Machine Learning', tooltip: 'ML algorithms and techniques' },
    'Deep Learning': { icon: null, label: 'Deep Learning', tooltip: 'Neural network-based learning' },
    'Data Science': { icon: null, label: 'Data Science', tooltip: 'Data analysis and insights' },
  };

  const techData = iconMap[tech] || { icon: null, label: tech, tooltip: tech };

  return (
    <motion.span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'clamp(6px, 1vw, 8px)',
        margin: 'clamp(4px, 0.8vw, 6px)',
        padding: 'clamp(4px, 0.8vw, 6px) clamp(8px, 1.5vw, 10px)',
        background: 'rgba(124, 58, 237, 0.15)',
        borderRadius: 'clamp(8px, 1.2vw, 10px)',
        border: '1px solid rgba(124, 58, 237, 0.3)',
        position: 'relative',
      }}
      whileHover={{
        scale: 1.15,
        rotate: 5,
        boxShadow: '0 0 20px rgba(124, 58, 237, 0.7)',
        background: 'rgba(124, 58, 237, 0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400 }}
      role="img"
      aria-label={techData.label}
      tabIndex={0}
    >
      {techData.icon ? (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            style={{ color: '#7c3aed', textShadow: '0 0 10px rgba(124, 58, 237, 0.5)' }}
          >
            {techData.icon}
          </motion.span>
          <span style={{ color: '#e0e7ff', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
            {techData.label}
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
              background: 'rgba(12, 5, 32, 0.95)',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              zIndex: 10,
              color: '#e0e7ff',
              boxShadow: '0 0 10px rgba(124, 58, 237, 0.4)',
            }}
          >
            {techData.tooltip}
          </motion.span>
        </>
      ) : (
        <span style={{ color: '#d1d5db', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>{techData.label}</span>
      )}
    </motion.span>
  );
});

// Education Data
const educationData = [
  {
    sno: 1,
    qualification: 'B Tech - Artificial Intelligence And Data Science (Presently pursuing Final Year)',
    board: 'Jawaharlal Nehru Technological University (Kakinada)',
    college: 'Ramachandra College of Engineering',
    cgpa: '7.5 (Present)',
    maxCgpa: 10,
    skills: 'Python, TensorFlow, Pandas, Numpy, Scikit-learn, Data Structures, Algorithms, DBMS, Docker, Kubernetes, AWS, Java, HTML, CSS3, JavaScript, React, R, Machine Learning, Deep Learning, Data Science, Computer Networks, Operating Systems',
    certificateLink: null,
    icon: FaUniversity,
    achievements: ['Active member of the AI and Data Science'],
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

// Styles (aligned with About.jsx)
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3rem)',
    background: 'linear-gradient(135deg, #050214, #1a0033, #2a0055)',
    backgroundSize: '200% 200%',
    animation: 'bgShift 10s ease infinite',
    color: '#e0e7ff',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '1200px',
    fontFamily: "'Inter', 'Montserrat', sans-serif",
    willChange: 'background, transform',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.25), transparent 70%)',
    zIndex: -1,
    pointerEvents: 'none',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(2.5rem, 4.5vw, 4rem)',
    background: 'rgba(12, 5, 32, 0.6)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    borderRadius: 'clamp(16px, 2.2vw, 24px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(20px) saturate(180%)',
    maxWidth: 'clamp(700px, 90vw, 1100px)',
    margin: '0 auto clamp(3rem, 6vw, 5rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(91, 33, 182, 0.2))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
    animation: 'holographicPulse 2s infinite alternate',
  },
  title: {
    fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #a78bfa, #c4b5fd, #ffffff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 35px rgba(167, 139, 250, 0.6)',
    marginBottom: 'clamp(0.6rem, 1.8vw, 1.2rem)',
    letterSpacing: '0.12em',
  },
  titleUnderline: {
    width: 'clamp(160px, 30vw, 240px)',
    height: '5px',
    background: 'linear-gradient(90deg, #7c3aed, #00c6ff)',
    borderRadius: '5px',
    margin: '0.6rem auto',
    boxShadow: '0 0 20px rgba(124, 58, 237, 0.7)',
  },
  introText: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#d1d5db',
    maxWidth: 'clamp(500px, 80vw, 800px)',
    margin: '0 auto clamp(1rem, 2vw, 1.5rem)',
    lineHeight: '1.7',
    textShadow: '0 0 10px rgba(167, 139, 250, 0.3)',
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
    background: 'linear-gradient(to bottom, #7c3aed, #00c6ff)',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 20px rgba(124, 58, 237, 0.7)',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 'clamp(1.8rem, 3.5vw, 3rem)',
  },
  content: {
    background: 'rgba(12, 5, 32, 0.6)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 4vw, 3rem)',
    width: 'clamp(300px, 45%, 600px)',
    textAlign: 'left',
    backdropFilter: 'blur(20px) saturate(180%)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
  },
  contentLeft: { marginRight: 'auto' },
  contentRight: { marginLeft: 'auto' },
  contentOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(91, 33, 182, 0.2))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
    animation: 'holographicPulse 2s infinite alternate',
  },
  cardTitle: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
    color: '#7c3aed',
    textShadow: '0 0 18px rgba(124, 58, 237, 0.6)',
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
    textShadow: '0 0 10px rgba(167, 139, 250, 0.3)',
  },
  techLabel: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#00c6ff',
    fontWeight: 'bold',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(124, 58, 237, 0.4)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(10px, 2vw, 12px)',
    marginTop: 'clamp(0.8rem, 2vw, 1rem)',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
  },
  label: {
    color: '#00c6ff',
    fontWeight: '700',
    marginRight: 'clamp(0.3rem, 0.8vw, 0.6rem)',
  },
  certificateLink: {
    display: 'inline-flex',
    padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)',
    background: 'linear-gradient(90deg, #7c3aed, #00c6ff)',
    color: '#e0e7ff',
    borderRadius: 'clamp(10px, 1.5vw, 14px)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.7vw, 0.5rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  certificateLinkOverlay: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    transition: 'left 0.5s ease',
  },
  iconWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #7c3aed, #00c6ff)',
    borderRadius: '50%',
    padding: 'clamp(0.5rem, 1.2vw, 1rem)',
    boxShadow: '0 0 25px rgba(124, 58, 237, 0.9)',
    zIndex: 3,
  },
  progressContainer: {
    marginTop: 'clamp(0.3rem, 1.5vw, 1rem)',
    background: 'rgba(124, 58, 237, 0.2)',
    borderRadius: 'clamp(4px, 0.8vw, 8px)',
    height: 'clamp(6px, 1vw, 12px)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #7c3aed, #00c6ff)',
    transition: 'width 1s ease-in-out',
  },
  cgpaText: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'clamp(0.2rem, 1vw, 0.5rem)',
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    color: '#e0e7ff',
    textShadow: '0 0 10px rgba(167, 139, 250, 0.3)',
  },
  achievementsLabel: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#7c3aed',
    fontWeight: 'bold',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(124, 58, 237, 0.4)',
  },
  achievementList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: 'clamp(0.5rem, 1vw, 1rem)',
  },
  achievementItem: {
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    color: '#d1d5db',
    marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.6vw, 0.5rem)',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: 'clamp(700px, 90vw, 1100px)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      introText: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)', maxWidth: 'clamp(500px, 80vw, 800px)' },
      timeline: { padding: '0 clamp(0.5rem, 1.8vw, 1.2rem)' },
      content: { padding: 'clamp(2rem, 3.5vw, 2.8rem)', width: 'clamp(320px, 45%, 600px)' },
      cardTitle: { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)' },
      cardDescription: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)', maxWidth: 'clamp(600px, 85vw, 900px)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      introText: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', maxWidth: 'clamp(400px, 75vw, 600px)' },
      timeline: { padding: '0 clamp(0.5rem, 1.5vw, 1rem)' },
      content: { padding: 'clamp(1.8rem, 3vw, 2.5rem)', width: 'clamp(280px, 45%, 500px)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 'clamp(500px, 80vw, 700px)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      introText: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', maxWidth: 'clamp(300px, 70vw, 500px)' },
      timeline: { padding: '0 clamp(0.5rem, 1.2vw, 0.8rem)' },
      content: { padding: 'clamp(1.5rem, 2.5vw, 2rem)', width: 'clamp(260px, 80%, 400px)' },
      cardTitle: { fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)' },
      cardDescription: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)' },
    },
  },
};

// Animation Styles (aligned with About.jsx)
const animationStyles = `
  @keyframes bgShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 200% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes holographicPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.9; }
  }
  @keyframes rotateIcon {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

// Animation Variants (aligned with About.jsx)
const containerVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: 'easeOut', staggerChildren: 0.3 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -100, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.2, type: 'spring', stiffness: 150, damping: 18 },
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
};

const contentChildVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Timeline Item Component
const TimelineItem = memo(({ edu, index, responsiveStyles }) => {
  const cgpaValue = edu.maxCgpa ? parseFloat(edu.cgpa.split(' ')[0]) : null;
  const progress = cgpaValue ? (cgpaValue / edu.maxCgpa) * 100 : 100;
  const IconComp = edu.icon;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (edu.certificateLink) {
        window.open(edu.certificateLink, '_blank', 'noopener,noreferrer');
      }
    }
  }, [edu.certificateLink]);

  return (
    <motion.div
      ref={ref}
      style={styles.item}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      viewport={{ once: true, margin: '-50px' }}
      role="article"
      aria-labelledby={`education-title-${index}`}
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
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 50px rgba(124, 58, 237, 0.3)',
        }}
        whileTap={{ scale: 0.98 }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          style={styles.contentOverlay}
        />
        <motion.h3
          id={`education-title-${index}`}
          style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
          variants={contentChildVariants}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
          #{edu.sno} • {edu.qualification}
        </motion.h3>
        <motion.p
          style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
          variants={contentChildVariants}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          <span style={styles.label}>Board:</span> {edu.board}
        </motion.p>
        {edu.college && (
          <motion.p
            style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
            variants={contentChildVariants}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            <span style={styles.label}>College:</span> {edu.college}
          </motion.p>
        )}
        {edu.school && (
          <motion.p
            style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
            variants={contentChildVariants}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            <span style={styles.label}>School:</span> {edu.school}
          </motion.p>
        )}
        <motion.div
          variants={contentChildVariants}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          <span style={{ ...styles.label, ...styles.cardDescription }}>CGPA:</span> {edu.cgpa}
          {edu.maxCgpa && (
            <>
              <div style={styles.progressContainer}>
                <motion.div
                  style={{ ...styles.progressBar, width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, ease: 'easeInOut', delay: index * 0.15 + 0.6 }}
                />
              </div>
              <p style={styles.cgpaText}>
                <FaStar style={{ marginRight: '0.5rem', color: '#7c3aed' }} />
                {cgpaValue} / {edu.maxCgpa}
              </p>
            </>
          )}
        </motion.div>
        <motion.p
          style={styles.techLabel}
          variants={contentChildVariants}
          transition={{ delay: index * 0.15 + 0.7 }}
        >
          🔧 Skills Learned:
        </motion.p>
        <motion.div
          style={styles.techContainer}
          variants={contentChildVariants}
          transition={{ delay: index * 0.15 + 0.8 }}
        >
          {edu.skills.split(', ').map((tech, i) => (
            <TechIcon key={i} tech={tech} index={i} />
          ))}
        </motion.div>
        {edu.achievements && (
          <>
            <motion.p
              style={styles.achievementsLabel}
              variants={contentChildVariants}
              transition={{ delay: index * 0.15 + 0.9 }}
            >
              🏆 Achievements:
            </motion.p>
            <motion.ul
              style={styles.achievementList}
              variants={contentChildVariants}
              transition={{ delay: index * 0.15 + 1.0 }}
            >
              {edu.achievements.map((ach, achIndex) => (
                <motion.li
                  key={achIndex}
                  style={styles.achievementItem}
                  variants={contentChildVariants}
                  transition={{ delay: index * 0.15 + 1.1 + achIndex * 0.1 }}
                >
                  <FaStar style={{ color: '#7c3aed' }} />
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
            transition={{ delay: index * 0.15 + 1.2 }}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 15px rgba(124, 58, 237, 0.7)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              style={styles.certificateLinkOverlay}
              whileHover={{ left: '100%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <FaExternalLinkAlt style={{ fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)' }} />
            View Certificate
          </motion.a>
        )}
      </motion.div>
      <motion.div
        style={{
          ...styles.iconWrapper,
          animation: 'rotateIcon 10s linear infinite',
        }}
        variants={contentChildVariants}
        transition={{ delay: index * 0.15 + 1.3 }}
      >
        <IconComp size="clamp(18px, 2.2vw, 28px)" color="#fff" />
      </motion.div>
    </motion.div>
  );
});

// Main EducationEnhanced Component
const EducationEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const responsiveStyles = useResponsiveStyles();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 150, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.85, 1]), { stiffness: 150, damping: 20 });

  const backgroundGradient = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX + window.innerWidth / 2}px ${
        latestY + window.innerHeight / 2
      }px, rgba(0, 198, 255, 0.25), transparent 40%)`
  );

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  }, [mouseX, mouseY]);

  return (
    <ResponsiveContext.Provider value={responsiveStyles}>
      <motion.section
        ref={ref}
        style={{ ...styles.container, ...responsiveStyles.container, opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        onMouseMove={handleMouseMove}
        role="region"
        aria-label="Education Section"
      >
        <style>{animationStyles}</style>
        <Starfield />
        <motion.div style={{ position: 'absolute', inset: 0, background: backgroundGradient }} />
        <motion.div
          style={{ ...styles.header, ...responsiveStyles.header }}
          variants={headerVariants}
        >
          <div style={styles.headerGlow} />
          <motion.h2
            style={{ ...styles.title, ...responsiveStyles.title }}
          >
            🎓 My Educational Journey
          </motion.h2>
          <motion.div
            style={styles.titleUnderline}
            initial={{ width: 0 }}
            animate={{ width: 'clamp(160px, 30vw, 240px)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <motion.p
            style={{ ...styles.introText, ...responsiveStyles.introText }}
            variants={contentChildVariants}
            transition={{ delay: 0.3 }}
          >
            An interactive timeline of my academic achievements, highlighting skills, knowledge, and key accomplishments in AI, Data Science, and beyond.
          </motion.p>
        </motion.div>
        <motion.div
          style={{ ...styles.timeline, ...responsiveStyles.timeline }}
          variants={containerVariants}
        >
          <motion.div
            style={styles.timelineLine}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100%', opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <AnimatePresence>
            {educationData.map((edu, index) => (
              <TimelineItem
                key={edu.sno}
                edu={edu}
                index={index}
                responsiveStyles={responsiveStyles}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>
    </ResponsiveContext.Provider>
  );
};

export default memo(EducationEnhanced);