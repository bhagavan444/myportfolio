import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter } from "react-icons/fa";

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
        padding: "clamp(2rem, 5vw, 6rem) clamp(1rem, 3vw, 3rem)",
        overflow: "hidden",
      }}
    >
      {/* Background Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + i * 0.5}vw`,
            height: `${2 + i * 0.5}vw`,
            background: `radial-gradient(circle, rgba(0, 191, 255, 0.6), transparent)`,
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(0, 191, 255, 0.9)",
            top: `${(i * 7) % 100}%`,
            left: `${(i * 11) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="contact-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 20px 60px rgba(0, 191, 255, 0.5), 0 0 30px rgba(255, 105, 180, 0.4)",
        }}
        style={{
          background: "rgba(20, 10, 40, 0.95)",
          border: "2px solid rgba(0, 191, 255, 0.6)",
          borderRadius: "1.25rem",
          padding: "clamp(1.5rem, 4vw, 3.5rem)",
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
          backdropFilter: "blur(12px)",
        }}
      >
        <motion.h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#00bfff",
            textShadow:
              "0 0 20px rgba(0, 191, 255, 0.8), 0 0 30px rgba(255, 105, 180, 0.6)",
            fontWeight: "900",
            marginBottom: "1.5rem",
          }}
        >
          🌐 Let's Connect Globally
        </motion.h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {[
            { type: "text", name: "user_name", placeholder: "Full Name" },
            { type: "email", name: "user_email", placeholder: "Email Address" },
          ].map((input, idx) => (
            <motion.input
              key={idx}
              {...input}
              required
              whileFocus={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0, 191, 255, 0.8)",
              }}
              style={{
                padding: "1rem",
                fontSize: "1rem",
                border: "2px solid rgba(0, 191, 255, 0.5)",
                borderRadius: "25px",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
                outline: "none",
                width: "100%",
              }}
            />
          ))}

          <motion.textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 20px rgba(0, 191, 255, 0.8)",
            }}
            style={{
              padding: "1rem",
              fontSize: "1rem",
              border: "2px solid rgba(0, 191, 255, 0.5)",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#fff",
              outline: "none",
              resize: "vertical",
              width: "100%",
            }}
          />

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 30px rgba(14, 165, 233, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "1rem",
              background: "linear-gradient(90deg, #0ea5e9, #1d4ed8)",
              border: "none",
              borderRadius: "30px",
              fontSize: "1rem",
              fontWeight: "700",
              color: "#fff",
              cursor: "pointer",
              width: "100%",
            }}
          >
            🚀 Send Message
          </motion.button>
        </form>

        <motion.div
          variants={socialVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          {[
            {
              icon: <FaEnvelope />,
              link: "mailto:g.sivasatyasaibhagavan@gmail.com",
            },
            {
              icon: <FaLinkedin />,
              link: "https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/",
            },
            { icon: <FaGithub />, link: "https://github.com/bhagavan444" },
            { icon: <FaTwitter />, link: "https://twitter.com/" },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 360, color: "#00bfff" }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "2rem",
                color: "#d0d8e8",
                textShadow: "0 0 10px rgba(0, 191, 255, 0.6)",
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        <AnimatePresence>
          {isSent && (
            <motion.div
              variants={feedbackVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                marginTop: "1rem",
                padding: "0.8rem 1.2rem",
                background: "rgba(16, 185, 129, 0.9)",
                borderRadius: "15px",
                color: "#fff",
                fontSize: "1rem",
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
