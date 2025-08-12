import React, { useState, useEffect } from "react";
import {
  saveExpenseData,
  getDigitalAccounts,
  getOfflineBalance,
  reduceBalanceFromDigitalAccount,
  reduceFromOfflineBalance,
  setTransactions,
  triggerDataUpdate
} from "../CardinalStorage";
import { X, DollarSign, MessageSquare, CreditCard, Wallet, Loader2 } from "lucide-react";

export default function AddExpenseModel({ isOpen, onClose, saveTotalSpent }) {
  const [medium, setMedium] = useState("offline");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [errors, setErrors] = useState({});
  const [digitalAccounts, setDigitalAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load digital accounts when component mounts or modal opens
  useEffect(() => {
    if (isOpen) {
      loadDigitalAccounts();
    }
  }, [isOpen]);

  const loadDigitalAccounts = async () => {
    try {
      setLoadingAccounts(true);
      const accounts = await getDigitalAccounts();
      setDigitalAccounts(Array.isArray(accounts) ? accounts : []);
    } catch (error) {
      console.error('Error loading digital accounts:', error);
      setDigitalAccounts([]);
    } finally {
      setLoadingAccounts(false);
    }
  };

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!amount || amount <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!remark.trim()) {
      newErrors.remark = "Please enter a remark";
    }

    // Validate account selection for online payments
    if (medium === "online" && !selectedAccount) {
      newErrors.selectedAccount = "Please select a bank account";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      
      // Check available balances first
      if (medium === "online") {
        if (!selectedAccount) {
          alert("Please select a bank account");
          return;
        }
        
        // Check selected account balance
        const selectedAccountData = digitalAccounts.find(acc => acc.id === selectedAccount);
        if (!selectedAccountData || selectedAccountData.balance < parseInt(amount)) {
          alert("Not enough balance in the selected account");
          return;
        }
        
        // Deduct from selected account
        const result = await reduceBalanceFromDigitalAccount(selectedAccount, parseInt(amount));
        if (!result.success) {
          alert(result.message);
          return;
        }
      } else if (medium === "offline") {
        // Check offline balance
        const offlineBalance = await getOfflineBalance();
        if (offlineBalance < parseInt(amount)) {
          alert("Not enough offline balance");
          return;
        }
        
        // Deduct from offline balance
        await reduceFromOfflineBalance(parseInt(amount));
      }

      // Save expense data (without auto-deduction since we already handled it above)
      const spent = {
        amount: parseInt(amount),
        remark,
        spentFromState: medium, // Keep this for consistency with original code
        accountId: medium === "online" ? selectedAccount : null
      };
      await saveExpenseData(spent);
      
      // Create transaction record for transaction history
      const transactionData = {
        amount: parseInt(amount),
        remark,
        medium: medium, // Payment method: "online" or "offline"
        spentFromState: true, // Boolean: true indicates this is an expense
        accountId: medium === "online" ? selectedAccount : null
      };
      await setTransactions(transactionData);
      
      // Update UI
      saveTotalSpent(parseInt(amount));
      
      // Trigger data update to refresh all components
      triggerDataUpdate('expense');
      
      // Reset form
      setAmount("");
      setRemark("");
      setMedium("offline"); // Changed from setSpentFromState to setMedium
      setSelectedAccount("");
      setErrors({});
      
      onClose();
    } catch (error) {
      console.error('Error saving expense:', error);
      alert('Failed to save expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    setRemark("");
    setMedium("offline"); // Changed from setSpentFromState to setMedium
    setSelectedAccount("");
    setErrors({});
    onClose();
  };

  const handlePaymentMethodChange = (value) => {
    setMedium(value);
    // Reset selected account when switching payment methods
    setSelectedAccount("");
    // Clear any account selection errors
    if (errors.selectedAccount) {
      setErrors(prev => ({ ...prev, selectedAccount: "" }));
    }
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
                  value={medium}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#1f1a14] rounded-lg bg-[#fff7e4] text-[#1f1a14] focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20"
                >
                  <option value="online">Online Balance</option>
                  <option value="offline">Offline Balance</option>
                </select>
              </div>
            </div>

            {/* Account Selection for Online Balance */}
            {medium === "online" && (
              <div>
                <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                  Bank Account
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                  <select
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border-2 border-[#1f1a14] rounded-lg bg-[#fff7e4] text-[#1f1a14] focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 ${
                      errors.selectedAccount ? 'border-red-500' : 'border-[#1f1a14]'
                    }`}
                  >
                    <option value="">Select an account</option>
                    {loadingAccounts ? (
                      <option value="">Loading accounts...</option>
                    ) : digitalAccounts.length === 0 ? (
                      <option value="">No accounts found.</option>
                    ) : (
                      digitalAccounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.name} (Balance: {account.balance})
                        </option>
                      ))
                    )}
                  </select>
                </div>
                {errors.selectedAccount && <p className="text-red-500 text-sm mt-1">{errors.selectedAccount}</p>}
              </div>
            )}

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
                    Processing...
                  </>
                ) : (
                  'Add Expense'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
