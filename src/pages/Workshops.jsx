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
      label: 'HTML/CSS',
      tooltip: 'Core technologies for web development',
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
        background: 'rgba(34, 197, 94, 0.15)',
        borderRadius: 'clamp(8px, 1.2vw, 10px)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        position: 'relative',
      }}
      whileHover={{
        scale: 1.15,
        rotate: 5,
        boxShadow: '0 0 20px rgba(34, 197, 94, 0.7)',
        background: 'rgba(34, 197, 94, 0.3)',
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
            style={{ color: '#22c55e', textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
          >
            {iconMap[t].icon}
          </motion.span>
          <span style={{ color: '#ecfdf5', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
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
              background: 'rgba(17, 24, 39, 0.9)',
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

// Workshop Data
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

// New Styles with a vibrant, modern aesthetic
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)',
    background: 'linear-gradient(135deg, #111827, #1f2937, #374151, #22c55e)',
    backgroundSize: '1000% 1000%',
    color: '#ecfdf5',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '2500px',
    fontFamily: "'Inter', 'Roboto', sans-serif",
    willChange: 'background, transform',
    animation: 'gradientFlow 15s ease-in-out infinite',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 15% 25%, rgba(34, 197, 94, 0.3), transparent 50%),
      radial-gradient(circle at 85% 75%, rgba(236, 72, 153, 0.3), transparent 50%),
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
    background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4), rgba(236, 72, 153, 0.3), transparent 60%)',
    top: '-25%',
    left: '-25%',
    filter: 'blur(180px)',
    zIndex: -2,
    animation: 'glowOrbit 20s linear infinite',
  },
  header: {
    textAlign: 'center',
    padding: 'clamp(3rem, 6vw, 5rem)',
    background: 'rgba(17, 24, 39, 0.95)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9), 0 0 60px rgba(34, 197, 94, 0.4)',
    backdropFilter: 'blur(20px)',
    maxWidth: 'clamp(800px, 90vw, 1400px)',
    margin: '0 auto clamp(4rem, 8vw, 6rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    background: 'conic-gradient(from 45deg, rgba(34, 197, 94, 0.5), rgba(236, 72, 153, 0.5), transparent)',
    opacity: 0.7,
    zIndex: -1,
  },
  title: {
    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
    fontWeight: 800,
    color: 'transparent',
    background: 'linear-gradient(90deg, #22c55e, #ec4899, #facc15)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 40px rgba(34, 197, 94, 0.8), 0 0 60px rgba(236, 72, 153, 0.6)',
    marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
    letterSpacing: '0.15em',
    animation: 'textShine 2s ease-in-out infinite alternate',
  },
  titleUnderline: {
    width: 'clamp(200px, 40vw, 300px)',
    height: '8px',
    background: 'linear-gradient(90deg, #22c55e, #ec4899)',
    borderRadius: '8px',
    margin: '1rem auto',
    boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)',
  },
  introText: {
    fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
    color: '#ecfdf5',
    maxWidth: 'clamp(600px, 80vw, 900px)',
    margin: '0 auto clamp(1.5rem, 3vw, 2rem)',
    lineHeight: '1.7',
    textShadow: '0 0 15px rgba(34, 197, 94, 0.5)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(320px, 45vw, 400px), 1fr))',
    gap: 'clamp(2.5rem, 5vw, 4rem)',
    maxWidth: 'clamp(900px, 95vw, 2000px)',
    margin: '0 auto',
    perspective: '2500px',
  },
  card: {
    background: 'rgba(17, 24, 39, 0.95)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    padding: 'clamp(2.5rem, 5vw, 3.5rem)',
    textAlign: 'left',
    backdropFilter: 'blur(25px)',
    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(34, 197, 94, 0.3)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(34, 197, 94, 0.6), rgba(236, 72, 153, 0.6), transparent)',
    zIndex: -1,
    opacity: 0.7,
    animation: 'borderGlow 2s ease-in-out infinite',
  },
  cardTitle: {
    fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
    color: '#22c55e',
    textShadow: '0 0 20px rgba(34, 197, 94, 0.7)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.5rem, 1vw, 0.8rem)',
  },
  cardDescription: {
    fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
    color: '#ecfdf5',
    marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    lineHeight: '1.7',
    textShadow: '0 0 15px rgba(34, 197, 94, 0.5)',
  },
  techLabel: {
    fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
    color: '#ec4899',
    fontWeight: '600',
    marginTop: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    textShadow: '0 0 15px rgba(236, 72, 153, 0.6)',
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(10px, 2vw, 12px)',
    marginTop: 'clamp(0.8rem, 2vw, 1.2rem)',
    marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)',
  },
  achievementsLabel: {
    fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
    color: '#22c55e',
    fontWeight: '600',
    marginTop: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    textShadow: '0 0 15px rgba(34, 197, 94, 0.6)',
  },
  achievementList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: 'clamp(0.8rem, 1.5vw, 1.2rem)',
  },
  achievementItem: {
    fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
    color: '#d1d5db',
    marginBottom: 'clamp(0.6rem, 1.2vw, 1rem)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.5rem, 1vw, 0.8rem)',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 4vw, 3rem)' },
      header: { padding: 'clamp(3rem, 6vw, 5rem)' },
      title: { fontSize: 'clamp(3rem, 7vw, 5.5rem)' },
      introText: { fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' },
      grid: { gap: 'clamp(2.5rem, 5vw, 4rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(320px, 45vw, 400px), 1fr))' },
      card: { padding: 'clamp(2.5rem, 5vw, 3.5rem)' },
      cardTitle: { fontSize: 'clamp(1.6rem, 3.5vw, 2rem)' },
      cardDescription: { fontSize: 'clamp(1rem, 2.2vw, 1.3rem)' },
      glowEffect: { width: 'clamp(600px, 80vw, 1000px)', height: 'clamp(600px, 80vw, 1000px)' },
    },
    medium: {
      container: { padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem)' },
      header: { padding: 'clamp(2rem, 4.5vw, 3.5rem)' },
      title: { fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' },
      introText: { fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' },
      grid: { gap: 'clamp(2rem, 4vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 40vw, 360px), 1fr))' },
      card: { padding: 'clamp(2rem, 4vw, 3rem)' },
      cardTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      cardDescription: { fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' },
      glowEffect: { width: 'clamp(400px, 70vw, 700px)', height: 'clamp(400px, 70vw, 700px)' },
    },
    small: {
      container: { padding: 'clamp(2rem, 6vw, 4rem) clamp(0.8rem, 2.5vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3.5vw, 2.5rem)' },
      title: { fontSize: 'clamp(2rem, 5vw, 3.5rem)' },
      introText: { fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' },
      grid: { gap: 'clamp(1.5rem, 3vw, 2.5rem)', gridTemplateColumns: '1fr' },
      card: { padding: 'clamp(1.5rem, 3vw, 2.5rem)' },
      cardTitle: { fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)' },
      cardDescription: { fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' },
      glowEffect: { width: 'clamp(300px, 60vw, 600px)', height: 'clamp(300px, 60vw, 600px)' },
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
    0%, 100% { opacity: 0.85; }
    50% { opacity: 1; }
  }
  @keyframes glowOrbit {
    0% { transform: rotate(0deg); filter: brightness(1); }
    50% { transform: rotate(180deg); filter: brightness(1.3); }
    100% { transform: rotate(360deg); filter: brightness(1); }
  }
  @keyframes textShine {
    0%, 100% { opacity: 1; text-shadow: 0 0 40px rgba(34, 197, 94, 0.8), 0 0 60px rgba(236, 72, 153, 0.6); }
    50% { opacity: 0.9; text-shadow: 0 0 30px rgba(34, 197, 94, 0.6), 0 0 45px rgba(236, 72, 153, 0.5); }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: rgba(34, 197, 94, 0.3); box-shadow: 0 0 15px rgba(34, 197, 94, 0.5); }
    50% { border-color: rgba(34, 197, 94, 0.7); box-shadow: 0 0 30px rgba(34, 197, 94, 0.8); }
  }
  @keyframes particleDrift {
    0% { transform: translateY(0) scale(1); opacity: 0.7; }
    50% { transform: translateY(-60px) scale(1.3); opacity: 0.4; }
    100% { transform: translateY(-120px) scale(1); opacity: 0; }
  }
`;

// Animation Variants
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
  hidden: { opacity: 0, y: -150, rotateX: -25 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1.5,
      type: 'spring',
      stiffness: 180,
      damping: 20,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 200, scale: 0.7, rotateY: -45 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1,
      type: 'spring',
      stiffness: 160,
      damping: 18,
    },
  },
  
};

const cardChildVariants = {
  hidden: { opacity: 0, x: -40, rotate: -10 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.6 },
  },
};

const Workshops = () => {
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [-10, 0]);

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
      aria-label="Workshops section"
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
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(34, 197, 94, 0.4))',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
            zIndex: -2,
            boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
          }}
          animate={{
            y: [0, -80, -160],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.7, 0.4, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, ease: 'easeOut', delay: Math.random() * 1.5 }}
        />
      ))}
      {/* Glow Effect */}
      <motion.div
        style={{ ...styles.glowEffect, ...responsiveStyles.glowEffect }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [-50, 50, -50],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Header Section */}
      <motion.div
        style={{ ...styles.header, ...responsiveStyles.header }}
        variants={headerVariants}
      >
        <div style={styles.headerGlow} />
        <h2 style={{ ...styles.title, ...responsiveStyles.title }}>
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                whileHover="hover"
              >
                <motion.div style={styles.cardOverlay} />
                <motion.h3
                  style={{ ...styles.cardTitle, ...responsiveStyles.cardTitle }}
                  variants={cardChildVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <IconComp style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }} />
                  {workshop.title}
                </motion.h3>
                <motion.p
                  style={{ ...styles.cardDescription, ...responsiveStyles.cardDescription }}
                  variants={cardChildVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  {workshop.description}
                </motion.p>
                <motion.p
                  style={styles.techLabel}
                  variants={cardChildVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  🔧 Tech Used:
                </motion.p>
                <motion.div
                  style={styles.techContainer}
                  variants={cardChildVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  {getTechIcons(workshop.tech)}
                </motion.div>
                {workshop.achievements && (
                  <>
                    <motion.p
                      style={styles.achievementsLabel}
                      variants={cardChildVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.15 + 0.6 }}
                    >
                      🏆 Achievements:
                    </motion.p>
                    <motion.ul
                      style={styles.achievementList}
                      variants={cardChildVariants}
                      initial="hidden"
                      animate="visible"
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
                          <FaBrain style={{ color: '#22c55e' }} />
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