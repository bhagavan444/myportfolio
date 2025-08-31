import React, { useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaPython } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiExpress, SiFlask, SiTensorflow } from 'react-icons/si';
import profile from '../assets/profile.jpg';

// Custom Debounce Function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Starfield Component (aligned with Resume.jsx and Contact.jsx)
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

// Button Shine Component (aligned with Resume.jsx and Contact.jsx)
const ButtonShine = ({ isActive }) => (
  <motion.div
    style={{
      position: 'absolute',
      top: 0,
      left: '-150%',
      width: '200%',
      height: '100%',
      background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)',
      transform: 'skewX(-25deg)',
    }}
    animate={{ left: isActive ? '150%' : '-150%' }}
    transition={{ duration: 1.2, ease: 'easeInOut' }}
  />
);

// Context for Responsive Styles
const ResponsiveContext = React.createContext({});

const useResponsiveStyles = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const handleResize = useCallback(debounce(() => setWindowWidth(window.innerWidth), 100), []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return useMemo(() => windowWidth <= 480 ? styles.responsive.small :
                        windowWidth <= 768 ? styles.responsive.medium :
                        styles.responsive.large, [windowWidth]);
};

// Tech Icon Component
const TechIcon = memo(({ tech, index }) => {
  const iconMap = {
    HTML5: { icon: <FaHtml5 />, label: 'HTML5', tooltip: 'Markup language for web structure' },
    CSS3: { icon: <FaCss3Alt />, label: 'CSS3', tooltip: 'Advanced styling for web design' },
    JavaScript: { icon: <FaJs />, label: 'JavaScript', tooltip: 'Dynamic scripting for web interactivity' },
    React: { icon: <FaReact />, label: 'React', tooltip: 'UI library for building interactive apps' },
    'Node.js': { icon: <FaNodeJs />, label: 'Node.js', tooltip: 'Server-side JavaScript runtime' },
    Express: { icon: <SiExpress />, label: 'Express', tooltip: 'Node.js web framework' },
    MongoDB: { icon: <SiMongodb />, label: 'MongoDB', tooltip: 'NoSQL database' },
    'Tailwind CSS': { icon: <SiTailwindcss />, label: 'Tailwind CSS', tooltip: 'Utility-first CSS framework' },
    Python: { icon: <FaPython />, label: 'Python', tooltip: 'Versatile programming language' },
    Flask: { icon: <SiFlask />, label: 'Flask', tooltip: 'Python web framework' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow', tooltip: 'Machine learning framework' },
    Git: { icon: <FaGitAlt />, label: 'Git', tooltip: 'Version control system' },
    GitHub: { icon: <FaGithub />, label: 'GitHub', tooltip: 'Code hosting platform' },
    Database: { icon: <FaDatabase />, label: 'Database', tooltip: 'Data management systems' },
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

// Data
const homeData = [
  {
    title: 'About Me',
    items: [
      'Final Year B.Tech AI&DS Student with expertise in Full Stack Development, Data Science, and Python.',
      'Driven by a passion for crafting innovative, scalable solutions to real-world challenges.',
    ],
    button: { text: 'Discover More →', path: '/about' },
    icon: FaStar,
  },
  {
    title: 'Work Experience',
    items: [
      'Interned at Blackbucks Paid Online, focusing on AIML and Data Science projects.',
      'Interned at Smart Bridge Online, focusing on AIML and Data Science projects.',
      'Built full-stack applications during 24-hour hackathons, including an e-commerce platform for second-hand electronics.',
      'Developed a Resume Builder with 90%+ ATS compatibility using React and Node.js.',
      'Created an AI Chatbot and Career Recommendation System using the MERN stack.',
    ],
    skills: 'Python, TensorFlow, React, Node.js, MongoDB, Express, HTML5, CSS3, JavaScript, Git',
    button: { text: 'View Internships →', path: '/Internships' },
    icon: FaStar,
  },
  {
    title: 'My Skills',
    items: [
      'Mastery in JavaScript, Python, React, Node.js, MongoDB, TensorFlow, and more.',
      'Skilled in developing AI-driven applications and scalable web architectures.',
    ],
    skills: 'JavaScript, Python, React, Node.js, MongoDB, TensorFlow, HTML5, CSS3, Express, Tailwind CSS, Flask, Git',
    button: { text: 'Explore Skills →', path: '/MySkills' },
    icon: FaStar,
  },
  {
    title: 'Achievements',
    items: [
      '🏆 Developed a Resume Builder with 90%+ ATS compatibility.',
      '📜 Completed advanced workshops in AI, Web, and Mobile App Development.',
      '💡 Created an AI Chatbot and Career Recommendation System using MERN Stack.',
    ],
    icon: FaStar,
  },
  {
    title: 'Connect With Me',
    items: [
      'Open to freelance projects, internships, and collaborative ventures.',
      'Reach out via the platforms below to connect!',
    ],
    button: { text: 'Let’s Connect →', path: '/contact' },
    icon: FaStar,
    socials: [
      { icon: FaLinkedin, href: 'https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/', label: 'LinkedIn' },
      { icon: FaGithub, href: 'https://github.com/bhagavan444', label: 'GitHub' },
    ],
  },
];

// Styles (aligned with Resume.jsx and Contact.jsx)
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
  button: {
    padding: 'clamp(0.8rem, 1.5vw, 1.2rem) clamp(1.5rem, 2.5vw, 2.5rem)',
    background: 'linear-gradient(90deg, #7c3aed, #00c6ff)',
    border: 'none',
    borderRadius: '50px',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    fontWeight: '600',
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(124, 58, 237, 0.4)',
  },
  socials: {
    display: 'flex',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    justifyContent: 'center',
    marginTop: 'clamp(1.5rem, 3vw, 2rem)',
  },
  socialIcon: {
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    color: '#fff',
    textShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
    position: 'relative',
  },
  profilePic: {
    borderRadius: '50%',
    border: '4px solid rgba(124, 58, 237, 0.7)',
    boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)',
    width: 'clamp(150px, 20vw, 200px)',
    height: 'clamp(150px, 20vw, 200px)',
    objectFit: 'cover',
    margin: '0 auto clamp(1rem, 2vw, 1.5rem)',
    display: 'block',
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
      holographicGlow: { width: 'clamp(500px, 65vw, 800px)', height: 'clamp(500px, 65vw, 800px)', top: '-20%', left: '-20%' },
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
      holographicGlow: { width: 'clamp(400px, 55vw, 600px)', height: 'clamp(400px, 55vw, 600px)', top: '-15%', left: '-15%' },
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
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
    },
  },
};

// Animation Styles (aligned with Resume.jsx and Contact.jsx)
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
  @keyframes shinePulse {
    0% { left: -150%; }
    100% { left: 150%; }
  }
  @keyframes rotateIcon {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

// Animation Variants
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

const profilePicVariants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.5, type: 'spring', stiffness: 140, damping: 16 },
  },
};

