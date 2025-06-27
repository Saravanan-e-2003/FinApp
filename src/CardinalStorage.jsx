import React from "react"

export function saveExpenseData(objData){
    let storedData = getExpenseData("Expenses") || [];
    storedData.unshift(objData);
    localStorage.setItem("Expenses",JSON.stringify(storedData));
    setTransactions(objData);
    objData.spentFromState === "offline"? ReduceOfflineBalance(objData.amount):ReduceOnlineBalance(objData.amount);
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

export function AddOnlineBalance(BalanceData){
    let storedBalance = JSON.parse(localStorage.getItem("Balance")) || {OnlineBalance:0,OfflineBalance:0,TotalBalance:0};
    let newOnlineBalance = getOnlineBalance() + (parseInt(BalanceData) || 0);
    let newStoredOnlineBalance = {...storedBalance,OnlineBalance:newOnlineBalance};

    localStorage.setItem("Balance",JSON.stringify(newStoredOnlineBalance));
    UpdateTotalBalance();
}

export function AddOfflineBalance(BalanceData){
    let storedBalance = JSON.parse(localStorage.getItem("Balance")) ||{OnlineBalance:0,OfflineBalance:0,TotalBalance:0};
    let newOfflineBalance =  getOfflineBalance() + (parseInt(BalanceData) || 0);
    let newStoredOfflineBalance = {...storedBalance,OfflineBalance:newOfflineBalance};

    localStorage.setItem("Balance",JSON.stringify(newStoredOfflineBalance));
    UpdateTotalBalance();
}

export function ReduceOfflineBalance(ReduceAmount){
    let storedObject = JSON.parse(localStorage.getItem("Balance")) ||{OnlineBalance:0,OfflineBalance:0,TotalBalance:0};
    let storedBalance = getOfflineBalance();
    let reduce = parseInt(ReduceAmount)||0
    let newBalance = storedBalance - reduce;

    let newObj = {
        ...storedObject,
        OfflineBalance:newBalance
    }

    localStorage.setItem("Balance",JSON.stringify(newObj));
    UpdateTotalBalance();
}

export function ReduceOnlineBalance(ReduceAmount){
    let storedObject = JSON.parse(localStorage.getItem("Balance")) ||{OnlineBalance:0,OfflineBalance:0,TotalBalance:0};
    let storedBalance = getOnlineBalance();
    let reduce = parseInt(ReduceAmount)||0
    let newBalance = storedBalance - reduce;

    let newObj = {
        ...storedObject,
        OnlineBalance:newBalance
    }

    localStorage.setItem("Balance",JSON.stringify(newObj));
    UpdateTotalBalance();
}

export function UpdateTotalBalance(){
    let newTotalBalance = getOfflineBalance() + getOnlineBalance();
    let newStoredBalance = {
        OnlineBalance:getOnlineBalance(), 
        OfflineBalance:getOfflineBalance(), 
        TotalBalance:newTotalBalance
    };

    localStorage.setItem("Balance",JSON.stringify(newStoredBalance))
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


//--Savings stuffs-----------=-=-=-=-=-=-=-=-=--=-=-=--=--

export function AddSavingsData(savingsData){
    let storedData = getSavingsData();
    storedData.unshift(savingsData);
    localStorage.setItem("Savings",JSON.stringify(storedData))
}

export function getSavingsData(){
    const savingsStr = localStorage.getItem("Savings");
    if(!savingsStr) return [];

    const savingsObj = JSON.parse(savingsStr);
    return savingsObj || [];
}

export function getTotalSavingsAmount(){
    let savingsData = getSavingsData();
    return savingsData.reduce((total,current)=>total+current.amount,0);
}

export function removeSavingsElement(i){
    const savingsData = getSavingsData();
    savingsData.splice(i,1)
    localStorage.setItem("Savings",JSON.stringify(savingsData));
}

export function updateSavingsElement(index,newData){
    //to do tommorrow (just check if it works)...
    const savingsData = getSavingsData();
    savingsData.map((item,i)=>{
        return i === index?{...item,...newData}:item
    })
}
