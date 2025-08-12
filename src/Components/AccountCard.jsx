import React from "react";
import { Building, CreditCard, Wallet, DollarSign, Edit3, Trash2 } from "lucide-react";

export default function AccountCard({ account, onUpdate, onRemove }) {
    const getAccountIcon = (type) => {
        switch (type) {
            case 'bank':
                return Building;
            case 'card':
                return CreditCard;
            case 'wallet':
                return Wallet;
            default:
                return Building;
        }
    };

    const getAccountTypeLabel = (type) => {
        switch (type) {
            case 'bank':
                return 'Bank Account';
            case 'card':
                return 'Card';
            case 'wallet':
                return 'Digital Wallet';
            default:
                return 'Account';
        }
    };

    const IconComponent = getAccountIcon(account.type);

    return (
        <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-4 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200'>
            {/* Header with Icon */}
            <div className="flex items-center mb-3">
                <div className="bg-[#1f1a14] p-2 rounded-lg mr-3">
                    <IconComponent className="h-5 w-5 text-[#fff7e4]" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#1f1a14] truncate" title={account.name}>
                        {account.name}
                    </h3>
                    <p className="text-sm text-[#1f1a14]/60">
                        {getAccountTypeLabel(account.type)}
                    </p>
                </div>
            </div>

            {/* Balance Display */}
            <div className="mb-4">
                <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-[#1f1a14]/60 mr-1" />
                    <span className="text-sm text-[#1f1a14]/60 font-medium">Current Balance</span>
                </div>
                <p className="text-2xl font-bold text-[#1f1a14] mt-1">
                    ${account.balance?.toLocaleString() || '0'}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button 
                    onClick={() => onUpdate(account)}
                    className='flex-1 flex items-center justify-center gap-2 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] py-2 px-3 rounded-lg font-semibold hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors duration-200 text-sm'
                >
                    <Edit3 className="h-4 w-4" />
                    Edit
                </button>
                <button 
                    onClick={() => onRemove(account)}
                    className='flex-1 flex items-center justify-center gap-2 bg-red-600 text-white border-2 border-red-600 py-2 px-3 rounded-lg font-semibold hover:bg-red-700 hover:border-red-700 transition-colors duration-200 text-sm'
                >
                    <Trash2 className="h-4 w-4" />
                    Remove
                </button>
            </div>
        </div>
    );
} 