import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {fetchRecordByIdSlice,fetchAllAccountRecordsSlice} from "../AccountSlice"
import { useEffect,useState } from 'react';
import UneditedRecord from "./UneditedRecord";
import EditedRecord from "./EditedRecord";
import OwnerShip from './OwnerShip';
import Loading from '../../../pages/Loading';

function AccountDetail({accountID,accountData,fetchByIdAccountRecord}) {
    const dispatch=useDispatch();
    const[editStatus,setEditStatus]=useState(true);

    useEffect(()=>{
        if(accountID) {

        dispatch(fetchRecordByIdSlice(accountID));
        }
       
    },[accountID]);
    const {fetchOwnerShip}=OwnerShip();


if(fetchByIdAccountRecord.loading) {
    return <Loading/>
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
            (editStatus && fetchByIdAccountRecord.data && fetchOwnerShip.data)?<UneditedRecord
            fetchOwnerShip={fetchOwnerShip}

            />:<EditedRecord
            fetchByIdAccountRecord={fetchByIdAccountRecord}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            accountID={accountID}
            fetchOwnerShip={fetchOwnerShip}
        
            />
        }
        </div>
        </div>

    </div>
  )
}

export default AccountDetail