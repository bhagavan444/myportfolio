import React from "react";
import { motion } from "framer-motion";
import "./PersonalDetails.css";

const personalDetails = [
  { label: "Name", value: "Gopalajosyula Siva Satya Sai Bhagavan" },
  { label: "Phone Number", value: "+91-7569205626" },
  {
    label: "Address",
    value:
      "H.No: 20/471, Sri Nagar Colony, Near Anjaneyaswami Temple, Gudivada , AndhraPradesh - 521301",
  },
  { label: "Date of Birth", value: "16th October 2004" },
  { label: "Email", value: "g.sivasatyasaibhagavan.com" },
   { label: "Blood Group", value: "O possitive" },
  { label: "Father's Name", value: "Gopalajosyula Sridharbabu" },
  { label: "Mother's Name", value: "Gopalajosyula Vijayalakshmi Madhavi" },
  { label: "Brother's Name", value: "Gopalajosyula Avinash Babu (25 yrs)" },
];

const PersonalDetails = () => {
  return (
    <div className="personal-beast-container">
      <h1 className="personal-beast-title">Personal Details</h1>
      <div className="personal-grid-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="personal-beast-card"
        >
          {personalDetails.map((detail, index) => (
            <p key={index}>
              <span className="personal-label">{detail.label}:</span> {detail.value}
            </p>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalDetails;
