import { X } from 'lucide-react';
import { useEffect } from 'react';
import {GetExternalExpenseData} from '../CardinalStorage';
import { useState } from 'react';
import ExternalExpenseCard from '../Components/ExternalExpenseCard';


const ExternalExpenseModel = ({isOpen,onClose}) => {
    const[ExternalExpenseData,setExternalExpenseData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await GetExternalExpenseData();
            setExternalExpenseData(response.data);
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };


    useEffect(()=>{
        if(isOpen) fetchData();
    },[isOpen])

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#1f1a14]/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#1f1a14]">External Expense</h2>
                        <button
                            onClick={onClose}
                            className="text-[#1f1a14] hover:bg-[#1f1a14] hover:text-[#fff7e4] p-2 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {ExternalExpenseData.map((obj) =>{
                            return <ExternalExpenseCard 
                                    key = {obj._id}
                                    amount = {obj.amount}
                                    purpose = {obj.purpose}
                                    date = {obj.date}
                                    index = {obj.index}
                                    onRefresh={fetchData}
                                />
                        })}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ExternalExpenseModel;