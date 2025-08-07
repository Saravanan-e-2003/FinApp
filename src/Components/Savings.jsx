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

    useEffect(()=>{
        setSavingsData(getSavingsData());
        setTotalSavings(getTotalSavingsAmount());
    },[isSavingsModelOpen,isRemoveModel,isUpdateModel])

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
            <div className='bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] w-[calc(100%-20px)] 
            md:w-[calc(100%-50px)] mx-auto p-6 m-4 md:m-6 flex-shrink-0'>
                <div className='flex items-center justify-between'>
                    <div className="flex items-center">
                        <div className="bg-[#1f1a14] p-3 rounded-lg mr-4">
                            <CopyPlus className="h-6 w-6 text-[#fff7e4]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#1f1a14] mb-1">Savings Goals</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-[#1f1a14]/70">Total Saved:</span>
                                <h2 className="text-xl font-semibold text-green-600">${TotalSavings.toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                    <button 
                        className='bg-[#1f1a14] text-[#fff7e4] px-4 py-3 rounded-lg font-bold border-2 border-[#1f1a14] shadow-[4px_4px_0_#1f1a14] hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex items-center gap-2'
                        onClick={() => setSavingsModel(true)}
                    >
                        <CopyPlus className="h-5 w-5" />
                        <span className="hidden sm:inline">Add Goal</span>
                        <span className="sm:hidden">+</span>
                    </button>
                </div>
            </div>
            <AddSavingsModel isOpen={isSavingsModelOpen} onClose={()=>setSavingsModel(false)} />
            
            <div className='cardsBlock flex-1 w-full flex flex-wrap gap-5 p-5 overflow-y-auto overflow-x-hidden min-h-0'>
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