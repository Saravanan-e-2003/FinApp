import React, { useEffect, useState } from 'react'
import AddExpenseModel from "../Models/AddExpenseModel";
import { getTotalBalance, getOfflineBalance, getOnlineBalance, getTotalDigitalBalance } from '../CardinalStorage';
import { PieChart, Pie, ResponsiveContainer, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { 
    TrendingUp, 
    DollarSign, 
    PlusCircle, 
    Wallet, 
    CreditCard, 
    Target,
    Activity,
    Eye,
    EyeOff
} from 'lucide-react';

export default function Overview() {
    const [totalSpent, setTotalSpent] = useState(0);
    const [isModelOpen, SetIsModelOpen] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [offlineBalance, setOfflineBalance] = useState(0);
    const [digitalBalance, setDigitalBalance] = useState(0);
    const [pieData, setPieData] = useState([]);
    const [showBalances, setShowBalances] = useState(true);

    function saveTotalSpent(spentAmount) {
        const prevAmount = parseInt(localStorage.getItem("totalSpent")) || 0;
        const amount = parseInt(spentAmount) || 0;
        const total = prevAmount + amount;

        localStorage.setItem("totalSpent", total);
        setTotalSpent(total);
        updateAllBalances();
    }

    function updateAllBalances() {
        const total = getTotalBalance();
        const offline = getOfflineBalance();
        const digital = getTotalDigitalBalance();
        const spent = parseInt(localStorage.getItem("totalSpent")) || 0;

        setTotalBalance(total);
        setOfflineBalance(offline);
        setDigitalBalance(digital);
        setTotalSpent(spent);

        // Update pie chart data
        const available = total - spent;
        const data = [
            { name: "Available", value: Math.max(0, available), color: "#22c55e" },
            { name: "Spent", value: spent, color: "#ef4444" }
        ];
        setPieData(data);
    }

    useEffect(() => {
        updateAllBalances();
    }, [isModelOpen]);

    const spendingPercentage = totalBalance > 0 ? Math.round((totalSpent / totalBalance) * 100) : 0;
    const availableAmount = Math.max(0, totalBalance - totalSpent);

    const balanceBreakdown = [
        { name: "Cash", value: offlineBalance, color: "#3b82f6" },
        { name: "Digital", value: digitalBalance, color: "#8b5cf6" }
    ];

    return (
        <div className='min-h-full flex flex-col p-4 space-y-6'>
            {/* Prominent Add Expense Button */}
            <div className='flex justify-between items-center mb-4'>
                <div className="flex items-center">
                    <button
                        onClick={() => setShowBalances(!showBalances)}
                        className="p-2 mr-4 text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] rounded-lg transition-colors border-2 border-[#1f1a14]"
                        title={showBalances ? "Hide balances" : "Show balances"}
                    >
                        {showBalances ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <button
                    onClick={() => SetIsModelOpen(true)}
                    className="bg-[#1f1a14] text-[#fff7e4] px-6 py-3 rounded-lg font-bold border-2 border-[#1f1a14] shadow-[4px_4px_0_#1f1a14] hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center gap-2 text-lg"
                >
                    <PlusCircle className="h-6 w-6" />
                    Add Expense
                </button>
            </div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Spending Overview Chart */}
                <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-6'>
                    <h3 className="text-lg font-bold text-[#1f1a14] mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Spending Overview
                    </h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Balance Breakdown */}
                <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-6'>
                    <h3 className="text-lg font-bold text-[#1f1a14] mb-4 flex items-center">
                        <Wallet className="h-5 w-5 mr-2" />
                        Balance Breakdown
                    </h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={balanceBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {balanceBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {/* Total Balance */}
                <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200'>
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="h-5 w-5 text-[#1f1a14]/60" />
                        <span className="text-xs font-medium text-[#1f1a14]/60">TOTAL BALANCE</span>
                    </div>
                    <p className="text-2xl font-bold text-[#1f1a14]">
                        {showBalances ? `$${totalBalance.toLocaleString()}` : '****'}
                    </p>
                </div>

                {/* Available */}
                <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200'>
                    <div className="flex items-center justify-between mb-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="text-xs font-medium text-green-600">AVAILABLE</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                        {showBalances ? `$${availableAmount.toLocaleString()}` : '****'}
                    </p>
                </div>

                {/* Total Spent */}
                <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200'>
                    <div className="flex items-center justify-between mb-2">
                        <Target className="h-5 w-5 text-red-600" />
                        <span className="text-xs font-medium text-red-600">SPENT</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">
                        {showBalances ? `$${totalSpent.toLocaleString()}` : '****'}
                    </p>
                    <p className="text-xs text-[#1f1a14]/60 mt-1">
                        {spendingPercentage}% of total
                    </p>
                </div>
            </div>

            {/* Balance Summary */}
            <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-6'>
                <h3 className="text-lg font-bold text-[#1f1a14] mb-4">Balance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 border border-[#1f1a14] rounded-lg hover:bg-[#1f1a14]/5 transition-colors">
                        <Wallet className="h-8 w-8 text-[#1f1a14] mr-3" />
                        <div>
                            <p className="font-semibold text-[#1f1a14]">Cash Balance</p>
                            <p className="text-sm text-[#1f1a14]/60">
                                {showBalances ? `$${offlineBalance.toLocaleString()}` : '****'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 border border-[#1f1a14] rounded-lg hover:bg-[#1f1a14]/5 transition-colors">
                        <CreditCard className="h-8 w-8 text-[#1f1a14] mr-3" />
                        <div>
                            <p className="font-semibold text-[#1f1a14]">Digital Balance</p>
                            <p className="text-sm text-[#1f1a14]/60">
                                {showBalances ? `$${digitalBalance.toLocaleString()}` : '****'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Expense Modal */}
            <AddExpenseModel
                isOpen={isModelOpen}
                onClose={() => SetIsModelOpen(false)}
                saveTotalSpent={saveTotalSpent}
            />
        </div>
    )
}