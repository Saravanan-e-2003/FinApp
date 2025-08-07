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

//--Authentication stuffs-----------=-=-=-=-=-=-=-=-=--=-=-=--=--

// User registration function
export function registerUser(userData) {
    try {
        // Check if user already exists
        const existingUsers = getUsers();
        const userExists = existingUsers.find(user => user.email === userData.email);
        
        if (userExists) {
            return { success: false, message: 'User already exists with this email' };
        }

        // Create new user object
        const newUser = {
            id: Date.now().toString(), // Simple ID generation
            name: userData.name,
            email: userData.email,
            password: userData.password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
            isActive: true
        };

        // Add user to storage
        const users = getUsers();
        users.push(newUser);
        localStorage.setItem('Users', JSON.stringify(users));

        // Set current user session
        setCurrentUser(newUser);

        return { success: true, message: 'User registered successfully', user: newUser };
    } catch (error) {
        return { success: false, message: 'Registration failed. Please try again.' };
    }
}

// User login function
export function loginUser(credentials) {
    try {
        const users = getUsers();
        const user = users.find(u => 
            u.email === credentials.email && 
            u.password === credentials.password &&
            u.isActive
        );

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Set current user session
        setCurrentUser(user);

        return { success: true, message: 'Login successful', user: user };
    } catch (error) {
        return { success: false, message: 'Login failed. Please try again.' };
    }
}

// Get all users (for internal use)
function getUsers() {
    const usersStr = localStorage.getItem('Users');
    if (!usersStr) return [];
    
    try {
        return JSON.parse(usersStr) || [];
    } catch (error) {
        return [];
    }
}

// Set current user session
export function setCurrentUser(user) {
    const userSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('CurrentUser', JSON.stringify(userSession));
}

// Get current user session
export function getCurrentUser() {
    const userStr = localStorage.getItem('CurrentUser');
    if (!userStr) return null;
    
    try {
        return JSON.parse(userStr);
    } catch (error) {
        return null;
    }
}

// Check if user is authenticated
export function isUserAuthenticated() {
    const currentUser = getCurrentUser();
    return currentUser !== null;
}

// Logout user
export function logoutUser() {
    localStorage.removeItem('CurrentUser');
    return { success: true, message: 'Logged out successfully' };
}

// Update user profile
export function updateUserProfile(updates) {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            return { success: false, message: 'No user logged in' };
        }

        const users = getUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }

        // Update user data
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('Users', JSON.stringify(users));

        // Update current user session
        setCurrentUser(users[userIndex]);

        return { success: true, message: 'Profile updated successfully', user: users[userIndex] };
    } catch (error) {
        return { success: false, message: 'Profile update failed' };
    }
}

// Validate email format
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password strength
export function validatePassword(password) {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    const errors = [];
    
    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        strength: password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers ? 'strong' : 
                 password.length >= 6 && (hasUpperCase || hasLowerCase) && hasNumbers ? 'medium' : 'weak'
    };
}

//--Digital Accounts Management-----------=-=-=-=-=-=-=-=-=--=-=-=--=--

// Add a new digital account
export function addDigitalAccount(accountData) {
    try {
        const accounts = getDigitalAccounts();
        const newAccount = {
            id: Date.now().toString(),
            name: accountData.name,
            balance: parseInt(accountData.balance) || 0,
            type: accountData.type || 'bank', // bank, card, wallet
            createdAt: new Date().toISOString()
        };
        
        accounts.push(newAccount);
        localStorage.setItem('DigitalAccounts', JSON.stringify(accounts));
        
        return { success: true, message: 'Account added successfully', account: newAccount };
    } catch (error) {
        return { success: false, message: 'Failed to add account' };
    }
}

// Get all digital accounts
export function getDigitalAccounts() {
    const accountsStr = localStorage.getItem('DigitalAccounts');
    if (!accountsStr) return [];
    
    try {
        return JSON.parse(accountsStr) || [];
    } catch (error) {
        return [];
    }
}

// Update digital account
export function updateDigitalAccount(accountId, updates) {
    try {
        const accounts = getDigitalAccounts();
        const accountIndex = accounts.findIndex(acc => acc.id === accountId);
        
        if (accountIndex === -1) {
            return { success: false, message: 'Account not found' };
        }
        
        accounts[accountIndex] = { ...accounts[accountIndex], ...updates };
        localStorage.setItem('DigitalAccounts', JSON.stringify(accounts));
        
        return { success: true, message: 'Account updated successfully', account: accounts[accountIndex] };
    } catch (error) {
        return { success: false, message: 'Failed to update account' };
    }
}

// Remove digital account
export function removeDigitalAccount(accountId) {
    try {
        const accounts = getDigitalAccounts();
        const filteredAccounts = accounts.filter(acc => acc.id !== accountId);
        
        localStorage.setItem('DigitalAccounts', JSON.stringify(filteredAccounts));
        
        return { success: true, message: 'Account removed successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to remove account' };
    }
}

// Get total digital balance from all accounts
export function getTotalDigitalBalance() {
    const accounts = getDigitalAccounts();
    return accounts.reduce((total, account) => total + (account.balance || 0), 0);
}

// Add balance to specific digital account
export function addBalanceToDigitalAccount(accountId, amount) {
    try {
        const accounts = getDigitalAccounts();
        const accountIndex = accounts.findIndex(acc => acc.id === accountId);
        
        if (accountIndex === -1) {
            return { success: false, message: 'Account not found' };
        }
        
        accounts[accountIndex].balance += parseInt(amount) || 0;
        localStorage.setItem('DigitalAccounts', JSON.stringify(accounts));
        
        // Update main online balance
        UpdateTotalBalance();
        
        return { success: true, message: 'Balance added successfully', account: accounts[accountIndex] };
    } catch (error) {
        return { success: false, message: 'Failed to add balance' };
    }
}

// Reduce balance from specific digital account
export function reduceBalanceFromDigitalAccount(accountId, amount) {
    try {
        const accounts = getDigitalAccounts();
        const accountIndex = accounts.findIndex(acc => acc.id === accountId);
        
        if (accountIndex === -1) {
            return { success: false, message: 'Account not found' };
        }
        
        const newBalance = accounts[accountIndex].balance - (parseInt(amount) || 0);
        if (newBalance < 0) {
            return { success: false, message: 'Insufficient balance in this account' };
        }
        
        accounts[accountIndex].balance = newBalance;
        localStorage.setItem('DigitalAccounts', JSON.stringify(accounts));
        
        // Update main online balance
        UpdateTotalBalance();
        
        return { success: true, message: 'Balance deducted successfully', account: accounts[accountIndex] };
    } catch (error) {
        return { success: false, message: 'Failed to deduct balance' };
    }
}
