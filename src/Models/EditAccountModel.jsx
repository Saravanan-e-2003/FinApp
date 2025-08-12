import React, { useState, useEffect } from "react";
import { updateDigitalAccount, triggerDataUpdate } from "../CardinalStorage";
import { X, Building, CreditCard, Wallet, DollarSign, Plus, Minus } from "lucide-react";

export default function EditAccountModel({ isOpen, onClose, account }) {
    const [accountName, setAccountName] = useState("");
    const [currentBalance, setCurrentBalance] = useState("");
    const [accountType, setAccountType] = useState("bank");
    const [balanceAdjustment, setBalanceAdjustment] = useState("");
    const [adjustmentType, setAdjustmentType] = useState("add");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && account) {
            setAccountName(account.name || "");
            setCurrentBalance(account.balance || "");
            setAccountType(account.type || "bank");
            setBalanceAdjustment("");
            setAdjustmentType("add");
            setErrors({});
        }
    }, [isOpen, account]);

    if (!isOpen || !account) return null;

    const validateForm = () => {
        const newErrors = {};

        if (!accountName.trim()) {
            newErrors.accountName = "Please enter an account name";
        }

        if (balanceAdjustment && balanceAdjustment < 0) {
            newErrors.balanceAdjustment = "Please enter a valid amount";
        }

        if (adjustmentType === "subtract" && balanceAdjustment && 
            (parseInt(currentBalance) - parseInt(balanceAdjustment)) < 0) {
            newErrors.balanceAdjustment = "Cannot subtract more than current balance";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        let newBalance = parseInt(currentBalance);
        
        // Apply balance adjustment if provided
        if (balanceAdjustment) {
            const adjustment = parseInt(balanceAdjustment);
            if (adjustmentType === "add") {
                newBalance += adjustment;
            } else {
                newBalance -= adjustment;
            }
        }

        try {
            const result = await updateDigitalAccount(account.id, {
                name: accountName.trim(),
                balance: newBalance,
                type: accountType
            });

            if (result.success) {
                // Trigger data update to refresh all components
                triggerDataUpdate('account');
                
                // Reset form
                setAccountName("");
                setCurrentBalance("");
                setAccountType("bank");
                setBalanceAdjustment("");
                setAdjustmentType("add");
                setErrors({});
                onClose();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error updating digital account:', error);
            alert('Failed to update account. Please try again.');
        }
    };

    const handleClose = () => {
        setAccountName("");
        setCurrentBalance("");
        setAccountType("bank");
        setBalanceAdjustment("");
        setAdjustmentType("add");
        setErrors({});
        onClose();
    };

    const accountTypes = [
        { value: "bank", label: "Bank Account", icon: Building },
        { value: "card", label: "Credit/Debit Card", icon: CreditCard },
        { value: "wallet", label: "Digital Wallet", icon: Wallet }
    ];

    const previewBalance = () => {
        let preview = parseInt(currentBalance) || 0;
        if (balanceAdjustment) {
            const adjustment = parseInt(balanceAdjustment) || 0;
            if (adjustmentType === "add") {
                preview += adjustment;
            } else {
                preview = Math.max(0, preview - adjustment);
            }
        }
        return preview;
    };

    return (
        <div className="fixed inset-0 bg-[#1f1a14]/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#1f1a14]">Edit Account</h2>
                        <button
                            onClick={handleClose}
                            className="text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] p-2 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Account Name Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Account Name
                            </label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                                <input
                                    type="text"
                                    value={accountName}
                                    onChange={(e) => {
                                        setAccountName(e.target.value);
                                        if (errors.accountName) setErrors(prev => ({ ...prev, accountName: "" }));
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 ${
                                        errors.accountName ? 'border-red-500' : 'border-[#1f1a14]'
                                    }`}
                                    placeholder="e.g., Chase Checking, PayPal, Visa Card"
                                />
                            </div>
                            {errors.accountName && <p className="text-red-500 text-sm mt-1">{errors.accountName}</p>}
                        </div>

                        {/* Account Type Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Account Type
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                                {accountTypes.map((type) => {
                                    const IconComponent = type.icon;
                                    return (
                                        <label
                                            key={type.value}
                                            className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                                                accountType === type.value
                                                    ? 'border-[#1f1a14] bg-[#1f1a14] text-[#fff7e4]'
                                                    : 'border-[#1f1a14] bg-[#fff7e4] text-[#1f1a14] hover:bg-[#1f1a14]/10'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="accountType"
                                                value={type.value}
                                                checked={accountType === type.value}
                                                onChange={(e) => setAccountType(e.target.value)}
                                                className="sr-only"
                                            />
                                            <IconComponent className="h-5 w-5 mr-3" />
                                            <span className="font-medium">{type.label}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Current Balance Display */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Current Balance
                            </label>
                            <div className="bg-[#1f1a14]/10 border-2 border-[#1f1a14] rounded-lg p-3">
                                <div className="flex items-center">
                                    <DollarSign className="h-5 w-5 text-[#1f1a14]/60 mr-2" />
                                    <span className="text-xl font-bold text-[#1f1a14]">
                                        {parseInt(currentBalance || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Balance Adjustment Section */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Adjust Balance (Optional)
                            </label>
                            
                            {/* Adjustment Type Toggle */}
                            <div className="flex gap-2 mb-3">
                                <button
                                    type="button"
                                    onClick={() => setAdjustmentType("add")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border-2 font-semibold transition-colors ${
                                        adjustmentType === "add"
                                            ? 'bg-green-600 text-white border-green-600'
                                            : 'bg-[#fff7e4] text-[#1f1a14] border-[#1f1a14] hover:bg-green-50'
                                    }`}
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Funds
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAdjustmentType("subtract")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border-2 font-semibold transition-colors ${
                                        adjustmentType === "subtract"
                                            ? 'bg-red-600 text-white border-red-600'
                                            : 'bg-[#fff7e4] text-[#1f1a14] border-[#1f1a14] hover:bg-red-50'
                                    }`}
                                >
                                    <Minus className="h-4 w-4" />
                                    Remove Funds
                                </button>
                            </div>

                            {/* Amount Input */}
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                                <input
                                    type="number"
                                    value={balanceAdjustment}
                                    onChange={(e) => {
                                        setBalanceAdjustment(e.target.value);
                                        if (errors.balanceAdjustment) setErrors(prev => ({ ...prev, balanceAdjustment: "" }));
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 ${
                                        errors.balanceAdjustment ? 'border-red-500' : 'border-[#1f1a14]'
                                    }`}
                                    placeholder={`Amount to ${adjustmentType}`}
                                    min="0"
                                />
                            </div>
                            {errors.balanceAdjustment && <p className="text-red-500 text-sm mt-1">{errors.balanceAdjustment}</p>}

                            {/* Balance Preview */}
                            {balanceAdjustment && (
                                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                                    <span className="text-sm text-blue-800">
                                        New balance will be: <strong>${previewBalance().toLocaleString()}</strong>
                                    </span>
                                </div>
                            )}
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
                                Update Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 