import React, { useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaTwitter,
} from "react-icons/fa";
import "../components/Contact.css"; // Make sure CSS is correctly styled

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8pg8cek",         // ✅ Your EmailJS service ID
        "template_1ys1isn",        // ✅ Your EmailJS template ID
        form.current,
        "GOTwySQukEpQEuRa5"        // ✅ Your new public key
      )
      .then(
        () => {
          alert("✅ Message sent!");
          e.target.reset();
        },
        () => {
          alert("❌ Failed to send.");
        }
      );
  };

  return (
    <motion.div
      className="beast-contact-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="beast-contact-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="beast-contact-title">🌈 Let's Connect in Style!</h2>

        <form ref={form} onSubmit={sendEmail}>
          <motion.input
            name="user_name"
            type="text"
            placeholder="Your Name"
            className="beast-contact-input"
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            name="user_email"
            type="email"
            placeholder="Your Email"
            className="beast-contact-input"
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.textarea
            name="message"
            placeholder="Your Message"
            className="beast-contact-textarea"
            required
            rows="5"
            whileFocus={{ scale: 1.05 }}
          ></motion.textarea>

          <motion.button
            type="submit"
            className="beast-contact-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Send 🌟
          </motion.button>
        </form>

        <motion.div
          className="beast-contact-icons"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a href="mailto:g.sivasatyasaibhagavan@gmail.com"><FaEnvelope /></a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="https://github.com/yourprofile" target="_blank" rel="noreferrer"><FaGithub /></a>
          {/* <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer"><FaTwitter /></a> */}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
