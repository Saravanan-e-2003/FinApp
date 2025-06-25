import React, { useEffect,useState } from 'react'
import TransactionBlock from './TransactionBlock';

export default function Transactions(){
    const [Data,setData] = useState([]);
    useEffect(()=>{
        const stored = JSON.parse(localStorage.getItem("Expenses")) || [];
        setData(stored);
        console.log(stored);
    },[])

    return(
        <div className='overflow-hidden'>
            {Data.map((obj,index) => (
                <TransactionBlock 
                    key={index} 
                    amount = {obj.amount} 
                    remark = {obj.remark} 
                    spentFrom = {obj.spentFromState}
                />
            ))}
        </div>
    )
}