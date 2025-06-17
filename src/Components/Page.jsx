import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import SideButton from "./sideButton";
import Overview from "./Overview";
import Savings from "./Savings";
import Balance from "./Balance";
import Transactions from "./Transactions";

import "../App.css";
import AddExpenseModel from "../Models/AddExpenseModel";
const Page = () => {
  const [isModelOpen, SetIsModelOpen] = useState(false);

  return (
    <div>
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

        <div className="contentBox">
          <Routes>
            <Route path="/" element={<Overview />}></Route>
            <Route path="/Balance" element={<Balance />}></Route>
            <Route path="/Savings" element={<Savings />}></Route>
            <Route path="/Transactions" element={<Transactions />}></Route>
          </Routes>

          <div>
            <h2>Graph</h2>
          </div>
          <div>
            <h2>Add expense</h2>
            <button onClick={() => SetIsModelOpen(!isModelOpen)}>Add+</button>
          </div>
          <AddExpenseModel
            isOpen={isModelOpen}
            onClose={() => {
              SetIsModelOpen(false);
            }}
          />
          <div>
            <h2>Avialable</h2>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Page;
