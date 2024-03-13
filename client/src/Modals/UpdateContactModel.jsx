import { useDispatch, useSelector } from "react-redux";
import ContactInfoRecordUpdate from "../pages/ContactInfoRecordUpdate";
import { useEffect, useState } from "react";
import { ContactByIdSlice, updateContactByIdSlice } from "../features/Contact/ContactSlice";

export default function UpdateContactModel({ setEditById, editById }) {
  const dispatch = useDispatch();
  const { contactDataById } = useSelector((state) => state.contact);
  const { accountData } = useSelector((state) => state.account);




  useEffect(() => {
    console.log(editById)
    if (!contactDataById.data && editById) {
      dispatch(ContactByIdSlice(editById));
    }
    console.log(editById)
  }, [editById])
  function updateContact(data,id) {
    let editData = {
      data,
      id: id
    }
    console.log("EDIT ASDSKJFKJFJK");
    console.log(editData)
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
        /> : <h1>Loading</h1>}



      </div>
    </dialog>
  )

}






