import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import SideButton from "./sideButton";
import Overview from "./Overview";
import Savings from "./Savings";
import Balance from "./Balance";
import Transactions from "./Transactions";
import "../App.css";
import { ArrowLeftRight, ChartCandlestick, House, Wallet } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Router>
        {/* Mobile */}
        <div className="fixed bottom-3 left-5 w-[90%] h-[7%] bg-[#fff7e4] border-[#1f1a14] flex justify-around items-center md:hidden z-[99] rounded-full">
          <Link to="/">
            <House />
            {/* <SideButton btnName="Overview" isMobile={true} path="/" /> */}
          </Link>
          <Link to="/Balance">
            <Wallet />
            {/* <SideButton btnName="Balance" isMobile={true} path="/Balance" /> */}
          </Link>
          <Link to="/Savings">
            <ChartCandlestick />
            {/* <SideButton btnName="Savings" isMobile={true} path="/Savings" /> */}
          </Link>
          <Link to="/Transactions">
            <ArrowLeftRight />
            {/* <SideButton btnName="Transactions" isMobile={true} path="/Transactions" /> */}
          </Link>
        </div>

        {/* PC */}
        <div className="hidden md:block md:w-64 p-4 flex flex-col">
          <Link to="/">
            <SideButton btnName="Overview" isMobile={false} path="/" />
          </Link>
          <Link to="/Balance">
            <SideButton btnName="Balance" isMobile={false} path="/Balance" />
          </Link>
          <Link to="/Savings">
            <SideButton btnName="Savings" isMobile={false} path="/Savings" />
          </Link>
          <Link to="/Transactions">
            <SideButton btnName="Transactions" isMobile={false} path="/Transactions" />
          </Link>
        </div>
        <div className="contentBox p-2 md:m-6 md:w-full w-[calc(100%-50px)] border-2 overflow-clip bg-[#fff7e4] shadow-[6px_6px_0_#1f1a14] mx-auto sm:mt-[20px]
                h-[60%]                    
                md:h-[calc(75%-10px)]   
                sm:h-[90%]  
                ">
          <Routes>
            <Route path="/" element={<Overview />}></Route>
            <Route path="/Balance" element={<Balance />}></Route>
            <Route path="/Savings" element={<Savings />}></Route>
            <Route path="/Transactions" element={<Transactions />}></Route>
          </Routes>
        </div>
      </Router >
    </div >
  );
};

export default Page;
