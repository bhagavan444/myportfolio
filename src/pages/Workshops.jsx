import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { FaCode, FaLaptopCode, FaMobileAlt, FaBrain, FaCogs, FaDatabase } from 'react-icons/fa';
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
  SiFlutter,
  SiKeras,
} from 'react-icons/si';

// Tech icon mapping function with tooltips
const getTechIcons = (tech) => {
  const iconMap = {
    MongoDB: { icon: <SiMongodb />, label: 'MongoDB', tooltip: 'NoSQL database for scalable applications' },
    Express: { icon: <SiExpress />, label: 'Express', tooltip: 'Web framework for Node.js' },
    'Express.js': { icon: <SiExpress />, label: 'Express.js', tooltip: 'Web framework for Node.js' },
    React: { icon: <SiReact />, label: 'React', tooltip: 'UI library for building interactive apps' },
    'React.js': { icon: <SiReact />, label: 'React.js', tooltip: 'UI library for building interactive apps' },
    Node: { icon: <SiNodedotjs />, label: 'Node.js', tooltip: 'JavaScript runtime for server-side development' },
    'Node.js': { icon: <SiNodedotjs />, label: 'Node.js', tooltip: 'JavaScript runtime for server-side development' },
    Flask: { icon: <SiFlask />, label: 'Flask', tooltip: 'Lightweight Python web framework' },
    Python: { icon: <SiPython />, label: 'Python', tooltip: 'Versatile programming language for AI and web' },
    Firebase: { icon: <SiFirebase />, label: 'Firebase', tooltip: 'Backend platform for app development' },
    'Firebase Auth': { icon: <SiFirebase />, label: 'Firebase Auth', tooltip: 'Authentication service by Firebase' },
    HTML: { icon: <SiHtml5 />, label: 'HTML', tooltip: 'Markup language for web structure' },
    CSS: { icon: <SiCss3 />, label: 'CSS', tooltip: 'Styling language for web design' },
    CSS3: { icon: <SiCss3 />, label: 'CSS3', tooltip: 'Advanced CSS features' },
    'HTML/CSS': {
      icon: (
        <>
          <SiHtml5 /> <SiCss3 />
        </>
      ),
      label: 'HTML/CSS', tooltip: 'Core technologies for web development'
    },
    'Scikit-learn': { icon: <SiScikitlearn />, label: 'Scikit-learn', tooltip: 'Machine learning library in Python' },
    TensorFlow: { icon: <SiTensorflow />, label: 'TensorFlow', tooltip: 'ML framework for deep learning' },
    Pandas: { icon: <SiPandas />, label: 'Pandas', tooltip: 'Data manipulation and analysis library' },
    Numpy: { icon: <SiNumpy />, label: 'Numpy', tooltip: 'Numerical computing library' },
    Numpys: { icon: <SiNumpy />, label: 'Numpy', tooltip: 'Numerical computing library' },
    OpenAI: { icon: <SiOpenai />, label: 'OpenAI', tooltip: 'AI research and deployment platform' },
    'OpenAI API': { icon: <SiOpenai />, label: 'OpenAI API', tooltip: 'API for AI model integration' },
    Socket: { icon: <SiSocketdotio />, label: 'Socket.io', tooltip: 'Real-time communication library' },
    'Socket.io': { icon: <SiSocketdotio />, label: 'Socket.io', tooltip: 'Real-time communication library' },
    Cloudinary: { icon: <SiCloudinary />, label: 'Cloudinary', tooltip: 'Cloud-based media management' },
    TFIDF: { icon: null, label: 'TF-IDF', tooltip: 'Text processing technique for NLP' },
    'TF-IDF': { icon: null, label: 'TF-IDF', tooltip: 'Text processing technique for NLP' },
    NLTK: { icon: null, label: 'NLTK', tooltip: 'Natural language processing toolkit' },
    Keras: { icon: <SiKeras />, label: 'Keras', tooltip: 'High-level neural networks API' },
    LangChain: { icon: null, label: 'LangChain', tooltip: 'Framework for building LLM applications' },
    Flutter: { icon: <SiFlutter />, label: 'Flutter', tooltip: 'Cross-platform mobile app framework' },
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

// Updated Workshop Data with achievements
const workshops = [
  {
    title: '🔍 Machine Learning (ML)',
    description: 'Hands-on experience with supervised and unsupervised learning techniques. Explored model building, evaluation, and tuning using Scikit-learn.',
    tech: 'Python, Scikit-learn, Pandas, Numpy',
    icon: FaBrain,
    achievements: ['Built a predictive model with 95% accuracy', 'Won best project award'],
  },
  {
    title: '🧠 Deep Learning (DL)',
    description: 'Built CNNs for image classification using TensorFlow and Keras. Understood backpropagation, activation functions, and optimization techniques.',
    tech: 'Python, TensorFlow, Keras',
    icon: FaCogs,
    achievements: ['Developed a real-time image classifier', 'Presented at a tech conference'],
  },
  {
    title: '📱 Mobile App Development',
    description: 'Developed cross-platform mobile apps using Flutter. Focused on UI/UX principles, navigation, and state management with REST API integration.',
    tech: 'Flutter, Dart',
    icon: FaMobileAlt,
    achievements: ['Published app on Google Play Store', 'Received 4.5-star rating'],
  },
  {
    title: '🌐 Web Development',
    description: 'Created responsive web applications using HTML, CSS, JavaScript, and React. Mastered component-based architecture and frontend optimization.',
    tech: 'HTML, CSS3, JavaScript, React',
    icon: FaCode,
    achievements: ['Optimized site for 2s load time', 'Led a team of 3 developers'],
  },
  {
    title: '🤖 Introduction to Artificial Intelligence',
    description: 'Explored AI fundamentals, real-world use cases, ethical considerations, and logic-based AI systems through interactive sessions.',
    tech: 'Python, OpenAI API',
    icon: FaLaptopCode,
    achievements: ['Created an AI chatbot prototype', 'Top performer in workshop'],
  },
  {
    title: '💻 Full Stack Development Bootcamp',
    description: 'Completed a comprehensive MERN stack bootcamp. Built and deployed full-stack apps with Express.js, MongoDB, React, and Node.js.',
    tech: 'MongoDB, Express.js, React, Node.js, Socket.io',
    icon: FaDatabase,
    achievements: ['Deployed app with 99.9% uptime', 'Integrated real-time chat feature'],
  },
];

// Updated Styles to match Education.jsx
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 45vw, 360px), 1fr))',
    gap: 'clamp(1.8rem, 3.5vw, 3rem)',
    maxWidth: 'clamp(800px, 95vw, 1600px)',
    margin: '0 auto',
    perspective: '1600px',
  },
  card: {
    background: 'rgba(10, 0, 30, 0.9)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 4vw, 3rem)',
    textAlign: 'left',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(59, 130, 246, 0.25)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
  },
  cardOverlay: {
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
  },
  achievementsLabel: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#3b82f6',
    fontWeight: 'bold',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
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
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      grid: { gap: 'clamp(1.8rem, 3.5vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(320px, 45vw, 380px), 1fr))' },
      card: { padding: 'clamp(2rem, 3.5vw, 2.8rem)' },
      cardTitle: { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)' },
      cardDescription: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(500px, 65vw, 800px)', height: 'clamp(500px, 65vw, 800px)', top: '-20%', left: '-20%' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      grid: { gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 340px), 1fr))', gap: 'clamp(1.5rem, 3vw, 2.5rem)' },
      card: { padding: 'clamp(1.8rem, 3vw, 2.5rem)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 600px)', height: 'clamp(400px, 55vw, 600px)', top: '-15%', left: '-15%' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      grid: { gridTemplateColumns: '1fr', gap: 'clamp(1.2rem, 2.5vw, 2rem)' },
      card: { padding: 'clamp(1.5rem, 2.5vw, 2rem)' },
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

const cardVariants = {
  hidden: { opacity: 0, y: 120, scale: 0.8, rotateY: -25 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1, type: 'spring', stiffness: 140, damping: 16 },
  },
};

