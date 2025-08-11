import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaPython } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiExpress, SiFlask, SiTensorflow } from 'react-icons/si';
import profile from '../assets/profile.jpg';

// Enhanced Tech/Skills icon mapping with tooltips
const getTechIcons = (tech) => {
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

  return tech.split(', ').map((t, i) => (
    <motion.span
      key={i}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'clamp(6px, 1vw, 8px)',
        margin: 'clamp(4px, 0.8vw, 6px)',
        padding: 'clamp(4px, 0.8vw, 6px) clamp(8px, 1.5vw, 10px)',
        background: 'rgba(59, 130, 246, 0.15)',
        borderRadius: 'clamp(8px, 1.2vw, 10px)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        position: 'relative',
      }}
      whileHover={{
        scale: 1.15,
        rotate: 5,
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
        background: 'rgba(59, 130, 246, 0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {iconMap[t] ? (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            style={{ color: '#3b82f6', textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
          >
            {iconMap[t].icon}
          </motion.span>
          <span style={{ color: '#e0e7ff', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
            {iconMap[t].label}
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
              background: 'rgba(10, 0, 30, 0.9)',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              zIndex: 10,
            }}
          >
            {iconMap[t].tooltip}
          </motion.span>
        </>
      ) : (
        <span style={{ color: '#d1d5db', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>{t}</span>
      )}
    </motion.span>
  ));
};

// Data
const homeData = [
  {
    title: 'About Me',
    items: [
      'Final Year B.Tech AI&DS Student with a strong foundation in Full Stack Development, Data Science, and Python.',
      'Passionate about solving real-world problems with innovative and scalable tech solutions.',
    ],
    button: { text: 'Learn More →', path: '/about' },
    icon: FaStar,
  },
  {
    title: 'My Work Experience',
    items: [
      'Interned at Blackbucks Paid Online in AIML & Data Science.',
      'Participated in 24-hour Hackathons and built full-stack applications like an Online 2nd Hand Electronics Selling Platform.',
    ],
    skills: 'Python, TensorFlow',
    button: { text: 'View Internships →', path: '/Internships' },
    icon: FaStar,
  },
  {
    title: 'My Skills',
    items: [
      'Proficient in JavaScript, Python, React, Node.js, MongoDB, TensorFlow, and more.',
      'Experienced in building AI-driven applications and scalable web solutions.',
    ],
    skills: 'JavaScript, Python, React, Node.js, MongoDB, TensorFlow, HTML5, CSS3, Express, Tailwind CSS, Flask, Git',
    button: { text: 'Explore Skills →', path: '/MySkills' },
    icon: FaStar,
  },
  {
    title: 'Achievements',
    items: [
      '🏆 Built a Resume Builder with 90%+ ATS Score Support',
      '🥇 Won Hackathon in RCE with Brainovision',
      '📜 Completed multiple workshops in AI, Web Development, and Mobile App Development',
      '💡 Developed AI Chatbot and Career Recommendation System Using MERN Stack',
    ],
    icon: FaStar,
  },
  {
    title: 'Let’s Connect',
    items: [
      'I’m open to freelance projects, internships, and collaboration opportunities.',
      'Feel free to reach out on any of the platforms below!',
    ],
    button: { text: 'Let’s Connect →', path: '/contact' },
    icon: FaStar,
    socials: [
      { icon: FaFacebookF, href: 'https://facebook.com' },
      { icon: FaTwitter, href: 'https://twitter.com' },
      { icon: FaInstagram, href: 'https://instagram.com' },
      { icon: FaLinkedin, href: 'https://linkedin.com' },
      { icon: FaYoutube, href: 'https://youtube.com' },
      { icon: FaGithub, href: 'https://github.com' },
    ],
  },
];

