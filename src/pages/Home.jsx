import React, { useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaPython } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiExpress, SiFlask, SiTensorflow } from 'react-icons/si';
import profile from '../assets/profile.jpg';

// Context for Responsive Styles
const ResponsiveContext = React.createContext({});

const useResponsiveStyles = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    JavaScript: { icon: <FaJs />, label: 'JavaScript', tooltip: 'Dynamic scripting language' },
    Python: { icon: <FaPython />, label: 'Python', tooltip: 'Versatile programming language' },
    React: { icon: <FaReact />, label: 'React', tooltip: 'UI library for interactive apps' },
    'Node.js': { icon: <FaNodeJs />, label: 'Node.js', tooltip: 'Server-side JavaScript runtime' },
    MongoDB: { icon: <SiMongodb />, label: 'MongoDB', tooltip: 'NoSQL database' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow', tooltip: 'ML framework for deep learning' },
    HTML5: { icon: <FaHtml5 />, label: 'HTML5', tooltip: 'Markup language for web structure' },
    CSS3: { icon: <FaCss3Alt />, label: 'CSS3', tooltip: 'Advanced styling for web design' },
    Express: { icon: <SiExpress />, label: 'Express', tooltip: 'Web framework for Node.js' },
    'Tailwind CSS': { icon: <SiTailwindcss />, label: 'Tailwind CSS', tooltip: 'Utility-first CSS framework' },
    Flask: { icon: <SiFlask />, label: 'Flask', tooltip: 'Lightweight Python web framework' },
    Git: { icon: <FaGitAlt />, label: 'Git', tooltip: 'Version control system' },
    GitHub: { icon: <FaGithub />, label: 'GitHub', tooltip: 'Code hosting platform' },
    Database: { icon: <FaDatabase />, label: 'Database', tooltip: 'Data storage and management' },
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
        background: 'rgba(59, 130, 246, 0.2)',
        borderRadius: 'clamp(8px, 1.2vw, 10px)',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        position: 'relative',
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
      }}
      whileHover={{
        scale: 1.2,
        rotate: 10,
        boxShadow: '0 0 25px rgba(59, 130, 246, 0.8)',
        background: 'rgba(59, 130, 246, 0.4)',
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      role="img"
      aria-label={techData.label}
      tabIndex={0}
    >
      {techData.icon && (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
            style={{ color: '#3b82f6', textShadow: '0 0 15px rgba(59, 130, 246, 0.6)' }}
          >
            {techData.icon}
          </motion.span>
          <span style={{ color: '#e0e7ff', fontSize: 'clamp(0.9rem, 1.9vw, 1.1rem)' }}>
            {techData.label}
          </span>
          <motion.span
            className="tooltip"
            initial={{ opacity: 0, y: 15 }}
            whileHover={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(10, 0, 30, 0.95)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              zIndex: 10,
              boxShadow: '0 0 20px rgba(192, 38, 211, 0.5)',
            }}
          >
            {techData.tooltip}
          </motion.span>
        </>
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
    padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 4vw, 3.5rem)',
    background: 'linear-gradient(160deg, #0a001f, #15003a, #25005c, #4c1d95)',
    backgroundSize: '800% 800%',
    color: '#f5f7fa',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '2500px',
    fontFamily: "'Orbitron', 'Inter', sans-serif",
    willChange: 'background, transform',
    animation: 'gradientShift 20s ease infinite',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 15% 15%, rgba(59, 130, 246, 0.5), transparent 50%),
      radial-gradient(circle at 85% 85%, rgba(192, 38, 211, 0.5), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.4), transparent 70%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
    animation: 'neonFlicker 3s ease-in-out infinite',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(600px, 80vw, 1000px)',
    height: 'clamp(600px, 80vw, 1000px)',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5), transparent 65%)',
    top: '-25%',
    left: '-25%',
    filter: 'blur(180px)',
    zIndex: -1,
    animation: 'glowShift 15s ease-in-out infinite',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(3rem, 5vw, 5rem)',
    background: 'rgba(10, 0, 30, 0.9)',
    border: '2px solid rgba(59, 130, 246, 0.5)',
    borderRadius: 'clamp(20px, 2.5vw, 24px)',
    boxShadow: '0 30px 70px rgba(0, 0, 0, 0.9), 0 0 60px rgba(59, 130, 246, 0.4)',
    backdropFilter: 'blur(20px)',
    maxWidth: 'clamp(800px, 95vw, 1200px)',
    margin: '0 auto clamp(4rem, 7vw, 6rem)',
  },
  title: {
    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3, #8b5cf6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 70px rgba(192, 38, 211, 0.6)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.5rem)',
    letterSpacing: '0.15em',
    animation: 'neonFlicker 2s ease-in-out infinite',
  },
  titleUnderline: {
    width: 'clamp(180px, 35vw, 280px)',
    height: '6px',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3, #8b5cf6)',
    borderRadius: '6px',
    margin: '0.8rem auto',
    boxShadow: '0 0 25px rgba(59, 130, 246, 0.8)',
  },
  introText: {
    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
    color: '#e0e7ff',
    maxWidth: 'clamp(600px, 85vw, 900px)',
    margin: '0 auto clamp(1.2rem, 2.5vw, 1.8rem)',
    lineHeight: '1.8',
    textShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
  },
  timeline: {
    position: 'relative',
    maxWidth: 'clamp(900px, 98vw, 1800px)',
    margin: '0 auto',
    padding: '0 clamp(0.8rem, 2.5vw, 2rem)',
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 'clamp(4px, 0.6vw, 8px)',
    background: 'linear-gradient(to bottom, #3b82f6, #c026d3, #8b5cf6)',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 25px rgba(59, 130, 246, 0.8)',
    animation: 'pulseLine 3s ease-in-out infinite',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
  },
  content: {
    background: 'rgba(10, 0, 30, 0.95)',
    border: '2px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(16px, 3vw, 24px)',
    padding: 'clamp(2.5rem, 5vw, 3.5rem)',
    width: 'clamp(320px, 48%, 650px)',
    textAlign: 'left',
    backdropFilter: 'blur(22px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(59, 130, 246, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  contentLeft: { marginRight: 'auto' },
  contentRight: { marginLeft: 'auto' },
  contentOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.4), rgba(192, 38, 211, 0.4), transparent)',
    zIndex: -1,
    opacity: 0.5,
    animation: 'rotateGlow 10s linear infinite',
  },
  cardTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    color: '#3b82f6',
    textShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.4rem, 1vw, 0.6rem)',
  },
  cardDescription: {
    fontSize: 'clamp(1rem, 2.3vw, 1.3rem)',
    color: '#e0e7ff',
    marginBottom: 'clamp(0.6rem, 1.8vw, 1rem)',
    lineHeight: '1.8',
    textShadow: '0 0 12px rgba(59, 130, 246, 0.5)',
  },
  techLabel: {
    fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
    color: '#c026d3',
    fontWeight: 'bold',
    marginTop: 'clamp(1.2rem, 3vw, 1.8rem)',
    textShadow: '0 0 12px rgba(59, 130, 246, 0.5)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 2.5vw, 14px)',
    marginTop: 'clamp(1rem, 2.5vw, 1.2rem)',
    marginBottom: 'clamp(1.2rem, 3vw, 1.8rem)',
  },
  button: {
    padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(1.5rem, 2.5vw, 2rem)',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3, #8b5cf6)',
    color: '#f5f7fa',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
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
    color: '#3b82f6',
    textShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
  },
  profilePic: {
    borderRadius: '50%',
    border: '6px solid rgba(59, 130, 246, 0.8)',
    boxShadow: '0 0 50px rgba(59, 130, 246, 0.7)',
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
    background: 'linear-gradient(135deg, #3b82f6, #c026d3, #8b5cf6)',
    borderRadius: '50%',
    padding: 'clamp(0.6rem, 1.5vw, 1.2rem)',
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.9)',
    zIndex: 3,
  },
  responsive: {
    large: {
      container: { padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 3.5vw, 3rem)' },
      header: { padding: 'clamp(2.5rem, 4.5vw, 4rem)' },
      title: { fontSize: 'clamp(2.3rem, 6vw, 4.5rem)' },
      timeline: { padding: '0 clamp(0.8rem, 2vw, 1.5rem)' },
      content: { padding: 'clamp(2.5rem, 4vw, 3.2rem)', width: 'clamp(350px, 48%, 700px)' },
      cardTitle: { fontSize: 'clamp(1.8rem, 3.8vw, 2.3rem)' },
      cardDescription: { fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' },
      holographicGlow: { width: 'clamp(600px, 75vw, 900px)', height: 'clamp(600px, 75vw, 900px)', top: '-22%', left: '-22%' },
    },
    medium: {
      container: { padding: 'clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      timeline: { padding: '0 clamp(0.6rem, 1.8vw, 1.2rem)' },
      content: { padding: 'clamp(2rem, 3.5vw, 3rem)', width: 'clamp(300px, 48%, 550px)' },
      cardTitle: { fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' },
      cardDescription: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(500px, 60vw, 700px)', height: 'clamp(500px, 60vw, 700px)', top: '-18%', left: '-18%' },
    },
    small: {
      container: { padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.5vw, 1rem)' },
      content: { padding: 'clamp(1.8rem, 3vw, 2.5rem)', width: 'clamp(280px, 85%, 450px)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3.2vw, 1.8rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(350px, 50vw, 600px)', height: 'clamp(350px, 50vw, 600px)', top: '-15%', left: '-15%' },
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
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(60px, 60px) scale(1.2); }
    50% { transform: translate(120px, 0) scale(1.25); }
    75% { transform: translate(60px, -60px) scale(1.2); }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-25px) rotate(180deg); }
  }
  @keyframes rotateIcon {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 0.7; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes neonFlicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
  @keyframes pulseLine {
    0%, 100% { opacity: 0.7; box-shadow: '0 0 25px rgba(59, 130, 246, 0.8)'; }
    50% { opacity: 1; box-shadow: '0 0 40px rgba(59, 130, 246, 1)'; }
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 2.5, ease: 'easeOut', staggerChildren: 0.4 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -120, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.8, type: 'spring', stiffness: 160, damping: 20 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 150, scale: 0.7, rotateY: -30 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1.2, type: 'spring', stiffness: 150, damping: 18 },
  },
};