// Timeline Item Component
const TimelineItem = memo(({ section, index, navigate, responsiveStyles }) => {
  const IconComp = section.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleKeyDown = useCallback((e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      style={styles.item}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      viewport={{ once: true, margin: '-50px' }}
      role="article"
      aria-labelledby={`section-title-${index}`}
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
        onKeyDown={(e) => handleKeyDown(e, () => section.button && navigate(section.button.path))}
      >
        <motion.div
          style={styles.contentOverlay}
        />
        <motion.h3
          id={`section-title-${index}`}
          style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
          variants={contentChildVariants}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
          {section.title}
        </motion.h3>
        {section.items.length > 0 && (
          <motion.ul
            style={styles.achievementList}
            variants={contentChildVariants}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            {section.items.map((item, i) => (
              <motion.li
                key={i}
                style={styles.achievementItem}
                variants={contentChildVariants}
                transition={{ delay: index * 0.15 + 0.4 + i * 0.1 }}
              >
                <FaStar style={{ color: '#7c3aed' }} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
        {section.skills && (
          <>
            <motion.p
              style={styles.techLabel}
              variants={contentChildVariants}
              transition={{ delay: index * 0.15 + 0.7 }}
            >
              🔧 Skills & Technologies:
            </motion.p>
            <motion.div
              style={styles.techContainer}
              variants={contentChildVariants}
              transition={{ delay: index * 0.15 + 0.8 }}
            >
              {section.skills.split(', ').map((tech, i) => (
                <TechIcon key={i} tech={tech} index={i} />
              ))}
            </motion.div>
          </>
        )}
        {section.button && (
          <motion.button
            style={styles.button}
            variants={contentChildVariants}
            transition={{ delay: index * 0.15 + 0.9 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(124, 58, 237, 0.7)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(section.button.path)}
            onKeyDown={(e) => handleKeyDown(e, () => navigate(section.button.path))}
            aria-label={`Navigate to ${section.button.text}`}
          >
            <motion.span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {section.button.text}
              <FaStar size={14} />
            </motion.span>
            <ButtonShine isActive={true} />
          </motion.button>
        )}
        {section.socials && (
          <motion.div
            style={styles.socials}
            variants={contentChildVariants}
            transition={{ delay: index * 0.15 + 1.0 }}
          >
            {section.socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                style={styles.socialIcon}
                whileHover={{
                  scale: 1.2,
                  boxShadow: '0 0 15px rgba(124, 58, 237, 0.7)',
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 350 }}
                aria-label={`Visit ${social.label}`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, () => window.open(social.href, '_blank'))}
              >
                <social.icon />
                <motion.span
                  style={{
                    position: 'absolute',
                    top: '-clamp(2rem, 4vw, 2.5rem)',
                    background: 'rgba(12, 5, 32, 0.95)',
                    color: '#e0e7ff',
                    padding: 'clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.6rem, 1.2vw, 0.8rem)',
                    borderRadius: 'clamp(6px, 1vw, 8px)',
                    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                    boxShadow: '0 0 10px rgba(124, 58, 237, 0.4)',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>
      <motion.div
        style={{
          ...styles.iconWrapper,
          animation: 'rotateIcon 10s linear infinite',
        }}
        variants={contentChildVariants}
        transition={{ delay: index * 0.15 + 1.1 }}
      >
        <IconComp size='clamp(18px, 2.2vw, 28px)' color='#fff' />
      </motion.div>
    </motion.div>
  );
});

// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const responsiveStyles = useResponsiveStyles();
  const { scrollYProgress } = useScroll({ target: ref });
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
        aria-label="Portfolio Home Section"
      >
        <style>{animationStyles}</style>
        <Starfield />
        <motion.div style={{ position: 'absolute', inset: 0, background: backgroundGradient }} />
        <motion.div
          style={{ ...styles.header, ...responsiveStyles.header }}
          variants={headerVariants}
        >
          <div style={styles.headerGlow} />
          <motion.img
            src={profile}
            alt="Siva Satya Sai Bhagavan Profile"
            style={styles.profilePic}
            variants={profilePicVariants}
            whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(124, 58, 237, 0.7)', rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 220 }}
            tabIndex={0}
          />
          <motion.h2
            style={{ ...styles.title, ...responsiveStyles.title }}
          >
            👋 Hi, I'm <span style={{ background: 'linear-gradient(90deg, #7c3aed, #00c6ff)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>Bhagavan GopalaJosyula</span>
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
            🚀 Creative Technologist | Full-Stack Engineer | Data Science Enthusiast | AI&ML Developer
          </motion.p>
          <motion.button
            style={styles.button}
            variants={contentChildVariants}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(124, 58, 237, 0.7)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/Projects')}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/Projects')}
            aria-label="View My Experience"
            tabIndex={0}
          >
            <motion.span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              View My Experience →
              <FaStar size={14} />
            </motion.span>
            <ButtonShine isActive={true} />
          </motion.button>
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
            {homeData.map((section, index) => (
              <TimelineItem
                key={section.title}
                section={section}
                index={index}
                navigate={navigate}
                responsiveStyles={responsiveStyles}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>
    </ResponsiveContext.Provider>
  );
};

export default memo(Home);