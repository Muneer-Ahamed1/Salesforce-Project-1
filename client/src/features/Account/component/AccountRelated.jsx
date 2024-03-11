import React, { useState } from 'react'
import {fetchContactByIdSlice} from "../../Contact/ContactSlice";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import DeleteContactModel from "../../../Modals/DeleteContactModal"


function AccountRelated({accountID}) {
  let contactArr;
  const dispatch=useDispatch();
  const {contactData,deleteContact}=useSelector((state)=>state.contact);
  const [deleteById,setDeleteById]=useState(null);
  console.log(accountID)

  useEffect(()=>{
    console.log(accountID);
    if(deleteContact.status || accountID) {

    dispatch(fetchContactByIdSlice(accountID));
    }

 },[accountID,deleteContact.status])

  if(contactData.data) {
    
      contactArr=contactData.data.records;
    
  }
  console.log(contactArr);
  
  return (
    <div className="Contacts bg-gray-300 rounded-sm p-2 ">
      <div className="contact-wrapper">
        <div className="part-1 font-semibold">
          Contacts
        </div>
        <div className='part-2 p-2'>
          {
            (contactData.data)?(
              <div className=' grid grid-cols-3 gap-2'>{
                (contactData.data.totalSize>0)?(
                  contactArr && contactArr.map((vl)=>{
                    const{Id,Name,Email,Phone}=vl;
                    return(
                      <Card
                       key={Id}
                       Id={Id}
                       Name={Name}
                       Email={Email}
                       Phone={Phone}
                       setDeleteById={setDeleteById}
                       deleteById={deleteById}
                      />
                    )

                  })
                ):
              (
                <h1>Empty</h1>
              ) 
}
              </div>
            ):<h1>Loading</h1>
          }
        </div>
        <div className=' part-3 bg-slate-100 text-center p-1 '>
          <p className=' text-blue-600 font-semibold hover:text-blue-400'>view</p>
        </div>
      </div>
      <DeleteContactModel 
      deleteById={deleteById}
      
      />

    </div>
  )
}

export function Card({Id,Name,Email,Phone,setDeleteById,deleteById}) {
  return (
    <div className="card p-2">
       <div className="div flex justify-between p-2 items-center">
      <p>{Name}</p>
      <div class="btn-group">
                  <button type="button" class="px-3 py-2 bg-slate-400 text-white rounded-md " data-bs-toggle="dropdown" aria-expanded="false">
                    opt
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" 
                   
                    >Edit </a></li>
                    <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={
                      ()=>{
                        setDeleteById(Id) 
                        document.getElementById('my_modal_7').showModal()

                      }
                    }
                     
                    >Delete </a></li>
                  </ul>
                </div>
                </div>
      <div className="wrapper">
        <div className="title flex gap-2">
          <p>Title:</p>
          <p>{Name}</p>
        </div>
        <div className='phone flex gap-2'>
          <p>Email:</p>
          <p>{Email}</p>
        </div>
        <div className="phone flex gap-2">
          <p>Phone</p>
          <p>{Phone}</p>
        </div>
      </div>
    </div>
  )
}

export function AccountDiv() {
  return (
    <div className="AccountDiv">
    <div className="wrapper-1 flex gap-2">
  
      <div className="div">
        <p>Account</p>
        <p>Sample Account for Entitlements</p>
      </div>
      <div className="newContact">
        <button className=' px-3 py-2 bg-slate-800 rounded-md text-white hover:bg-slate-500'>New Contact</button>
      </div>
      </div>
      <div className="wrapper-2 grid grid-cols-4 gap-2">
        <div>
          <p>Type</p>
          <p>hello</p>
        </div>
        <div>
          <p>Phone</p>
          <p>92990516680</p>
        </div>
        <div>
          <p>Website</p>
          <p>Website </p>
        </div>
        <div>
          <p>Account Owner</p>
          <p>Account</p>
        </div>
      </div>

      

    </div>
  )
}

export default AccountRelated