const cardChildVariants = {
  hidden: { opacity: 0, x: -40, rotate: -10 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6 } },
};

const Workshops = () => {
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
      aria-label='Workshops section'
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
        <h2 style={{ ...styles.title, ...responsiveStyles.title, animation: 'holographicPulse 2.5s ease-in-out infinite alternate' }}>
          📖 Technical Workshops
        </h2>
        <div style={styles.titleUnderline} />
        <p style={{ ...styles.introText, ...responsiveStyles.introText }}>
          Immersive workshops where I honed my skills in cutting-edge technologies, from AI and machine learning to full-stack and mobile app development.
        </p>
      </motion.div>
      {/* Workshops Grid */}
      <motion.div
        style={{ ...styles.grid, ...responsiveStyles.grid }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {workshops.map((workshop, index) => {
            const IconComp = workshop.icon;
            return (
              <motion.div
                key={index}
                style={{ ...styles.card, ...responsiveStyles.card }}
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-50px' }}
    
              >
                <motion.div
                  style={{ ...styles.cardOverlay, animation: 'rotateGlow 8s linear infinite' }}
                />
                <motion.h3
                  style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                  {workshop.title}
                </motion.h3>
                <motion.p
                  style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  {workshop.description}
                </motion.p>
                <motion.p
                  style={styles.techLabel}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  🔧 Tech Used:
                </motion.p>
                <motion.div
                  style={styles.techContainer}
                  variants={cardChildVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  {getTechIcons(workshop.tech)}
                </motion.div>
                {workshop.achievements && (
                  <>
                    <motion.p
                      style={styles.achievementsLabel}
                      variants={cardChildVariants}
                      initial='hidden'
                      animate='visible'
                      transition={{ delay: index * 0.15 + 0.6 }}
                    >
                      🏆 Achievements:
                    </motion.p>
                    <motion.ul
                      style={styles.achievementList}
                      variants={cardChildVariants}
                      initial='hidden'
                      animate='visible'
                      transition={{ delay: index * 0.15 + 0.7 }}
                    >
                      {workshop.achievements.map((ach, achIndex) => (
                        <motion.li
                          key={achIndex}
                          style={styles.achievementItem}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + 0.8 + achIndex * 0.1 }}
                        >
                          <FaBrain style={{ color: '#3b82f6' }} />
                          {ach}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default Workshops;