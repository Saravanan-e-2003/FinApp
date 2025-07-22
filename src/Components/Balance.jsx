import React, { useEffect, useState } from 'react'
import { getOfflineBalance,getOnlineBalance } from '../CardinalStorage';
import AddOfflineBalance from '../Models/AddOfflineBalance'
import AddOnlineBalance from '../Models/AddOnlineBalance'

export default function Balance(){
    const[OnlineBalance, AddOnlineBalanceVal] = useState(0);
    const[OfflineBalance,AddOfflineBalanceVal] = useState(0);
    const[isOnlineModel,setOnlineModel] = useState(false);
    const[isOfflineModel,setOfflineModel] = useState(false);

    useEffect(()=>{
        AddOfflineBalanceVal(getOfflineBalance());
        AddOnlineBalanceVal(getOnlineBalance());
    },[isOfflineModel,isOnlineModel])

    return(
        <div className='flex flex-col gap-1 md:gap-2 md:flex-row'>
            <div className='border shadow-[4px_4px_0_#1f1a14] rounded w-[calc(100%-20px)] mx-auto md:w-1/2 p-4 m-4 md:m-6'>
                <h2>Offline Balance</h2>
                <p>{OfflineBalance}</p>
                <button onClick={() =>{
                    setOfflineModel(!isOfflineModel);
                }}
                className='bg-[#1f1a14] text-[#fff7e4] p-2 rounded'
                >Add+</button>
            </div>

            <AddOfflineBalance isModelOpen = {isOfflineModel} onClose={()=>{
                setOfflineModel(!isOfflineModel);
            }} />
            <AddOnlineBalance isModelOpen = {isOnlineModel} onClose={()=>{
                setOnlineModel(!isOnlineModel);
            }} />

            <div className='border  shadow-[4px_4px_0_#1f1a14] rounded w-[calc(100%-20px)] mx-auto md:w-1/2 p-4 m-4 md:m-6'>
                <h2>Online Balance</h2>
                <p>{OnlineBalance}</p>
                <button className='bg-[#1f1a14] text-[#fff7e4] p-2 rounded' onClick={()=>{
                    setOnlineModel(true);
                }}>Add+</button>
            </div>
        </div>
    );
}