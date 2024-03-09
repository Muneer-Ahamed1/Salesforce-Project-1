import { useDispatch } from "react-redux";
import {createRecordApiSlice} from "../features/Account/AccountSlice";
import AccountInfoRecord from "../pages/AccountInfoRecord";
import { useState } from "react";

export default function NewAccountModel() {
    const dispatch=useDispatch();
    console.log("dfdf");
    const newAccountAdded=()=>{
      if(Object.keys(AccountData).length>0) {
        return dispatch(createRecordApiSlice(AccountData));
        
      }
      alert("Please fill Something");
    }
    
    const [AccountData,setAccountData]=useState({});
    return (
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-4xl bg-white  min-h-[70vh] ">
          <h3 className="font-bold text-lg pb-2">New Account</h3>
          <hr />
         <AccountInfoRecord AccountData={AccountData}
         setAccountData={setAccountData}
         />
  
          <div className="modal-action border-t-2 p-2 flex">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn bg-primary text-white border-0">Close</button>
            </form>
            <div onClick={(e)=>e.stopPropagation()}>
              <button className="btn bg-success text-white border-0 " onClick={()=>newAccountAdded()}>Save</button>
  
              </div>
          </div>
        </div>
      </dialog>
    )
  
  }