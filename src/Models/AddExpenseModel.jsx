import React, { useState } from "react";
import { saveExpenseData, getTotalBalance, getOnlineBalance, getOfflineBalance } from "../CardinalStorage";
import { X, DollarSign, MessageSquare, CreditCard } from "lucide-react";

export default function AddExpenseModel({ isOpen, onClose, saveTotalSpent }) {
  const [spentFromState, setSpentFromState] = useState("online");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

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

  function updateExpense() {
    if (!validateForm()) return;

    const spent = {
      amount: parseInt(amount),
      remark,
      spentFromState
    };
    saveExpenseData(spent);
    console.log(spent);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (getTotalBalance() <= 0) {
      alert("Not enough balance");
      return;
    }

    if (spentFromState === "online") {
      if (getOnlineBalance() < parseInt(amount)) {
        alert("Not enough online balance");
        return;
      }
    } else if (spentFromState === "offline") {
      if (getOfflineBalance() < parseInt(amount)) {
        alert("Not enough offline balance");
        return;
      }
    }

    updateExpense();
    saveTotalSpent(parseInt(amount));
    
    // Reset form
    setAmount("");
    setRemark("");
    setSpentFromState("online");
    setErrors({});
    
    onClose();
  };

  const handleClose = () => {
    setAmount("");
    setRemark("");
    setSpentFromState("online");
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#1f1a14]/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#1f1a14]">Add Expense</h2>
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
                  placeholder="Enter amount"
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
                  placeholder="e.g., food, transport, utilities"
                  rows="3"
                />
              </div>
              {errors.remark && <p className="text-red-500 text-sm mt-1">{errors.remark}</p>}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                Payment Method
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                <select
                  value={spentFromState}
                  onChange={(e) => setSpentFromState(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#1f1a14] rounded-lg bg-[#fff7e4] text-[#1f1a14] focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20"
                >
                  <option value="online">Online Balance</option>
                  <option value="offline">Offline Balance</option>
                </select>
              </div>
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
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
