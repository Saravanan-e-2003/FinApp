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
    <div className="flex flex-col md:flex-row min-h-screen">
      <Router>
        {/* Mobile */}
        <div className="fixed bottom-0 left-0 right-0 w-full p-2 bg-[#fff7e4] border-t border-[#1f1a14] flex justify-around items-center md:hidden z-[99]">
          <Link to="/">
            <SideButton btnName="Overview" path="/" />
          </Link>
          <Link to="/Balance">
            <SideButton btnName="Balance" path="/Balance" />
          </Link>
          <Link to="/Savings">
            <SideButton btnName="Savings" path="/Savings" />
          </Link>
          <Link to="/Transactions">
            <SideButton btnName="Transactions" path="/Transactions" />
          </Link>
        </div>

        {/* PC */}
        <div className="hidden md:block md:w-64 p-4 flex flex-col">
          <Link to="/">
            <SideButton btnName="Overview" path="/" />
          </Link>
          <Link to="/Balance">
            <SideButton btnName="Balance" path="/Balance" />
          </Link>
          <Link to="/Savings">
            <SideButton btnName="Savings" path="/Savings" />
          </Link>
          <Link to="/Transactions">
            <SideButton btnName="Transactions" path="/Transactions" />
          </Link>
        </div>

        <div className="contentBox p-2 m-8 w-full md:flex-grow border-2 overflow-clip bg-[#fff7e4] shadow-[6px_6px_0_#1f1a14]">
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
