import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = React.useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8pg8cek",
        "template_1ys1isn",
        form.current,
        "GOTwySQukEpQEuRa5"
      )
      .then(
        () => {
          setIsSent(true);
          setTimeout(() => setIsSent(false), 3000);
          e.target.reset();
        },
        () => {
          alert("❌ Oops! Failed to send message.");
        }
      );
  };

  useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => setIsSent(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSent]);

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, type: "spring", stiffness: 60 },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, rotateX: -10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1.2, type: "spring", stiffness: 70 },
    },
  };

  const socialVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.8, duration: 1, type: "spring" },
    },
  };

  const feedbackVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="contact-section"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a001a, #1a0040, #2a0060)",
        padding: "6rem 3rem",
        overflow: "hidden",
        willChange: "background, transform",
      }}
    >
      {/* Background Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${4 + i}px`,
            height: `${4 + i}px`,
            background: `radial-gradient(circle, rgba(0, 191, 255, 0.6), transparent)`,
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(0, 191, 255, 0.9)",
            top: `${5 + i * 7}%`,
            left: `${5 + i * 7}%`,
            willChange: "transform",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 360],
          }}
          transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="contact-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 40px 120px rgba(0, 191, 255, 0.7), 0 0 60px rgba(255, 105, 180, 0.5)",
          transition: { duration: 0.6 },
        }}
        style={{
          background: "rgba(20, 10, 40, 0.95)",
          border: "3px solid rgba(0, 191, 255, 0.6)",
          borderRadius: "20px",
          padding: "3.5rem",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          backdropFilter: "blur(12px)",
          transformStyle: "preserve-3d",
          willChange: "transform, box-shadow",
          animation: "cardPulse 6s ease-in-out infinite",
        }}
      >
        <motion.h2
          className="contact-title"
          style={{
            fontSize: "3rem",
            color: "#00bfff",
            textShadow: "0 0 30px rgba(0, 191, 255, 0.9), 0 0 50px rgba(255, 105, 180, 0.7)",
            fontWeight: "900",
            marginBottom: "2.5rem",
            background: "linear-gradient(45deg, #00bfff, #ff69b4, #00ffcc)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            animation: "gradientFlow 7s linear infinite",
          }}
        >
          🌐 Let's Connect Globally
        </motion.h2>

        <form ref={form} onSubmit={sendEmail} className="contact-form" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "600px", margin: "0 auto" }}>
          <motion.input
            type="text"
            name="user_name"
            placeholder="Full Name"
            className="contact-input"
            required
            whileFocus={{ scale: 1.1, boxShadow: "0 0 25px rgba(0, 191, 255, 0.8)" }}
            style={{
              padding: "1.2rem",
              fontSize: "1.1rem",
              border: "2px solid rgba(0, 191, 255, 0.5)",
              borderRadius: "25px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#d0d8e8",
              outline: "none",
              transition: "all 0.4s ease",
              textShadow: "0 0 10px rgba(0, 191, 255, 0.4)",
            }}
          />

          <motion.input
            type="email"
            name="user_email"
            placeholder="Email Address"
            className="contact-input"
            required
            whileFocus={{ scale: 1.1, boxShadow: "0 0 25px rgba(0, 191, 255, 0.8)" }}
            style={{
              padding: "1.2rem",
              fontSize: "1.1rem",
              border: "2px solid rgba(0, 191, 255, 0.5)",
              borderRadius: "25px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#d0d8e8",
              outline: "none",
              transition: "all 0.4s ease",
              textShadow: "0 0 10px rgba(0, 191, 255, 0.4)",
            }}
          />

          <motion.textarea
            name="message"
            placeholder="Your Message"
            className="contact-textarea"
            rows="6"
            required
            whileFocus={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 191, 255, 0.8)" }}
            style={{
              padding: "1.2rem",
              fontSize: "1.1rem",
              border: "2px solid rgba(0, 191, 255, 0.5)",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#d0d8e8",
              outline: "none",
              resize: "vertical",
              transition: "all 0.4s ease",
              textShadow: "0 0 10px rgba(0, 191, 255, 0.4)",
            }}
          />

          <motion.button
            type="submit"
            className="contact-button"
            whileHover={{
              scale: 1.12,
              boxShadow: "0 0 40px rgba(14, 165, 233, 0.9)",
              background: "linear-gradient(90deg, #0ea5e9, #3b82f6)",
            }}
            whileTap={{ scale: 0.93, rotateZ: -5 }}
            style={{
              padding: "1.3rem 3rem",
              background: "linear-gradient(90deg, #0ea5e9, #1d4ed8)",
              border: "none",
              borderRadius: "30px",
              fontSize: "1.2rem",
              fontWeight: "800",
              color: "#fff",
              cursor: "pointer",
              textShadow: "0 0 15px rgba(14, 165, 233, 0.9)",
              transition: "all 0.5s ease",
              transformStyle: "preserve-3d",
            }}
          >
            🚀 Send Message
          </motion.button>
        </form>

        <motion.div
          className="contact-socials"
          variants={socialVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "2.5rem" }}
        >
          <motion.a
            href="mailto:g.sivasatyasaibhagavan@gmail.com"
            aria-label="Email"
            whileHover={{ scale: 1.2, rotate: 360, color: "#00bfff" }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "2rem",
              color: "#d0d8e8",
              transition: "all 0.4s ease",
              textShadow: "0 0 15px rgba(0, 191, 255, 0.6)",
            }}
          >
            <FaEnvelope />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.2, rotate: 360, color: "#00bfff" }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "2rem",
              color: "#d0d8e8",
              transition: "all 0.4s ease",
              textShadow: "0 0 15px rgba(0, 191, 255, 0.6)",
            }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://github.com/bhagavan444"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            whileHover={{ scale: 1.2, rotate: 360, color: "#00bfff" }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "2rem",
              color: "#d0d8e8",
              transition: "all 0.4s ease",
              textShadow: "0 0 15px rgba(0, 191, 255, 0.6)",
            }}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            whileHover={{ scale: 1.2, rotate: 360, color: "#00bfff" }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "2rem",
              color: "#d0d8e8",
              transition: "all 0.4s ease",
              textShadow: "0 0 15px rgba(0, 191, 255, 0.6)",
            }}
          >
            <FaTwitter />
          </motion.a>
        </motion.div>

        <AnimatePresence>
          {isSent && (
            <motion.div
              className="contact-feedback"
              variants={feedbackVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                marginTop: "1.5rem",
                padding: "1rem 2rem",
                background: "rgba(16, 185, 129, 0.9)",
                borderRadius: "20px",
                color: "#fff",
                fontSize: "1.2rem",
                textShadow: "0 0 10px rgba(16, 185, 129, 0.7)",
                willChange: "transform, opacity",
              }}
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