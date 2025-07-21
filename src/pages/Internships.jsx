import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./Internships.css"; // 💡 Ensure this is present

const internships = [
  {
    title: "AI, ML & Data Science Intern (AIML&DS)",
    company: "Blackbucks Pvt Ltd",
    duration: "May 2024 - June 2024 (2 Months)",
    description:
      "Completed a certified internship in AI, ML & Data Science (AIMLDS). Worked on real-time datasets, implemented preprocessing, exploratory data analysis (EDA), and built predictive models using Python, Pandas, NumPy, and scikit-learn.",
    certificateLink: "https://drive.google.com/file/d/1yQQqBf32o8d3sYlheDCdaLTKj5_hepfY/view?usp=sharing",
  },
  {
    title: "AI & Machine Learning Intern (AI&ML)",
    company: "SmartBridge (in collaboration with Edu skills)",
    duration: "May 2025 - June 2025 (2 Months)",
    description:
      "Successfully completed a certified internship in Artificial Intelligence & Machine Learning (AIML). Designed and deployed intelligent AWS-powered chatbot systems using Python, AWS Lex, and Lambda, guided by AWS experts.",
    certificateLink: "https://drive.google.com/file/d/1-_8ZI8uZ3DcrFpfZ3pts7VSYrAqPN5Zw/view?usp=sharing",
  },
];

const Internships = () => {
  return (
    <div className="internship-container">
      <div className="internship-wrapper">
        <h1 className="internship-heading">My Internships</h1>
        <div className="internship-grid">
          {internships.map((intern, index) => (
            <div key={index} className="internship-card">
              <h2 className="internship-title">{intern.title}</h2>
              <p className="internship-company">{intern.company}</p>
              <p className="internship-duration">{intern.duration}</p>
              <p className="internship-description">{intern.description}</p>
              <a
                href={intern.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="internship-link"
              >
                View Certificate <FaExternalLinkAlt className="icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Internships;
