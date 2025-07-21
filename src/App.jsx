import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Certifications from "./pages/Certifications";
import Workshops from "./pages/Workshops";
import Education from "./pages/Education";
import MySkills from "./pages/MySkills";
import PersonalDetails from "./pages/PersonalDetails";
import Internships from "./pages/Internships"; // ✅ Added new page

// ✅ ScrollToTop Component (Scrolls to top on every route change)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="pt-20">
        <Routes>
          {/* Redirect old URL with spaces and & to new URL */}
          <Route
            path="/workshops & hacathons"
            element={<Navigate to="/workshops-hackathons" replace />}
          />

          {/* Standard Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/workshops-hackathons" element={<Workshops />} />
          <Route path="/contact" element={<Contact />} />

          {/* New Routes */}
          <Route path="/education" element={<Education />} />
          <Route path="/myskills" element={<MySkills />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/internships" element={<Internships />} /> {/* ✅ New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
