import React, { useEffect,useState } from 'react'
import TransactionBlock from './TransactionBlock';

export default function Transactions(){
    const [Data,setData] = useState([]);
    useEffect(()=>{
        const stored = JSON.parse(localStorage.getItem("Transactions")) || [];
        setData(stored);
        // console.log(stored);
    },[])

    return(
        <div className='overflow-scroll overflow-x-hidden h-[calc(100%-10px)]'>
            {Data.map((obj,index) => (
                <TransactionBlock 
                    key={index} 
                    TransactionData = {obj}
                />
            ))}
        </div>
    )
}