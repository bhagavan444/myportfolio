import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter } from 'react-icons/fa';

// Inline Styles
const styles = {
  container: {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3rem)',
    background: 'linear-gradient(155deg, #1a0033, #2a0055, #3b0088, #4c00bb)',
    backgroundSize: '500% 500%',
    color: '#f5f7fa',
    overflowX: 'hidden',
    position: 'relative',
    perspective: '1600px',
    fontFamily: "'Inter', 'Montserrat', sans-serif",
    willChange: 'background, transform',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 10% 15%, rgba(76, 29, 149, 0.3), transparent 50%),
      radial-gradient(circle at 90% 85%, rgba(192, 38, 211, 0.3), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%)
    `,
    zIndex: -1,
    pointerEvents: 'none',
  },
  holographicGlow: {
    position: 'absolute',
    width: 'clamp(400px, 60vw, 700px)',
    height: 'clamp(400px, 60vw, 700px)',
    background: 'radial-gradient(circle, rgba(76, 29, 149, 0.35), transparent 60%)',
    top: '-15%',
    left: '-15%',
    filter: 'blur(120px)',
    zIndex: -1,
  },
  card: {
    background: 'rgba(10, 0, 30, 0.9)',
    border: '1px solid rgba(76, 29, 149, 0.3)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 4vw, 3rem)',
    maxWidth: 'clamp(700px, 90vw, 900px)',
    margin: '0 auto',
    textAlign: 'center',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(76, 29, 149, 0.25)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(76, 29, 149, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    zIndex: -1,
    opacity: 0.45,
  },
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3, #3b82f6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 35px rgba(76, 29, 149, 0.7), 0 0 60px rgba(192, 38, 211, 0.5)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    letterSpacing: '0.12em',
  },
  titleUnderline: {
    width: 'clamp(140px, 25vw, 200px)',
    height: '5px',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3)',
    borderRadius: '5px',
    margin: '0.6rem auto clamp(1.5rem, 2.5vw, 2rem)',
    boxShadow: '0 0 20px rgba(76, 29, 149, 0.7)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(0.8rem, 1.5vw, 1rem)',
    width: '100%',
    maxWidth: 'clamp(500px, 80vw, 600px)',
    margin: '0 auto',
  },
  input: {
    padding: 'clamp(0.8rem, 1.5vw, 1rem)',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    border: '2px solid rgba(76, 29, 149, 0.5)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#f5f7fa',
    outline: 'none',
    width: '100%',
  },
  textarea: {
    padding: 'clamp(0.8rem, 1.5vw, 1rem)',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    border: '2px solid rgba(76, 29, 149, 0.5)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#f5f7fa',
    outline: 'none',
    resize: 'vertical',
    minHeight: 'clamp(100px, 20vw, 150px)',
    width: '100%',
  },
  button: {
    padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(1.8rem, 2.5vw, 2.5rem)',
    background: 'linear-gradient(90deg, #4c1d95, #c026d3)',
    border: 'none',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    fontWeight: '700',
    color: '#f5f7fa',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(76, 29, 149, 0.5)',
  },
  socialContainer: {
    display: 'flex',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 'clamp(1.5rem, 3vw, 2rem)',
  },
  socialIcon: {
    fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
    color: '#e0e7ff',
    textShadow: '0 0 10px rgba(76, 29, 149, 0.5)',
  },
  feedback: {
    marginTop: 'clamp(0.8rem, 1.5vw, 1rem)',
    padding: 'clamp(0.6rem, 1.2vw, 0.8rem) clamp(1.2rem, 2vw, 1.6rem)',
    background: 'rgba(76, 29, 149, 0.9)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    color: '#f5f7fa',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    textAlign: 'center',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      card: { padding: 'clamp(2rem, 3.5vw, 2.8rem)', maxWidth: 'clamp(800px, 90vw, 1000px)' },
      title: { fontSize: 'clamp(2rem, 4.5vw, 2.8rem)' },
      input: { fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' },
      textarea: { fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' },
      button: { padding: 'clamp(0.8rem, 1.5vw, 1rem) clamp(1.8rem, 2.5vw, 2.5rem)' },
      socialIcon: { fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 700px)', height: 'clamp(400px, 55vw, 700px)' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      card: { padding: 'clamp(1.8rem, 3vw, 2.5rem)', maxWidth: 'clamp(600px, 85vw, 800px)' },
      title: { fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' },
      input: { fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' },
      textarea: { fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' },
      button: { padding: 'clamp(0.7rem, 1.2vw, 0.9rem) clamp(1.5rem, 2vw, 2rem)' },
      socialIcon: { fontSize: 'clamp(1.6rem, 2.5vw, 2rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      card: { padding: 'clamp(1.5rem, 2.5vw, 2rem)', maxWidth: 'clamp(500px, 90vw, 700px)' },
      title: { fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' },
      input: { fontSize: 'clamp(0.8rem, 1.4vw, 0.9rem)' },
      textarea: { fontSize: 'clamp(0.8rem, 1.4vw, 0.9rem)' },
      button: { padding: 'clamp(0.6rem, 1vw, 0.8rem) clamp(1.2rem, 1.8vw, 1.8rem)' },
      socialIcon: { fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' },
      holographicGlow: { width: 'clamp(250px, 40vw, 400px)', height: 'clamp(250px, 40vw, 400px)' },
    },
  },
};

// Inline Animation Styles
const animationStyles = `
  @keyframes holographicPulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(70px, 70px) scale(1.12); }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, ease: 'easeOut', staggerChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.82, rotateY: -20 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.9, type: 'spring', stiffness: 120, damping: 15 },
  },
};

const formChildVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const socialVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.8, duration: 0.7, type: 'spring' } },
};

const feedbackVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.5 } },
};

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  };

  const sendOtp = (email) => {
    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);
    emailjs
      .send(
        'service_8pg8cek',
        'template_otp', // Dedicated template for OTP
        {
          to_email: email, // Send OTP to user's email
          message: `Your OTP is: ${newOtp}`,
        },
        'GOTwySQukEpQEuRa5'
      )
      .then(
        () => {
          setIsOtpSent(true);
          setError('');
        },
        () => {
          setError('Failed to send OTP. Please try again.');
        }
      );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { user_name, user_email, message } = formData;

    if (!isOtpSent) {
      // First step: Send OTP to user's email
      if (!user_email) {
        setError('Please enter a valid email address.');
        return;
      }
      setFormData({ user_name, user_email, message: '' });
      sendOtp(user_email);
    } else if (!isOtpVerified) {
      // Second step: Verify OTP
      if (otp === generatedOtp) {
        setIsOtpVerified(true);
        setError('');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } else {
      // Final step: Send message to portfolio creator
      if (!message) {
        setError('Please enter a message.');
        return;
      }
      emailjs
        .send(
          'service_8pg8cek',
          'template_1ys1isn', // Template for message to creator
          {
            user_name,
            user_email,
            message,
            to_email: 'g.sivasatyasaibhagavan@gmail.com', // Send message to portfolio creator
          },
          'GOTwySQukEpQEuRa5'
        )
        .then(
          () => {
            setIsSent(true);
            setFormData({ user_name: '', user_email: '', message: '' });
            setOtp('');
            setIsOtpSent(false);
            setIsOtpVerified(false);
            setError('');
          },
          () => {
            setError('Failed to send message. Please try again.');
          }
        );
    }
  };

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);

  // Apply responsive styles based on window width
  const responsiveStyles = windowWidth <= 480 ? styles.responsive.small :
                          windowWidth <= 768 ? styles.responsive.medium :
                          styles.responsive.large;

  return (
    <motion.section
      style={{ ...styles.container, ...responsiveStyles.container, opacity, scale }}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      role='region'
      aria-label='Contact section'
    >
      <style>{animationStyles}</style>
      {/* Background Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `clamp(0.8rem, calc(0.1vw + ${1 + i * 0.15}rem), ${1.5 + i * 0.2}rem)`,
            height: `clamp(0.8rem, calc(0.1vw + ${1 + i * 0.15}rem), ${1.5 + i * 0.2}rem)`,
            background: 'radial-gradient(circle, rgba(76, 29, 149, 0.4), rgba(192, 38, 211, 0.2))',
            borderRadius: '50%',
            top: `${5 + i * 4}%`,
            left: `${5 + i * 3}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Holographic Glow */}
      <motion.div
        style={{ ...styles.holographicGlow, ...responsiveStyles.holographicGlow, animation: 'glowShift 15s ease-in-out infinite' }}
      />
      {/* Contact Card */}
      <motion.div
        style={{ ...styles.card, ...responsiveStyles.card }}
        variants={cardVariants}
      >
        <motion.div
          style={{ ...styles.cardOverlay, animation: 'rotateGlow 10s linear infinite' }}
        />
        <motion.h2
          style={{ ...styles.title, ...responsiveStyles.title, animation: 'holographicPulse 2s ease-in-out infinite alternate' }}
          variants={formChildVariants}
          initial='hidden'
          animate='visible'
        >
          🌐 Let's Connect Globally
        </motion.h2>
        <div style={styles.titleUnderline} />
        <motion.form
          ref={form}
          onSubmit={handleFormSubmit}
          style={styles.form}
          variants={formChildVariants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.2 }}
        >
          {!isOtpSent && (
            <>
              <motion.input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
                value={formData.user_name}
                onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                style={{ ...styles.input, ...responsiveStyles.input }}
                whileFocus={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(76, 29, 149, 0.8)',
                  borderColor: '#c026d3',
                }}
                whileHover={{ borderColor: '#c026d3' }}
                variants={formChildVariants}
                transition={{ delay: 0.3 }}
              />
              <motion.input
                type="email"
                name="user_email"
                placeholder="Email Address"
                required
                value={formData.user_email}
                onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                style={{ ...styles.input, ...responsiveStyles.input }}
                whileFocus={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(76, 29, 149, 0.8)',
                  borderColor: '#c026d3',
                }}
                whileHover={{ borderColor: '#c026d3' }}
                variants={formChildVariants}
                transition={{ delay: 0.4 }}
              />
            </>
          )}
          {isOtpSent && !isOtpVerified && (
            <motion.input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ ...styles.input, ...responsiveStyles.input }}
              whileFocus={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(76, 29, 149, 0.8)',
                borderColor: '#c026d3',
              }}
              whileHover={{ borderColor: '#c026d3' }}
              variants={formChildVariants}
              transition={{ delay: 0.3 }}
            />
          )}
          {isOtpVerified && (
            <motion.textarea
              name="message"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ ...styles.textarea, ...responsiveStyles.textarea }}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(76, 29, 149, 0.8)',
                borderColor: '#c026d3',
              }}
              whileHover={{ borderColor: '#c026d3' }}
              variants={formChildVariants}
              transition={{ delay: 0.5 }}
            />
          )}
          <motion.button
            type="submit"
            style={{ ...styles.button, ...responsiveStyles.button }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 15px 50px rgba(192, 38, 211, 0.6)',
              translateY: -3,
            }}
            whileTap={{ scale: 0.95 }}
            variants={formChildVariants}
            transition={{ delay: 0.6 }}
            aria-label={isOtpSent && !isOtpVerified ? 'Verify OTP' : isOtpVerified ? 'Send Message' : 'Send OTP'}
          >
            {isOtpSent && !isOtpVerified ? '🔐 Verify OTP' : isOtpVerified ? '🚀 Send Message' : '📧 Send OTP'}
          </motion.button>
        </motion.form>
        <motion.div
          style={styles.socialContainer}
          variants={socialVariants}
          initial='hidden'
          animate='visible'
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
              style={{ ...styles.socialIcon, ...responsiveStyles.socialIcon }}
              whileHover={{ scale: 1.3, rotate: 360, color: '#c026d3' }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              aria-label={`Connect via ${social.link.includes('mailto') ? 'Email' : social.link.includes('linkedin') ? 'LinkedIn' : social.link.includes('github') ? 'GitHub' : 'Twitter'}`}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
        <AnimatePresence>
          {error && (
            <motion.div
              style={{ ...styles.feedback, background: 'rgba(220, 38, 38, 0.9)' }}
              variants={feedbackVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              ❌ {error}
            </motion.div>
          )}
          {isSent && (
            <motion.div
              style={styles.feedback}
              variants={feedbackVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              ✅ Message sent successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default Contact;