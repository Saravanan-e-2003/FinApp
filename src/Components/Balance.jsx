import React, { useEffect, useState } from 'react'
import { getOfflineBalance,getOnlineBalance } from '../CardinalStorage';
import AddOfflineBalance from '../Models/AddOfflineBalance'

export default function Balance(){
    const[OnlineBalance, AddOnlineBalanceVal] = useState(0);
    const[OfflineBalance,AddOfflineBalanceVal] = useState(0);
    const[isOnlineModel,setOnlineModel] = useState(false);
    const[isOfflineModel,setOfflineModel] = useState(false);

    useEffect(()=>{
        AddOfflineBalanceVal(getOfflineBalance());
        // AddOnlineBalanceVal(getOnlineBalance());
    },[isOfflineModel])
    return(
        <div>
            <div className='border'>
                <h2>Offline Balance</h2>
                <p>{OfflineBalance}</p>
                <button onClick={() =>{
                    setOfflineModel(!isOfflineModel);
                }}
                className='border bg-indigo-900 text-amber-50'
                >Add+</button>
            </div>

            <AddOfflineBalance isModelOpen = {isOfflineModel} onClose={()=>{
                setOfflineModel(!isOfflineModel);
            }} />

            <div className='border'>
                <h2>Online Balance</h2>
                <p>{OnlineBalance}</p>
                <button onClick={()=>{
                    setOfflineModel(true);
                }}>Add+</button>
            </div>
        </div>
    );
}