import React,{useEffect, useState} from 'react'
import AddExpenseModel from "../Models/AddExpenseModel";
import { getTotalBalance } from '../CardinalStorage';
import { PieChart, Pie, ResponsiveContainer } from 'recharts'

export default function Overview(){
    const [totalSpent,setTotalSpent] = useState(0);
    const [isModelOpen, SetIsModelOpen] = useState(false);
    const [TotalBalance,setTotalBalance] = useState(0);
    const [PieData,setPieData] = useState({});

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
      let data = [
        {name:"Available",value:parseInt(getTotalBalance())},
        {name: "Used", value:parseInt(localStorage.getItem("totalSpent"))}
      ]
      setPieData(data);
    },[isModelOpen])

    return(
        <div className='bg-[#fff7e4]'>
          <div className='h-44 border m-6 shadow-[4px_4px_0_#1f1a14] rounded-lg'>
            {/* <h2>Graph</h2> */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={730} height={250} >
                <Pie data={PieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#e9bc39" label={({ name }) => name}/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className='flex flex-col gap-2 md:flex-row'>
            <div className='addExpenseBox border m-6  md:w-1/2 p-4 shadow-[4px_4px_0_#1f1a14] rounded-lg'>
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
            <div className='availableAmountBox  border m-6  md:w-1/2 p-4 shadow-[4px_4px_0_#1f1a14] rounded-lg'>
              <h2>Avialable</h2>
              <p>{TotalBalance}</p>
            </div>
          </div>
        </div>
    )
}