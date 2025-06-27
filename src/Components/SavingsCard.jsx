import React from "react";

export default function SavingsCard(props){

    return(
        <div className='border w-1/2 h-1/2'>
            <h2>{props.name}</h2>
            <p>{props.amount}</p>
            <button>Update</button>
            <button>Remove</button>
        </div>
    )
}