import React, { useState } from "react";

export default function OfflineBalanceModel({isModelOpen, onClose}){
    const[amount,setAmount] = useState(0);
    const[remark,setRemark] = useState("");
    // console.log(isModelOpen);
    if(!isModelOpen) return;

    function handleButtonClick(){
        
    }
    
    return(
        <div className="fixed inset-0 bg-gray-600/45">
            <div className="border-4 bg-amber-50 w-2xl h-60 m-50">
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" onChange={(e) =>{
                    setAmount(e.target.value);
                }} />
                <label>Remark</label>
                <input type="text" name="remark" onChange={()=>{
                    setRemark(e.target.value);
                }} />
                <button onClick={onClose} className="bg-amber-50 text-black border-2">Close</button>
                <button onClick={()=>{
                    onClose();
                    handleButtonClick();
                }} className="bg-indigo-900 text-amber-50 border-2">Add</button>
            </div>
        </div>
    )
}