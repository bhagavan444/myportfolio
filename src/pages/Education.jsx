import React from "react";
import { motion } from "framer-motion";
import "./Education.css"; // ✅ Link your CSS here

const educationData = [
  {
    sno: 1,
    qualification: "B Tech - Artifical Intelligence And Data Science(Presently pursing Final Year)",
    board: "Jawaharlal Nehru Technological University (Kakinada)",
    college: "Ramachandra College of Engineering",
    cgpa: "7.5(Present)",
  },
  {
    sno: 2,
    qualification: "Intermediate - MPC",
    board: "Board of Intermediate Education",
    college: "Sri Vidya Junior College",
    cgpa: "8.0 CGPA",
    certificateLink: "https://drive.google.com/file/d/113yi6vME2ZiAfc8kLLvP6Vvfy8VUUMa3/view?usp=sharing",
  },
  {
    sno: 3,
    qualification: "SSC",
    board: "Secondary School Certificate",
    school: "Montessori English Medium High School",
    cgpa: "9.8 GPA",
    certificateLink: "https://drive.google.com/file/d/1u0T6y17c92h46HUbkMAcDXJhuTxcGkBn/view?usp=sharing",
  },
];

const Education = () => {
  return (
    <div className="education-beast-container">
      <h1 className="education-beast-title">My Education</h1>

      <div className="education-grid-wrapper">
        {educationData.map((edu, index) => (
          <motion.div
            key={edu.sno}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="education-beast-card"
          >
            <h2>
              #{edu.sno} • {edu.qualification}
            </h2>
            <p>
              <span className="education-label">Board:</span> {edu.board}
            </p>

            {edu.college && (
              <p>
                <span className="education-label">College:</span> {edu.college}
              </p>
            )}

            {edu.school && (
              <p>
                <span className="education-label">School:</span> {edu.school}
              </p>
            )}

            <p>
              <span className="education-label">CGPA:</span> {edu.cgpa}
            </p>

            {/* ✅ Certificate Link if available */}
            {edu.certificateLink && (
              <p>
                <a
                  href={edu.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-link"
                >
                  🔗 View Certificate
                </a>
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
