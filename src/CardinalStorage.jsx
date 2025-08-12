import React from "react";
import axios from 'axios';

// Get base URL from environment variables with multiple fallback methods
const getBaseUrl = () => {
  // Method 1: Standard Vite environment variable
  if (import.meta.env.VITE_BASE_URL) {
    return import.meta.env.VITE_BASE_URL;
  }
  
  // Method 2: Check process.env (for SSR/Node environments)
  if (typeof process !== 'undefined' && process.env?.VITE_BASE_URL) {
    return process.env.VITE_BASE_URL;
  }
  
  // Method 3: Check window object for injected variables
  if (typeof window !== 'undefined' && window.ENV?.VITE_BASE_URL) {
    return window.ENV.VITE_BASE_URL;
  }
  
  // Method 4: Production fallback (your deployed backend)
  if (import.meta.env.PROD) {
    return 'https://tracker-rest-backend.onrender.com';
  }
  
  // Method 5: Development fallback
  return 'http://localhost:3000';
};

const BASE_URL = getBaseUrl();

// Callback for handling authentication state changes
let authStateChangeCallback = null;

// Callback for handling data update events
let dataUpdateCallbacks = [];

// Function to set the auth state change callback
export function setAuthStateChangeCallback(callback) {
    authStateChangeCallback = callback;
}

// Function to register data update callbacks
export function registerDataUpdateCallback(callback) {
    dataUpdateCallbacks.push(callback);
    
    // Return unregister function
    return () => {
        dataUpdateCallbacks = dataUpdateCallbacks.filter(cb => cb !== callback);
    };
}

// Function to trigger data update events
export function triggerDataUpdate(eventType = 'general') {
    dataUpdateCallbacks.forEach(callback => {
        try {
            callback(eventType);
        } catch (error) {
            console.error('Error in data update callback:', error);
        }
    });
}

// Helper function to handle successful authentication
function handleAuthSuccess(userSession) {
    // Notify app of authentication state change
    if (authStateChangeCallback) {
        authStateChangeCallback(true);
    }
    return userSession;
}

// Helper function to get auth headers
function getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// Helper function to handle API errors
function handleAPIError(error) {
    console.error('API Error:', error);
    
    // Check for JWT expiration
    if (error.response?.status === 401 || error.response?.status === 403 ||
        (error.response?.data?.message && 
         (error.response.data.message.includes('jwt expired') || 
          error.response.data.message.includes('JWT expired') ||
          error.response.data.message.includes('token expired') ||
          error.response.data.message.includes('Token expired') ||
          error.response.data.message === 'Unauthorized' ||
          error.response.data.message === 'Forbidden'))) {
        
        console.log('JWT token expired, logging out user...');
        
        // Perform logout (skip callback to avoid double-triggering)
        logoutUser(true);
        
        // Notify app of authentication state change
        if (authStateChangeCallback) {
            authStateChangeCallback(false);
        }
        
        // Show user-friendly notification
        setTimeout(() => {
            alert('Your session has expired. Please log in again.');
        }, 100); // Small delay to ensure state updates first
        
        return 'Your session has expired. Please log in again.';
    }
    
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error.response?.status) {
        return `Server error: ${error.response.status}`;
    }
    if (error.request) {
        return 'Network error: Could not reach server';
    }
    return error.message || 'An unexpected error occurred';
}

//--Authentication Functions--
export async function registerUser(userData) {
    try {
        const newUser = {
            username: userData.name,
            email: userData.email,
            password: userData.password,
        };
        
        const res = await axios.post(`${BASE_URL}/api/register`, newUser);
        
        if (res.status === 201) {
            const { message, token, userId, username, email } = res.data;
            
            // Store token and user data
            localStorage.setItem('authToken', token);
            const userSession = {
                id: userId,
                name: username,
                email: email,
            };
            setCurrentUser(userSession);
            
            return { success: true, message: message, user: handleAuthSuccess(userSession) };
        }
        
        return { success: false, message: 'Registration failed' };
    } catch (error) {
        return { 
            success: false, 
            message: handleAPIError(error)
        };
    }
}

