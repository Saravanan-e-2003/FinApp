import React from "react";
import { removeSavingsElement } from "../CardinalStorage";

export default function RemoveSavingsCardModel(props){
    if(!props.isOpen){return null}

    return(
        <div className="fixed inset-0 bg-gray-400/45">
            <div>
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