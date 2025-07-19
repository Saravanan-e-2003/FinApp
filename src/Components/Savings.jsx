import React, { useEffect, useState } from 'react'
import AddSavingsModel from '../Models/AddSavingsModel';
import SavingsCard from './SavingsCard';
import { getSavingsData,getTotalSavingsAmount } from '../CardinalStorage';
import RemoveSavingsCardModel from '../Models/RemoveSavingsCardModel';
import UpdateSavingsCardModel from '../Models/UpdateSavingsModel';

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
        <div className='align-center justify-center'>
            <div className='border m-5 w-[calc(100%-60px)] '>
                <h1>Savings</h1>
                <h2>{TotalSavings}</h2>
                <button onClick={
                    () =>{
                        setSavingsModel(true);
                    }
                }>Add</button>
            </div>
            <AddSavingsModel isOpen={isSavingsModelOpen} onClose={()=>setSavingsModel(false)} />
            
            <div className='cardsBlock w-full h-[24rem] flex flex-wrap gap-5 m-5 overflow-y-auto min-h-0'>
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