export async function loginUser(credentials) {
    try {
        const res = await axios.post(`${BASE_URL}/api/login`, credentials);
        
        if (res.status === 200) {
            const { message, token, userId, username, email } = res.data;
            
            // Store token and user data
            localStorage.setItem('authToken', token);
            const userSession = {
                id: userId,
                name: username,
                email: email,
            };
            setCurrentUser(userSession);
            
            return { success: true, message: message, user: handleAuthSuccess(userSession) };
        }
        
        return { success: false, message: 'Login failed' };
    } catch (error) {
        return { 
            success: false, 
            message: handleAPIError(error)
        };
    }
}

export function setCurrentUser(user) {
    const userSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('CurrentUser', JSON.stringify(userSession));
}

export function getCurrentUser() {
    const userStr = localStorage.getItem('CurrentUser');
    if (!userStr) return null;
    
    try {
        return JSON.parse(userStr);
    } catch (error) {
        return null;
    }
}

export function isUserAuthenticated() {
    const token = localStorage.getItem('authToken');
    const currentUser = getCurrentUser();
    return token && currentUser !== null;
}

export function logoutUser(skipCallback = false) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('CurrentUser');
    
    // Notify app of authentication state change (unless we're in the middle of JWT expiration handling)
    if (!skipCallback && authStateChangeCallback) {
        authStateChangeCallback(false);
    }
    
    return { success: true, message: 'Logged out successfully' };
}