// Updated Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3rem)',
    background: 'linear-gradient(155deg, #0d0026, #1a0033, #2a0055, #3b82f6)',
    backgroundSize: '600% 600%',
    color: '#f5f7fa',
    overflowX: 'hidden',
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
    width: 'clamp(500px, 70vw, 800px)',
    height: 'clamp(500px, 70vw, 800px)',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45), transparent 60%)',
    top: '-20%',
    left: '-20%',
    filter: 'blur(150px)',
    zIndex: -1,
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(2.5rem, 4.5vw, 4rem)',
    background: 'rgba(10, 0, 30, 0.85)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(16px, 2.2vw, 20px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(59, 130, 246, 0.3)',
    backdropFilter: 'blur(16px)',
    maxWidth: 'clamp(700px, 90vw, 1100px)',
    margin: '0 auto clamp(3rem, 6vw, 5rem)',
  },
  title: {
    fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
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
    background: 'linear-gradient(to bottom, #3b82f6, #c026d3)',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 'clamp(1.8rem, 3.5vw, 3rem)',
  },
  content: {
    background: 'rgba(10, 0, 30, 0.9)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 4vw, 3rem)',
    width: 'clamp(300px, 45%, 600px)',
    textAlign: 'left',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(59, 130, 246, 0.25)',
    position: 'relative',
    overflow: 'hidden',
  },
  contentLeft: { marginRight: 'auto' },
  contentRight: { marginLeft: 'auto' },
  contentOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    zIndex: -1,
    opacity: 0.45,
  },
  cardTitle: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
    color: '#3b82f6',
    textShadow: '0 0 18px rgba(59, 130, 246, 0.6)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  cardDescription: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
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
  },
  button: {
    padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3)',
    color: '#f5f7fa',
    borderRadius: 'clamp(10px, 1.5vw, 14px)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.7vw, 0.5rem)',
    cursor: 'pointer',
  },
  socials: {
    display: 'flex',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    justifyContent: 'center',
    marginTop: 'clamp(1.5rem, 3vw, 2rem)',
  },
  socialIcon: {
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    color: '#3b82f6',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
  },
  profilePic: {
    borderRadius: '50%',
    border: '5px solid rgba(59, 130, 246, 0.7)',
    boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
    width: 'clamp(150px, 20vw, 220px)',
    height: 'clamp(150px, 20vw, 220px)',
    objectFit: 'cover',
    margin: '0 auto clamp(1rem, 2vw, 1.5rem)',
    display: 'block',
  },
  iconWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #3b82f6, #c026d3)',
    borderRadius: '50%',
    padding: 'clamp(0.5rem, 1.2vw, 1rem)',
    boxShadow: '0 0 25px rgba(59, 130, 246, 0.9)',
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
      holographicGlow: { width: 'clamp(500px, 65vw, 800px)', height: 'clamp(500px, 65vw, 800px)', top: '-20%', left: '-20%' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.5vw, 1rem)' },
      content: { padding: 'clamp(1.8rem, 3vw, 2.5rem)', width: 'clamp(280px, 45%, 500px)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 600px)', height: 'clamp(400px, 55vw, 600px)', top: '-15%', left: '-15%' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      timeline: { padding: '0 clamp(0.5rem, 1.2vw, 0.8rem)' },
      content: { padding: 'clamp(1.5rem, 2.5vw, 2rem)', width: 'clamp(260px, 80%, 400px)' },
      cardTitle: { fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)' },
      cardDescription: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
    },
  },
};

// Enhanced Animation Styles
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
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  @keyframes rotateIcon {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(2); opacity: 0; }
  }
