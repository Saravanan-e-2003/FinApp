import React from "react";
import RemoveSavingsCardModel from "../Models/RemoveSavingsCardModel";

export default function SavingsCard(props){
    
    // const[isUpdateModel,setUpdateModel] = useState(false);

    return(
        <div className='border shadow-[1px_2px_0_#1f1a14] rounded w-[calc(100%-40px)] md:w-[calc(50%-40px)] h-1/4 mx-auto'>
            <h2>{props.name}</h2>
            <p>{props.amount}</p>
            <button onClick={()=>{props.onRemove()}}>Remove</button>
            <button onClick={()=>{props.onUpdate()}}>Update</button>
            {/* <RemoveSavingsCardModel id={props.id} isOpen = {isRemoveModel} onClose={()=>setRemoveModel(false)}/> */}
        </div>
        
    )
}