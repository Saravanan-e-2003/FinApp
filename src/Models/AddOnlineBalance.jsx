import React, { useEffect, useState } from "react";
import { AddOnlineBalance, getSavingsElementFromIndex, setTransactions } from "../CardinalStorage";

export default function OnlineBalanceModel({isModelOpen, onClose}){
    const[amount,setAmount] = useState(0);
    const[remark,setRemark] = useState("");

    // console.log(isModelOpen);
    if(!isModelOpen) return;

    function handleButtonClick(){
        if(amount <= 0){
            alert("Please enter a valid amount");
            return;
        }
        const TransactionObject = {
            amount,
            remark,
            medium:"online"
        }
        setTransactions(TransactionObject);
        AddOnlineBalance(amount);
    }
    
    return(
        <div className="flex fixed inset-0 bg-gray-600/45 w-full h-full
         bg-[linear-gradient(45deg,_#e5e7eb_0,_#e5e7eb_1px,_transparent_1px,_transparent_10px)]
            bg-[size:10px_10px]">
                
            <div className="flex flex-col border-4 rounded-lg bg-amber-50 w-[calc(100%-50px)] md:w-[calc(50%-20px)] h-60 mx-auto my-auto p-4">
                <label htmlFor="amount">Amount</label>
                <input type="number"  name="amount" onChange={(e) =>{
                    setAmount(e.target.value);
                }} />
                <label>Remark</label>
                <input type="text" name="remark" onChange={(e)=>{
                    setRemark(e.target.value);
                }} />
                <button onClick={()=>{
                    onClose();
                    
                }} className="bg-amber-50 text-black border-2">Close</button>
                <button onClick={()=>{
                    handleButtonClick();
                    onClose();
                }} className="bg-indigo-900 text-amber-50 border-2">Add</button>
            </div>
        </div>
    )
}