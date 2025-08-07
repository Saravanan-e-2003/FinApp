import React, { useState, useEffect } from "react";
import { updateSavingsElement, getSavingsElementFromIndex } from "../CardinalStorage";
import { X, Target, DollarSign } from "lucide-react";

export default function UpdateSavingsCardModel(props) {
    const [savingsName, setSavingsName] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.isOpen) {
            const data = getSavingsElementFromIndex(props.id);
            setSavingsName(data.name || '');
            setAmount(data.amount || '');
            setErrors({});
        }
    }, [props.isOpen, props.id]);

    if (!props.isOpen) return null;

    const validateForm = () => {
        const newErrors = {};

        if (!savingsName.trim()) {
            newErrors.savingsName = "Please enter a savings goal name";
        }

        if (!amount || amount <= 0) {
            newErrors.amount = "Please enter a valid amount";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const updatedData = {
            name: savingsName.trim(),
            amount: parseInt(amount),
            medium: "online"
        };
        
        updateSavingsElement(props.id, updatedData);
        
        // Reset form
        setSavingsName('');
        setAmount('');
        setErrors({});
        
        props.onClose();
    };

    const handleClose = () => {
        setSavingsName('');
        setAmount('');
        setErrors({});
        props.onClose();
    };

    return (
        <div className="fixed inset-0 bg-[#1f1a14]/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#1f1a14]">Update Savings Goal</h2>
                        <button
                            onClick={handleClose}
                            className="text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] p-2 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Savings Name Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Goal Name
                            </label>
                            <div className="relative">
                                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                                <input
                                    type="text"
                                    value={savingsName}
                                    onChange={(e) => {
                                        setSavingsName(e.target.value);
                                        if (errors.savingsName) setErrors(prev => ({ ...prev, savingsName: "" }));
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 ${
                                        errors.savingsName ? 'border-red-500' : 'border-[#1f1a14]'
                                    }`}
                                    placeholder="e.g., Emergency Fund, Vacation, New Car"
                                />
                            </div>
                            {errors.savingsName && <p className="text-red-500 text-sm mt-1">{errors.savingsName}</p>}
                        </div>

                        {/* Amount Field */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                                Target Amount
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
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
                                    placeholder="Enter target amount"
                                    min="1"
                                />
                            </div>
                            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
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
                                Update Goal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}