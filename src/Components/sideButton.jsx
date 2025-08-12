import React from "react";
import "../App.css";
import { useLocation } from "react-router-dom";

const SideButton = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.path;
  
  // Mobile version is handled in Page.jsx with icons, so we focus on desktop version
  if (props.isMobile) {
    return null; // Mobile navigation is handled with icons in Page.jsx
  }

  return (
    <div className="mb-3">
      <button 
        className={`
          w-full px-6 py-4 
          border-2 border-[#1f1a14] 
          rounded-lg 
          font-medium
          text-left
          transition-all duration-200
          shadow-[4px_4px_0_#1f1a14]
          hover:shadow-[6px_6px_0_#1f1a14] 
          hover:translate-x-[-2px] 
          hover:translate-y-[-2px]
          ${isActive 
            ? "bg-[#1f1a14] text-[#fff7e4] font-bold" 
            : "bg-[#fff7e4] text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4]"
          }
        `}
      >
        <span className="text-base md:text-lg">
          {props.btnName}
        </span>
      </button>
    </div>
  );
};

export default SideButton;
