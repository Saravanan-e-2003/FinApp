import React, { useState } from "react";
import { AddSavingsData } from "../CardinalStorage";

export default function AddSavingsModel({isOpen, onClose }){
    const[savingsName,setSavingsName] = useState("");
    const[savingsAmount,setSavingsAmount] = useState(0);

    if(!isOpen){return null}

    function handleButtonClick(){
        const savingsData = {
            name:savingsName,
            amount:parseInt(savingsAmount),
            medium: "online"
        }
        console.log(savingsData);
        AddSavingsData(savingsData);
        setSavingsName("");
        setSavingsAmount(0);
        alert("Savings added successfully!");
    }

    return(
       <div className="flex fixed inset-0 bg-gray-600/45 w-full h-full
         bg-[linear-gradient(45deg,_#e5e7eb_0,_#e5e7eb_1px,_transparent_1px,_transparent_10px)]
            bg-[size:10px_10px]">
            <div className="flex flex-col border-4 rounded-lg bg-amber-50 w-[calc(100%-50px)] md:w-[calc(50%-20px)] h-60 mx-auto my-auto p-4">
                <label htmlFor="savingsName">Savings Type</label>
                <input type="text" name="savingsName" onChange={(e)=>{setSavingsName(e.target.value)}}/>
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" onChange={(e)=>{setSavingsAmount(e.target.value)}} />
                <button className="bg-indigo-600 text-amber-100 border-2"
                onClick={
                    () =>{
                        if(savingsName === ""){
                            alert("Please enter a valid savings type.");
                            return;
                        }
                        if(savingsAmount <= 0){
                            alert("Please enter a valid amount.");
                            return;
                        }
                        handleButtonClick();
                        onClose();
                    }
                }>
                    Add
                </button>
                <button className="bg-amber-100 text-indigo-950 border-2"
                onClick={
                    () =>{
                        onClose();
                    }
                }>
                    Close
                </button>
            </div>
        </div>
    );
}