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
        <p className="tag">#MERN #Hackathon #RealProject</p>
      </motion.div>

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="card-title">📚 Workshops Attended</h3>
        <ul className="workshop-list">
          <li>🔬 <strong>Machine Learning</strong> - 7-day intensive workshop Learned core ML concepts such as supervised/unsupervised learning, data preprocessing, model training, evaluation metrics, and implemented basic ML models using Python and Scikit-learn.</li>
          <li>🧠 <strong>Deep Learning with TensorFlow</strong> - 7-day project-oriented workshop Explored the fundamentals of neural networks, activation functions, CNN architectures, and real-world use cases like image classification. Hands-on practice using TensorFlow and Keras.</li>
          <li>📱 <strong>Mobile Application Development</strong> - 7-day bootcamp using Flutter Developed basic Android apps, understood UI/UX principles, and explored tools like Android Studio and Flutter to build functional mobile interfaces.</li>
          <li>🌐 <strong>Web Development</strong> - 7-day hands-on program with HTML, CSS, JS Built responsive web pages using HTML, CSS, JavaScript, and React.js. Learned about client-server interactions, routing, components, and modern UI frameworks.</li>
        </ul>
        <p className="tag">#ML #DL #Flutter #WebDev</p>
      </motion.div>
    </div>
  );
};

export default Workshops;
