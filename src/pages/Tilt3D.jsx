import React, { useRef, useEffect } from "react";
import "./Tilt3D.css"; // We'll add CSS here for smooth transform

const Tilt3D = ({ children, maxTilt = 15 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = ((x - centerX) / centerX) * maxTilt;
      const deltaY = ((centerY - y) / centerY) * maxTilt;

      element.style.setProperty("--tiltX", `${deltaY}deg`);
      element.style.setProperty("--tiltY", `${deltaX}deg`);
    };

    const resetTilt = () => {
      element.style.setProperty("--tiltX", "0deg");
      element.style.setProperty("--tiltY", "0deg");
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", resetTilt);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", resetTilt);
    };
  }, [maxTilt]);

  return (
    <div className="tilt3d-wrapper" ref={ref}>
      {children}
    </div>
  );
};

export default Tilt3D;
