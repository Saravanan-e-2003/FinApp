import React, { useState } from "react";
import { saveExpenseData,getTotalBalance, getOnlineBalance, getOfflineBalance } from "../CardinalStorage";
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
    <div className="flex fixed inset-0 bg-gray-600/45 w-full h-full
         bg-[linear-gradient(45deg,_#e5e7eb_0,_#e5e7eb_1px,_transparent_1px,_transparent_10px)]
            bg-[size:10px_10px]">
            <div className="flex flex-col border-4 rounded-lg bg-amber-50 w-[calc(100%-50px)] md:w-[calc(50%-20px)] h-auto mx-auto my-auto p-4">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>

        <label htmlFor="amount">Amount</label>
        <br />
        <input type="number" name="amount" id="amount-inp" placeholder="10" className="border p-2 w-2xs" onChange={(e)=>{
          setAmount(e.target.value);
        }} />
        <br />

        <div className="flex flex-col md:flex-row gap-5">
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

              if(getTotalBalance() <= 0){
                alert("Not enough balance");
                return;
              }
              
              if(spentFromState ==="Online"){
                if(getOnlineBalance() < parseInt(amount)){
                  alert("Not enough balance");
                  return;
                }else if(getOfflineBalance() < parseInt(amount)){
                  alert("Not enough balance");
                  return;
                }
              }
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
