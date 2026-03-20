import { useState } from "react";
import { X, Lock, Eye, EyeOff } from "lucide-react";

const BinanceConnectivityModel = ({ isOpen,onClose }) => {
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");
    const [showSecret, setShowSecret] = useState(false);


    const save = () =>{
        console.log("saved");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        setTimeout(async () => {
            save({ apiKey, apiSecret });
            setLoading(false);
        }, 800);
    };

    if(!isOpen){return;}

    if (loading) return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[8px_8px_0_#1f1a14] w-full max-w-sm p-8 text-center">
                <div className="inline-block animate-spin mb-4 text-[#F0B90B]">
                    <Lock size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1f1a14] uppercase tracking-tighter">Encrypting & Linking...</h3>
                <p className="text-xs text-[#1f1a14]/60 mt-2 font-mono">Securing your keys in vault</p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[8px_8px_0_#1f1a14] w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="bg-[#F0B90B] border-b-2 border-[#1f1a14] p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src="/binance.png" alt="Binance" className="h-5 w-5 object-contain" />
                        <h3 className="text-lg font-bold text-[#1f1a14] uppercase tracking-tight">Connect Binance</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] p-1 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* API Key Input */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-[#1f1a14] mb-1 ml-1">
                            Binance API Key
                        </label>
                        <input
                            required
                            type="text"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-[#1f1a14] rounded-lg bg-white text-[#1f1a14] focus:outline-none focus:ring-4 focus:ring-[#F0B90B]/30 placeholder:text-[#1f1a14]/30 font-mono text-sm"
                            placeholder="Paste your API Key here"
                        />
                    </div>

                    {/* API Secret Input */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-[#1f1a14] mb-1 ml-1">
                            API Secret
                        </label>
                        <div className="relative">
                            <input
                                required
                                type={showSecret ? "text" : "password"}
                                value={apiSecret}
                                onChange={(e) => setApiSecret(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-[#1f1a14] rounded-lg bg-white text-[#1f1a14] focus:outline-none focus:ring-4 focus:ring-[#F0B90B]/30 placeholder:text-[#1f1a14]/30 font-mono text-sm"
                                placeholder="Paste your Secret Key here"
                            />
                            <button
                                type="button"
                                onClick={() => setShowSecret(!showSecret)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1f1a14]/50 hover:text-[#1f1a14]"
                            >
                                {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="bg-[#1f1a14]/5 border-l-4 border-[#F0B90B] p-3 text-[10px] md:text-xs text-[#1f1a14]/70 leading-relaxed italic">
                        Note: Please ensure your API key has <span className="font-bold text-[#1f1a14]">"Enable Reading"</span> permissions only. Do not give any other trading permissions
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-red-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-[#F0B90B] hover:text-[#1f1a14] transition-all shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                        >
                            Save Keys
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BinanceConnectivityModel;