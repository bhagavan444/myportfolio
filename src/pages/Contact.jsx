import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter, FaStar } from "react-icons/fa";

// Custom Debounce Function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Inline Styles
const styles = {
  container: {
    minHeight: "100vh",
    padding: "clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)",
    background: "linear-gradient(155deg, #0d0026, #1a0033, #2a0055, #3b0088)",
    backgroundSize: "600% 600%",
    color: "#f5f7fa",
    position: "relative",
    fontFamily: "'Inter', 'Montserrat', sans-serif",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.4), transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(192, 38, 211, 0.4), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.3), transparent 70%)
    `,
    zIndex: -1,
    pointerEvents: "none",
  },
  holographicGlow: {
    position: "absolute",
    width: "clamp(500px, 65vw, 800px)",
    height: "clamp(500px, 65vw, 800px)",
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.45), transparent 60%)",
    top: "-20%",
    left: "-20%",
    filter: "blur(150px)",
    zIndex: -2,
    animation: "glowShift 10s ease-in-out infinite",
  },
  particle: {
    position: "absolute",
    width: "clamp(0.5rem, 0.1vw, 1rem)",
    height: "clamp(0.5rem, 0.1vw, 1rem)",
    background: "radial-gradient(circle, #3b82f6, #c026d3)",
    borderRadius: "50%",
    opacity: 0.7,
    pointerEvents: "none",
  },
  card: {
    background: "rgba(10, 0, 30, 0.9)",
    borderRadius: "clamp(14px, 2.5vw, 20px)",
    padding: "clamp(2rem, 3.5vw, 2.8rem)",
    maxWidth: "clamp(500px, 80vw, 800px)",
    margin: "0 auto",
    textAlign: "center",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(59, 130, 246, 0.25)",
    position: "relative",
    overflow: "hidden",
    transformStyle: "preserve-3d",
  },
  cardGlow: {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background: "conic-gradient(from 45deg, rgba(59, 130, 246, 0.35), rgba(192, 38, 211, 0.35), transparent)",
    zIndex: -1,
    opacity: 0.45,
    animation: "rotateGlow 6s linear infinite",
  },
  title: {
    fontSize: "clamp(1.5rem, 3.2vw, 2rem)",
    fontWeight: 800,
    color: "transparent",
    background: "linear-gradient(90deg, #3b82f6, #c026d3, #4c1d95)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    textShadow: "0 0 18px rgba(59, 130, 246, 0.6)",
    marginBottom: "clamp(0.8rem, 2vw, 1.2rem)",
    letterSpacing: "0.12em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(0.3rem, 0.8vw, 0.5rem)",
  },
  titleAccent: {
    width: "clamp(160px, 30vw, 240px)",
    height: "5px",
    background: "linear-gradient(90deg, #3b82f6, #c026d3)",
    borderRadius: "5px",
    margin: "0.6rem auto 1.5rem",
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)",
  },
  description: {
    fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)",
    color: "#e0e7ff",
    maxWidth: "clamp(500px, 80vw, 800px)",
    margin: "0 auto clamp(1rem, 2vw, 1.5rem)",
    lineHeight: "1.7",
    textShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(0.8rem, 1.8vw, 1.2rem)",
    width: "100%",
    maxWidth: "clamp(400px, 75vw, 500px)",
    margin: "0 auto",
  },
  input: {
    padding: "clamp(0.6rem, 1.5vw, 1rem)",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    border: "1px solid rgba(59, 130, 246, 0.4)",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#e0e7ff",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "inset 0 0 5px rgba(59, 130, 246, 0.2)",
  },
  textarea: {
    padding: "clamp(0.6rem, 1.5vw, 1rem)",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    border: "1px solid rgba(59, 130, 246, 0.4)",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#e0e7ff",
    outline: "none",
    minHeight: "clamp(100px, 20vw, 140px)",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "inset 0 0 5px rgba(59, 130, 246, 0.2)",
  },
  button: {
    padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)",
    background: "linear-gradient(90deg, #3b82f6, #c026d3)",
    border: "none",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    fontWeight: 600,
    color: "#f0faff",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(0.3rem, 0.8vw, 0.5rem)",
    position: "relative",
    overflow: "hidden",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  resetButton: {
    padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)",
    background: "rgba(59, 130, 246, 0.2)",
    border: "1px solid rgba(59, 130, 246, 0.4)",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    fontWeight: 600,
    color: "#e0e7ff",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(0.3rem, 0.8vw, 0.5rem)",
  },
  socialContainer: {
    display: "flex",
    gap: "clamp(0.8rem, 1.8vw, 1.2rem)",
    justifyContent: "center",
    marginTop: "clamp(1rem, 2.5vw, 1.5rem)",
  },
  socialIcon: {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    color: "#e0e7ff",
    transition: "transform 0.3s ease, color 0.3s ease",
    position: "relative",
    background: "linear-gradient(45deg, #3b82f6, #c026d3)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  tooltip: {
    position: "absolute",
    top: "-clamp(2rem, 4vw, 2.5rem)",
    background: "rgba(10, 0, 30, 0.9)",
    color: "#e0e7ff",
    padding: "clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.6rem, 1.2vw, 0.8rem)",
    borderRadius: "clamp(6px, 1vw, 8px)",
    fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
    boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
    zIndex: 10,
    whiteSpace: "nowrap",
  },
  feedback: {
    marginTop: "clamp(0.8rem, 1.8vw, 1.2rem)",
    padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)",
    background: "rgba(59, 130, 246, 0.2)",
    border: "1px solid rgba(59, 130, 246, 0.4)",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    color: "#e0e7ff",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    textAlign: "center",
  },
  error: {
    marginTop: "clamp(0.8rem, 1.8vw, 1.2rem)",
    padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)",
    background: "rgba(255, 85, 85, 0.2)",
    border: "1px solid rgba(255, 85, 85, 0.4)",
    borderRadius: "clamp(12px, 1.8vw, 16px)",
    color: "#ff5555",
    fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
    textAlign: "center",
  },
  charCounter: {
    fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
    color: "#e0e7ff",
    textAlign: "right",
    marginTop: "clamp(0.3rem, 0.8vw, 0.5rem)",
    textShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
  },
  spinner: {
    display: "inline-block",
    width: "clamp(1rem, 2vw, 1.5rem)",
    height: "clamp(1rem, 2vw, 1.5rem)",
    border: "3px solid rgba(59, 130, 246, 0.3)",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginRight: "clamp(0.3rem, 0.8vw, 0.5rem)",
  },
  responsive: {
    large: {
      container: { padding: "clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)" },
      card: { padding: "clamp(2rem, 3.5vw, 2.8rem)", maxWidth: "clamp(500px, 80vw, 800px)" },
      title: { fontSize: "clamp(1.5rem, 3.2vw, 2rem)" },
      description: { fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)", maxWidth: "clamp(500px, 80vw, 800px)" },
      input: { padding: "clamp(0.6rem, 1.5vw, 1rem)" },
      button: { padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)" },
      holographicGlow: { width: "clamp(500px, 65vw, 800px)", height: "clamp(500px, 65vw, 800px)", top: "-20%", left: "-20%" },
    },
    medium: {
      container: { padding: "clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)" },
      card: { padding: "clamp(1.8rem, 3vw, 2.5rem)", maxWidth: "clamp(400px, 80vw, 600px)" },
      title: { fontSize: "clamp(1.4rem, 3vw, 1.8rem)" },
      description: { fontSize: "clamp(0.9rem, 2vw, 1.15rem)", maxWidth: "clamp(400px, 75vw, 600px)" },
      input: { padding: "clamp(0.5rem, 1.2vw, 0.8rem)" },
      button: { padding: "clamp(0.5rem, 1.2vw, 0.8rem) clamp(1rem, 2vw, 1.5rem)" },
      holographicGlow: { width: "clamp(400px, 55vw, 600px)", height: "clamp(400px, 55vw, 600px)", top: "-15%", left: "-15%" },
    },
    small: {
      container: { padding: "clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)" },
      card: { padding: "clamp(1.5rem, 2.5vw, 2rem)", maxWidth: "clamp(300px, 90vw, 500px)" },
      title: { fontSize: "clamp(1.3rem, 2.8vw, 1.6rem)" },
      description: { fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)", maxWidth: "clamp(300px, 70vw, 500px)" },
      input: { padding: "clamp(0.4rem, 1vw, 0.6rem)" },
      button: { padding: "clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 1.8vw, 1.2rem)" },
      holographicGlow: { width: "clamp(300px, 45vw, 500px)", height: "clamp(300px, 45vw, 500px)", top: "-12%", left: "-12%" },
    },
  },
};

// Animation Styles
const animationStyles = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes holographicPulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes glowShift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(50px, 50px) scale(1.1); }
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -20px) scale(1.2); }
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, type: "spring", stiffness: 120, damping: 14 },
  },
  hover: {
    rotateX: 5,
    rotateY: -5,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const formChildVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, type: "spring" } },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
};

const feedbackVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// Social Links Data
const socialLinks = [
  { icon: <FaEnvelope />, link: "mailto:g.sivasatyasaibhagavan@gmail.com", label: "Email", key: "email" },
  { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/", label: "LinkedIn", key: "linkedin" },
  { icon: <FaGithub />, link: "https://github.com/bhagavan444", label: "GitHub", key: "github" },
  { icon: <FaTwitter />, link: "https://twitter.com/", label: "Twitter", key: "twitter" },
];

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.6, 1]), { stiffness: 120, damping: 18 });
  const maxMessageLength = 500;

  const handleResize = useCallback(
    debounce(() => setWindowWidth(window.innerWidth), 100),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const isValidGmail = useCallback((email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  }, []);

  const handleMessageChange = useCallback((e) => {
    setMessageLength(e.target.value.length);
  }, []);

  const resetForm = useCallback(() => {
    form.current.reset();
    setIsSent(false);
    setEmailError("");
    setFormError("");
    setMessageLength(0);
  }, []);

  const sendEmail = useCallback(
    (e) => {
      e.preventDefault();
      const emailInput = form.current.user_email.value;
      const messageInput = form.current.message.value;

      if (!isValidGmail(emailInput)) {
        setEmailError("Please use a valid Gmail address (e.g., example@gmail.com)");
        return;
      }
      if (messageInput.length > maxMessageLength) {
        setFormError(`Message exceeds ${maxMessageLength} character limit`);
        return;
      }
      setEmailError("");
      setFormError("");
      setIsSubmitting(true);

      emailjs
        .sendForm("service_8pg8cek", "template_1ys1isn", form.current, "GOTwySQukEpQEuRa5")
        .then(() => {
          setIsSent(true);
          setIsSubmitting(false);
          resetForm();
        }, (error) => {
          setFormError(`Failed to send message: ${error.text || "Unknown error"}`);
          setIsSubmitting(false);
        });
    },
    [isValidGmail, resetForm]
  );

  const responsiveStyles = useMemo(
    () =>
      windowWidth <= 480
        ? styles.responsive.small
        : windowWidth <= 768
        ? styles.responsive.medium
        : styles.responsive.large,
    [windowWidth]
  );

  return (
    <motion.section
      style={{
        ...styles.container,
        ...responsiveStyles.container,
        opacity,
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Contact section"
    >
      <style>{animationStyles}</style>
      <motion.div style={styles.overlay} />
      <motion.div style={{ ...styles.holographicGlow, ...responsiveStyles.holographicGlow }} />
      {/* Dynamic Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            ...styles.particle,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        style={{
          ...styles.card,
          ...responsiveStyles.card,
        }}
        variants={cardVariants}
        whileHover="hover"
      >
        <div style={styles.cardGlow} />
        <motion.p
          style={{
            ...styles.description,
            ...responsiveStyles.description,
            marginBottom: "1.5rem",
          }}
          variants={formChildVariants}
        >
          I'm thrilled to connect with you! Whether it's a project idea, a question, or just a friendly chat, I'm all ears. Let's create something amazing together.
        </motion.p>
        <motion.h2
          style={{
            ...styles.title,
            ...responsiveStyles.title,
            animation: "holographicPulse 2s ease-in-out infinite alternate",
          }}
          variants={formChildVariants}
        >
          <FaStar style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)" }} />
          Connect With Me
        </motion.h2>
        <motion.div
          style={styles.titleAccent}
          initial={{ width: 0 }}
          animate={{ width: "clamp(160px, 30vw, 240px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          style={styles.form}
          variants={formChildVariants}
          role="form"
          aria-label="Contact form"
        >
          {[
            { type: "text", name: "user_name", placeholder: "Full Name", label: "Full Name" },
            { type: "email", name: "user_email", placeholder: "Email Address", label: "Email Address" },
          ].map((input) => (
            <motion.input
              key={input.name}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              required
              style={{
                ...styles.input,
                ...responsiveStyles.input,
                borderColor: emailError && input.name === "user_email" ? "#ff5555" : undefined,
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)",
                borderColor: "#3b82f6",
              }}
              variants={formChildVariants}
              aria-label={input.label}
            />
          ))}
          {emailError && (
            <motion.p style={styles.error} variants={formChildVariants}>
              {emailError}
            </motion.p>
          )}
          <motion.textarea
            name="message"
            placeholder="Your Message"
            required
            style={{
              ...styles.textarea,
              borderColor: messageLength > maxMessageLength ? "#ff5555" : undefined,
            }}
            whileFocus={{
              scale: 1.01,
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)",
              borderColor: "#3b82f6",
            }}
            variants={formChildVariants}
            onChange={handleMessageChange}
            maxLength={maxMessageLength}
            aria-label="Message"
          />
          <motion.p
            style={{
              ...styles.charCounter,
              color: messageLength > maxMessageLength ? "#ff5555" : "#e0e7ff",
            }}
            variants={formChildVariants}
          >
            {messageLength}/{maxMessageLength} characters
          </motion.p>
          {formError && (
            <motion.p style={styles.error} variants={formChildVariants}>
              {formError}
            </motion.p>
          )}
          <motion.div
            style={{ display: "flex", gap: "clamp(0.8rem, 1.8vw, 1.2rem)", marginTop: "clamp(0.8rem, 1.8vw, 1.2rem)" }}
            variants={formChildVariants}
          >
            <motion.button
              type="submit"
              style={{
                ...styles.button,
                ...responsiveStyles.button,
                ...(isSubmitting ? styles.buttonDisabled : {}),
              }}
              whileHover={!isSubmitting ? { scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)" } : {}}
              whileTap={!isSubmitting ? { scale: 0.97 } : {}}
              variants={formChildVariants}
              disabled={isSubmitting}
              aria-label="Send message"
            >
              {isSubmitting ? (
                <>
                  <span style={styles.spinner} />
                  Sending...
                </>
              ) : (
                <>
                  <FaEnvelope style={{ marginRight: "clamp(0.3rem, 0.8vw, 0.5rem)" }} />
                  Send Message
                </>
              )}
            </motion.button>
            <motion.button
              type="button"
              style={{
                ...styles.resetButton,
                ...responsiveStyles.button,
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)" }}
              whileTap={{ scale: 0.97 }}
              variants={formChildVariants}
              onClick={resetForm}
              aria-label="Reset form"
            >
              Reset Form
            </motion.button>
          </motion.div>
        </motion.form>
        <motion.div style={styles.socialContainer} variants={socialVariants}>
          {socialLinks.map((social) => (
            <motion.a
              key={social.key}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              style={styles.socialIcon}
              whileHover={{ scale: 1.2, textShadow: "0 0 15px #3b82f6" }}
              whileTap={{ scale: 0.95 }}
              variants={socialVariants}
              aria-label={`Visit my ${social.label} profile`}
            >
              {social.icon}
              <motion.span
                style={styles.tooltip}
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {social.label}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
        <motion.p
          style={{
            ...styles.description,
            ...responsiveStyles.description,
            marginTop: "1.5rem",
          }}
          variants={formChildVariants}
        >
          Thanks for reaching out! I’m always eager to explore new opportunities and collaborations. Expect a reply soon!
        </motion.p>
        <AnimatePresence>
          {isSent && (
            <motion.div
              style={styles.feedback}
              variants={feedbackVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="alert"
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