//--Expense Functions--
export async function saveExpenseData(objData) {
    try {
        const res = await axios.post(`${BASE_URL}/api/save/expense`, objData, {
            headers: getAuthHeaders()
        });
        return { success: true, data: res.data };
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function getExpenseData() {
    try {
        const res = await axios.get(`${BASE_URL}/api/get/expenses`, {
            headers: getAuthHeaders()
        });
        return res.data;
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function getTotalSpent() {
    try {
        const expenses = await getExpenseData();
        return expenses.reduce((total, expense) => {
            const amount = parseInt(expense?.amount) || 0;
            return total + amount;
        }, 0);
    } catch (error) {
        return 0;
    }
}

//--Transaction Functions--
export async function setTransactions(dataObject) {
    try {
        const transactionWithDate = {
            ...dataObject,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        const res = await axios.post(`${BASE_URL}/api/save/transaction`, transactionWithDate, {
            headers: getAuthHeaders()
        });
        
        // Trigger data update
        triggerDataUpdate('transaction');
        
        return { success: true, data: res.data };
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function getTransactions() {
    try {
        const res = await axios.get(`${BASE_URL}/api/get/transactions`, {
            headers: getAuthHeaders()
        });
        return res.data;
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

//--Balance Functions--
export async function getBalanceStructure() {
    try {
        const res = await axios.get(`${BASE_URL}/api/get/balance`, {
            headers: getAuthHeaders()
        });
        return res.data;
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function updateBalanceStructure(balanceData) {
    try {
        const res = await axios.post(`${BASE_URL}/api/save/balance`, balanceData, {
            headers: getAuthHeaders()
        });
        return { success: true, data: res.data };
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function calculateTotalBalance() {
    try {
        const balance = await getBalanceStructure();
        const onlineTotal = balance.onlineBalances.reduce((sum, account) => sum + (account.amount || 0), 0);
        const digitalTotal = await getTotalDigitalBalance();
        return balance.offlineBalance + onlineTotal + digitalTotal;
    } catch (error) {
        return 0;
    }
}

export async function addToOfflineBalance(amount) {
    try {
        const balance = await getBalanceStructure();
        balance.offlineBalance += parseInt(amount) || 0;
        const newTotal = await calculateTotalBalance();
        balance.totalBalance = Math.max(balance.totalBalance, newTotal);
        await updateBalanceStructure(balance);
        
        // Trigger data update
        triggerDataUpdate('balance');
        
        return { success: true };
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

// Replace offline balance instead of adding to it
export async function setOfflineBalance(amount) {
    try {
        const balance = await getBalanceStructure();
        balance.offlineBalance = parseInt(amount) || 0;
        const newTotal = await calculateTotalBalance();
        balance.totalBalance = Math.max(balance.totalBalance, newTotal);
        await updateBalanceStructure(balance);
        return { success: true };
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function addOnlineBalanceAccount(accountData) {
    try {
        const balance = await getBalanceStructure();
        const newAccount = {
            id: Date.now().toString(),
            name: accountData.name,
            amount: parseInt(accountData.amount) || 0,
            type: accountData.type || 'general'
        };
        balance.onlineBalances.push(newAccount);
        
        const newTotal = await calculateTotalBalance();
        balance.totalBalance = Math.max(balance.totalBalance, newTotal);
        await updateBalanceStructure(balance);
        
        if (newAccount.amount > 0) {
            await setTransactions({
                amount: newAccount.amount,
                remark: `Online balance account created: ${newAccount.name}`,
                medium: "online",
                accountId: newAccount.id,
                spentFromState: false // Boolean: false indicates this is income (balance addition)
            });
        }
        
        return newAccount;
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function getOfflineBalance() {
    try {
        const balance = await getBalanceStructure();
        return balance.offlineBalance || 0;
    } catch (error) {
        return 0;
    }
}

export async function getOnlineBalance() {
    try {
        const balance = await getBalanceStructure();
        const onlineTotal = balance.onlineBalances.reduce((sum, account) => sum + (account.amount || 0), 0);
        const digitalTotal = await getTotalDigitalBalance();
        return onlineTotal + digitalTotal;
    } catch (error) {
        return 0;
    }
}

export async function getTotalBalance() {
    try {
        const balance = await getBalanceStructure();
        return balance.totalBalance || 0;
    } catch (error) {
        return 0;
    }
}

// Get available balance (totalBalance - totalExpenses)
export async function getAvailableBalance() {
    try {
        const balance = await getBalanceStructure();
        const totalExpenses = await getTotalSpent();
        return Math.max(0, balance.totalBalance - totalExpenses);
    } catch (error) {
        return 0;
    }
}

// Get current available balance (what's actually available right now from Balance page)
export async function getCurrentAvailableBalance() {
    try {
        return await calculateTotalBalance(); // Current available money across all accounts
    } catch (error) {
        return 0;
    }
}

// Get balance added this month
export async function getMonthlyBalanceAdded() {
    try {
        const transactions = await getTransactions();
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        // Filter transactions with dates from current month
        const monthlyTransactions = transactions.filter(transaction => {
            // Only include balance additions (transactions with 'medium' property)
            // Include offline, online, and digital account additions
            if (!transaction.medium || transaction.spentFromState) return false;
            
            // Must have amount
            if (!transaction.amount || parseInt(transaction.amount) <= 0) return false;
            
            // Check if transaction is from current month
            if (transaction.date) {
                const transactionDate = new Date(transaction.date);
                return transactionDate.getMonth() === currentMonth && 
                       transactionDate.getFullYear() === currentYear;
            }
            
            return false;
        });
        
        const monthlyTotal = monthlyTransactions.reduce((total, transaction) => {
            return total + (parseInt(transaction.amount) || 0);
        }, 0);
        
        return monthlyTotal;
    } catch (error) {
        return 0;
    }
}

//--Digital Accounts Functions--
export async function addDigitalAccount(accountData) {
    try {
        const newAccount = {
            name: accountData.name,
            balance: parseInt(accountData.balance) || 0,
            type: accountData.type || 'bank'
        };
        
        const res = await axios.post(`${BASE_URL}/api/save/digital-account`, newAccount, {
            headers: getAuthHeaders()
        });
        
        if (newAccount.balance > 0) {
            await setTransactions({
                amount: newAccount.balance,
                remark: `Digital account added: ${newAccount.name}`,
                medium: "digital",
                accountId: res.data.account.id,
                spentFromState: false // Boolean: false indicates this is income (balance addition)
            });
        }
        
        return { success: true, message: 'Account added successfully', account: res.data.account };
    } catch (error) {
        return { success: false, message: handleAPIError(error) };
    } finally {
        // Trigger data update regardless of success/failure
        triggerDataUpdate('account');
    }
}

export async function getDigitalAccounts() {
    try {
        const res = await axios.get(`${BASE_URL}/api/get/digital-accounts`, {
            headers: getAuthHeaders()
        });
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function updateDigitalAccount(accountId, updates) {
    try {
        const res = await axios.put(`${BASE_URL}/api/update/digital-account/${accountId}`, updates, {
            headers: getAuthHeaders()
        });
        return { success: true, message: res.data.message, account: res.data.account };
    } catch (error) {
        return { success: false, message: handleAPIError(error) };
    } finally {
        // Trigger data update regardless of success/failure
        triggerDataUpdate('account');
    }
}

export async function removeDigitalAccount(accountId) {
    try {
        await axios.delete(`${BASE_URL}/api/delete/digital-account/${accountId}`, {
            headers: getAuthHeaders()
        });
        return { success: true, message: 'Account removed successfully' };
    } catch (error) {
        return { success: false, message: handleAPIError(error) };
    } finally {
        // Trigger data update regardless of success/failure
        triggerDataUpdate('account');
    }
}

export async function getTotalDigitalBalance() {
    try {
        const accounts = await getDigitalAccounts();
        return accounts.reduce((total, account) => total + (account.balance || 0), 0);
    } catch (error) {
        return 0;
    }
}

// Reduce balance from specific digital account (for expenses)
export async function reduceBalanceFromDigitalAccount(accountId, amount) {
    try {
        // Get current account data
        const accounts = await getDigitalAccounts();
        const account = accounts.find(acc => acc.id === accountId);
        
        if (!account) {
            return { success: false, message: 'Account not found' };
        }
        
        const newBalance = account.balance - (parseInt(amount) || 0);
        if (newBalance < 0) {
            return { success: false, message: 'Insufficient balance in this account' };
        }
        
        // Update the account balance
        const result = await updateDigitalAccount(accountId, { balance: newBalance });
        return result;
    } catch (error) {
        return { success: false, message: handleAPIError(error) };
    }
}

// Reduce from offline balance (for expenses)
export async function reduceFromOfflineBalance(amount) {
    try {
        const balance = await getBalanceStructure();
        const newOfflineBalance = Math.max(0, balance.offlineBalance - (parseInt(amount) || 0));
        balance.offlineBalance = newOfflineBalance;
        await updateBalanceStructure(balance);
        
        // Trigger data update
        triggerDataUpdate('balance');
        
        return { success: true };
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

//--Savings Functions--
export async function AddSavingsData(savingsData) {
    try {
        const res = await axios.post(`${BASE_URL}/api/save/savings`, savingsData, {
            headers: getAuthHeaders()
        });
        return { success: true, data: res.data };
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function getSavingsData() {
    try {
        const res = await axios.get(`${BASE_URL}/api/get/savings`, {
            headers: getAuthHeaders()
        });
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function removeSavingsElement(index) {
    try {
        const res = await axios.delete(`${BASE_URL}/api/delete/savings`, {
            data: { index },
            headers: getAuthHeaders()
        });
        return { success: true, data: res.data };
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function updateSavingsElement(index, newData) {
    try {
        const res = await axios.patch(`${BASE_URL}/api/update/savings`, {
            index,
            ...newData
        }, {
            headers: getAuthHeaders()
        });
        return { success: true, data: res.data };
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function getSavingsElementFromIndex(index) {
    try {
        const res = await axios.get(`${BASE_URL}/api/get/savings?index=${index}`, {
            headers: getAuthHeaders()
        });
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function getTotalSavingsAmount() {
    try {
        const savingsData = await getSavingsData();
        return savingsData.reduce((total, current) => total + current.amount, 0);
    } catch (error) {
        return 0;
    }
}

//--Utility Functions--
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

// Legacy function compatibility
export async function AddOnlineBalance(BalanceData) {
    try {
        const balance = await getBalanceStructure();
        let generalAccount = balance.onlineBalances.find(acc => acc.type === 'general');
        
        if (!generalAccount) {
            await addOnlineBalanceAccount({
                name: 'General Online Balance',
                amount: parseInt(BalanceData) || 0,
                type: 'general'
            });
        } else {
            generalAccount.amount += parseInt(BalanceData) || 0;
            const newTotal = await calculateTotalBalance();
            balance.totalBalance = Math.max(balance.totalBalance, newTotal);
            await updateBalanceStructure(balance);
            
            await setTransactions({
                amount: parseInt(BalanceData) || 0,
                remark: `Online balance added to ${generalAccount.name}`,
                medium: "online",
                spentFromState: false // Boolean: false indicates this is income (balance addition)
            });
        }
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}

export async function AddOfflineBalance(BalanceData) {
    return await setOfflineBalance(BalanceData);
}

export async function UpdateTotalBalance() {
    try {
        const currentTotal = await calculateTotalBalance();
        const balance = await getBalanceStructure();
        balance.totalBalance = Math.max(balance.totalBalance, currentTotal);
        await updateBalanceStructure(balance);
    } catch (error) {
        throw new Error(handleAPIError(error));
    }
}
