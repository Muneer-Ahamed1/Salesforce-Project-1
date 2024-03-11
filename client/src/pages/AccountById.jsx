import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import AccountDetailPage from './AccountDetailPage';
import AccountRelatedPage from './AccountRelatedPage';
import { AccountDiv } from '../features/Account/component/AccountRelated';
import {fetchContactByIdSlice} from "../features/Contact/ContactSlice";
function AccountById() {
    const accountID=useParams().id;
    const dispatch=useDispatch();
    console.log(accountID);
     const[navigateAcc,setNavigateAcc]=useState(false);

     


  return (
    <div className="container bg-slate-50 min-h-[90vh] p-4 rounded my-2">
             <AccountDiv/>

        <div className='wrapper'> 
            <nav className=' flex gap-2 bg-slate-100 md: p-3 p-1 sm: p-2 rounded  '>
                <a  onClick={()=>setNavigateAcc(false)} className={` hover:text-blue-700 ${(!navigateAcc)?"text-blue-500 underline font-bold":""} font-medium	`}>Related</a>
                <a onClick={()=>setNavigateAcc(true)} className={` hover:text-blue-700 ${(navigateAcc)?"text-blue-500 underline font-bold":""} font-medium`}>Details</a>
            </nav>
            <div className="wrapper-data p-2">
            {
                (navigateAcc)?<AccountDetailPage accountID={accountID}
                />:<AccountRelatedPage
                accountID={accountID}
                />
            }
            </div>
           
        </div>
    </div>
  )
}

export default AccountById