import { X } from 'lucide-react';
import { GenerateAPIKey,GetAPIKey } from '../CardinalStorage'
import { useEffect, useState } from 'react';

const GenerateAPIKeyModel = ({isOpen, onClose}) => {
    const [AuthToken,setAuthToken] = useState("");
    const [Loading,setLoading] = useState(true);

    useEffect(() =>{
        const checkKeyExists = async() =>{
            try{
                const res = await GetAPIKey();
                const authToken = res?.data?.AuthKey || res?.AuthKey;
                console.log(authToken);
                if(authToken){
                    setAuthToken(authToken);
                }
            }catch(error){
                console.log(error);
                console.log("No existing key found or unauthorized");
            }finally{
                setLoading(false);
            }
        }
        checkKeyExists();
    },[])

    if(!isOpen){
        return null;
    }
    
    const GetOrGenerateAPIKey = async ()=>{
        const res = await GenerateAPIKey();
        const authToken = res?.data?.AuthKey || res?.AuthKey;
        setAuthToken(authToken);
    }

    if(Loading) return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-[#1f1a14]">Checking status...</h3>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-[#1f1a14]">Generate API Key</h3>
                        <button
                            onClick={() => onClose()}
                            className="text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] p-2 rounded-lg transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#1f1a14] mb-2">
                                API Key
                            </label>
                            <input
                                value={AuthToken}
                                // onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                className={`w-full px-3 py-2 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20
                                    }`}
                                placeholder="No API Key Generated"
                                disabled={true}
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => onClose()}
                                className="flex-1 px-4 py-2 bg-[#fff7e4] text-[#1f1a14] border-2 border-[#1f1a14] rounded-lg font-medium hover:bg-[#1f1a14] hover:text-[#fff7e4] transition-colors"
                            >
                                Cancel
                            </button>
                            {AuthToken?(
                                <button
                                    onClick={()=> navigator.clipboard.writeText(AuthToken)}
                                    className="flex-1 px-4 py-2 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] rounded-lg font-medium hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px]"
                                >
                                    Copy
                                </button>
                            ):(
                                <button
                                    onClick={GetOrGenerateAPIKey}
                                    className="flex-1 px-4 py-2 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] rounded-lg font-medium hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px]"
                                >
                                    Generate
                                </button>
                            )}
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenerateAPIKeyModel;