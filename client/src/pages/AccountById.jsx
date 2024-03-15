import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import AccountDetailPage from './AccountDetailPage';
import AccountRelatedPage from './AccountRelatedPage';
import { AccountDiv } from '../features/Account/component/AccountRelated';
import {fetchContactByIdSlice} from "../features/Contact/ContactSlice";
import {fetchAllAccountRecordsSlice,fetchRecordByIdSlice} from "../features/Account/AccountSlice";
import { RiContactsFill } from "react-icons/ri";
import { AiFillMacCommand } from "react-icons/ai";


import Loading from './Loading';
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
    return <Loading/>

}
useEffect(() => {
    if (navigateAcc) {
      // If navigateAcc is true
      if (document.documentElement.classList.contains('light')) {
        localStorage.setItem("data-theme", "dark");

        // Check if the HTML element contains the 'light' class
        document.documentElement.classList.remove('light');
      }
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', localStorage.getItem("data-theme"));
    } else {
      // If navigateAcc is false
      localStorage.setItem("data-theme", "light");
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', localStorage.getItem("data-theme"));
    }
    console.log("I AM HERE = "+navigateAcc)
  }, [navigateAcc]);

  return (
<div className={`container min-h-[90vh] sm:p-4 rounded my-2  bg-slate-100 dark:bg-cyan-50`}>
             <AccountDiv
             fetchByIdAccountRecord={fetchByIdAccountRecord}
             />

        <div className='wrapper'> 
            <nav className=' flex gap-2  md: p-3 p-1 sm: p-2 rounded  sm:ml-10 bg-slate-100 dark:bg-cyan-100 border-b-2 pb-2'>
                <a  onClick={()=>setNavigateAcc(false)} className={` hover:text-blue-700 ${(!navigateAcc)?"text-blue-500 underline font-bold":""} font-medium px-10`}>
                <RiContactsFill className=" text-2xl md:text-3xl"/>
                </a>
                <a onClick={()=>setNavigateAcc(true)} className={` hover:text-blue-700 ${(navigateAcc)?"text-blue-500 underline font-bold":""} font-medium`}>
                    <AiFillMacCommand className="text-2xl md:text-3xl"/>
                </a>
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