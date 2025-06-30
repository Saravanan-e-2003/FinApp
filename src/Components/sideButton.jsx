import React from "react";
import "../App.css";

const SideButton = (props) => {
  return (
    <>
      <button 
      className="
        p-5 m-6 
        border-2 w-40 
        text-center 
        hover:bg-[#1f1a14] 
        hover:text-[#fff7e4] 
        hover:border-[#1f1a14]
        hover:font-bold
        ">{props.btnName}</button>
      <br />
    </>
  );
};

export default SideButton;
