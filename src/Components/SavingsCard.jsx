import React, { useState } from "react";
import RemoveSavingsCardModel from "../Models/RemoveSavingsCardModel";

export default function SavingsCard(props){
    
    // const[isUpdateModel,setUpdateModel] = useState(false);

    return(
        <div className='border w-1/2 h-1/2'>
            <h2>{props.name}</h2>
            <p>{props.amount}</p>
            <button onClick={()=>{props.onRemove()}}>Remove</button>
            <button onClick={()=>{props.onUpdate()}}>Update</button>
            {/* <RemoveSavingsCardModel id={props.id} isOpen = {isRemoveModel} onClose={()=>setRemoveModel(false)}/> */}
        </div>
        
    )
}