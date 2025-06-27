import React, { useEffect, useState } from 'react'
import AddSavingsModel from '../Models/AddSavingsModel';
import SavingsCard from './SavingsCard';
import { getSavingsData,getTotalSavingsAmount } from '../CardinalStorage';

export default function Savings(){
    const[isSavingsModelOpen,setSavingsModel] = useState(false);
    const[SavingsData,setSavingsData] = useState([]);
    const[TotalSavings,setTotalSavings] = useState(0);

    useEffect(()=>{
        setSavingsData(getSavingsData());
        setTotalSavings(getTotalSavingsAmount());
    },[isSavingsModelOpen])

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
                    return <SavingsCard key={index} name={obj.name} amount={obj.amount} />
                })}
            </div>
        </div>
    )
}