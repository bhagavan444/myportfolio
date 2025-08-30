import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaStar, FaLink, FaExternalLinkAlt, FaBrain } from 'react-icons/fa';

// Certifications data with concepts
const certifications = [
  {
    name: 'C for Everyone – Coursera',
    file: 'https://drive.google.com/file/d/1_icpofMdYi5iGjbELOY0VHMBloGJDhAA/view?usp=drive_link',
    issuer: 'Coursera',
    category: 'Programming',
    concepts: 'C Syntax, Pointers, Memory Management, Data Structures, File I/O',
  },
  {
    name: 'Python for Everyone – Coursera',
    file: 'https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link',
    issuer: 'Coursera',
    category: 'Programming',
    concepts: 'Python Basics, Functions, OOP, Data Analysis, File Handling',
  },
  {
    name: 'Python Django - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Web Development',
    concepts: 'Django Framework, ORM, REST APIs, Templates, Authentication',
  },
  {
    name: 'JavaScript - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Web Development',
    concepts: 'JavaScript ES6, DOM Manipulation, Async Programming, Events, APIs',
  },
  {
    name: 'Skill Up in Java - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Programming',
    concepts: 'Java OOP, Collections, Exception Handling, Multithreading, JDBC',
  },
  {
    name: 'React - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Web Development',
    concepts: 'React Components, Hooks, State Management, Routing, Redux',
  },
  {
    name: 'MLOps - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Machine Learning',
    concepts: 'Model Deployment, CI/CD for ML, Monitoring, Data Pipelines, Scalability',
  },
  {
    name: 'ServiceNow - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Platform Development',
    concepts: 'ServiceNow Platform, Workflows, Scripting, Integrations, IT Service Management',
  },
  {
    name: 'ML using Python - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Machine Learning',
    concepts: 'Supervised Learning, Unsupervised Learning, Scikit-learn, Pandas, Model Evaluation',
  },
  {
    name: 'HTML - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Web Development',
    concepts: 'HTML5, Semantic Tags, Forms, Accessibility, DOM Structure',
  },
  {
    name: 'CSS - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Web Development',
    concepts: 'CSS3, Flexbox, Grid, Animations, Responsive Design',
  },
  {
    name: 'AWS Certified',
    file: 'https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view?usp=drive_link',
    issuer: 'AWS',
    category: 'Cloud Computing',
    concepts: 'EC2, S3, Lambda, CloudFormation, VPC',
  },
  {
    name: 'Mastering Python - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link',
    issuer: 'Infosys',
    category: 'Programming',
    concepts: 'Advanced Python, Decorators, Generators, Modules, Concurrency',
  },
  {
    name: 'R Programming - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing',
    issuer: 'Infosys',
    category: 'Programming',
    concepts: 'R Syntax, Data Visualization, Statistical Analysis, Data Frames, Packages',
  },
  {
    name: 'Continuous Integration and Continuous Delivery - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing',
    issuer: 'Infosys',
    category: 'DevOps',
    concepts: 'CI/CD Pipelines, Jenkins, Git, Docker, Automation',
  },
  {
    name: 'Large Language Model - IBM Skills',
    file: 'https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing',
    issuer: 'IBM',
    category: 'Machine Learning',
    concepts: 'LLMs, Transformers, Fine-Tuning, NLP, Prompt Engineering',
  },
  {
    name: 'Mastering the Art of Programming - IBM Skills',
    file: 'https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing',
    issuer: 'IBM',
    category: 'Programming',
    concepts: 'Algorithm Design, Problem Solving, Code Optimization, Debugging, Best Practices',
  },
  {
    name: 'Build Your First Chatbot - IBM Skills',
    file: 'https://drive.google.com/file/d/1HOr1qGDbIZ_t-Uw3KJU9PGYk65xCW41R/view?usp=sharing',
    issuer: 'IBM',
    category: 'AI Development',
    concepts: 'Chatbot Design, NLP, Dialogflow, API Integration, User Interaction',
  },
  {
    name: 'Software Engineering - Infosys Spring Board',
    file: 'https://drive.google.com/file/d/1siy3p3J8Y9yr8oSzrXMjf0fZ7V7iNKcl/view?usp=sharing',
    issuer: 'Infosys',
    category: 'Software Engineering',
    concepts: 'SDLC, Agile, Design Patterns, Testing, UML',
  },
];

