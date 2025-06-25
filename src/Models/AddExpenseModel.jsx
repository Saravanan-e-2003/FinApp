import React, { useState } from "react";
import { saveExpenseData } from "../CardinalStorage";

export default function Modal({ isOpen, onClose, saveTotalSpent }) {

  const [spentFromState,setSpentFromState] = useState("Online");
  // const [total,setTotal] = useState(()=>{localStorage.getItem("totalSpent")||0})
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");

  if (!isOpen) return null;

  function updateExpense(){
    const spent = {
      amount,
      remark,
      spentFromState
    }
    saveExpenseData(spent);
    // props.updateTotal(parseInt(amount));
    console.log(spent);
  }
  
  return (
    <div className="fixed inset-0 bg-gray-800/45 flex items-center justify-center z-20">
      {" "}
      <div className="bg-white border-4 p-6 shadow-lg w-lvh h-1/2">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>

        <label htmlFor="amount">Amount</label>
        <br />
        <input type="number" name="amount" id="amount-inp" placeholder="10" className="border p-2 w-2xs" onChange={(e)=>{
          setAmount(e.target.value);
        }} />
        <br />

        <div className="flex gap-5">
          <div>
            <label htmlFor="remark">Remark</label>
            <br />
            <input type="text" name="remark" id="remark-inp" placeholder="eg;-food,transport" className="border p-2 w-2xs" onChange={(a)=>{
              setRemark(a.target.value);
            }} />
            <br />
          </div>

          <div>
            <label htmlFor="spentFrom">Spent From</label>
            <br />
            <select name="spentFrom" className="border p-1 w-24" value={spentFromState} onChange={(e) =>{
              // spentFrom = ;
              setSpentFromState(e.target.value);
            }}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            <br />
          </div>
        </div>

        <div className="m-5">
          <button
            onClick={()=>{
              onClose();
              }
            }
            className="bg-blue-600  border-2 border-gray-950 text-white px-4 py-2 hover:bg-blue-400"
          >
            Cancel{" "}
          </button>{" "}

          <button
            onClick={()=>{
              updateExpense();
              saveTotalSpent(parseInt(amount));
              onClose()
            }}
            className="bg-gray-200  border-2 border-gray-950 text-gray-950 px-4 py-2 hover:bg-gray-400"
          >
            Add{" "}
          </button>{" "}
        </div>
      </div>{" "}
    </div>
  );
}