`;

// Updated Animation Variants
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
  hidden: { opacity: 0, x: -40, rotate: -10 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6 } },
};

const profilePicVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.2, type: 'spring', stiffness: 120, damping: 15 },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  // Apply responsive styles
  const responsiveStyles = windowWidth <= 480 ? styles.responsive.small :
                         windowWidth <= 768 ? styles.responsive.medium :
                         styles.responsive.large;

  return (
    <motion.section
      ref={ref}
      style={{ ...styles.container, ...responsiveStyles.container, opacity, scale, rotate }}
      variants={containerVariants}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      role='region'
      aria-label='Home section'
    >
      <style>{animationStyles}</style>
      {/* Enhanced Background Particles */}
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
        style={{ ...styles.holographicGlow, ...responsiveStyles.holographicGlow, animation: 'glowShift 12s ease-in-out infinite' }}
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
          whileHover={{ scale: 1.1, rotate: 5, boxShadow: '0 0 60px rgba(59, 130, 246, 0.8)' }}
          transition={{ type: 'spring', stiffness: 200 }}
        />
        <h2 style={{ ...styles.title, ...responsiveStyles.title, animation: 'holographicPulse 2.5s ease-in-out infinite alternate' }}>
          👋 Hi, I'm <span style={{ color: '#c026d3' }}>Siva Satya Sai Bhagavan</span>
        </h2>
        <div style={styles.titleUnderline} />
        <p style={{ ...styles.introText, ...responsiveStyles.introText }}>
          🚀 Creative Technologist | Full-Stack Engineer | Data Science Enthusiast | AI&ML Developer
        </p>
        <motion.div
          style={styles.button}
          variants={contentChildVariants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.15, boxShadow: '0 15px 50px rgba(192, 38, 211, 0.6)', translateY: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/Projects')}
        >
          View My Experience →
        </motion.div>
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
          transition={{ duration: 2, delay: 0.8 }}
        />
        <AnimatePresence>
          {homeData.map((section, index) => {
            const IconComp = section.icon;
            return (
              <motion.div
                key={section.title}
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
                  whileHover={{ scale: 1.05, rotateY: 5, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)' }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <motion.div
                    style={{ ...styles.contentOverlay, animation: 'rotateGlow 8s linear infinite' }}
                  />
                  <motion.h3
                    style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
                    variants={contentChildVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                    {section.title}
                  </motion.h3>
                  {section.items.length > 0 && (
                    <motion.ul
                      style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}
                      variants={contentChildVariants}
                      initial='hidden'
                      animate='visible'
                      transition={{ delay: index * 0.15 + 0.3 }}
                    >
                      {section.items.map((item, i) => (
                        <motion.li
                          key={i}
                          style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                          variants={contentChildVariants}
                          initial='hidden'
                          animate='visible'
                          transition={{ delay: index * 0.15 + 0.4 + i * 0.1 }}
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
                        transition={{ delay: index * 0.15 + 0.7 }}
                      >
                        🔧 Skills & Technologies:
                      </motion.p>
                      <motion.div
                        style={styles.techContainer}
                        variants={contentChildVariants}
                        initial='hidden'
                        animate='visible'
                        transition={{ delay: index * 0.15 + 0.8 }}
                      >
                        {getTechIcons(section.skills)}
                      </motion.div>
                    </>
                  )}
                  {section.button && (
                    <motion.div
                      style={styles.button}
                      variants={contentChildVariants}
                      initial='hidden'
                      animate='visible'
                      transition={{ delay: index * 0.15 + 0.9 }}
                      whileHover={{
                        scale: 1.15,
                        boxShadow: '0 15px 50px rgba(192, 38, 211, 0.6)',
                        translateY: -3,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(section.button.path)}
                    >
                      {section.button.text}
                      <motion.div
                        style={{ marginLeft: '8px' }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <FaStar size={14} />
                      </motion.div>
                    </motion.div>
                  )}
                  {section.socials && (
                    <motion.div
                      style={styles.socials}
                      variants={contentChildVariants}
                      initial='hidden'
                      animate='visible'
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
                            rotate: 360,
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
                          }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <social.icon />
                          <motion.div
                            style={{
                              position: 'absolute',
                              width: 'clamp(20px, 3vw, 30px)',
                              height: 'clamp(20px, 3vw, 30px)',
                              borderRadius: '50%',
                              background: 'rgba(59, 130, 246, 0.3)',
                            }}
                            animate={{ scale: [0, 2], opacity: [0.6, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
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
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.15 + 1.3 }}
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

export default Home;