import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter, FaStar } from 'react-icons/fa';

// Inline Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)',
    background: 'linear-gradient(155deg, #0d0026, #1a0033, #2a0055, #3b0088)',
    backgroundSize: '600% 600%',
    color: '#f5f7fa',
    overflow: 'hidden',
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
    width: 'clamp(500px, 65vw, 800px)',
    height: 'clamp(500px, 65vw, 800px)',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45), transparent 60%)',
    top: '-20%',
    left: '-20%',
    filter: 'blur(150px)',
    zIndex: -1,
  },
  card: {
    background: 'rgba(10, 0, 30, 0.9)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 3.5vw, 2.8rem)',
    maxWidth: 'clamp(500px, 80vw, 800px)',
    margin: '0 auto',
    textAlign: 'center',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(59, 130, 246, 0.25)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    zIndex: -1,
    opacity: 0.45,
  },
  title: {
    fontSize: 'clamp(1.5rem, 3.2vw, 2rem)',
    fontWeight: 800,
    color: 'transparent',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3, #4c1d95)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 18px rgba(59, 130, 246, 0.6)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    letterSpacing: '0.12em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  titleAccent: {
    width: 'clamp(160px, 30vw, 240px)',
    height: '5px',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3)',
    borderRadius: '5px',
    margin: '0.6rem auto 1.5rem',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
  },
  description: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    maxWidth: 'clamp(500px, 80vw, 800px)',
    margin: '0 auto clamp(1rem, 2vw, 1.5rem)',
    lineHeight: '1.7',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    width: '100%',
    maxWidth: 'clamp(400px, 75vw, 500px)',
    margin: '0 auto',
  },
  input: {
    padding: 'clamp(0.6rem, 1.5vw, 1rem)',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#e0e7ff',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  textarea: {
    padding: 'clamp(0.6rem, 1.5vw, 1rem)',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#e0e7ff',
    outline: 'none',
    minHeight: 'clamp(100px, 20vw, 140px)',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  button: {
    padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3)',
    border: 'none',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    fontWeight: 600,
    color: '#f0faff',
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  socialContainer: {
    display: 'flex',
    gap: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    justifyContent: 'center',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
  },
  socialIcon: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    color: '#e0e7ff',
    transition: 'transform 0.3s ease, color 0.3s ease',
  },
  feedback: {
    marginTop: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    color: '#e0e7ff',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    textAlign: 'center',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      card: { padding: 'clamp(2rem, 3.5vw, 2.8rem)', maxWidth: 'clamp(500px, 80vw, 800px)' },
      title: { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)' },
      description: { fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)', maxWidth: 'clamp(500px, 80vw, 800px)' },
      input: { padding: 'clamp(0.6rem, 1.5vw, 1rem)' },
      button: { padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)' },
      holographicGlow: { width: 'clamp(500px, 65vw, 800px)', height: 'clamp(500px, 65vw, 800px)', top: '-20%', left: '-20%' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      card: { padding: 'clamp(1.8rem, 3vw, 2.5rem)', maxWidth: 'clamp(400px, 80vw, 600px)' },
      title: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      description: { fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', maxWidth: 'clamp(400px, 75vw, 600px)' },
      input: { padding: 'clamp(0.5rem, 1.2vw, 0.8rem)' },
      button: { padding: 'clamp(0.5rem, 1.2vw, 0.8rem) clamp(1rem, 2vw, 1.5rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 600px)', height: 'clamp(400px, 55vw, 600px)', top: '-15%', left: '-15%' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      card: { padding: 'clamp(1.5rem, 2.5vw, 2rem)', maxWidth: 'clamp(300px, 90vw, 500px)' },
      title: { fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)' },
      description: { fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', maxWidth: 'clamp(300px, 70vw, 500px)' },
      input: { padding: 'clamp(0.4rem, 1vw, 0.6rem)' },
      button: { padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 1.8vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
    },
  },
};

// Animation Styles
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

`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 2, ease: 'easeOut', staggerChildren: 0.3 },
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

const formChildVariants = {
  hidden: { opacity: 0, x: -40, rotate: -10 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6 } },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } },
};

const feedbackVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [emailError, setEmailError] = useState('');
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 150, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.85, 1]), { stiffness: 150, damping: 20 });
  const rotate = useSpring(useTransform(scrollYProgress, [0, 0.5], [-5, 0]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isValidGmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const emailInput = form.current.user_email.value;
    if (!isValidGmail(emailInput)) {
      setEmailError('Please use a valid Gmail address (e.g., example@gmail.com)');
      return;
    }
    setEmailError('');
    emailjs
      .sendForm('service_8pg8cek', 'template_1ys1isn', form.current, 'GOTwySQukEpQEuRa5')
      .then(() => {
        setIsSent(true);
        e.target.reset();
      }, () => {
        alert('❌ Oops! Failed to send message.');
      });
  };

  const responsiveStyles = useMemo(() =>
    windowWidth <= 480 ? styles.responsive.small :
    windowWidth <= 768 ? styles.responsive.medium :
    styles.responsive.large,
    [windowWidth]
  );

  return (
    <motion.section
      style={{
        ...styles.container,
        ...responsiveStyles.container,
        opacity,
        scale,
        rotate,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Contact section"
    >
      <style>{animationStyles}</style>
      {/* Background Particles */}
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
        style={{
          ...styles.holographicGlow,
          ...responsiveStyles.holographicGlow,
          animation: 'glowShift 12s ease-in-out infinite',
        }}
      />
      <motion.div
        style={{
          ...styles.card,
          ...responsiveStyles.card,
          animation: 'rotateGlow 8s linear infinite',
        }}
        variants={cardVariants}
      >
        <motion.div style={styles.cardGlow} />
        <motion.p
          style={{
            ...styles.description,
            ...responsiveStyles.description,
          }}
          variants={formChildVariants}
        >
          I'm excited to connect with you! Whether you have a project idea, a question, or just want to share feedback, feel free to reach out using the form below or through my social channels.
        </motion.p>
        <motion.h2
          style={{
            ...styles.title,
            ...responsiveStyles.title,
            animation: 'holographicPulse 2.5s ease-in-out infinite alternate',
          }}
          variants={formChildVariants}
        >
          <FaStar style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)' }} />
          Connect With Me
        </motion.h2>
        <motion.div
          style={styles.titleAccent}
          initial={{ width: 0 }}
          animate={{ width: 'clamp(160px, 30vw, 240px)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          style={styles.form}
          variants={formChildVariants}
        >
          {[
            { type: 'text', name: 'user_name', placeholder: 'Full Name' },
            { type: 'email', name: 'user_email', placeholder: 'Email Address' },
          ].map((input, idx) => (
            <motion.input
              key={idx}
              {...input}
              required
              style={{
                ...styles.input,
                ...responsiveStyles.input,
                borderColor: emailError ? '#ff5555' : undefined,
              }}
              whileFocus={{
                scale: 1.03,
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
                borderColor: '#3b82f6',
              }}
              variants={formChildVariants}
            />
          ))}
          {emailError && (
            <motion.p
              style={{ color: '#ff5555', fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', margin: '0.3rem 0' }}
              variants={formChildVariants}
            >
              {emailError}
            </motion.p>
          )}
          <motion.textarea
            name='message'
            placeholder='Your Message'
            required
            style={styles.textarea}
            whileFocus={{
              scale: 1.02,
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
              borderColor: '#3b82f6',
            }}
            variants={formChildVariants}
          />
          <motion.button
            type='submit'
            style={{
              ...styles.button,
              ...responsiveStyles.button,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
            }}
            whileTap={{ scale: 0.95 }}
            variants={formChildVariants}
          >
            <FaEnvelope style={{ marginRight: 'clamp(0.3rem, 0.8vw, 0.5rem)' }} />
            Send Message
          </motion.button>
        </motion.form>
        <motion.div
          style={styles.socialContainer}
          variants={socialVariants}
        >
          {[
            { icon: <FaEnvelope />, link: 'mailto:g.sivasatyasaibhagavan@gmail.com' },
            { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/' },
            { icon: <FaGithub />, link: 'https://github.com/bhagavan444' },
            { icon: <FaTwitter />, link: 'https://twitter.com/' },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.link}
              target='_blank'
              rel='noreferrer'
              style={styles.socialIcon}
              whileHover={{ scale: 1.2, color: '#3b82f6' }}
              whileTap={{ scale: 0.9 }}
              variants={socialVariants}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
        <motion.p
          style={{
            ...styles.description,
            ...responsiveStyles.description,
          }}
          variants={formChildVariants}
        >
          Thank you for reaching out! I'm always open to new opportunities, collaborations, or a friendly chat. I'll get back to you as soon as possible.
        </motion.p>
        <AnimatePresence>
          {isSent && (
            <motion.div
              style={styles.feedback}
              variants={feedbackVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              ✅ Message sent successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default React.memo(Contact);