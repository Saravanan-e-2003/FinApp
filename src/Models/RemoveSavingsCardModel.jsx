import React from "react";
import { removeSavingsElement } from "../CardinalStorage";

export default function RemoveSavingsCardModel(props){
    if(!props.isOpen){return null}

    return(
        <div className="flex fixed inset-0 bg-gray-600/45 w-full h-full
        
         bg-[linear-gradient(45deg,_#e5e7eb_0,_#e5e7eb_1px,_transparent_1px,_transparent_10px)]
            bg-[size:10px_10px]">
            <div className="flex flex-col border-4 rounded-lg bg-amber-50 w-[calc(100%-50px)] md:w-[calc(50%-20px)] h-60 mx-auto my-auto p-4">
                <h2>Are you sure you want to remove the savings stream?</h2>
                <button onClick={()=>{
                    removeSavingsElement(props.id);
                    props.onClose();
                }}>Yes</button>
                <button onClick={props.onClose}>No</button>
            </div>
        </div>
    )
}