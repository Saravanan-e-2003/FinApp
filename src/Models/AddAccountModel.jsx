import React, { useState, useEffect } from "react";
import { addDigitalAccount, triggerDataUpdate } from "../CardinalStorage";
import { X, Building, CreditCard, Wallet, DollarSign, Loader2 } from "lucide-react";

export default function AddAccountModel({ isOpen, onClose }) {
    const [accountName, setAccountName] = useState("");
    const [initialBalance, setInitialBalance] = useState("");
    const [accountType, setAccountType] = useState("bank");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors = {};

        if (!accountName.trim()) {
            newErrors.accountName = "Please enter an account name";
        }

        if (!initialBalance || initialBalance < 0) {
            newErrors.initialBalance = "Please enter a valid initial balance";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            setIsSubmitting(true);
            
            const result = await addDigitalAccount({
                name: accountName.trim(),
                balance: parseInt(initialBalance),
                type: accountType
            });

            if (result.success) {
                // Trigger data update to refresh all components
                triggerDataUpdate('account');
                
                // Reset form
                setAccountName("");
                setInitialBalance("");
                setAccountType("bank");
                setErrors({});
                onClose();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error adding digital account:', error);
            alert('Failed to add account. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setAccountName("");
            setInitialBalance("");
            setAccountType("bank");
            setErrors({});
            onClose();
        }
    };

    const accountTypes = [
        { value: "bank", label: "Bank Account", icon: Building },
        { value: "card", label: "Credit/Debit Card", icon: CreditCard },
        { value: "wallet", label: "Digital Wallet", icon: Wallet }
    ];

    return (
        <div className="fixed inset-0 bg-[#1f1a14]/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#1f1a14]">Add Digital Account</h2>
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

                        {/* Initial Balance Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Initial Balance
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                                <input
                                    type="number"
                                    value={initialBalance}
                                    onChange={(e) => {
                                        setInitialBalance(e.target.value);
                                        if (errors.initialBalance) setErrors(prev => ({ ...prev, initialBalance: "" }));
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 ${
                                        errors.initialBalance ? 'border-red-500' : 'border-[#1f1a14]'
                                    }`}
                                    placeholder="Enter current balance"
                                    min="0"
                                />
                            </div>
                            {errors.initialBalance && <p className="text-red-500 text-sm mt-1">{errors.initialBalance}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-3 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] rounded-lg font-semibold hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-3 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] rounded-lg font-semibold hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors duration-200 shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[4px_4px_0_#1f1a14] flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    'Add Account'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 