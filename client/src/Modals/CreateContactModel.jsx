import { useDispatch, useSelector } from "react-redux";
import ContactInfoRecord from "../pages/ContactInfoRecord";
import { useState } from "react";
import {createContactByIdSlice} from "../features/Contact/ContactSlice";

export default function NewContactModel() {
    const dispatch=useDispatch();
    const {accountData}=useSelector((state)=>state.account);
    const newContactAdded=()=>{
      if(Object.keys(contactData).length==0) {
        return alert("Please fill something");
      }
      for(let key in contactData) {
        if(contactData[key].length==0) {
          delete contactData[key];
        }
      }
      console.log(contactData)
       dispatch(createContactByIdSlice(contactData));
       location.reload();
    }
    
    const [contactData,setContactData]=useState({});
    return (
      <dialog id="my_modal_22" className="modal">
        <div className="modal-box w-11/12 max-w-4xl bg-white">
          <h3 className="font-bold text-lg pb-2">New Contact</h3>
          <hr />
        
         <ContactInfoRecord
         contactData={contactData}
         setContactData={setContactData}
         accountData={accountData}
         />
  
          <div className="modal-action border-t-2 p-2 flex">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-sm rounded-md text-white border-0 bg-blue-600">Close</button>
            </form>
            <div onClick={(e)=>e.stopPropagation()}>
              <button className="btn btn-sm  bg-green-600 hover:bg-green-400 rounded-md text-white border-0 " onClick={()=>newContactAdded()}>Save</button>
  
              </div>
          </div>
        </div>
      </dialog>
    )
  
  }