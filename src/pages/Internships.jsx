import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./Internships.css";

const internships = [
  {
    title: "AI, ML & Data Science Intern (AIML&DS)",
    company: "Blackbucks Pvt Ltd",
    duration: "May 2024 - June 2024 (2 Months)",
    description:
      "Completed a certified internship in AI, ML & Data Science (AIMLDS). Worked on real-time datasets, implemented preprocessing, exploratory data analysis (EDA), and built predictive models using Python, Pandas, NumPy, and scikit-learn.",
    certificateLink:
      "https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view?usp=sharing",
  },
  {
    title: "AI & Machine Learning Intern",
    company: "SmartBridge (in collaboration with Eduskills)",
    duration: "May 2025 – June 2025 (2 Months)",
    description:
      "Successfully completed a certified internship in Artificial Intelligence & Machine Learning focused on image classification. Developed a deep learning-based Fruit and Vegetable Disease Classifier using transfer learning with MobileNetV2. Implemented model training, validation, and Flask-based deployment for real-time disease detection.",
    certificateLink:
      "https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view?usp=sharing",
  },
];

const Internships = () => {
  return (
    <div className="internships-container">
      <h1 className="internship-title">My Internships</h1>
      <div className="internship-grid">
        {internships.map((intern, index) => (
          <div className="internship-card" key={index}>
            <h2 className="internship-role">{intern.title}</h2>
            <p className="internship-details">
              <strong>Company:</strong> {intern.company}
              <br />
              <strong>Duration:</strong> {intern.duration}
              <br />
              <strong>Description:</strong> {intern.description}
            </p>
            <a
              href={intern.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="internship-btn"
            >
              View Certificate <FaExternalLinkAlt style={{ marginLeft: "6px" }} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;
