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
        <div className=''>
            <div className='border shadow-[4px_4px_0_#1f1a14] rounded w-[calc(100%-20px)] 
            md:w-[calc(100%-50px)] mx-auto p-4 m-4 md:m-6 flex gap-2 justify-between'>
                <div>
                    <h1>Savings</h1>
                    <h2>{TotalSavings}</h2>
                </div>
                <div className='flex'>
                    <button className='bg-[#1f1a14] text-5xl md:text-5xl text-[#fff7e4] rounded w-10 h-10 md:w-15 md:h-15  flex items-center justify-center' onClick={
                    () =>{
                        setSavingsModel(true);
                    }
                }>+</button>
                </div>
                
            </div>
            <AddSavingsModel isOpen={isSavingsModelOpen} onClose={()=>setSavingsModel(false)} />
            
            <div className='cardsBlock w-full h-[24rem] flex flex-wrap gap-5 m-5 mx-auto md:ml-3 overflow-y-auto min-h-0'>
                {SavingsData.map((obj,index)=>{
                    return <SavingsCard 
                        key={index} 
                        name={obj.name} 
                        amount={obj.amount} 
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