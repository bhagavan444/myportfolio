import React from "react";
import "../components/Workshops.css";
import { motion } from "framer-motion";

const Workshops = () => {
  return (
    <div className="workshops-container">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Workshops & Hackathons
      </motion.h2>

      {/* 🔧 Hackathon Card */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="card-title">🚀 Hackathon - Brainovision x RCE</h3>
        <p>
          Participated in a 24-hour Hackathon conducted by Brainovision and Ramachandra College of Engineering. Built a full-stack platform for{" "}
          <strong>Online 2nd Hand Electronics Selling</strong> using the <strong>MERN Stack</strong> with features like user authentication, product listing, and dynamic search filtering.
          We built a fully functional web platform inspired by OLX, aimed at enabling users to buy and sell second-hand electronic gadgets in a secure and user-friendly environment.
        </p>
        <div className="button-group">
          <a
            href="https://github.com/bhagavan444/hacakthon-project"
            className="view-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 View Project
          </a>
          <a
            href="https://drive.google.com/file/d/1CQaoA9V93Lg4XS1FmcG-0gVUaKvw2zUq/view?usp=sharing"
            className="view-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            🎓 View Certificate
          </a>
        </div>
        <p className="tag">#MERN #Hackathon #RealProject</p>
      </motion.div>

      {/* 📚 Workshops Card */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="card-title">📚 Workshops Attended</h3>
        <ul className="workshop-list">
          <li>🔬 <strong>Machine Learning</strong> – 7-day intensive workshop covering supervised/unsupervised learning, data preprocessing, model training, and evaluation using Python and Scikit-learn.</li>
          <li>🧠 <strong>Deep Learning with TensorFlow</strong> – Project-oriented workshop on CNNs, activation functions, and image classification using TensorFlow & Keras.</li>
          <li>📱 <strong>Mobile App Development</strong> – Bootcamp using Flutter and Android Studio. Learned UI/UX principles and developed basic Android apps.</li>
          <li>🌐 <strong>Web Development</strong> – Hands-on workshop with HTML, CSS, JavaScript, and React.js. Built responsive pages and understood client-server flow.</li>
        </ul>
        <p className="tag">#ML #DL #Flutter #WebDev</p>
      </motion.div>
    </div>
  );
};

export default Workshops;
