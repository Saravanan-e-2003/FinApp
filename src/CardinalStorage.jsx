import React from "react"


// backend done for now
//review pending -- http://localhost:3000/api/save/ExpenseData
export function saveExpenseData(objData){
    let storedData = getExpenseData("Expenses") || [];
    storedData.unshift(objData);
    localStorage.setItem("Expenses",JSON.stringify(storedData));
    setTransactions(objData);
    objData.spentFromState === "offline"? ReduceOfflineBalance(objData.amount):ReduceOnlineBalance(objData.amount);
}

// backend done for now
//review pending -- http://localhost:3000/api/get/ExpenseData
export function getExpenseData(DataName){
    return JSON.parse(localStorage.getItem(DataName))
}

//backend done for now
//review pending -- http://localhost:3000/api/save/setTransactions
export function setTransactions(DataObject){
    let storedData = getTransactions() || [];
    storedData.unshift(DataObject);
    localStorage.setItem("Transactions",JSON.stringify(storedData));
}

// backend done for now
//review pending -- http://localhost:3000/api/get/TransactionsData
export function getTransactions(){
    return JSON.parse(localStorage.getItem("Transactions"))
}

///////
// Balance Stuffs--=-----=--=-=-=----
// backend done for now
export function AddOnlineBalance(BalanceData){
    let storedBalance = JSON.parse(localStorage.getItem("Balance")) || {OnlineBalance:0,OfflineBalance:0,TotalBalance:0};
    let newOnlineBalance = getOnlineBalance() + (parseInt(BalanceData) || 0);
    let newStoredOnlineBalance = {...storedBalance,OnlineBalance:newOnlineBalance};

    localStorage.setItem("Balance",JSON.stringify(newStoredOnlineBalance));
    UpdateTotalBalance();
}

//backend done for now
export function AddOfflineBalance(BalanceData){
    let storedBalance = JSON.parse(localStorage.getItem("Balance")) ||{OnlineBalance:0,OfflineBalance:0,TotalBalance:0};
    let newOfflineBalance =  getOfflineBalance() + (parseInt(BalanceData) || 0);
    let newStoredOfflineBalance = {...storedBalance,OfflineBalance:newOfflineBalance};

    localStorage.setItem("Balance",JSON.stringify(newStoredOfflineBalance));
    UpdateTotalBalance();
}
// backend done for now
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
// backend done for now
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
// backend done for now
export function UpdateTotalBalance(){
    let newTotalBalance = getOfflineBalance() + getOnlineBalance();
    let newStoredBalance = {
        OnlineBalance:getOnlineBalance(), 
        OfflineBalance:getOfflineBalance(), 
        TotalBalance:newTotalBalance
    };

    localStorage.setItem("Balance",JSON.stringify(newStoredBalance))
}

//backend done for now
export function getOfflineBalance(){
    const balanceStr = localStorage.getItem("Balance");
    if(!balanceStr) return 0;

    const balanceObj = JSON.parse(balanceStr);
    return parseInt(balanceObj.OfflineBalance)||0;
}

//backend done for now
export function getOnlineBalance(){
    const balanceStr = localStorage.getItem("Balance");
    if(!balanceStr) return 0;

    const balanceObj = JSON.parse(balanceStr);
    return parseInt(balanceObj.OnlineBalance)||0;
}

// backend done for now
export function getTotalBalance(){
    const balanceStr = localStorage.getItem("Balance");
    if (!balanceStr) return 0;

    const balanceObj = JSON.parse(balanceStr);
    return parseInt(balanceObj.TotalBalance) || 0;
}

// backend done for now
export function getBalanceObj(){
    const balancestr = localStorage.getItem("Balance");
    if(!balancestr) return {};

    const balanceObj = JSON.parse(balancestr);
    return balanceObj || {};
}

//--Savings stuffs-----------=-=-=-=-=-=-=-=-=--=-=-=--=--

//backend done for now
//review pending -- http://localhost:3000/api/save/SavingsData/:userId
export function AddSavingsData(savingsData){
    let storedData = getSavingsData();
    storedData.unshift(savingsData);
    localStorage.setItem("Savings",JSON.stringify(storedData))
}

// backend done for now
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

// backend done for now
export function removeSavingsElement(i){
    const savingsData = getSavingsData();
    savingsData.splice(i,1)
    localStorage.setItem("Savings",JSON.stringify(savingsData));
}

// backend done for now
export function updateSavingsElement(index,newData){
    const savingsData = getSavingsData();
    const updatedData = savingsData.map((item,i)=>{
        return i === index?{...item,...newData}:item
    })
    localStorage.setItem("Savings",JSON.stringify(updatedData));
}

//backend done for now
export function getSavingsElementFromIndex(index){
    const savingsData = getSavingsData();
    return savingsData[index];
}
