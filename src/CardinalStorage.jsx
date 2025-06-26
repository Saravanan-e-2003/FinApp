import React from "react"

export function saveExpenseData(objData){
    let storedData = getExpenseData("Expenses") || [];
    storedData.unshift(objData);
    // saveTotalSpent(objData.amount)
    localStorage.setItem("Expenses",JSON.stringify(storedData));
}


export function getExpenseData(DataName){
    return JSON.parse(localStorage.getItem(DataName))
}


export function setTransactions(DataObject){
    let storedData = getTransactions() || [];
    storedData.unshift(DataObject);
    localStorage.setItem("Transactions",JSON.stringify(storedData));
}

export function getTransactions(){
    return JSON.parse(localStorage.getItem("Transactions"))
}

///////
// Balance Stuffs--=-----=--=-=-=----

export function setOnlineBalance(BalanceData){
    let storedBalance = JSON.parse(localStorage.getItem("Balance")) || {OnlineBalance:0,OfflineBalance:0,TotalBalance:0};
    let newOnlineBalance = getOnlineBalance() + (parseInt(BalanceData) || 0);
    let newStoredOnlineBalance = {...storedBalance,OnlineBalance:newOnlineBalance};

    localStorage.setItem("Balance",JSON.stringify(newStoredOnlineBalance));
    UpdateTotalBalance();
}

export function setOfflineBalance(BalanceData){
    let storedBalance = JSON.parse(localStorage.getItem("Balance")) ||{OnlineBalance:0,OfflineBalance:0,TotalBalance:0};
    let newOfflineBalance =  getOfflineBalance() + (parseInt(BalanceData) || 0);
    let newStoredOfflineBalance = {...storedBalance,OfflineBalance:newOfflineBalance};

    localStorage.setItem("Balance",newStoredOfflineBalance);
    UpdateTotalBalance();
}

export function UpdateTotalBalance(){
    let newTotalBalance = getOfflineBalance() + getOnlineBalance();
    let newStoredBalance = {
        OnlineBalance:getOnlineBalance(), 
        OfflineBalance:getOfflineBalance(), 
        TotalBalance:newTotalBalance
    };

    localStorage.setItem("Balance",newStoredBalance)
}

export function getOfflineBalance(){
    const balanceStr = localStorage.getItem("Balance");
    if(!balanceStr) return 0;

    const balanceObj = JSON.parse(balanceStr);
    return parseInt(balanceObj.OfflineBalance)||0;
}

export function getOnlineBalance(){
    const balanceStr = localStorage.getItem("Balance");
    if(!balanceStr) return 0;

    const balanceObj = JSON.parse(balanceStr);
    return parseInt(balanceObj.OnlineBalance)||0;
}

export function getTotalBalance(){
    const balanceStr = localStorage.getItem("Balance");
    if (!balanceStr) return 0;

    const balanceObj = JSON.parse(balanceStr);
    return parseInt(balanceObj.TotalBalance) || 0;
}

