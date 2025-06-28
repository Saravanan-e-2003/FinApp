import React, { useEffect, useState } from 'react'
import AddSavingsModel from '../Models/AddSavingsModel';
import SavingsCard from './SavingsCard';
import { getSavingsData,getTotalSavingsAmount } from '../CardinalStorage';
import RemoveSavingsCardModel from '../Models/RemoveSavingsCardModel';

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
        <div>
            <div className='border w-dvh'>
                <h1>Savings</h1>
                <h2>{TotalSavings}</h2>
                <button onClick={
                    () =>{
                        setSavingsModel(true);
                    }
                }>Add</button>
            </div>
            <AddSavingsModel isOpen={isSavingsModelOpen} onClose={()=>setSavingsModel(false)} />

            <div className='cardsBlock border-2 w-full h-1/2'>
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
        </div>
    )
}