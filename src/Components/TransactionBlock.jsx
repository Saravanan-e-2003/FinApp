import React from "react";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Wallet, DollarSign, Calendar, MessageSquare } from "lucide-react";

export default function TransactionBlock({ TransactionData, index }) {
    // Determine if this is an expense or income transaction
    // If spentFromState exists, it's an expense
    // If only medium exists (without spentFromState), it's income
    const isExpense = TransactionData.spentFromState ? true : false;
    const isIncome = TransactionData.medium && !TransactionData.spentFromState;
    
    // Get the payment method
    const paymentMethod = TransactionData.spentFromState || TransactionData.medium || 'unknown';
    
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

    // Format date if available (you can extend this when date is added to transactions)
    const formatDate = () => {
        // For now, return a placeholder. You can add actual date when implementing
        return new Date().toLocaleDateString();
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
        <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 mb-4 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    {/* Transaction Type Icon */}
                    <div className={`p-2 rounded-lg mr-3 ${
                        isExpense ? 'bg-red-100 border-2 border-red-500' : 'bg-green-100 border-2 border-green-500'
                    }`}>
                        {isExpense ? (
                            <ArrowUpRight className="h-5 w-5 text-red-600" />
                        ) : (
                            <ArrowDownLeft className="h-5 w-5 text-green-600" />
                        )}
                    </div>
                    
                    {/* Amount */}
                    <div>
                        <div className="flex items-center">
                            <span className={`text-xl font-bold ${
                                isExpense ? 'text-red-600' : 'text-green-600'
                            }`}>
                                {isExpense ? '-' : '+'}${amount.toLocaleString()}
                            </span>
                        </div>
                        <p className="text-sm text-[#1f1a14]/60">
                            {isExpense ? 'Expense' : 'Income'}
                        </p>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="flex items-center">
                    <div className="bg-[#1f1a14] p-2 rounded-lg mr-2">
                        <PaymentIcon className="h-4 w-4 text-[#fff7e4]" />
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-[#1f1a14]">
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
                        <MessageSquare className="h-4 w-4 text-[#1f1a14]/60 mr-2 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-[#1f1a14]">
                                {TransactionData.remark}
                            </p>
                            <p className="text-xs text-[#1f1a14]/60">Description</p>
                        </div>
                    </div>
                )}

                {/* Date */}
                <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-[#1f1a14]/60 mr-2" />
                    <div>
                        <p className="text-sm text-[#1f1a14]">{formatDate()}</p>
                        <p className="text-xs text-[#1f1a14]/60">Transaction Date</p>
                    </div>
                </div>
            </div>

            {/* Transaction ID (optional) */}
            <div className="mt-3 pt-3 border-t border-[#1f1a14]/20">
                <p className="text-xs text-[#1f1a14]/50">
                    Transaction #{index + 1}
                </p>
            </div>
        </div>
    );
}