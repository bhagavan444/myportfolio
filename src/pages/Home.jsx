import React, { useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaPython } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiExpress, SiFlask, SiTensorflow } from 'react-icons/si';
import profile from '../assets/profile.jpg';

// Context for Responsive Styles
const ResponsiveContext = React.createContext({});

const useResponsiveStyles = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return useMemo(() => windowWidth <= 480 ? styles.responsive.small :
                        windowWidth <= 768 ? styles.responsive.medium :
                        styles.responsive.large, [windowWidth]);
};

// Tech Icon Component
const TechIcon = memo(({ tech, index }) => {
  const iconMap = {
    HTML5: { icon: <FaHtml5 />, label: 'HTML5', tooltip: 'Web structure' },
    CSS3: { icon: <FaCss3Alt />, label: 'CSS3', tooltip: 'Advanced styling' },
    JavaScript: { icon: <FaJs />, label: 'JavaScript', tooltip: 'Dynamic scripting' },
    React: { icon: <FaReact />, label: 'React', tooltip: 'UI library' },
    'Node.js': { icon: <FaNodeJs />, label: 'Node.js', tooltip: 'Server-side JS' },
    Express: { icon: <SiExpress />, label: 'Express', tooltip: 'Node.js framework' },
    MongoDB: { icon: <SiMongodb />, label: 'MongoDB', tooltip: 'NoSQL database' },
    'Tailwind CSS': { icon: <SiTailwindcss />, label: 'Tailwind CSS', tooltip: 'Utility-first CSS' },
    Python: { icon: <FaPython />, label: 'Python', tooltip: 'Versatile language' },
    Flask: { icon: <SiFlask />, label: 'Flask', tooltip: 'Python web framework' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow', tooltip: 'ML framework' },
    Git: { icon: <FaGitAlt />, label: 'Git', tooltip: 'Version control' },
    GitHub: { icon: <FaGithub />, label: 'GitHub', tooltip: 'Code hosting' },
    Database: { icon: <FaDatabase />, label: 'Database', tooltip: 'Data management' },
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
        background: 'rgba(76, 29, 149, 0.25)',
        borderRadius: 'clamp(10px, 1.5vw, 12px)',
        border: '1px solid rgba(192, 38, 211, 0.5)',
        position: 'relative',
        boxShadow: '0 0 20px rgba(192, 38, 211, 0.4)',
      }}
      whileHover={{
        scale: 1.25,
        rotate: 8,
        boxShadow: '0 0 30px rgba(192, 38, 211, 0.9)',
        background: 'rgba(76, 29, 149, 0.5)',
        transition: { type: 'spring', stiffness: 400, damping: 12 },
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 300 }}
      role="img"
      aria-label={techData.label}
      tabIndex={0}
    >
      {techData.icon ? (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.08 + 0.1, type: 'spring', stiffness: 350 }}
            style={{ color: '#d946ef', textShadow: '0 0 20px rgba(192, 38, 211, 0.7)' }}
          >
            {techData.icon}
          </motion.span>
          <span style={{ color: '#f0faff', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', fontWeight: 500 }}>
            {techData.label}
          </span>
          <motion.span
            className="tooltip"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(10, 0, 30, 0.98)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              zIndex: 10,
              boxShadow: '0 0 25px rgba(192, 38, 211, 0.6)',
              color: '#f0faff',
            }}
            transition={{ duration: 0.2 }}
          >
            {techData.tooltip}
          </motion.span>
        </>
      ) : (
        <span style={{ color: '#f0faff', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', fontWeight: 500 }}>
          {techData.label}
        </span>
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
      'Built full-stack applications during 24-hour hackathons, including an e-commerce platform for second-hand electronics.',
    ],
    skills: 'Python, TensorFlow',
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
      '🥇 Secured 1st place in RCE Hackathon with Brainovision.',
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
      { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
      { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
      { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
      { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
      { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
      { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    ],
  },
];

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(5rem, 12vw, 10rem) clamp(2.5rem, 5vw, 4rem)',
    background: 'linear-gradient(155deg, #0a001f, #15003a, #25005c, #4c1d95, #7e22ce)',
    backgroundSize: '1000% 1000%',
    color: '#f5f7fa',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '3000px',
    fontFamily: "'Orbitron', 'Inter', sans-serif",
    willChange: 'background, transform',
    animation: 'gradientShift 25s ease infinite',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 10% 10%, rgba(76, 29, 149, 0.6), transparent 45%),
      radial-gradient(circle at 90% 90%, rgba(192, 38, 211, 0.6), transparent 45%),
      radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.5), transparent 65%),
      radial-gradient(circle at 30% 70%, rgba(236, 72, 153, 0.4), transparent 50%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
    animation: 'neonFlicker 2.5s ease-in-out infinite',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(700px, 90vw, 1200px)',
    height: 'clamp(700px, 90vw, 1200px)',
    background: 'radial-gradient(circle, rgba(76, 29, 149, 0.6), rgba(192, 38, 211, 0.3), transparent 70%)',
    top: '-30%',
    left: '-30%',
    filter: 'blur(200px)',
    zIndex: -2,
    animation: 'glowShift 20s ease-in-out infinite',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(2.5rem, 4vw, 4rem)', // Reduced padding
    background: 'rgba(10, 0, 30, 0.92)',
    border: '2px solid rgba(192, 38, 211, 0.6)',
    borderRadius: 'clamp(16px, 2vw, 20px)', // Slightly smaller border radius
    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.95), 0 0 80px rgba(192, 38, 211, 0.5)',
    backdropFilter: 'blur(25px)',
    maxWidth: 'clamp(600px, 80vw, 900px)', // Reduced maxWidth
    margin: '0 auto clamp(3rem, 5vw, 5rem)', // Reduced bottom margin
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    background: 'conic-gradient(from 45deg, rgba(76, 29, 149, 0.5), rgba(192, 38, 211, 0.5), rgba(59, 130, 246, 0.4), transparent)',
    opacity: 0.7,
    zIndex: -1,
  },
  title: {
    fontSize: 'clamp(2rem, 6vw, 4rem)', // Reduced font size
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #4c1d95, #d946ef, #8b5cf6, #3b82f6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 50px rgba(192, 38, 211, 0.9), 0 0 80px rgba(76, 29, 149, 0.7)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)', // Reduced margin
    letterSpacing: '0.2em',
    animation: 'neonFlicker 3s ease-in-out infinite alternate',
  },
  titleUnderline: {
    width: 'clamp(150px, 30vw, 240px)', // Reduced width
    height: '6px', // Reduced height
    background: 'linear-gradient(90deg, #4c1d95, #d946ef, #8b5cf6)',
    borderRadius: '6px',
    margin: '0.8rem auto', // Reduced margin
    boxShadow: '0 0 30px rgba(192, 38, 211, 0.9)',
  },
  introText: {
    fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)', // Reduced font size
    color: '#f0faff',
    maxWidth: 'clamp(500px, 80vw, 800px)', // Reduced maxWidth
    margin: '0 auto clamp(1rem, 2vw, 1.5rem)', // Reduced margin
    lineHeight: '1.9',
    textShadow: '0 0 20px rgba(192, 38, 211, 0.6)',
  },
  timeline: {
    position: 'relative',
    maxWidth: 'clamp(1000px, 98vw, 2000px)',
    margin: '0 auto',
    padding: '0 clamp(1rem, 2.5vw, 2.5rem)',
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 'clamp(6px, 0.8vw, 10px)',
    background: 'linear-gradient(to bottom, #4c1d95, #d946ef, #8b5cf6, #3b82f6)',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 30px rgba(192, 38, 211, 0.9)',
    animation: 'pulseLine 4s ease-in-out infinite',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
  },
  content: {
    background: 'rgba(10, 0, 30, 0.95)',
    border: '2px solid rgba(192, 38, 211, 0.5)',
    borderRadius: 'clamp(20px, 3.5vw, 28px)',
    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
    width: 'clamp(220px, 31%, 450px)',
    textAlign: 'left',
    backdropFilter: 'blur(30px)',
    boxShadow: '0 30px 70px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(192, 38, 211, 0.4)',
    position: 'relative',
    overflow: 'hidden',
  },
  contentLeft: { marginRight: 'auto' },
  contentRight: { marginLeft: 'auto' },
  contentOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(192, 38, 211, 0.5), rgba(76, 29, 149, 0.5), rgba(59, 130, 246, 0.4), transparent)',
    zIndex: -1,
    opacity: 0.6,
    animation: 'rotateGlow 15s linear infinite',
  },
  cardTitle: {
    fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
    color: '#d946ef',
    textShadow: '0 0 25px rgba(192, 38, 211, 0.8)',
    marginBottom: 'clamp(1.2rem, 3vw, 1.8rem)',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
  },
  cardDescription: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
    color: '#f0faff',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    lineHeight: '1.9',
    textShadow: '0 0 15px rgba(192, 38, 211, 0.6)',
  },
  techLabel: {
    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
    color: '#8b5cf6',
    fontWeight: 'bold',
    marginTop: 'clamp(1.5rem, 3.5vw, 2rem)',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 15px rgba(139, 92, 246, 0.6)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 2.5vw, 14px)',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    marginBottom: 'clamp(1.5rem, 3.5vw, 2rem)',
  },
  button: {
    padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(1.5rem, 2.5vw, 2rem)',
    background: 'linear-gradient(90deg, #4c1d95, #d946ef, #8b5cf6)',
    color: '#f5f7fa',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    boxShadow: '0 0 20px rgba(192, 38, 211, 0.6)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'clamp(0.4rem, 0.8vw, 0.6rem)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  socials: {
    display: 'flex',
    gap: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    justifyContent: 'center',
    marginTop: 'clamp(1.8rem, 3.5vw, 2.5rem)',
  },
  socialIcon: {
    fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
    color: '#d946ef',
    textShadow: '0 0 15px rgba(192, 38, 211, 0.6)',
  },
  profilePic: {
    borderRadius: '50%',
    border: '6px solid rgba(192, 38, 211, 0.8)',
    boxShadow: '0 0 50px rgba(192, 38, 211, 0.7)',
    width: 'clamp(180px, 22vw, 250px)',
    height: 'clamp(180px, 22vw, 250px)',
    objectFit: 'cover',
    margin: '0 auto clamp(1.2rem, 2.5vw, 1.8rem)',
    display: 'block',
  },
  iconWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #4c1d95, #d946ef, #8b5cf6)',
    borderRadius: '50%',
    padding: 'clamp(0.8rem, 1.8vw, 1.4rem)',
    boxShadow: '0 0 40px rgba(192, 38, 211, 0.9)',
    zIndex: 3,
  },
  responsive: {
    large: {
      container: { padding: 'clamp(5rem, 10vw, 9rem) clamp(2.5rem, 4vw, 3.5rem)' },
      header: { padding: 'clamp(2.5rem, 4vw, 4rem)', maxWidth: 'clamp(600px, 80vw, 900px)' }, // Adjusted
      title: { fontSize: 'clamp(2rem, 6vw, 4rem)' }, // Adjusted
      introText: { fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)', maxWidth: 'clamp(500px, 80vw, 800px)' }, // Adjusted
      timeline: { padding: '0 clamp(1rem, 2vw, 2rem)' },
      content: { padding: 'clamp(1.5rem, 3vw, 2.5rem)', width: 'clamp(220px, 31%, 450px)' },
      cardTitle: { fontSize: 'clamp(2rem, 4vw, 2.6rem)' },
      cardDescription: { fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' },
      holographicGlow: { width: 'clamp(700px, 85vw, 1000px)', height: 'clamp(700px, 85vw, 1000px)', top: '-25%', left: '-25%' },
    },
    medium: {
      container: { padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.8rem, 3.5vw, 3rem)' },
      header: { padding: 'clamp(2rem, 3.5vw, 3rem)', maxWidth: 'clamp(500px, 75vw, 700px)' }, // Adjusted
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }, // Adjusted
      introText: { fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', maxWidth: 'clamp(400px, 75vw, 600px)' }, // Adjusted
      timeline: { padding: '0 clamp(0.8rem, 1.8vw, 1.5rem)' },
      content: { padding: 'clamp(1.2rem, 2.5vw, 2rem)', width: 'clamp(180px, 30%, 360px)' },
      cardTitle: { fontSize: 'clamp(1.8rem, 3.8vw, 2.3rem)' },
      cardDescription: { fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' },
      holographicGlow: { width: 'clamp(500px, 65vw, 800px)', height: 'clamp(500px, 65vw, 800px)', top: '-20%', left: '-20%' },
    },
    small: {
      container: { padding: 'clamp(3rem, 6vw, 5rem) clamp(1.2rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 'clamp(400px, 70vw, 600px)' }, // Adjusted
      title: { fontSize: 'clamp(1.6rem, 4vw, 3rem)' }, // Adjusted
      introText: { fontSize: 'clamp(0.8rem, 1.8vw, 1rem)', maxWidth: 'clamp(300px, 70vw, 500px)' }, // Adjusted
      timeline: { padding: '0 clamp(0.5rem, 1.5vw, 1rem)' },
      content: { padding: 'clamp(1rem, 2vw, 1.8rem)', width: 'clamp(150px, 70%, 300px)' },
      cardTitle: { fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 700px)', height: 'clamp(400px, 55vw, 700px)', top: '-15%', left: '-15%' },
    },
  },
};

// Animation Styles
const animationStyles = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes holographicPulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(80px, 80px) scale(1.3); }
    50% { transform: translate(160px, 0) scale(1.35); }
    75% { transform: translate(80px, -80px) scale(1.3); }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(180deg); }
  }
  @keyframes rotateIcon {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 0.8; }
    100% { transform: scale(3); opacity: 0; }
  }
  @keyframes neonFlicker {
    0%, 100% { opacity: 1; text-shadow: 0 0 50px rgba(192, 38, 211, 0.9), 0 0 80px rgba(76, 29, 149, 0.7); }
    50% { opacity: 0.85; text-shadow: 0 0 30px rgba(192, 38, 211, 0.7), 0 0 50px rgba(76, 29, 149, 0.5); }
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-3px, 3px); }
    40% { transform: translate(-3px, -3px); }
    60% { transform: translate(3px, 3px); }
    80% { transform: translate(3px, -3px); }
    100% { transform: translate(0); }
  }
  @keyframes pulseLine {
    0%, 100% { opacity: 0.7; box-shadow: 0 0 30px rgba(192, 38, 211, 0.9); }
    50% { opacity: 1; box-shadow: 0 0 50px rgba(192, 38, 211, 1); }
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 2.8, ease: 'easeOut', staggerChildren: 0.3 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -150, rotateX: -25 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 2, type: 'spring', stiffness: 180, damping: 20 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 200, scale: 0.7, rotateY: -45 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1.5, type: 'spring', stiffness: 160, damping: 18 },
  },
};

