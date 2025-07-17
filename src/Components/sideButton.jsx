import React from "react";
import "../App.css";
import { useLocation } from "react-router-dom";

const SideButton = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.path;
  return (
    <>
    {props.isMobile ? 
    <div>
      <button></button>
    </div>:

      <button 
      className={`
        p-5 m-6 
        border-2 w-40 
        text-center 
        hover:bg-[#1f1a14] 
        hover:text-[#fff7e4] 
        hover:border-[#1f1a14]
        hover:font-bold
        ${isActive?"bg-[#1f1a14] border-[#1f1a14] text-[#fff7e4]":""}
        `}>{props.btnName}</button>}

      <br />
    </>
  );
};

export default SideButton;
