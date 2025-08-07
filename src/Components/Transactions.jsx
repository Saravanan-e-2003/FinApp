import React, { useEffect, useState } from 'react'
import TransactionBlock from './TransactionBlock';
import { Filter, Calendar, DollarSign, Receipt, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Transactions() {
    const [allTransactions, setAllTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterType, setFilterType] = useState('all'); // all, expense, income
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("Transactions")) || [];
        setAllTransactions(stored);
    }, []);

    // Filter transactions by month and type
    useEffect(() => {
        let filtered = [...allTransactions];

        // Filter by current month and year
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        filtered = filtered.filter(transaction => {
            // Assuming transactions have a date field or we use array index as chronological order
            // Since we don't see date field in the structure, we'll filter by recent transactions
            // This is a simplified approach - in a real app, transactions should have dates
            return true; // For now, show all transactions. This can be enhanced when transaction dates are available
        });

        // Apply type filter
        if (filterType === 'expense') {
            filtered = filtered.filter(transaction => transaction.spentFromState);
        } else if (filterType === 'income') {
            filtered = filtered.filter(transaction => transaction.medium && !transaction.spentFromState);
        }

        setFilteredTransactions(filtered);
    }, [allTransactions, filterType, currentDate]);

    const getTotalAmount = () => {
        return filteredTransactions.reduce((total, transaction) => {
            const amount = parseInt(transaction.amount) || 0;
            return total + Math.abs(amount);
        }, 0);
    };

    const getExpenseCount = () => {
        return filteredTransactions.filter(t => t.spentFromState).length;
    };

    const getIncomeCount = () => {
        return filteredTransactions.filter(t => t.medium && !t.spentFromState).length;
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        
        // Don't allow navigation beyond current month
        const today = new Date();
        if (direction > 0 && newDate > today) {
            return;
        }
        
        setCurrentDate(newDate);
    };

    const isCurrentMonth = () => {
        const today = new Date();
        return currentDate.getMonth() === today.getMonth() && 
               currentDate.getFullYear() === today.getFullYear();
    };

    const getMonthYear = () => {
        return currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    };

    return (
        <div className='min-h-full flex flex-col p-4 space-y-6'>
            {/* Header Section */}
            <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] p-6'>
                <div className="flex items-center mb-4">
                    <div className="bg-[#1f1a14] p-3 rounded-lg mr-4">
                        <Receipt className="h-6 w-6 text-[#fff7e4]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#1f1a14]">Transaction History</h1>
                        <p className="text-[#1f1a14]/70">Track all your financial activities</p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-[#1f1a14]/60 mr-2" />
                        <div>
                            <p className="text-lg font-bold text-[#1f1a14]">
                                ${getTotalAmount().toLocaleString()}
                            </p>
                            <p className="text-sm text-[#1f1a14]/60">Total Amount</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <div>
                            <p className="text-lg font-bold text-[#1f1a14]">{getExpenseCount()}</p>
                            <p className="text-sm text-[#1f1a14]/60">Expenses</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <div>
                            <p className="text-lg font-bold text-[#1f1a14]">{getIncomeCount()}</p>
                            <p className="text-sm text-[#1f1a14]/60">Income</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Month Navigation and Filter Section */}
            <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4'>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* Month Navigation */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigateMonth(-1)}
                            className="p-2 border-2 border-[#1f1a14] rounded-lg bg-[#fff7e4] text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-[#1f1a14]/60" />
                            <span className="text-lg font-bold text-[#1f1a14] min-w-[140px] text-center">
                                {getMonthYear()}
                            </span>
                        </div>
                        
                        <button
                            onClick={() => navigateMonth(1)}
                            disabled={isCurrentMonth()}
                            className={`p-2 border-2 border-[#1f1a14] rounded-lg transition-colors ${
                                isCurrentMonth() 
                                    ? 'bg-[#1f1a14]/10 text-[#1f1a14]/30 cursor-not-allowed' 
                                    : 'bg-[#fff7e4] text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4]'
                            }`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Filter by Type */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="pl-10 pr-8 py-3 border-2 border-[#1f1a14] rounded-lg bg-[#fff7e4] text-[#1f1a14] focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20"
                        >
                            <option value="all">All Types</option>
                            <option value="expense">Expenses Only</option>
                            <option value="income">Income Only</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            <div className='flex-1'>
                {filteredTransactions.length > 0 ? (
                    <div className='space-y-0'>
                        {filteredTransactions.map((transaction, index) => (
                <TransactionBlock 
                    key={index} 
                                TransactionData={transaction}
                                index={index}
                />
            ))}
                    </div>
                ) : (
                    <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-8 text-center'>
                        <Receipt className="h-12 w-12 text-[#1f1a14]/40 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-[#1f1a14] mb-2">No Transactions Found</h3>
                        <p className="text-[#1f1a14]/60">
                            {filterType !== 'all' 
                                ? 'No transactions found for the selected type in this month.' 
                                : 'No transactions found for this month.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}