// Concepts Component with Carousel Effect
const Concepts = React.memo(({ concepts, index }) => {
  const conceptList = concepts.split(', ');
  return (
    <motion.div
      style={{
        display: 'flex',
        width: `${conceptList.length * 100}%`,
        animation: conceptList.length > 3 ? 'conceptsCarousel 20s linear infinite' : 'none',
      }}
    >
      {conceptList.concat(conceptList).map((concept, i) => (
        <motion.span
          key={`${concept}-${i}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'clamp(8px, 1.2vw, 10px)',
            margin: 'clamp(6px, 1vw, 8px)',
            padding: 'clamp(6px, 1vw, 8px) clamp(10px, 1.8vw, 12px)',
            background: 'linear-gradient(45deg, rgba(192, 38, 211, 0.3), rgba(76, 29, 149, 0.3))',
            borderRadius: 'clamp(10px, 1.5vw, 12px)',
            border: '2px solid rgba(59, 130, 246, 0.4)',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
          }}
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.08 + i * 0.06, type: 'spring', stiffness: 180, damping: 14 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + i * 0.06 }}
            style={{ color: '#3b82f6', textShadow: '0 0 15px rgba(59, 130, 246, 0.7)' }}
          >
            <FaBrain style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }} />
          </motion.span>
          <span style={{ color: '#e0e7ff', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 600 }}>
            {concept}
          </span>
        </motion.span>
      ))}
    </motion.div>
  );
});

// Styles adapted from Projects.jsx
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
  header: {
    textAlign: 'center',
    padding: 'clamp(2rem, 4vw, 3.5rem)',
    background: 'rgba(10, 0, 30, 0.85)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(16px, 2.2vw, 20px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(59, 130, 246, 0.3)',
    backdropFilter: 'blur(16px)',
    maxWidth: 'clamp(700px, 90vw, 1100px)',
    margin: '0 auto clamp(3rem, 6vw, 5rem)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    inset: 0,
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    opacity: 0.45,
    zIndex: -1,
  },
  title: {
    fontSize: 'clamp(2rem, 5.5vw, 4rem)',
    fontWeight: 900,
    color: 'transparent',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3, #4c1d95)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 35px rgba(59, 130, 246, 0.7), 0 0 60px rgba(192, 38, 211, 0.5)',
    marginBottom: 'clamp(0.6rem, 1.8vw, 1.2rem)',
    letterSpacing: '0.12em',
  },
  titleUnderline: {
    width: 'clamp(160px, 30vw, 240px)',
    height: '5px',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3)',
    borderRadius: '5px',
    margin: '0.6rem auto',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    marginBottom: 'clamp(2rem, 4vw, 3rem)',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    color: '#e0e7ff',
    cursor: 'pointer',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    fontWeight: '600',
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
  },
  activeFilter: {
    background: 'linear-gradient(90deg, #3b82f6, #c026d3)',
    color: '#f0faff',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 45vw, 380px), 1fr))',
    gap: 'clamp(1.8rem, 3.5vw, 3rem)',
    maxWidth: 'clamp(800px, 95vw, 1600px)',
    margin: '0 auto',
    perspective: '2000px',
  },
  card: {
    background: 'rgba(10, 0, 30, 0.9)',
    borderRadius: 'clamp(14px, 2.5vw, 20px)',
    padding: 'clamp(2rem, 3.5vw, 2.8rem)',
    textAlign: 'center',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(59, 130, 246, 0.25)',
    transformStyle: 'preserve-3d',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'conic-gradient(from 45deg, rgba(59, 130, 246, 0.35), rgba(192, 38, 211, 0.35), transparent)',
    zIndex: -1,
    opacity: 0.45,
  },
  certName: {
    fontSize: 'clamp(1.5rem, 3.2vw, 2rem)',
    color: '#3b82f6',
    textShadow: '0 0 18px rgba(59, 130, 246, 0.6)',
    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  certIssuer: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#e0e7ff',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
    lineHeight: '1.7',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
  },
  certCategory: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#3b82f6',
    fontWeight: 'bold',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
  },
  certConcepts: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
    color: '#3b82f6',
    fontWeight: 'bold',
    marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
    textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
  },
  conceptsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(10px, 2vw, 12px)',
    marginTop: 'clamp(0.8rem, 2vw, 1rem)',
    marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
    overflow: 'hidden',
  },
  certButton: {
    display: 'inline-flex',
    padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)',
    background: 'linear-gradient(90deg, #3b82f6, #c026d3)',
    color: '#f0faff',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  copyButton: {
    display: 'inline-flex',
    padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: 'clamp(12px, 1.8vw, 16px)',
    color: '#e0e7ff',
    fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
    fontWeight: '600',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
    cursor: 'pointer',
    alignItems: 'center',
    gap: 'clamp(0.3rem, 0.8vw, 0.5rem)',
  },
  loadingButton: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  spinner: {
    display: 'inline-block',
    width: 'clamp(1rem, 2vw, 1.5rem)',
    height: 'clamp(1rem, 2vw, 1.5rem)',
    border: '3px solid rgba(59, 130, 246, 0.3)',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  expandedCard: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(500px, 80vw, 800px)',
    maxHeight: '80vh',
    background: 'rgba(10, 0, 30, 0.95)',
    borderRadius: 'clamp(20px, 3vw, 24px)',
    padding: 'clamp(2.5rem, 5vw, 3.5rem)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
    backdropFilter: 'blur(20px)',
    zIndex: 1000,
    overflowY: 'auto',
  },
  expandedOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    zIndex: 999,
  },
  closeButton: {
    position: 'absolute',
    top: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    right: 'clamp(0.8rem, 1.8vw, 1.2rem)',
    background: 'transparent',
    border: 'none',
    color: '#e0e7ff',
    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    cursor: 'pointer',
  },
  responsive: {
    large: {
      container: { padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 3vw, 2.5rem)' },
      header: { padding: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: 'clamp(700px, 90vw, 1100px)' },
      title: { fontSize: 'clamp(2rem, 5.5vw, 4rem)' },
      grid: { gap: 'clamp(1.8rem, 3.5vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300 dues, 45vw, 380px), 1fr))' },
      card: { padding: 'clamp(2rem, 3.5vw, 2.8rem)' },
      certName: { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)' },
      certButton: { padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.8rem)' },
      holographicGlow: { width: 'clamp(500px, 65vw, 800px)', height: 'clamp(500px, 65vw, 800px)', top: '-20%', left: '-20%' },
      expandedCard: { width: 'clamp(500px, 80vw, 800px)', padding: 'clamp(2.5rem, 5vw, 3.5rem)' },
    },
    medium: {
      container: { padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2.5vw, 2rem)' },
      header: { padding: 'clamp(1.8rem, 3.5vw, 3rem)', maxWidth: 'clamp(600px, 85vw, 900px)' },
      title: { fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' },
      grid: { gap: 'clamp(1.5rem, 3vw, 2.5rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 40vw, 340px), 1fr))' },
      card: { padding: 'clamp(1.8rem, 3vw, 2.5rem)' },
      certName: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' },
      certButton: { padding: 'clamp(0.5rem, 1.2vw, 0.8rem) clamp(1rem, 2vw, 1.5rem)' },
      holographicGlow: { width: 'clamp(400px, 55vw, 600px)', height: 'clamp(400px, 55vw, 600px)', top: '-15%', left: '-15%' },
      expandedCard: { width: 'clamp(400px, 80vw, 600px)', padding: 'clamp(2rem, 4vw, 3rem)' },
    },
    small: {
      container: { padding: 'clamp(2rem, 5vw, 4rem) clamp(0.8rem, 2vw, 1.5rem)' },
      header: { padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 'clamp(500px, 80vw, 700px)' },
      title: { fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' },
      grid: { gap: 'clamp(1.2rem, 2.5vw, 2rem)', gridTemplateColumns: '1fr' },
      card: { padding: 'clamp(1.5rem, 2.5vw, 2rem)' },
      certName: { fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)' },
      certButton: { padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 1.8vw, 1.2rem)' },
      holographicGlow: { width: 'clamp(300px, 45vw, 500px)', height: 'clamp(300px, 45vw, 500px)', top: '-12%', left: '-12%' },
      expandedCard: { width: 'clamp(300px, 90vw, 500px)', padding: 'clamp(1.8rem, 3.5vw, 2.5rem)' },
    },
  },
};

// Animation styles
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
  }
  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes conceptsCarousel {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); border-top-color: #3b82f6; }
    100% { transform: rotate(360deg); border-top-color: #c026d3; }
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 2, ease: 'easeOut', staggerChildren: 0.3 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -100, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.5, type: 'spring', stiffness: 150, damping: 18 },
  },
};

const filterBtnVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 170, damping: 13 },
  },
  exit: { opacity: 0, scale: 0.7, y: 40, transition: { duration: 0.5 } },
  active: {
    scale: [1, 1.15, 1],
    boxShadow: ['0 0 10px rgba(59, 130, 246, 0.3)', '0 0 20px rgba(59, 130, 246, 0.7)', '0 0 10px rgba(59, 130, 246, 0.3)'],
    transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' },
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

const cardChildVariants = {
  hidden: { opacity: 0, x: -40, rotate: -10 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6 } },
};

const expandedCardVariants = {
  hidden: { opacity: 0, scale: 0.5, rotateY: 90, x: '-50%', y: '-50%' },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, type: 'spring', stiffness: 120, damping: 14 },
  },
  exit: { opacity: 0, scale: 0.5, rotateY: -90, transition: { duration: 0.6 } },
};

const Certifications = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [filter, setFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCopying, setIsCopying] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.4, 1]), { stiffness: 150, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.85, 1]), { stiffness: 150, damping: 20 });
  const rotate = useSpring(useTransform(scrollYProgress, [0, 0.5], [-5, 0]), { stiffness: 150, damping: 20 });
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = selectedCert ? 'hidden' : 'auto';
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedCert]);

  useEffect(() => {
    if (selectedCert && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedCert]);

  const categories = useMemo(() =>
    ['All', ...new Set(certifications.map(cert => cert.category))].sort(),
    []
  );

  const filteredCerts = useMemo(() =>
    filter === 'All' ? certifications : certifications.filter(cert => cert.category === filter),
    [filter]
  );

  const responsiveStyles = useMemo(() =>
    windowWidth <= 480 ? styles.responsive.small :
    windowWidth <= 768 ? styles.responsive.medium :
    styles.responsive.large,
    [windowWidth]
  );

  const handleCardClick = useCallback((cert) => {
    setSelectedCert(cert);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCert(null);
  }, []);

  const handleCopyLink = useCallback((link) => {
    setIsCopying(true);
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
      setIsCopying(false);
    }).catch(() => {
      alert('Failed to copy link.');
      setIsCopying(false);
    });
  }, []);

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
      aria-label="Certifications section"
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
      {/* Header Section */}
      <motion.header
        style={{
          ...styles.header,
          ...responsiveStyles.header,
        }}
        variants={headerVariants}
      >
        <motion.div style={styles.headerGlow} />
        <h2
          style={{
            ...styles.title,
            ...responsiveStyles.title,
            animation: 'holographicPulse 2.5s ease-in-out infinite alternate',
          }}
        >
          <FaStar style={{ marginRight: 'clamp(0.3rem, 0.8vw, 0.5rem)', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }} />
          Certifications Showcase
        </h2>
        <motion.div
          style={styles.titleUnderline}
          initial={{ width: 0 }}
          animate={{ width: 'clamp(160px, 30vw, 240px)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </motion.header>
      {/* Filter Bar */}
      <motion.div
        style={{
          ...styles.filterBar,
          ...responsiveStyles.filterBar,
        }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {categories.map((category, index) => (
            <motion.button
              key={category}
              style={{
                ...styles.filterBtn,
                ...(filter === category ? styles.activeFilter : {}),
                ...responsiveStyles.filterBtn,
              }}
              onClick={() => setFilter(category)}
              variants={filterBtnVariants}
              initial="hidden"
              animate={filter === category ? 'active' : 'visible'}
              exit="exit"
              whileTap={{ scale: 0.9 }}
              aria-pressed={filter === category}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Certifications Grid */}
      <motion.div
        style={{
          ...styles.grid,
          ...responsiveStyles.grid,
        }}
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredCerts.map((cert, index) => (
            <motion.article
              key={cert.name}
              style={{
                ...styles.card,
                ...responsiveStyles.card,
              }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              onClick={() => handleCardClick(cert)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${cert.name}`}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(cert)}
            >
              <motion.div style={{ ...styles.cardOverlay, animation: 'rotateGlow 8s linear infinite' }} />
              <motion.h3
                style={{
                  ...styles.certName,
                  ...responsiveStyles.certName,
                }}
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.2 }}
              >
                <FaCertificate style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)' }} />
                #{index + 1} • {cert.name}
              </motion.h3>
              <motion.p
                style={styles.certIssuer}
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                Issued by: {cert.issuer}
              </motion.p>
              <motion.p
                style={styles.certCategory}
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                Category: {cert.category}
              </motion.p>
              <motion.p
                style={styles.certConcepts}
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                Concepts Learned:
              </motion.p>
              <motion.div
                style={styles.conceptsContainer}
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.6 }}
              >
                <Concepts concepts={cert.concepts} index={index} />
              </motion.div>
              <motion.a
                href={cert.file}
                style={{
                  ...styles.certButton,
                  ...responsiveStyles.certButton,
                }}
                target="_blank"
                rel="noreferrer"
                variants={cardChildVariants}
                transition={{ delay: index * 0.2 + 0.7 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt style={{ marginRight: 'clamp(0.3rem, 0.8vw, 0.5rem)' }} />
                View Certificate
              </motion.a>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedCert && (
          <>
            <motion.div
              style={styles.expandedOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              role="button"
              tabIndex={0}
              aria-label="Close certification details"
              onKeyDown={(e) => e.key === 'Enter' && handleClose()}
            />
            <motion.div
              ref={modalRef}
              style={{
                ...styles.expandedCard,
                ...responsiveStyles.expandedCard,
              }}
              variants={expandedCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              tabIndex={-1}
              role="dialog"
              aria-label={`${selectedCert.name} details`}
            >
              <motion.div style={{ ...styles.cardOverlay, animation: 'rotateGlow 8s linear infinite' }} />
              <motion.button
                style={styles.closeButton}
                onClick={handleClose}
                aria-label="Close certification details"
                whileHover={{ scale: 1.2, rotate: 90, color: '#3b82f6' }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              <motion.h3
                style={{
                  ...styles.certName,
                  fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                  marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
                }}
                variants={cardChildVariants}
              >
                <FaCertificate style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)' }} />
                #{certifications.indexOf(selectedCert) + 1} • {selectedCert.name}
              </motion.h3>
              <motion.p
                style={{
                  ...styles.certIssuer,
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                  lineHeight: '1.7',
                }}
                variants={cardChildVariants}
              >
                Issued by: {selectedCert.issuer}
              </motion.p>
              <motion.p
                style={{
                  ...styles.certCategory,
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                  lineHeight: '1.7',
                }}
                variants={cardChildVariants}
              >
                Category: {selectedCert.category}
              </motion.p>
              <motion.p
                style={styles.certConcepts}
                variants={cardChildVariants}
              >
                Concepts Learned:
              </motion.p>
              <motion.div
                style={styles.conceptsContainer}
                variants={cardChildVariants}
              >
                <Concepts concepts={selectedCert.concepts} index={0} />
              </motion.div>
              <motion.div
                style={{ display: 'flex', gap: 'clamp(0.8rem, 1.8vw, 1.2rem)', marginTop: 'clamp(1rem, 2.5vw, 1.5rem)' }}
                variants={cardChildVariants}
              >
                <motion.a
                  href={selectedCert.file}
                  style={styles.certButton}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
                    transition: { duration: 0.3 },
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaExternalLinkAlt style={{ marginRight: 'clamp(0.3rem, 0.8vw, 0.5rem)' }} />
                  View Certificate
                </motion.a>
                <motion.button
                  style={{
                    ...styles.copyButton,
                    ...(isCopying ? styles.loadingButton : {}),
                  }}
                  onClick={() => handleCopyLink(selectedCert.file)}
                  disabled={isCopying}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLink style={{ marginRight: 'clamp(0.3rem, 0.8vw, 0.5rem)' }} />
                  {isCopying ? 'Copying...' : 'Copy Link'}
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default React.memo(Certifications);