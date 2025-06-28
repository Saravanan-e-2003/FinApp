import React,{useEffect, useState} from 'react'
import AddExpenseModel from "../Models/AddExpenseModel";
import { getTotalBalance } from '../CardinalStorage';

export default function Overview(){
    const [totalSpent,setTotalSpent] = useState(0);
    const [isModelOpen, SetIsModelOpen] = useState(false);
    const [TotalBalance,setTotalBalance] = useState(0);

  function saveTotalSpent(spentAmount) {
    const prevAmount = parseInt(localStorage.getItem("totalSpent")) || 0;
    const amount = parseInt(spentAmount) || 0;
    const total = prevAmount + amount;

    localStorage.setItem("totalSpent", total);
    setTotalSpent(total);
    setTotalBalance(getTotalBalance());
  }

    useEffect(()=>{
      setTotalBalance(getTotalBalance());
      setTotalSpent(parseInt(localStorage.getItem("totalSpent")) || 0);
    },[])

    return(
        <div className='bg-amber-50 '>
          <div className='h-44 border m-6'>
            <h2>Graph</h2>
          </div>

          <div className='flex gap-5'>
            <div className='addExpenseBox border  m-6 w-1/2 p-4'>
              <h2 className='p-0 m-0'>Add expense</h2>
              <h2>{totalSpent}</h2>
              <button onClick={() =>{ SetIsModelOpen(!isModelOpen);}}>Add+</button>
            </div>
            <AddExpenseModel
              isOpen={isModelOpen}
              onClose={() => {
              SetIsModelOpen(false);
              }}
              saveTotalSpent={saveTotalSpent}
            />
            <div className='availableAmountBox border p-4 m-6 w-1/2'>
              <h2>Avialable</h2>
              <p>{TotalBalance}</p>
            </div>
          </div>
        </div>
    )
}