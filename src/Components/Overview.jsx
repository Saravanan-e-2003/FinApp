import React,{useState} from 'react'
import AddExpenseModel from "../Models/AddExpenseModel";

export default function Overview(){
    const [isModelOpen, SetIsModelOpen] = useState(false);
    return(
        <div>
             <div>
            <h2>Graph</h2>
          </div>
          <div>
            <h2>Add expense</h2>
            <button onClick={() => SetIsModelOpen(!isModelOpen)}>Add+</button>
          </div>
          <AddExpenseModel
            isOpen={isModelOpen}
            onClose={() => {
              SetIsModelOpen(false);
            }}
          />
          <div>
            <h2>Avialable</h2>
          </div>
        </div>
    )
}