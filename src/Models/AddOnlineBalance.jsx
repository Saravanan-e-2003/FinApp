import React, { useState } from "react";
import { AddOnlineBalance, setTransactions, triggerDataUpdate } from "../CardinalStorage";
import { X, CreditCard, MessageSquare } from "lucide-react";

export default function OnlineBalanceModel({ isModelOpen, onClose }) {
    const [amount, setAmount] = useState("");
    const [remark, setRemark] = useState("");
    const [errors, setErrors] = useState({});

    if (!isModelOpen) return null;

    const validateForm = () => {
        const newErrors = {};

        if (!amount || amount <= 0) {
            newErrors.amount = "Please enter a valid amount";
        }

        if (!remark.trim()) {
            newErrors.remark = "Please enter a remark";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const TransactionObject = {
            amount: parseInt(amount),
            remark,
            medium: "online",
            spentFromState: false // Boolean: false indicates this is income (balance addition)
        };
        
        setTransactions(TransactionObject);
        AddOnlineBalance(amount);
        
        // Trigger data update to refresh all components
        triggerDataUpdate('balance');
        
        // Reset form
        setAmount("");
        setRemark("");
        setErrors({});
        
        onClose();
    };

    const handleClose = () => {
        setAmount("");
        setRemark("");
        setErrors({});
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-[#1f1a14]/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#1f1a14]">Add Online Balance</h2>
                        <button
                            onClick={handleClose}
                            className="text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] p-2 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Amount Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Amount
                            </label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        if (errors.amount) setErrors(prev => ({ ...prev, amount: "" }));
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 ${
                                        errors.amount ? 'border-red-500' : 'border-[#1f1a14]'
                                    }`}
                                    placeholder="Enter amount to add"
                                    min="1"
                                />
                            </div>
                            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                        </div>

                        {/* Remark Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Remark
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 text-[#1f1a14]/60 h-5 w-5" />
                                <textarea
                                    value={remark}
                                    onChange={(e) => {
                                        setRemark(e.target.value);
                                        if (errors.remark) setErrors(prev => ({ ...prev, remark: "" }));
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 resize-none ${
                                        errors.remark ? 'border-red-500' : 'border-[#1f1a14]'
                                    }`}
                                    placeholder="e.g., bank transfer, salary deposit, online payment"
                                    rows="3"
                                />
                            </div>
                            {errors.remark && <p className="text-red-500 text-sm mt-1">{errors.remark}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-3 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] rounded-lg font-semibold hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-3 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] rounded-lg font-semibold hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors duration-200 shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                Add Balance
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}