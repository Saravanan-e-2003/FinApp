import React from "react";

export default function TransactionBlock(props){
    return(
        <div className="border w-vh">
            <h2>{props.amount}</h2>
            <p>{props.remark}</p>
            <h4>{props.spentFrom}</h4>
        </div>
    )
}