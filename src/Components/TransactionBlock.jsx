import React from "react";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Wallet, DollarSign, Calendar, MessageSquare } from "lucide-react";

export default function TransactionBlock({ TransactionData, index }) {
    // Determine if this is an expense or income transaction
    // spentFromState is now Boolean: true = expense, false = income
    const isExpense = TransactionData.spentFromState === true;
    const isIncome = TransactionData.medium && TransactionData.spentFromState === false;
    
    // Get the payment method from medium field
    const paymentMethod = TransactionData.medium || 'unknown';
    
    // Get appropriate icon based on payment method
    const getPaymentIcon = () => {
        switch(paymentMethod.toLowerCase()) {
            case 'online':
            case 'card':
                return CreditCard;
            case 'offline':
            case 'cash':
                return Wallet;
            default:
                return DollarSign;
        }
    };

    // Format date if available
    const formatDate = () => {
        if (TransactionData.date) {
            const date = new Date(TransactionData.date);
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
        }
        return new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    // Get payment method display text
    const getPaymentMethodText = () => {
        switch(paymentMethod.toLowerCase()) {
            case 'online':
                return 'Digital Payment';
            case 'offline':
                return 'Cash Payment';
            case 'card':
                return 'Card Payment';
            default:
                return paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1);
        }
    };

    const PaymentIcon = getPaymentIcon();
    const amount = Math.abs(parseInt(TransactionData.amount) || 0);

    return (
        <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-2 md:p-4 mb-2 md:mb-4 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
            
            {/* Mobile Compact Layout */}
            <div className="md:hidden">
                <div className="flex items-center justify-between">
                    {/* Left: Type Icon + Amount */}
                    <div className="flex items-center flex-1 min-w-0">
                        <div className={`p-1.5 rounded-md mr-2 flex-shrink-0 ${
                            isExpense ? 'bg-red-100 border border-red-500' : 'bg-green-100 border border-green-500'
                        }`}>
                            {isExpense ? (
                                <ArrowUpRight className="h-3 w-3 text-red-600" />
                            ) : (
                                <ArrowDownLeft className="h-3 w-3 text-green-600" />
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <span className={`text-base font-bold truncate block ${
                                isExpense ? 'text-red-600' : 'text-green-600'
                            }`}>
                                {isExpense ? '-' : '+'}${amount.toLocaleString()}
                            </span>
                            {TransactionData.remark && (
                                <p className="text-xs text-[#1f1a14]/60 truncate">
                                    {TransactionData.remark}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    {/* Center: Date */}
                    <div className="flex items-center justify-center flex-shrink-0 mx-2">
                        <div className="text-center">
                            <p className="text-xs font-medium text-[#1f1a14]">
                                {formatDate()}
                            </p>
                        </div>
                    </div>
                    
                    {/* Right: Payment Method Icon */}
                    <div className="flex items-center flex-shrink-0">
                        <div className="bg-[#1f1a14] p-1 rounded-md">
                            <PaymentIcon className="h-3 w-3 text-[#fff7e4]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout (unchanged for larger screens) */}
            <div className="hidden md:block">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3 sm:gap-0">
                    <div className="flex items-center">
                        {/* Transaction Type Icon */}
                        <div className={`p-2 rounded-lg mr-3 flex-shrink-0 ${
                            isExpense ? 'bg-red-100 border-2 border-red-500' : 'bg-green-100 border-2 border-green-500'
                        }`}>
                            {isExpense ? (
                                <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                            ) : (
                                <ArrowDownLeft className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                            )}
                        </div>
                        
                        {/* Amount */}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center">
                                <span className={`text-lg md:text-xl font-bold truncate ${
                                    isExpense ? 'text-red-600' : 'text-green-600'
                                }`}>
                                    {isExpense ? '-' : '+'}${amount.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-xs md:text-sm text-[#1f1a14]/60">
                                {isExpense ? 'Expense' : 'Income'}
                            </p>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-center sm:justify-end">
                        <div className="bg-[#1f1a14] p-1.5 md:p-2 rounded-lg mr-2 flex-shrink-0">
                            <PaymentIcon className="h-3 w-3 md:h-4 md:w-4 text-[#fff7e4]" />
                        </div>
                        <div className="text-left sm:text-right min-w-0">
                            <p className="text-xs md:text-sm font-semibold text-[#1f1a14] truncate">
                                {getPaymentMethodText()}
                            </p>
                            <p className="text-xs text-[#1f1a14]/60">
                                Payment Method
                            </p>
                        </div>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className="space-y-2">
                    {/* Remark/Description */}
                    {TransactionData.remark && (
                        <div className="flex items-start">
                            <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-[#1f1a14]/60 mr-2 mt-0.5 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm md:text-sm font-medium text-[#1f1a14] break-words">
                                    {TransactionData.remark}
                                </p>
                                <p className="text-xs text-[#1f1a14]/60">Description</p>
                            </div>
                        </div>
                    )}

                    {/* Date */}
                    <div className="flex items-center">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 text-[#1f1a14]/60 mr-2 flex-shrink-0" />
                        <div>
                            <p className="text-xs md:text-sm text-[#1f1a14]">{formatDate()}</p>
                            <p className="text-xs text-[#1f1a14]/60">Transaction Date</p>
                        </div>
                    </div>
                </div>

                {/* Transaction ID (optional) */}
                <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-[#1f1a14]/20">
                    <p className="text-xs text-[#1f1a14]/50">
                        Transaction #{index + 1}
                    </p>
                </div>
            </div>
        </div>
    );
}