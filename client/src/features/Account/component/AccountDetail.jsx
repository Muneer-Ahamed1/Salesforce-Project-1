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

    useEffect(() => {
      if (accountID) {
        dispatch(fetchRecordByIdSlice(accountID));
      }
  
      // Set the dark mode theme to "dark" in localStorage
      localStorage.setItem("data-theme", "dark");
  
      // Remove any existing class from html before applying 'dark' class
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
  
      return () => {
        // Clean-up function
      };
    }, [accountID, dispatch]);
  
  
  
  
    const {fetchOwnerShip}=OwnerShip();


if(fetchByIdAccountRecord.loading) {
    return <Loading/>
}


  return (
    <div className="Account-Detail ">
        <div className="wrapper">
            <div className="account-btn flex justify-end pr-2 m-2">
            <button className='bg-green-600 hover:bg-green-400 px-3 py-1 rounded text-white flex items-center'
                            onClick={()=>{setEditStatus(!editStatus)}}

            >
  {editStatus ? (
    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
    </svg>
  )}
  {editStatus ? "Disable" : "Enable"}
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