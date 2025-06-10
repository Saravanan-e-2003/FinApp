import React from "react";
import SideButton from "./sideButton";

const Page = () => {
  return (
    <div>
      <div className="sideBar">
        <SideButton btnName="Overview" />
        <SideButton btnName="Balance" />
        <SideButton btnName="Savings" />
        <SideButton btnName="ransactions" />
      </div>

      <div className="contentBox">
        <div className="overview">
          <div>
            <h2>Graph</h2>
          </div>
          <div>
            <h2>Add expense</h2>
            <button>Add+</button>
          </div>
          <div>
            <h2>Avialable</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
