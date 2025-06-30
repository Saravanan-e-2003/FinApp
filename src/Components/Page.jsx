import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import SideButton from "./sideButton";
import Overview from "./Overview";
import Savings from "./Savings";
import Balance from "./Balance";
import Transactions from "./Transactions";
import "../App.css";

const Page = () => {
  return (
    <div className="flex">
      <Router>
        <div className="sideBar">
          <Link to="/">
            <SideButton btnName="Overview" />
          </Link>
          <Link to="/Balance">
            <SideButton btnName="Balance" />
          </Link>
          <Link to="/Savings">
            <SideButton btnName="Savings" />
          </Link>
          <Link to="/Transactions">
            <SideButton btnName="transactions" />
          </Link>
        </div>

        <div className="contentBox p-2 m-4 w-5xl h-vh border overflow-clip bg-[#fff7e4]">
          <Routes>
            <Route path="/" element={<Overview />}></Route>
            <Route path="/Balance" element={<Balance />}></Route>
            <Route path="/Savings" element={<Savings />}></Route>
            <Route path="/Transactions" element={<Transactions />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Page;