const contentChildVariants = {
  hidden: { opacity: 0, x: -50, rotate: -15 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.8, type: 'spring', stiffness: 200 } },
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
  const handleKeyDown = useCallback((e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <motion.div
      style={styles.item}
      variants={itemVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-60px' }}
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
          scale: 1.08,
          rotateY: 8,
          boxShadow: '0 35px 70px rgba(0, 0, 0, 0.9), 0 0 70px rgba(59, 130, 246, 0.5)',
          transition: { type: 'spring', stiffness: 250 },
        }}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, () => section.button && navigate(section.button.path))}
      >
        <motion.div
          style={{ ...styles.contentOverlay, animation: 'rotateGlow 12s linear infinite' }}
        />
        <motion.h3
          id={`section-title-${index}`}
          style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
          variants={contentChildVariants}
          initial='hidden'
          animate='visible'
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <IconComp style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }} />
          {section.title}
        </motion.h3>
        {section.items.length > 0 && (
          <motion.ul
            style={{ listStyle: 'disc', paddingLeft: '1.8rem' }}
            variants={contentChildVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            {section.items.map((item, i) => (
              <motion.li
                key={i}
                style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                variants={contentChildVariants}
                initial='hidden'
                animate='visible'
                transition={{ delay: index * 0.2 + 0.5 + i * 0.15 }}
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
              initial='hidden'
              animate='visible'
              transition={{ delay: index * 0.2 + 0.8 }}
            >
              🔧 Skills & Technologies:
            </motion.p>
            <motion.div
              style={styles.techContainer}
              variants={contentChildVariants}
              initial='hidden'
              animate='visible'
              transition={{ delay: index * 0.2 + 0.9 }}
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
            initial='hidden'
            animate='visible'
            transition={{ delay: index * 0.2 + 1.0 }}
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
            initial='hidden'
            animate='visible'
            transition={{ delay: index * 0.2 + 1.1 }}
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
                  boxShadow: '0 0 25px rgba(59, 130, 246, 0.7)',
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
                    background: 'rgba(59, 130, 246, 0.4)',
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
          animation: 'rotateIcon 12s linear infinite',
        }}
        variants={contentChildVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: index * 0.2 + 1.4 }}
      >
        <IconComp size='clamp(20px, 2.5vw, 30px)' color='#0d0026' />
      </motion.div>
    </motion.div>
  );
});

// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const responsiveStyles = useResponsiveStyles();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [-10, 0]);

  return (
    <ResponsiveContext.Provider value={responsiveStyles}>
      <motion.section
        ref={ref}
        style={{ ...styles.container, ...responsiveStyles.container, opacity, scale, rotateX }}
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        role='region'
        aria-label='Portfolio Home Section'
      >
        <style>{animationStyles}</style>
        {/* Dynamic Background Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `clamp(0.6rem, calc(0.15vw + ${0.6 + i * 0.15}rem), ${1.2 + i * 0.2}rem)`,
              height: `clamp(0.6rem, calc(0.15vw + ${0.6 + i * 0.15}rem), ${1.2 + i * 0.2}rem)`,
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(192, 38, 211, 0.4))',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              pointerEvents: 'none',
              animation: `particleFloat ${5 + i * 0.4}s ease-in-out infinite`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
              rotate: [0, 360, 0],
            }}
            transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {/* Holographic Glow */}
        <motion.div
          style={{ ...styles.holographicGlow, ...responsiveStyles.holographicGlow }}
          animate={{ x: [0, 60, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Header Section */}
        <motion.div
          style={{ ...styles.header, ...responsiveStyles.header }}
          variants={headerVariants}
        >
          <motion.img
            src={profile}
            alt="Siva Satya Sai Bhagavan Profile"
            style={styles.profilePic}
            variants={profilePicVariants}
            initial='hidden'
            animate='visible'
            whileHover={{ scale: 1.15, rotate: 8, boxShadow: '0 0 70px rgba(59, 130, 246, 0.9)' }}
            transition={{ type: 'spring', stiffness: 220 }}
            tabIndex={0}
          />
          <motion.h2
            style={{ ...styles.title, ...responsiveStyles.title }}
            animate={{ skewX: [-1, 1, -1], animation: 'glitch 1.5s infinite' }}
          >
            👋 Hi, I'm <span style={{ color: '#c026d3' }}>Siva Satya Sai Bhagavan</span>
          </motion.h2>
          <motion.div style={styles.titleUnderline} animate={{ scaleX: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.p
            style={{ ...styles.introText, ...responsiveStyles.introText }}
            variants={contentChildVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.5 }}
          >
            🚀 Creative Technologist | Full-Stack Engineer | Data Science Enthusiast | AI&ML Developer
          </motion.p>
          <motion.button
            style={styles.button}
            variants={contentChildVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.6 }}
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
            transition={{ duration: 2.5, delay: 1 }}
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