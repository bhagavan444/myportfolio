import React, { useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaTwitter,
} from "react-icons/fa";
import "../components/Contact.css";

const Contact = () => {
  const form = useRef();

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
          alert("✅ Message sent successfully!");
          e.target.reset();
        },
        () => {
          alert("❌ Oops! Failed to send message.");
        }
      );
  };

  return (
    <motion.section
      className="contact-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="contact-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="contact-title">🌐 Let's Connect Globally</h2>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <motion.input
            type="text"
            name="user_name"
            placeholder="Full Name"
            className="contact-input"
            required
            whileFocus={{ scale: 1.05 }}
          />

          <motion.input
            type="email"
            name="user_email"
            placeholder="Email Address"
            className="contact-input"
            required
            whileFocus={{ scale: 1.05 }}
          />

          <motion.textarea
            name="message"
            placeholder="Your Message"
            className="contact-textarea"
            rows="6"
            required
            whileFocus={{ scale: 1.03 }}
          />

          <motion.button
            type="submit"
            className="contact-button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Send Message
          </motion.button>
        </form>

        <motion.div
          className="contact-socials"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a href="mailto:g.sivasatyasaibhagavan@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
          <a
            href="https://www.linkedin.com/in/siva-satya-sai-bhagavan-gopalajosyula-1624a027b/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/bhagavan444"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