const contentChildVariants = {
  hidden: { opacity: 0, x: -75, rotate: -20 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1, type: 'spring', stiffness: 220, damping: 16 } },
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
      viewport={{ once: true, margin: '-100px' }}
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
          scale: 1.1,
          rotateY: 10,
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.95), 0 0 80px rgba(192, 38, 211, 0.6)',
          transition: { type: 'spring', stiffness: 300, damping: 14 },
        }}
        whileTap={{ scale: 0.98 }}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, () => section.button && navigate(section.button.path))}
      >
        <motion.div
          style={{ ...styles.contentOverlay, animation: 'rotateGlow 18s linear infinite' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
        />
        <motion.h3
          id={`section-title-${index}`}
          style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
          variants={contentChildVariants}
          transition={{ delay: index * 0.25 + 0.3 }}
        >
          <IconComp style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' }} />
          {section.title}
        </motion.h3>
        {section.items.length > 0 && (
          <motion.ul
            style={{ listStyle: 'disc', paddingLeft: '2rem' }}
            variants={contentChildVariants}
            transition={{ delay: index * 0.25 + 0.4 }}
          >
            {section.items.map((item, i) => (
              <motion.li
                key={i}
                style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                variants={contentChildVariants}
                transition={{ delay: index * 0.25 + 0.5 + i * 0.15 }}
              >
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
              transition={{ delay: index * 0.25 + 0.8 }}
            >
              🔧 Skills & Technologies:
            </motion.p>
            <motion.div
              style={styles.techContainer}
              variants={contentChildVariants}
              transition={{ delay: index * 0.25 + 0.9 }}
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
            transition={{ delay: index * 0.25 + 1.0 }}
            whileHover={{
              scale: 1.2,
              boxShadow: '0 20px 60px rgba(192, 38, 211, 0.7)',
              translateY: -5,
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(section.button.path)}
            onKeyDown={(e) => handleKeyDown(e, () => navigate(section.button.path))}
            aria-label={`Navigate to ${section.button.text}`}
          >
            {section.button.text}
            <motion.div
              style={{ marginLeft: '10px' }}
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaStar size={16} />
            </motion.div>
          </motion.button>
        )}
        {section.socials && (
          <motion.div
            style={styles.socials}
            variants={contentChildVariants}
            transition={{ delay: index * 0.25 + 1.1 }}
          >
            {section.socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                style={styles.socialIcon}
                whileHover={{
                  scale: 1.3,
                  rotate: 360,
                  boxShadow: '0 0 25px rgba(192, 38, 211, 0.7)',
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 350 }}
                aria-label={`Visit ${social.label}`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, () => window.open(social.href, '_blank'))}
              >
                <social.icon />
                <motion.div
                  style={{
                    position: 'absolute',
                    width: 'clamp(25px, 3.5vw, 35px)',
                    height: 'clamp(25px, 3.5vw, 35px)',
                    borderRadius: '50%',
                    background: 'rgba(192, 38, 211, 0.4)',
                  }}
                  animate={{ scale: [0, 2.5], opacity: [0.7, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>
      <motion.div
        style={{
          ...styles.iconWrapper,
          animation: 'rotateIcon 15s linear infinite',
        }}
        variants={contentChildVariants}
        transition={{ delay: index * 0.25 + 1.2 }}
      >
        <IconComp size='clamp(24px, 3vw, 36px)' color='#0d0026' />
      </motion.div>
    </motion.div>
  );
});

// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });
  const responsiveStyles = useResponsiveStyles();
  const { scrollYProgress } = useScroll({ target: ref });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.2, 1]), { stiffness: 150, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.7, 1]), { stiffness: 150, damping: 20 });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5], [-15, 0]), { stiffness: 150, damping: 20 });

  return (
    <ResponsiveContext.Provider value={responsiveStyles}>
      <motion.section
        ref={ref}
        style={{ ...styles.container, ...responsiveStyles.container, opacity, scale, rotateX }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        role="region"
        aria-label="Portfolio Home Section"
      >
        <style>{animationStyles}</style>
        {/* Dynamic Background Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `clamp(0.8rem, calc(0.2vw + ${0.8 + i * 0.2}rem), ${1.5 + i * 0.3}rem)`,
              height: `clamp(0.8rem, calc(0.2vw + ${0.8 + i * 0.2}rem), ${1.5 + i * 0.3}rem)`,
              background: 'radial-gradient(circle, rgba(192, 38, 211, 0.7), rgba(76, 29, 149, 0.5), transparent)',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              pointerEvents: 'none',
              zIndex: -1,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.6, 1],
              rotate: [0, 360, 0],
            }}
            transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 5 }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(192, 38, 211, 0.5), transparent)',
                borderRadius: '50%',
              }}
              animate={{ scale: [1, 3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: Math.random() * 2 }}
            />
          </motion.div>
        ))}
        {/* Holographic Glow */}
        <motion.div
          style={{ ...styles.holographicGlow, ...responsiveStyles.holographicGlow }}
          animate={{ x: [0, 80, 0], y: [0, 80, 0], scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Header Section */}
        <motion.div
          style={{ ...styles.header, ...responsiveStyles.header }}
          variants={headerVariants}
        >
          <motion.div style={styles.headerGlow} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }} />
          <motion.img
            src={profile}
            alt="Siva Satya Sai Bhagavan Profile"
            style={styles.profilePic}
            variants={profilePicVariants}
            initial='hidden'
            animate='visible'
            whileHover={{ scale: 1.15, rotate: 8, boxShadow: '0 0 70px rgba(192, 38, 211, 0.9)' }}
            transition={{ type: 'spring', stiffness: 220 }}
            tabIndex={0}
          />
          <motion.h2
            style={{ ...styles.title, ...responsiveStyles.title }}
            animate={{ skewX: [-2, 2, -2], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            👋 Hi, I'm <span style={{ color: '#d946ef' }}>Siva Satya Sai Bhagavan</span>
          </motion.h2>
          <motion.div
            style={styles.titleUnderline}
            initial={{ width: 0, scaleX: 0 }}
            animate={{ width: 'clamp(150px, 30vw, 240px)', scaleX: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          />
          <motion.p
            style={{ ...styles.introText, ...responsiveStyles.introText }}
            variants={contentChildVariants}
            transition={{ delay: 0.6 }}
          >
            🚀 Creative Technologist | Full-Stack Engineer | Data Science Enthusiast | AI&ML Developer
          </motion.p>
          <motion.button
            style={styles.button}
            variants={contentChildVariants}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.2, boxShadow: '0 20px 60px rgba(192, 38, 211, 0.7)', translateY: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/Projects')}
            aria-label="View My Experience"
            tabIndex={0}
          >
            View My Experience →
          </motion.button>
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
            transition={{ duration: 3, delay: 1.2, ease: 'easeOut' }}
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

export default Home;