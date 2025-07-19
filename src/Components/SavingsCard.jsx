import React, { useState } from "react";
import RemoveSavingsCardModel from "../Models/RemoveSavingsCardModel";

export default function SavingsCard(props){
    
    // const[isUpdateModel,setUpdateModel] = useState(false);

    return(
        <div className='border w-[calc(100%-40px)] md:w-[calc(50%-40px)] h-1/2'>
            <h2>{props.name}</h2>
            <p>{props.amount}</p>
            <button onClick={()=>{props.onRemove()}}>Remove</button>
            <button onClick={()=>{props.onUpdate()}}>Update</button>
            {/* <RemoveSavingsCardModel id={props.id} isOpen = {isRemoveModel} onClose={()=>setRemoveModel(false)}/> */}
        </div>
        
    )
}