import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import AccountDetailPage from './AccountDetailPage';
import AccountRelatedPage from './AccountRelatedPage';
import { AccountDiv } from '../features/Account/component/AccountRelated';
import {fetchContactByIdSlice} from "../features/Contact/ContactSlice";
import {fetchAllAccountRecordsSlice,fetchRecordByIdSlice} from "../features/Account/AccountSlice";
function AccountById() {
    const accountID=useParams().id;
    const{accountData,fetchByIdAccountRecord}=useSelector((state)=>state.account);
    const dispatch=useDispatch();
    console.log(accountID);
     const[navigateAcc,setNavigateAcc]=useState(false);
     useEffect(()=>{
        if(!accountData){
            dispatch(fetchAllAccountRecordsSlice());
        }
        if(!fetchByIdAccountRecord.data || fetchByIdAccountRecord.data.Id!==accountID){
            dispatch(fetchRecordByIdSlice(accountID))
        }
        console.log("ACCCC");

    },[accountData,fetchByIdAccountRecord.data,accountID])
    console.log(accountData);
      console.log(fetchByIdAccountRecord)

     
if(!fetchByIdAccountRecord.data && !accountData) {
    return <h1>Loading</h1>

}

  return (
    <div className="container bg-slate-50 min-h-[90vh] p-4 rounded my-2">
             <AccountDiv
             fetchByIdAccountRecord={fetchByIdAccountRecord}
             />

        <div className='wrapper'> 
            <nav className=' flex gap-2 bg-slate-100 md: p-3 p-1 sm: p-2 rounded  '>
                <a  onClick={()=>setNavigateAcc(false)} className={` hover:text-blue-700 ${(!navigateAcc)?"text-blue-500 underline font-bold":""} font-medium	`}>Related</a>
                <a onClick={()=>setNavigateAcc(true)} className={` hover:text-blue-700 ${(navigateAcc)?"text-blue-500 underline font-bold":""} font-medium`}>Details</a>
            </nav>
            <div className="wrapper-data p-2">
            {
                (navigateAcc)?<AccountDetailPage 
                accountID={accountID}
                accountData={accountData}
                fetchByIdAccountRecord={fetchByIdAccountRecord}

                />:<AccountRelatedPage
                accountID={accountID}
                accountData={accountData}
                fetchByIdAccountRecord={fetchByIdAccountRecord}
                />
            }
            </div>
           
        </div>
    </div>
  )
}

export default AccountById