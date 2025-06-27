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
    }

    return(
        <div className="fixed inset-0 bg-gray-400/45">
            <div className="border-4 bg-amber-50 w-2xl h-60 m-50">
                <label htmlFor="savingsName">Savings Type</label>
                <input type="text" name="savingsName" onChange={(e)=>{setSavingsName(e.target.value)}}/>
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" onChange={(e)=>{setSavingsAmount(e.target.value)}} />
                <button className="bg-indigo-600 text-amber-100 border-2"
                onClick={
                    () =>{
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