import React, { useEffect, useState } from 'react'
import { getOfflineBalance, getOnlineBalance, getDigitalAccounts, getTotalDigitalBalance, removeDigitalAccount, registerDataUpdateCallback } from '../CardinalStorage';
import AddOfflineBalance from '../Models/AddOfflineBalance'
import AddOnlineBalance from '../Models/AddOnlineBalance'
import AddAccountModel from '../Models/AddAccountModel'
import EditAccountModel from '../Models/EditAccountModel'
import AccountCard from './AccountCard'
import { Wallet, CreditCard, Plus, DollarSign, TrendingUp, Loader2 } from 'lucide-react';

export default function Balance() {
    const [OnlineBalance, setOnlineBalance] = useState(0);
    const [OfflineBalance, setOfflineBalance] = useState(0);
    const [digitalAccounts, setDigitalAccounts] = useState([]);
    const [isOnlineModel, setOnlineModel] = useState(false);
    const [isOfflineModel, setOfflineModel] = useState(false);
    const [isAddAccountModel, setAddAccountModel] = useState(false);
    const [isEditAccountModel, setEditAccountModel] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRemoveLoading, setIsRemoveLoading] = useState(false);

    const [totalDigitalBalance, setTotalDigitalBalance] = useState(0);

    useEffect(() => {
        const loadBalanceData = async () => {
            try {
                setIsLoading(true);
                const offline = await getOfflineBalance();
                const online = await getOnlineBalance();
                const accounts = await getDigitalAccounts();
                const digitalTotal = await getTotalDigitalBalance();
                
                setOfflineBalance(offline);
                setOnlineBalance(online);
                setDigitalAccounts(Array.isArray(accounts) ? accounts : []);
                setTotalDigitalBalance(digitalTotal);
            } catch (error) {
                console.error('Error loading balance data:', error);
                setOfflineBalance(0);
                setOnlineBalance(0);
                setDigitalAccounts([]);
                setTotalDigitalBalance(0);
            } finally {
                setIsLoading(false);
            }
        };
        loadBalanceData();
    }, [])

    // Register for data updates
    useEffect(() => {
        const unregister = registerDataUpdateCallback((eventType) => {
            // Only reload for relevant balance-related events
            if (eventType === 'balance' || eventType === 'account' || eventType === 'transaction') {
                const loadBalanceData = async () => {
                    try {
                        const offline = await getOfflineBalance();
                        const online = await getOnlineBalance();
                        const accounts = await getDigitalAccounts();
                        const digitalTotal = await getTotalDigitalBalance();
                        
                        setOfflineBalance(offline);
                        setOnlineBalance(online);
                        setDigitalAccounts(Array.isArray(accounts) ? accounts : []);
                        setTotalDigitalBalance(digitalTotal);
                    } catch (error) {
                        console.error('Error loading balance data:', error);
                    }
                };
                loadBalanceData();
            }
        });

        return unregister;
    }, []);

    const totalBalance = OfflineBalance + totalDigitalBalance;

    const handleRemoveAccount = async (account) => {
        const confirmDelete = window.confirm(`Are you sure you want to remove "${account.name}"?`);
        if (confirmDelete) {
            try {
                setIsRemoveLoading(true);
                const result = await removeDigitalAccount(account.id);
                if (result.success) {
                    const accounts = await getDigitalAccounts();
                    setDigitalAccounts(Array.isArray(accounts) ? accounts : []);
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error removing account:', error);
                alert('Failed to remove account. Please try again.');
            } finally {
                setIsRemoveLoading(false);
            }
        }
    };

    const handleUpdateAccount = (account) => {
        setSelectedAccount(account);
        setEditAccountModel(true);
    };

    if (isLoading) {
        return (
            <div className='min-h-full flex flex-col p-4 space-y-6'>
                <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] p-6 text-center'>
                    <Loader2 className="h-12 w-12 text-[#1f1a14] mx-auto mb-4 animate-spin" />
                    <h3 className="text-lg font-semibold text-[#1f1a14] mb-2">Loading Balance Data...</h3>
                    <p className="text-[#1f1a14]/60">Please wait while we fetch your balance information.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-full flex flex-col p-4 space-y-6'>
            {/* Total Balance Summary */}
            <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] p-6'>
                <div className="flex items-center mb-4">
                    <div className="bg-[#1f1a14] p-3 rounded-lg mr-4">
                        <TrendingUp className="h-6 w-6 text-[#fff7e4]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#1f1a14]">Total Balance</h1>
                        <p className="text-[#1f1a14]/70">Combined funds overview</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-[#1f1a14]/60 mr-2" />
                    <span className="text-4xl font-bold text-[#1f1a14]">
                        {totalBalance.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Balance Overview Cards */}
            <div className='flex flex-col lg:flex-row gap-6'>
                {/* Cash Balance Card */}
                <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-6 flex-1 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200'>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="bg-[#1f1a14] p-3 rounded-lg mr-3">
                                <Wallet className="h-6 w-6 text-[#fff7e4]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#1f1a14]">Cash Balance</h2>
                                <p className="text-sm text-[#1f1a14]/60">Physical money & cash</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center">
                            <DollarSign className="h-5 w-5 text-[#1f1a14]/60 mr-1" />
                            <span className="text-sm text-[#1f1a14]/60 font-medium">Available Amount</span>
                        </div>
                        <p className="text-3xl font-bold text-[#1f1a14] mt-1">
                            {OfflineBalance.toLocaleString()}
                        </p>
                    </div>

                    <div className="mb-4">
                        <div className="w-full bg-[#1f1a14]/20 rounded-full h-2">
                            <div 
                                className="bg-[#1f1a14] h-2 rounded-full transition-all duration-300" 
                                style={{ width: totalBalance > 0 ? `${(OfflineBalance / totalBalance) * 100}%` : '0%' }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-[#1f1a14]/60 mt-1">
                            <span>Cash portion</span>
                            <span>{totalBalance > 0 ? Math.round((OfflineBalance / totalBalance) * 100) : 0}%</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => setOfflineModel(true)}
                        className='w-full flex items-center justify-center gap-2 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] py-3 px-4 rounded-lg font-semibold hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors duration-200 shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px]'
                    >
                        <Plus className="h-5 w-5" />
                        Manage Cash
                    </button>
                </div>

                {/* Digital Balance Summary Card */}
                <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] p-6 flex-1 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200'>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="bg-[#1f1a14] p-3 rounded-lg mr-3">
                                <CreditCard className="h-6 w-6 text-[#fff7e4]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#1f1a14]">Digital Balance</h2>
                                <p className="text-sm text-[#1f1a14]/60">{digitalAccounts.length} accounts</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center">
                            <DollarSign className="h-5 w-5 text-[#1f1a14]/60 mr-1" />
                            <span className="text-sm text-[#1f1a14]/60 font-medium">Total Digital Amount</span>
                        </div>
                        <p className="text-3xl font-bold text-[#1f1a14] mt-1">
                            {totalDigitalBalance.toLocaleString()}
                        </p>
                    </div>

                    <div className="mb-4">
                        <div className="w-full bg-[#1f1a14]/20 rounded-full h-2">
                            <div 
                                className="bg-[#1f1a14] h-2 rounded-full transition-all duration-300" 
                                style={{ width: totalBalance > 0 ? `${(totalDigitalBalance / totalBalance) * 100}%` : '0%' }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-[#1f1a14]/60 mt-1">
                            <span>Digital portion</span>
                            <span>{totalBalance > 0 ? Math.round((totalDigitalBalance / totalBalance) * 100) : 0}%</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => setAddAccountModel(true)}
                        className='w-full flex items-center justify-center gap-2 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] py-3 px-4 rounded-lg font-semibold hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors duration-200 shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px]'
                    >
                        <Plus className="h-5 w-5" />
                        Add Account
                    </button>
                </div>
            </div>

            {/* Digital Accounts Section */}
            {digitalAccounts.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-[#1f1a14] mb-4">Digital Accounts</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
                        {digitalAccounts.map((account) => (
                            <AccountCard
                                key={account.id}
                                account={account}
                                onUpdate={handleUpdateAccount}
                                onRemove={handleRemoveAccount}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Modals */}
            <AddOfflineBalance 
                isModelOpen={isOfflineModel} 
                onClose={() => setOfflineModel(false)} 
                currentBalance={OfflineBalance}
            />
            <AddOnlineBalance 
                isModelOpen={isOnlineModel} 
                onClose={() => setOnlineModel(false)} 
            />
            <AddAccountModel 
                isOpen={isAddAccountModel} 
                onClose={() => setAddAccountModel(false)} 
            />
            <EditAccountModel 
                isOpen={isEditAccountModel} 
                onClose={() => {
                    setEditAccountModel(false);
                    setSelectedAccount(null);
                }} 
                account={selectedAccount}
            />
        </div>
    );
}