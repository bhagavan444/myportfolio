import React from "react";
import { motion } from "framer-motion";
import "./Education.css"; // ✅ Link your CSS here

const educationData = [
  {
    sno: 1,
    qualification: "B Tech - Artifical Intelligence And Data Science",
    board: "Jawaharlal Nehru Technological  University(Kakinada)",
    college: "Ramachandra College of Engineering",
    cgpa: "8.0 CGPA",
  },
  {
    sno: 2,
    qualification: "Intermediate - MPC",
    board: "Board of Intermmediate Education",
    college: "Sri Vidya Junior College",
    cgpa: "8.0 CGPA",
  },
  {
    sno: 3,
    qualification: "SSC",
    board: "Secondary School Certificate ",
    school: "Montessori English Medium High School",
    cgpa: "9.8 GPA",
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

            {/* ✅ Show College only if exists */}
            {edu.college && (
              <p>
                <span className="education-label">College:</span> {edu.college}
              </p>
            )}

            {/* ✅ Show School only if exists */}
            {edu.school && (
              <p>
                <span className="education-label">School:</span> {edu.school}
              </p>
            )}

            <p>
              <span className="education-label">CGPA:</span> {edu.cgpa}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
