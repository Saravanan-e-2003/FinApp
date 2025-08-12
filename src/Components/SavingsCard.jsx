import React from "react";
import { Target, DollarSign, Edit3, Trash2 } from "lucide-react";

export default function SavingsCard(props) {
    // Calculate the percentage this savings goal represents of total savings
    const savingsPercentage = props.totalSavings > 0 
        ? Math.round((props.amount / props.totalSavings) * 100) 
        : 0;
    return (
        <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] p-4 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200'>
            {/* Header with Icon */}
            <div className="flex items-center mb-3">
                <div className="bg-[#1f1a14] p-2 rounded-lg mr-3">
                    <Target className="h-5 w-5 text-[#fff7e4]" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#1f1a14] truncate" title={props.name}>
                        {props.name}
                    </h3>
                </div>
            </div>

            {/* Amount Display */}
            <div className="mb-4">
                <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-[#1f1a14]/60 mr-1" />
                    <span className="text-sm text-[#1f1a14]/60 font-medium">Savings Amount</span>
                </div>
                <p className="text-2xl font-bold text-[#1f1a14] mt-1">
                    ${props.amount?.toLocaleString() || '0'}
                </p>
            </div>

            {/* Savings Portion Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-[#1f1a14]/60">Portion of Total Savings</span>
                    <span className="text-xs text-[#1f1a14]/60 font-semibold">{savingsPercentage}%</span>
                </div>
                <div className="w-full bg-[#1f1a14]/20 rounded-full h-2">
                    <div 
                        className="bg-[#1f1a14] h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min(savingsPercentage, 100)}%` }}
                    ></div>
                </div>
                <div className="mt-1 text-xs text-[#1f1a14]/50">
                    ${props.amount?.toLocaleString() || '0'} of ${props.totalSavings?.toLocaleString() || '0'} total
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button 
                    onClick={() => { props.onUpdate() }}
                    className='flex-1 flex items-center justify-center gap-2 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] py-2 px-3 rounded-lg font-semibold hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors duration-200 text-sm'
                >
                    <Edit3 className="h-4 w-4" />
                    Edit
                </button>
                <button 
                    onClick={() => { props.onRemove() }}
                    className='flex-1 flex items-center justify-center gap-2 bg-red-600 text-white border-2 border-red-600 py-2 px-3 rounded-lg font-semibold hover:bg-red-700 hover:border-red-700 transition-colors duration-200 text-sm'
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </button>
            </div>
        </div>
    );
}