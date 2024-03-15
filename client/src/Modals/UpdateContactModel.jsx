import { useDispatch, useSelector } from "react-redux";
import ContactInfoRecordUpdate from "../pages/ContactInfoRecordUpdate";
import { useEffect, useState } from "react";
import { ContactByIdSlice, updateContactByIdSlice } from "../features/Contact/ContactSlice";
import OwnerShip from "../features/Account/component/OwnerShip";
import OwnerShipById from "../features/Account/component/OwnerShipById";
import {resetData} from "../features/Contact/ContactSlice";
export default function UpdateContactModel({ setEditById, editById }) {
  const dispatch = useDispatch();
  const { contactDataById } = useSelector((state) => state.contact);
  const { accountData } = useSelector((state) => state.account);
  const{fetchOwnerShip}=OwnerShip();




  useEffect(() => {
    console.log(editById)
    if (editById) {
      dispatch(resetData());


      dispatch(ContactByIdSlice(editById));
    }
    console.log(editById)
  }, [editById])

  
  function updateContact(data,id) {
    let editData = {
      data,
      id: id
    }
    dispatch(updateContactByIdSlice(editData));


  }





  console.log(contactDataById)

  return (
    <dialog id="my_modal_15" className="modal">
      <div className="modal-box w-11/12 max-w-4xl bg-white">
        <h3 className="font-bold text-lg pb-2">New Contact</h3>
        <hr />
        {(contactDataById.data) ? <ContactInfoRecordUpdate
          data={contactDataById.data}
          accountData={accountData}
          updateContact={updateContact}
          fetchOwnerShip={fetchOwnerShip}
        /> : <h1 className=" text-center p-5 flex justify-center items-center h-[50vh]">
        <span class="loading loading-spinner text-neutral"></span>

        
       </h1>}



      </div>
    </dialog>
  )

}






