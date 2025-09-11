import React, { useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaPython } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiExpress, SiFlask, SiTensorflow } from 'react-icons/si';
import profile from '../assets/profile.jpg';
import './Home.css';

// Custom Debounce Function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Starfield Component
const Starfield = ({ starCount = 120 }) => {
  return (
    <div className="starfield">
      {[...Array(starCount)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 2 + 1;
        return (
          <motion.div
            key={`star-${i}`}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: size,
              height: size,
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
          className="comet"
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

// Button Shine Component
const ButtonShine = ({ isActive }) => (
  <motion.div
    className="button-shine"
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

  return useMemo(() => windowWidth <= 480 ? 'small' :
                        windowWidth <= 768 ? 'medium' : 'large', [windowWidth]);
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
      className="tech-icon"
      whileHover={{
        scale: 1.15,
        rotate: 5,
        boxShadow: '0 0 20px rgba(0, 191, 255, 0.7)',
        background: 'rgba(0, 191, 255, 0.3)',
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
            className="tech-icon-inner"
          >
            {techData.icon}
          </motion.span>
          <span>{techData.label}</span>
          <motion.span
            className="tooltip"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {techData.tooltip}
          </motion.span>
        </>
      ) : (
        <span>{techData.label}</span>
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
      //{ icon: FaLinkedin, href: 'https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/', label: 'LinkedIn' },
      //{ icon: FaGithub, href: 'https://github.com/bhagavan444', label: 'GitHub' },
    ],
  },
];

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
const TimelineItem = memo(({ section, index, navigate, responsiveClass }) => {
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
      className="timeline-item"
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      viewport={{ once: true, margin: '-50px' }}
      role="article"
      aria-labelledby={`section-title-${index}`}
    >
      <motion.div
        className={`timeline-content ${index % 2 === 0 ? 'content-left' : 'content-right'} ${responsiveClass}`}
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 50px rgba(0, 191, 255, 0.3)',
        }}
        whileTap={{ scale: 0.98 }}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, () => section.button && navigate(section.button.path))}
      >
        <motion.div className="content-overlay" />
        <motion.h3
          id={`section-title-${index}`}
          className="card-title"
          variants={contentChildVariants}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          <IconComp className="card-icon" />
          {section.title}
        </motion.h3>
        {section.items.length > 0 && (
          <motion.ul
            className="achievement-list"
            variants={contentChildVariants}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            {section.items.map((item, i) => (
              <motion.li
                key={i}
                className="achievement-item"
                variants={contentChildVariants}
                transition={{ delay: index * 0.15 + 0.4 + i * 0.1 }}
              >
                <FaStar className="star-icon" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
        {section.skills && (
          <>
            <motion.p
              className="tech-label"
              variants={contentChildVariants}
              transition={{ delay: index * 0.15 + 0.7 }}
            >
              🔧 Skills & Technologies:
            </motion.p>
            <motion.div
              className="tech-container"
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
            className="timeline-button"
            variants={contentChildVariants}
            transition={{ delay: index * 0.15 + 0.9 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 191, 255, 0.7)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(section.button.path)}
            onKeyDown={(e) => handleKeyDown(e, () => navigate(section.button.path))}
            aria-label={`Navigate to ${section.button.text}`}
          >
            <motion.span className="button-content">
              {section.button.text}
              <FaStar size={14} />
            </motion.span>
            <ButtonShine isActive={true} />
          </motion.button>
        )}
        {section.socials && (
          <motion.div
            className="socials"
            variants={contentChildVariants}
            transition={{ delay: index * 0.15 + 1.0 }}
          >
            {section.socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className="social-icon"
                whileHover={{
                  scale: 1.2,
                  boxShadow: '0 0 15px rgba(0, 191, 255, 0.7)',
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 350 }}
                aria-label={`Visit ${social.label}`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, () => window.open(social.href, '_blank'))}
              >
                <social.icon />
                <motion.span className="tooltip">{social.label}</motion.span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>
      <motion.div
        className="icon-wrapper"
        variants={contentChildVariants}
        transition={{ delay: index * 0.15 + 1.1 }}
      >
        <IconComp size="clamp(18px, 2.2vw, 28px)" />
      </motion.div>
    </motion.div>
  );
});

// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const responsiveClass = useResponsiveStyles();
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
    <ResponsiveContext.Provider value={responsiveClass}>
      <motion.section
        ref={ref}
        className={`home-container ${responsiveClass}`}
        style={{ opacity, scale, background: backgroundGradient }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        onMouseMove={handleMouseMove}
        role="region"
        aria-label="Portfolio Home Section"
      >
        <Starfield />
        <motion.div
          className="header"
          variants={headerVariants}
        >
          <div className="header-glow" />
          <motion.img
            src={profile}
            alt="Siva Satya Sai Bhagavan Profile"
            className="profile-pic"
            variants={profilePicVariants}
            whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(0, 191, 255, 0.7)', rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 220 }}
            tabIndex={0}
          />
          <motion.h2 className="title">
            👋 Hi, I'm <span>Siva Satya Sai Bhagavan</span>
          </motion.h2>
          <motion.div
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: 'clamp(160px, 30vw, 240px)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <motion.p
            className="intro-text"
            variants={contentChildVariants}
            transition={{ delay: 0.3 }}
          >
            🚀 Creative Technologist | Full-Stack Engineer | Data Science Enthusiast | AI&ML Developer
          </motion.p>
          <motion.button
            className="header-button"
            variants={contentChildVariants}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 191, 255, 0.7)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/Projects')}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/Projects')}
            aria-label="View My Experience"
            tabIndex={0}
          >
            <motion.span className="button-content">
              View My Experience →
              <FaStar size={14} />
            </motion.span>
            <ButtonShine isActive={true} />
          </motion.button>
        </motion.div>
        <motion.div
          className="timeline"
          variants={containerVariants}
        >
          <motion.div
            className="timeline-line"
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
                responsiveClass={responsiveClass}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>
    </ResponsiveContext.Provider>
  );
};

export default memo(Home);