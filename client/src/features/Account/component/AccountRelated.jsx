import React, { useState } from 'react'
import { fetchContactByIdSlice } from "../../Contact/ContactSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import DeleteContactModel from "../../../Modals/DeleteContactModal"
import UpdateContactModel from "../../../Modals/UpdateContactModel"
import NewContactModel from "../../../Modals/CreateContactModel";
import { MdOutlineViewInAr } from "react-icons/md";
import Loading from '../../../pages/Loading';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { MyDeleteContext } from '../../../ContextApi/DeleteContext';
  import { SlOptions } from "react-icons/sl";
  import { IoAddCircle } from "react-icons/io5";
  import { HiViewColumns } from "react-icons/hi2";


  import { useContext } from 'react';

function AccountRelated({ accountID,accountData}) {
  let contactArr;
  const dispatch = useDispatch();
  const { contactData, abcDeleteContact, updateContactById,addContactById} = useSelector((state) => state.contact);
  const [deleteById, setDeleteById] = useState(null);
  const[editById,setEditById]=useState(null);
  const { deleteContext, setDeleteContext } = useContext(MyDeleteContext);


  useEffect(() => {
    if ( accountID || updateContactById.status || addContactById.status || deleteContext) {


      dispatch(fetchContactByIdSlice(accountID));
      setDeleteContext(false);
    }

  }, [accountID,updateContactById,addContactById,deleteContext])
  // useEffect(()=>{
  //   if(contactData.data) {
  //         dispatch(fetchContactByIdSlice(accountID));
  //   }

  // },[])



  if (contactData.data) {

    contactArr = contactData.data.records;

  }

  return (
    <div className="Contacts bg-gray-100 rounded-sm p-3 min-h-[50vh]  ">
      <ToastContainer/>

      <div className="contact-wrapper">
        <div className="wrapper-1 items-center mb-4">
          <div className="part-1 font-bold text-xl underline">
            Contacts
          </div>
          <UpdateContactModel
      editById={editById}
      setEditById={setEditById}
      />
      <div className=' flex ml-2 mr-auto'>
          <div className=' ml-auto mr-4'>
            <button className='bg-green-600 rounded-md text-white px-2 py-1 hover:bg-green-400 border-0'
              onClick={() => document.getElementById('my_modal_22').showModal()
              
              }
            ><IoAddCircle className=' text-2xl'/></button>
          </div>
          {(contactData.data) ? <div className=' part-3 bg-slate-100 text-center p-1  flex items-center justify-center '>
          <Link className=' text-blue-600 hover:text-blue-400 underline font-bold' to={`/contact/getAllContactBy/${accountID}`}>
          <HiViewColumns className=' text-3xl text-slate-800'/>


          </Link>
        </div> : ""}
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
                    <h1 className=' text-center font-bold m-10'>Empty</h1>
                  )
              }
              </div>
            ) : <>
            <Loading/>

            </>
          }
        </div>
        

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
          <button type="button" class=" text-white px-2 py-1 rounded-md bg-slate-700 hover:bg-slate-500" data-bs-toggle="dropdown" aria-expanded="false">
          <SlOptions />

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
<div className={`AccountDiv my-3 dark:bg-cyan-50 bg-slate-200  p-2 rounded-md`}>
      <div className="wrapper-1 ">

        <div className="div">
          <p className=' font-bold'>Account</p>
          <p>{fetchByIdAccountRecord?.data?.Name}</p>
        </div>
        {/* <div className="newContact">
          <button className=' btn btn-sm bg-slate-800 rounded-md text-white hover:bg-slate-500'>New Contact</button>
        </div> */}
      </div>
      <div className="wrapper-2 grid md:grid-cols-4 gap-2 mt-2 grid-cols-1 sm:grid-cols-2">
        <div>
          <p className=' font-bold' >Type</p>
          <p>{fetchByIdAccountRecord?.data?.Type || ""}</p>
        </div>
        <div>
          <p className=' font-bold'>Phone</p>
          <p>{fetchByIdAccountRecord?.data?.Phone || ""}</p>
        </div>
        <div>
          <p className=' font-bold'> Website</p>
          <p>{fetchByIdAccountRecord?.data?.Website || ""}</p>
        </div>
        <div>
          <p className=' font-bold'>Account Owner</p>
          <p>{fetchByIdAccountRecord?.data?.Phone || ""}</p>
        </div>
      </div>



    </div>
  )
}

export default AccountRelated