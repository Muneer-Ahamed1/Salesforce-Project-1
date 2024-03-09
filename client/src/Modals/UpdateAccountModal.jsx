import { useDispatch, useSelector } from "react-redux";
import {updateAccontRecordSlice,fetchRecordByIdSlice} from "../features/Account/AccountSlice";
import AccountInfoRecord from "../pages/AccountInfoRecord";

import { useEffect, useState } from "react";
import removeNullValues from "../../utils/RemovingNullValues";

export default function UpdateAccountModal({id,setEditAccountId}) {
    const dispatch=useDispatch();

    const {fetchByIdAccountRecord }=useSelector((state)=>state.account);
    let accountDataById={...fetchByIdAccountRecord.data};
    const [AccountData,setAccountData]=useState(null);

    console.log(fetchByIdAccountRecord);
    const updateAccountAdded=(id)=>{
      if(Object.keys(AccountData).length>0) {
        return dispatch(updateAccontRecordSlice({id:id,accountData:AccountData}));
      }
      alert("Please fill Something");
    }
    useEffect(()=>{
        setAccountData(accountDataById)
    },[accountDataById])
    
  

    return (
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 max-w-4xl bg-white  min-h-[70vh] ">
          <h3 className="font-bold text-lg pb-2">New Account</h3>
          <hr />
          {
            (fetchByIdAccountRecord.status==true && AccountData!=null)?
         <AccountInfoRecord AccountData={AccountData}
         setAccountData={setAccountData}
         />:<h1>Loading</h1>
          }
  
          <div className="modal-action border-t-2 p-2 flex">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn bg-primary text-white border-0"
              onClick={()=>{
                setEditAccountId(null)
            
            }}
              >Close</button>
            </form>
            <div onClick={(e)=>e.stopPropagation()}>
              <button className="btn bg-success text-white border-0 " onClick={()=>{
                updateAccountAdded(id)
                setEditAccountId(null)
                setAccountData(null);

            
            }}>Save</button>
  
              </div>
          </div>
        </div>
      </dialog>
    )
  
  }