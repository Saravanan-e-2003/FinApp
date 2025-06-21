import React,{useState} from 'react'
import AddExpenseModel from "../Models/AddExpenseModel";

export default function Overview(){
    const [isModelOpen, SetIsModelOpen] = useState(false);
    return(
        <div className='bg-amber-50 '>
          <div className='h-44 border m-6'>
            <h2>Graph</h2>
          </div>

          <div className='flex gap-5'>
            <div className='addExpenseBox border p-16 m-6 w-1/2'>
              <h2>Add expense</h2>
              <button onClick={() =>{ SetIsModelOpen(!isModelOpen); console.log(isModelOpen)}}>Add+</button>
            </div>
            <AddExpenseModel
              isOpen={isModelOpen}
              onClose={() => {
              SetIsModelOpen(false);
              }}
            />
            <div className='availableAmountBox border p-16 m-6 w-1/2'>
              <h2>Avialable</h2>
            </div>
          </div>
        </div>
    )
}