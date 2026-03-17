import { ArrowUpRight, Check, X,Loader2 } from 'lucide-react';
import { RemoveExternalExpense, reduceBalanceFromDigitalAccount, getDigitalAccounts, triggerDataUpdate, GetDefaultAccount, saveExpenseData, setTransactions } from '../CardinalStorage'
import { useState } from 'react';

const ExternalExpenseCard = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    // const [selectedAccount, setSelectedAccount] = useState();

    const handleAccept = async () => {
        if (isLoading) return; // Prevent double clicks
        setIsLoading(true);
        try {
            // await AddExternalExpense(props.index);
            const selectedAccount = await getDefaultAccounts();

            // setSelectedAccount(defaultAccount);
            console.log(selectedAccount);
            if (!selectedAccount) {
                alert("No Default account, Add Digital/Bank Account");
                return;
            }

            if (selectedAccount.balance < parseInt(props.amount)) {
                alert("Not enough balance in the selected account");
                return;
            }
            const result = await reduceBalanceFromDigitalAccount(selectedAccount.id, parseInt(props.amount));
            if (!result.success) {
                alert(result.message);
                return;
            }

            const spent = {
                amount: parseInt(props.amount),
                remark: props.purpose,
                spentFromState: "online", // Keep this for consistency with original code
                accountId: selectedAccount.id
            };
            await saveExpenseData(spent);

            const transactionData = {
                amount: parseInt(props.amount),
                remark: props.purpose,
                medium: "online", // Payment method: "online" or "offline"
                spentFromState: true, // Boolean: true indicates this is an expense
                accountId: selectedAccount.id
            };
            await setTransactions(transactionData);

            triggerDataUpdate('expense');

            //remove the data after adding to expense
            await RemoveExternalExpense(props.index);

            props.onRefresh();
        } catch (error) {
            setIsLoading(false);
            alert("Could not add: " + error.message);
        }
    }

    const getDefaultAccounts = async () => {
        try {
            const accounts = await getDigitalAccounts();
            const defaultId = await GetDefaultAccount();
            let DefaultAccount = accounts.find(account => account.id == defaultId);
            if (!DefaultAccount) {
                DefaultAccount = accounts[0];
            }
            return DefaultAccount;
            // setSelectedAccount();
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     console.log(getDefaultAccounts());
    // }, [])

    const handleReject = async () => {
        if (isLoading) return; // Prevent double clicks
        setIsLoading(true);
        try {
            await RemoveExternalExpense(props.index);
            props.onRefresh();
        } catch (error) {
            setIsLoading(false);
            alert("Could not remove: " + error.message);
        }
    }
    return (
        <div
            key={props._id}
            className={`p-3 bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg transition-all ${
            isLoading ? 'opacity-70 pointer-events-none' : 'hover:shadow-[3px_3px_0_#1f1a14]'
        }`}>
            <div className="flex items-center justify-between gap-2">
                {/* Left: Type Icon + Info */}
                <div className="flex items-center flex-1 min-w-0">
                    <div className="p-1.5 rounded-md mr-2 flex-shrink-0 bg-red-100 border border-red-500">
                        <ArrowUpRight className="h-3 w-3 text-red-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="text-base font-bold truncate block text-red-600">
                            -${props.amount.toLocaleString()}
                        </span>
                        <p className="text-xs text-[#1f1a14]/60 truncate uppercase tracking-tighter">
                            {props.purpose}
                        </p>
                    </div>
                </div>

                {/* Center: Date (Simplified for small space) */}
                <div className="flex-shrink-0 text-right mr-2">
                    <p className="text-[10px] font-bold text-[#1f1a14]/40 uppercase">
                        {new Date(props.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short'
                        })}
                    </p>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                        onClick={() => handleAccept(props.index)}
                        className="p-1.5 bg-green-500 text-white rounded border border-[#1f1a14] hover:bg-green-600 transition-colors shadow-[1px_1px_0_#1f1a14] active:translate-y-[1px] active:shadow-none"
                    >
                       {isLoading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                             <Check className="h-3 w-3" />
                        )}
                    </button>
                    <button
                        onClick={() => handleReject(props.index)}
                        className="p-1.5 bg-red-500 text-white rounded border border-[#1f1a14] hover:bg-red-600 transition-colors shadow-[1px_1px_0_#1f1a14] active:translate-y-[1px] active:shadow-none"
                    >
                       {isLoading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                            <X className="h-3 w-3" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ExternalExpenseCard;
