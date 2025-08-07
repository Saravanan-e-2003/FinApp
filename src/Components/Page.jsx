import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SideButton from "./sideButton";
import Overview from "./Overview";
import Savings from "./Savings";
import Balance from "./Balance";
import Transactions from "./Transactions";
import "../App.css";
import { ArrowLeftRight, ChartCandlestick, House, Wallet } from "lucide-react";

const Page = () => {
  return (
    <div className="h-[80vh] flex flex-col md:flex-row overflow-hidden">
        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm h-16 bg-[#fff7e4] border-2 border-[#1f1a14] flex justify-around items-center md:hidden z-50 rounded-full shadow-[4px_4px_0_#1f1a14]">
          <Link to="/" className="p-3 rounded-full hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors">
            <House className="h-6 w-6" />
          </Link>
          <Link to="/Balance" className="p-3 rounded-full hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors">
            <Wallet className="h-6 w-6" />
          </Link>
          <Link to="/Savings" className="p-3 rounded-full hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors">
            <ChartCandlestick className="h-6 w-6" />
          </Link>
          <Link to="/Transactions" className="p-3 rounded-full hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors">
            <ArrowLeftRight className="h-6 w-6" />
          </Link>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:flex-col md:w-64 bg-transparent p-6 h-full">
          <div className="space-y-2">
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
        </div>

        {/* Main Content Area */}
        <div className="md:w-[calc(100%-256px)] w-full h-full">
          <div className="h-full md:p-6 p-4 pb-20 md:pb-6">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] h-full overflow-y-auto">
              <Routes>
                <Route path="/" element={<Overview />}></Route>
                <Route path="/Balance" element={<Balance />}></Route>
                <Route path="/Savings" element={<Savings />}></Route>
                <Route path="/Transactions" element={<Transactions />}></Route>
              </Routes>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Page;
