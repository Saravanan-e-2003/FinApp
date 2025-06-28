import React, { useState,useEffect } from "react";
import { updateSavingsElement,getSavingsElementFromIndex } from "../CardinalStorage";

export default function UpdateSavingsCardModel(props){
    const[savingsName,setSavingsName] = useState('');
    const[amount,setAmount] = useState('');
    
    useEffect(()=>{
        if(props.isOpen){
            const data = getSavingsElementFromIndex(props.id);
            setSavingsName(data.name || '');
            setAmount(data.amount || '');
        }
    },[props.isOpen])
    
    if(!props.isOpen){return null}

    function handleButtonClick(){
        const updatedData = {
            name:savingsName,
            amount:parseInt(amount),
            medium:"online"
        }
        updateSavingsElement(props.id,updatedData);
    }

    return(
        <div className="fixed inset-0 bg-gray-400/45">
            <div className="border-4 bg-amber-50 w-2xl h-60 m-50">
                
                <label htmlFor="savingsName">Savings Type</label>
                <input type="text" name="savingsName" value={savingsName} onChange={(e)=>{setSavingsName(e.target.value)}}/>
                
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" value={amount} onChange={(e)=>{setAmount(e.target.value)}} />
                
                <button className="bg-indigo-600 text-amber-100 border-2"
                onClick={()=>{
                    handleButtonClick();
                    props.onClose();
                }}>Update</button>
                <button className="bg-amber-100 text-indigo-950 border-2" onClick={props.onClose}>No</button>
            </div>
        </div>
    )
}