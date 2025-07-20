import React from "react";

export default function TransactionBlock(props){
    return(
        <div className="border w-[calc(100%-20px)] shadow-[1px_2px_0_#1f1a14] rounded m-4 p-2 mx-auto">
            <h2>{props.TransactionData.amount}</h2>
            <p>{props.TransactionData.remark}</p>
            <h4>{props.TransactionData.spentFromState || props.TransactionData.medium}</h4>
        </div>
    )
}