import React, { useState } from 'react'
import { fetchContactByIdSlice } from "../../Contact/ContactSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import DeleteContactModel from "../../../Modals/DeleteContactModal"
import UpdateContactModel from "../../../Modals/UpdateContactModel"
import NewContactModel from "../../../Modals/CreateContactModel";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function AccountRelated({ accountID,accountData}) {
  let contactArr;
  const dispatch = useDispatch();
  const { contactData, deleteContact, updateContactById} = useSelector((state) => state.contact);
  const [deleteById, setDeleteById] = useState(null);
  const[editById,setEditById]=useState(null);
  console.log(accountID)

  useEffect(() => {
    console.log(accountID);
    if (deleteContact.status || accountID || updateContactById.status) {

      dispatch(fetchContactByIdSlice(accountID));
    }

  }, [accountID, deleteContact.status,updateContactById.status])

  if (contactData.data) {

    contactArr = contactData.data.records;

  }
  console.log(contactArr);

  return (
    <div className="Contacts bg-gray-100 rounded-sm p-3 ">
      <ToastContainer/>

      <div className="contact-wrapper">
        <div className="wrapper-1 flex items-center justify-between mb-4">
          <div className="part-1 font-bold text-xl underline">
            Contacts
          </div>
          <UpdateContactModel
      editById={editById}
      setEditById={setEditById}
      />
          <div>
            <button className=' btn bg-green-600 rounded-md text-white btn-sm hover:bg-green-400 border-0'
              onClick={() => document.getElementById('my_modal_22').showModal()
              
              }
            >create</button>
          </div>
        </div>
        <div className="part-2">

          {
            (contactData.data) ? (
              <div className={` contact ${contactData.data.totalSize>0?'grid lg:grid-cols-3 gap-2 md:grid-cols-2':"h-[10vh]"} p-2`}>{
                (contactData.data.totalSize > 0) ? (
                  contactArr && contactArr.map((vl) => {
                    const { Id, Name, Email, Phone } = vl;
                    return (
                      <>
                      <Card
                        key={Id}
                        Id={Id}
                        Name={Name}
                        Email={Email}
                        Phone={Phone}
                        setDeleteById={setDeleteById}
                        deleteById={deleteById}
                        editById={editById}
                        setEditById={setEditById}
                      />
                      
                      </>
                    )

                  })
                ) :
                  (
                    <h1 className=' text-center font-bold'>Empty</h1>
                  )
              }
              </div>
            ) : <h1 className=' text-center font-bold text-xl'>Loading</h1>
          }
        </div>
        {(contactData.data) ? <div className=' part-3 bg-slate-100 text-center p-1 '>
          <Link className=' text-blue-600 hover:text-blue-400 underline font-bold' to={`/contact/getAllContactBy/${accountID}`}>view</Link>
        </div> : ""}

      </div>
      <DeleteContactModel
        deleteById={deleteById}
      />
      <NewContactModel
      />
    
    
    

    </div>
  )
}

export function Card({ Id, Name, Email, Phone, setDeleteById, deleteById,setEditById,editById }) {
  return (
    <div className="card p-3 my-2">
      <div className="div flex justify-between p-2 items-center">
        <p>{Name}</p>
        <div class="btn-group">
          <button type="button" class=" text-white btn btn-sm rounded-sm bg-slate-700 hover:bg-slate-500" data-bs-toggle="dropdown" aria-expanded="false">
            option
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#"
              onClick={() => {
                setEditById(Id);
                document.getElementById('my_modal_15').showModal()

              }}

            >Edit </a></li>
            <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal"
              onClick={
                () => {
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

export function AccountDiv({fetchByIdAccountRecord}) {
  return (
    <div className="AccountDiv my-3">
      <div className="wrapper-1 flex gap-2 justify-between">

        <div className="div">
          <p>Account</p>
          <p>{fetchByIdAccountRecord?.data?.Name}</p>
        </div>
        {/* <div className="newContact">
          <button className=' btn btn-sm bg-slate-800 rounded-md text-white hover:bg-slate-500'>New Contact</button>
        </div> */}
      </div>
      <div className="wrapper-2 grid grid-cols-4 gap-2 mt-2">
        <div>
          <p>Type</p>
          <p>{fetchByIdAccountRecord?.data?.Type || ""}</p>
        </div>
        <div>
          <p>Phone</p>
          <p>{fetchByIdAccountRecord?.data?.Phone || ""}</p>
        </div>
        <div>
          <p>Website</p>
          <p>{fetchByIdAccountRecord?.data?.Website || ""}</p>
        </div>
        <div>
          <p>Account Owner</p>
          <p>{fetchByIdAccountRecord?.data?.Phone || ""}</p>
        </div>
      </div>



    </div>
  )
}

export default AccountRelated