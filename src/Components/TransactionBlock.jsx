import React from "react";

export default function TransactionBlock(props){
    return(
        <div className="border w-vh">
            <h2>{props.TransactionData.amount}</h2>
            <p>{props.TransactionData.remark}</p>
            <h4>{props.TransactionData.spentFromState || props.TransactionData.medium}</h4>
        </div>
    )
}