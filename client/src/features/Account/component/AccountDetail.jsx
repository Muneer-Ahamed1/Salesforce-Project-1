import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {fetchRecordByIdSlice} from "../AccountSlice"
import { useEffect,useState } from 'react';
import UneditedRecord from "./UneditedRecord";
import EditedRecord from "./EditedRecord";

function AccountDetail({accountID}) {
    const dispatch=useDispatch();
    const {fetchByIdAccountRecord}=useSelector((state)=>state.account);
    const[editStatus,setEditStatus]=useState(true);

    console.log(editStatus);
    useEffect(()=>{
        dispatch(fetchRecordByIdSlice(accountID));
    },[accountID]);

console.log(fetchByIdAccountRecord);
if(fetchByIdAccountRecord.loading) {
    return <h1>Loading</h1>
}

  return (
    <div className="Account-Detail bg-white">
        <div className="wrapper">
            <div className="account-btn flex justify-end pr-2 m-2">
                <button className=' bg-green-600 hover:bg-green-400 px-3 py-1 rounded text-white'
                onClick={()=>{setEditStatus(!editStatus)}}
                >
                    {
                        (editStatus)?"Enable":"Disable"
                    }
                    
                </button>
            </div>

<div className="account-body">
        {
            (editStatus && fetchByIdAccountRecord.data)?<UneditedRecord/>:<EditedRecord
            fetchByIdAccountRecord={fetchByIdAccountRecord}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            />
        }
        </div>
        </div>

    </div>
  )
}

export default AccountDetail