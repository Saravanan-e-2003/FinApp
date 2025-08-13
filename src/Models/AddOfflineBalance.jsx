import React, { useState, useEffect } from "react";
import { setOfflineBalance, addToOfflineBalance, reduceFromOfflineBalance, setTransactions, triggerDataUpdate } from "../CardinalStorage";
import { X, Wallet, MessageSquare, Plus, Minus } from "lucide-react";

export default function OfflineBalanceModel({ isModelOpen, onClose, currentBalance = 0 }) {
    const [amount, setAmount] = useState("");
    const [remark, setRemark] = useState("");
    const [operationType, setOperationType] = useState("add"); // "add" or "remove"
    const [errors, setErrors] = useState({});

    // Reset form when modal opens
    useEffect(() => {
        if (isModelOpen) {
            setAmount("");
            setRemark("");
            setOperationType("add");
            setErrors({});
        }
    }, [isModelOpen]);

    if (!isModelOpen) return null;

    const validateForm = () => {
        const newErrors = {};

        if (!amount || amount <= 0) {
            newErrors.amount = "Please enter a valid amount";
        }

        if (operationType === "remove" && parseInt(amount) > currentBalance) {
            newErrors.amount = "Cannot remove more than current balance";
        }

        if (!remark.trim()) {
            newErrors.remark = "Please enter a remark";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            const amountValue = parseInt(amount);
            
            if (operationType === "add") {
                // Add to offline balance
                await addToOfflineBalance(amountValue);
            } else {
                // Remove from offline balance
                await reduceFromOfflineBalance(amountValue);
            }

            // Create transaction record
            const TransactionObject = {
                amount: amountValue,
                remark: `${operationType === "add" ? "Added to" : "Removed from"} offline balance: ${remark}`,
                medium: "offline",
                spentFromState: operationType === "remove" // true for removal (expense), false for addition (income)
            };
            
            await setTransactions(TransactionObject);
            
            // Trigger data update to refresh all components
            triggerDataUpdate('balance');
            
            // Reset form
            setAmount("");
            setRemark("");
            setOperationType("add");
            setErrors({});
            
            onClose();
        } catch (error) {
            console.error('Error updating offline balance:', error);
            alert('Failed to update balance. Please try again.');
        }
    };

    const handleClose = () => {
        setAmount("");
        setRemark("");
        setOperationType("add");
        setErrors({});
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-[#1f1a14]/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#1f1a14]">Manage Cash Balance</h2>
                        <button
                            onClick={handleClose}
                            className="text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] p-2 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Current Balance Display */}
                        <div className="bg-[#1f1a14]/10 p-3 rounded-lg">
                            <p className="text-sm font-medium text-[#1f1a14]/70">Current Cash Balance</p>
                            <p className="text-xl font-bold text-[#1f1a14]">${currentBalance.toLocaleString()}</p>
                        </div>

                        {/* Operation Type */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Operation
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                                    operationType === "add"
                                        ? 'border-[#1f1a14] bg-[#1f1a14] text-[#fff7e4]'
                                        : 'border-[#1f1a14] bg-[#fff7e4] text-[#1f1a14] hover:bg-[#1f1a14]/10'
                                }`}>
                                    <input
                                        type="radio"
                                        name="operationType"
                                        value="add"
                                        checked={operationType === "add"}
                                        onChange={(e) => setOperationType(e.target.value)}
                                        className="sr-only"
                                    />
                                    <Plus className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Add Funds</span>
                                </label>
                                <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                                    operationType === "remove"
                                        ? 'border-[#1f1a14] bg-[#1f1a14] text-[#fff7e4]'
                                        : 'border-[#1f1a14] bg-[#fff7e4] text-[#1f1a14] hover:bg-[#1f1a14]/10'
                                }`}>
                                    <input
                                        type="radio"
                                        name="operationType"
                                        value="remove"
                                        checked={operationType === "remove"}
                                        onChange={(e) => setOperationType(e.target.value)}
                                        className="sr-only"
                                    />
                                    <Minus className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Remove Funds</span>
                                </label>
                            </div>
                        </div>

                        {/* Amount Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Amount
                            </label>
                            <div className="relative">
                                <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
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
                                    placeholder={`Enter amount to ${operationType}`}
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
                                    placeholder={`e.g., ${operationType === "add" ? "cash deposit, found money" : "cash purchase, gave to friend"}`}
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
                                {operationType === "add" ? "Add Funds" : "Remove Funds"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}