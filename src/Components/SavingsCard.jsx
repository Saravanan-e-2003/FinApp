import React from "react";
import RemoveSavingsCardModel from "../Models/RemoveSavingsCardModel";

export default function SavingsCard(props) {

    // const[isUpdateModel,setUpdateModel] = useState(false);

    return (
        <div className='border shadow-[1px_2px_0_#1f1a14] rounded w-[calc(100%-40px)] md:w-[calc(50%-40px)] h-1/4 mx-auto'>
            <h2>{props.name}</h2>
            <p>{props.amount}</p>
            <div className="flex gap-1 justify-end">
                <button className='bg-[#1f1a14] text-[#fff7e4] mr-4 p-2 rounded' onClick={() => { props.onRemove() }}>Remove</button>
                <button className='bg-[#1f1a14] text-[#fff7e4] mr-4 p-2 rounded' onClick={() => { props.onUpdate() }}>Update</button>
            </div>
            {/* <RemoveSavingsCardModel id={props.id} isOpen = {isRemoveModel} onClose={()=>setRemoveModel(false)}/> */}
        </div>

    )
}