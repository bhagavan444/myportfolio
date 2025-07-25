import React from "react";
import "./Certifications.css";
import { motion } from "framer-motion";

const certifications = [
  { name: "C for Everyone – Coursera", file: "https://drive.google.com/file/d/1_icpofMdYi5iGjbELOY0VHMBloGJDhAA/view?usp=drive_link" },
  { name: "Python for Everyone – Coursera", file: "https://drive.google.com/file/d/1z2DPeFW4YO2Ct3q2DYW3X_4qj_553FMz/view?usp=drive_link" },
  { name: "Python Django - Infosys Spring Board", file: "https://drive.google.com/file/d/1QdiX2u-ARCZCEdEmlu4l3ChnQT-SmhKc/view?usp=drive_link" },
  { name: "JavaScript - Infosys Spring Board", file: "https://drive.google.com/file/d/1zrscfW3cyWq59mMYsK399CRjgEjA-zbd/view?usp=drive_link" },
  { name: "Skill Up in Java  - Infosys Spring Board", file: "https://drive.google.com/file/d/1w8hmCAAaP7CFFGMk3GkXfC4IvTAIXuM2/view?usp=drive_link" },
  { name: "React - Infosys Spring Board", file: "https://drive.google.com/file/d/1yy4OpoVRAX2ZGVPUH9VmorLc2kiXalYf/view?usp=drive_link" },
  { name: "MLOps - Infosys Spring Board", file: "https://drive.google.com/file/d/1BmvjGknXs-K5wOfepFcl_CuU8DsFBApP/view?usp=drive_link" },
  { name: "ServiceNow - Infosys Spring Board", file: "https://drive.google.com/file/d/1DPfQez89EoRKV7zhXhMKevkglMqvRjqI/view?usp=drive_link" },
  { name: "ML using Python - Infosys Spring Board", file: "https://drive.google.com/file/d/1uaTJTnijSpjCsD_ZPHKwen9i3RDYwShK/view?usp=drive_link" },
  { name: "HTML - Infosys Spring Board", file: "https://drive.google.com/file/d/1NYtaxfhQUfxaL4n6Vv6gJSEQMySy1gqr/view?usp=drive_link" },
  { name: "CSS - Infosys Spring Board", file: "https://drive.google.com/file/d/1iC65FGw0MSmjeKIivdnrZVm3GfXOKVvE/view?usp=drive_link" },
  { name: "AWS Certified", file: "https://drive.google.com/file/d/17vu2Vd5QnxAHe4iEYv21ADC-Pfs-90U9/view?usp=drive_link" },
  { name: "Mastering Python - Infosys Spring Board", file: "https://drive.google.com/file/d/1k402Ba4Azvjj823xlxaridsmMy-jahVu/view?usp=drive_link" },
  { name: "R Programming - Infosys Spring Board", file: "https://drive.google.com/file/d/14MnNRgQKwmCXCeZIr1QG0Q9-GhE1jVJJ/view?usp=sharing" },
  { name: "Continuous Integration and Continuous Delivery - Infosys Spring Board", file: "https://drive.google.com/file/d/1xccQv29hZCWCvr-JnM-nEfE8meESrWIr/view?usp=sharing" },
  { name: "Large language Model - IBM Skills", file: "https://drive.google.com/file/d/1CyN6_Bm3c68R0NkQWWTOgNAXTv27In_s/view?usp=sharing" },
  { name: "Mastering the Art of Programming - IBM Skills", file: "https://drive.google.com/file/d/1SwQGo_zGZIGcTzzlMApXZU0Wt5ScyWXx/view?usp=sharing"},
  { name: "Build your First Chat bot  - IBM Skills", file: "https://drive.google.com/file/d/1HOr1qGDbIZ_t-Uw3KJU9PGYk65xCW41R/view?usp=sharing"},
  { name: "Soft ware Enginnering - Infosys Spring Board", file: "https://drive.google.com/file/d/1siy3p3J8Y9yr8oSzrXMjf0fZ7V7iNKcl/view?usp=sharing"},

]


const Certifications = () => {
  return (
    <div className="certifications-container">
      <motion.h2
        className="cert-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        My Certifications
      </motion.h2>

      <motion.div
        className="cert-grid"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="cert-card"
            whileHover={{ scale: 1.07, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="cert-name" title={cert.name}>📄 {cert.name}</p>
            <a
              href={cert.file}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="cert-download-btn"
              aria-label={`Download certificate: ${cert.name}`}
            >
              View PDF
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Certifications;
