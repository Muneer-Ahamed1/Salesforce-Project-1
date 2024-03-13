import { useDispatch, useSelector } from "react-redux";
import {accountUpdateByIdSlice,fetchRecordByIdSlice} from "../features/Account/AccountSlice";
import AccountInfoRecord from "../pages/AccountInfoRecord";
import AccountInfoUpdate from "../pages/AccountInfoUpdate";

import { useEffect, useState } from "react";
import removeNullValues from "../../utils/RemovingNullValues";

export default function UpdateAccountModal({id,setEditAccountId}) {
    const dispatch=useDispatch();

    const {fetchByIdAccountRecord,accountData }=useSelector((state)=>state.account);
    let accountDataById={...fetchByIdAccountRecord.data};

    console.log(fetchByIdAccountRecord);

    const updateAccountAdded=(AccountData)=>{
      console.log(AccountData)
      if(Object.keys(AccountData).length>0) {
         dispatch(accountUpdateByIdSlice({id:id,data:AccountData}));
      }
      else{
      alert("Please fill Something");
    }
  }
    
    
  

    return (
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 max-w-4xl bg-white  min-h-[70vh] ">
          <h3 className="font-bold text-lg pb-2">New Account</h3>
          <hr />
          {
            (fetchByIdAccountRecord.status==true)?
         <AccountInfoUpdate data={fetchByIdAccountRecord.data}
         accountData={accountData}
         updateAccountAdded={updateAccountAdded}
         />:<h1>Loading</h1>
          }
  
        
        </div>
      </dialog>
    )
  
  }