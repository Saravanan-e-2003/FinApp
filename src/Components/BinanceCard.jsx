import { Link2, Wallet, RefreshCw, Trash2, ExternalLink } from "lucide-react";

export default function BinanceCard({ name, amount, totalSavings }) {
    // totalInr is passed as 'amount', and totalSavings is the user's total net worth
    const portfolioPercentage = totalSavings > 0
        ? Math.round((amount / totalSavings) * 100)
        : 0;

    return (
        <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] p-4 hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200'>

            {/* Header: Binance Branding */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="bg-[#F3BA2F] p-2 rounded-lg mr-3 border-2 border-[#1f1a14]">
                        <img
                            src="/binance.png"
                            alt="Binance"
                            className="h-5 w-5 md:h-6 md:w-6 object-contain"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-[#1f1a14] uppercase tracking-tight">
                            {name}
                        </h3>

                    </div>
                </div>
                {/* <div className="text-[#1f1a14]/30">
                    <span className="text-[10px] bg-[#1f1a14] text-[#fff7e4] px-1.5 py-0.5 rounded font-bold uppercase">
                        Connected
                    </span>
                </div> */}
            </div>

            {/* Content: Total INR (passed as amount) */}
            <div className="mb-5 bg-[#1f1a14]/5 p-3 rounded-md border border-dashed border-[#1f1a14]/20">
                <div className="flex items-center mb-1">
                    <Wallet className="h-3.5 w-3.5 text-[#1f1a14]/60 mr-1" />
                    <span className="text-xs text-[#1f1a14]/60 font-bold uppercase tracking-wider">Balance Overview</span>
                </div>
                <p className="text-3xl font-black text-[#1f1a14]">
                    ₹{amount?.toLocaleString('en-IN') || '0'}
                </p>
            </div>

            {/* Portfolio Dominance Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-bold text-[#1f1a14]/70 uppercase">Portfolio Allocation</span>
                    <span className="text-xs text-[#1f1a14] font-black">{portfolioPercentage}%</span>
                </div>
                <div className="w-full bg-[#1f1a14]/20 rounded-full h-2">
                    <div
                        className="bg-[#1f1a14] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(portfolioPercentage, 100)}%` }}
                    ></div>
                </div>
                <div className="mt-1 text-xs text-[#1f1a14]/50">
                    ${amount?.toLocaleString() || '0'} of ${totalSavings?.toLocaleString() || '0'} total
                </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex gap-2">
                <button 
                    onClick={onUpdate}
                    className='flex-1 flex items-center justify-center gap-2 bg-[#1f1a14] text-[#fff7e4] py-2 px-3 rounded shadow-[2px_2px_0_#F3BA2F] font-bold hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100 text-xs uppercase'
                >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Sync
                </button>
                <button 
                    onClick={onRemove}
                    className='flex-1 flex items-center justify-center gap-2 bg-white text-red-600 border-2 border-red-600 py-2 px-3 rounded font-bold hover:bg-red-50 transition-colors duration-200 text-xs uppercase'
                >
                    <Trash2 className="h-3.5 w-3.5" />
                    Disconnect
                </button> */}
            {/* </div> */}
        </div>
    );
}