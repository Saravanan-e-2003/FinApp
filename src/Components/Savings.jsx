import React, { useEffect, useState } from 'react'
import AddSavingsModel from '../Models/AddSavingsModel';
import SavingsCard from './SavingsCard';
import { getSavingsData,getTotalSavingsAmount } from '../CardinalStorage';
import RemoveSavingsCardModel from '../Models/RemoveSavingsCardModel';
import UpdateSavingsCardModel from '../Models/UpdateSavingsModel';
import { CopyPlus } from 'lucide-react';


export default function Savings(){
    const[isSavingsModelOpen,setSavingsModel] = useState(false);
    const[SavingsData,setSavingsData] = useState([]);
    const[TotalSavings,setTotalSavings] = useState(0);
    const[isRemoveModel,setRemoveModel] = useState(false);
    const[isUpdateModel,setUpdateModel] = useState(false);
    const[index,setIndex] = useState(0);

    useEffect(() => {
        const loadSavingsData = async () => {
            try {
                const data = await getSavingsData();
                setSavingsData(Array.isArray(data) ? data : []);
                const total = await getTotalSavingsAmount();
                setTotalSavings(total);
            } catch (error) {
                console.error('Error loading savings data:', error);
                setSavingsData([]);
                setTotalSavings(0);
            }
        };
        loadSavingsData();
    }, [isSavingsModelOpen, isRemoveModel, isUpdateModel])

    function handleRemove(index){
        console.log("rmove....")
        setRemoveModel(true);
        setIndex(index)
    }

    function handleUpdate(index){
        setUpdateModel(true);
        setIndex(index)
    }



    return (
        <div className='h-full flex flex-col'>
            <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-[calc(100%-16px)] 
            md:w-[calc(100%-50px)] mx-auto p-4 md:p-6 m-2 md:m-6 flex-shrink-0'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                    <div className="flex items-center w-full sm:w-auto">
                        <div className="bg-[#1f1a14] p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                            <CopyPlus className="h-5 w-5 md:h-6 md:w-6 text-[#fff7e4]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-lg md:text-2xl font-bold text-[#1f1a14] mb-1">Savings Goals</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="text-xs md:text-sm text-[#1f1a14]/70">Total Saved:</span>
                                <h2 className="text-lg md:text-xl font-semibold text-green-600">${TotalSavings.toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                    <button 
                        className='bg-[#1f1a14] text-[#fff7e4] px-3 md:px-4 py-2 md:py-3 rounded-lg font-bold border-2 border-[#1f1a14] shadow-[4px_4px_0_#1f1a14] hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center flex-shrink-0'
                        onClick={() => setSavingsModel(true)}
                    >
                        <CopyPlus className="h-4 w-4 md:h-5 md:w-5" />
                        <span className="hidden sm:inline">Add Goal</span>
                        <span className="sm:hidden">Add Goal</span>
                    </button>
                </div>
            </div>
            <AddSavingsModel isOpen={isSavingsModelOpen} onClose={()=>setSavingsModel(false)} />
            
            <div className='cardsBlock flex-1 w-full flex flex-wrap gap-3 md:gap-5 p-3 md:p-5 overflow-y-auto overflow-x-hidden min-h-0'>
                {SavingsData.map((obj,index)=>{
                    return <SavingsCard 
                        key={index} 
                        name={obj.name} 
                        amount={obj.amount} 
                        totalSavings={TotalSavings}
                        onRemove={()=>{handleRemove(index)}} 
                        onUpdate={()=>{handleUpdate(index)}}
                        />
                })}
            </div>
            <RemoveSavingsCardModel id={index} isOpen={isRemoveModel} onClose={()=>setRemoveModel(false)}/>
            <UpdateSavingsCardModel id={index} isOpen={isUpdateModel} onClose={()=>setUpdateModel(false)} />
        </div>
    )
}