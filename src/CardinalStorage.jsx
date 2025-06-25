import React,{ useState } from "react"

export function saveExpenseData(objData){
    let storedData = getExpenseData("Expenses") || [];
    storedData.push(objData);
    // saveTotalSpent(objData.amount)
    localStorage.setItem("Expenses",JSON.stringify(storedData));
}



export function getExpenseData(DataName){
    return JSON.parse(localStorage.getItem(DataName))
}

