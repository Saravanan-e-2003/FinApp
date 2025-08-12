import React from "react";
import { removeSavingsElement } from "../CardinalStorage";
import { X, AlertTriangle } from "lucide-react";

export default function RemoveSavingsCardModel(props) {
    if (!props.isOpen) return null;

    const handleConfirmDelete = () => {
        removeSavingsElement(props.id);
        props.onClose();
    };

    return (
        <div className="fixed inset-0 bg-[#1f1a14]/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#1f1a14]">Delete Savings Goal</h2>
                        <button
                            onClick={props.onClose}
                            className="text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] p-2 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Warning Content */}
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <div className="bg-red-100 border-2 border-red-500 rounded-full p-3">
                                <AlertTriangle className="h-8 w-8 text-red-600" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-[#1f1a14] mb-2">
                            Are you sure?
                        </h3>
                        <p className="text-[#1f1a14]/70 text-sm">
                            This action cannot be undone. This will permanently delete your savings goal and remove all associated data.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={props.onClose}
                            className="flex-1 px-4 py-3 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] rounded-lg font-semibold hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="flex-1 px-4 py-3 bg-red-600 text-white border-2 border-red-600 rounded-lg font-semibold hover:bg-red-700 hover:border-red-700 transition-colors duration-200 shadow-[4px_4px_0_#dc2626] hover:shadow-[2px_2px_0_#dc2626] hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            Delete Goal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}