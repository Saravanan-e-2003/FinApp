import React from "react";
import "../App.css";

const SideButton = (props) => {
  return (
    <>
      <button className="p-5 m-6 border-2 w-40 text-center">{props.btnName}</button>
      <br />
    </>
  );
};

export default SideButton;
