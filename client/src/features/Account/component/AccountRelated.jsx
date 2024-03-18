import React, { useState, useEffect, useContext } from 'react';
import { fetchContactByIdSlice,resetLoading } from "../../Contact/ContactSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import DeleteContactModel from "../../../Modals/DeleteContactModal"
import UpdateContactModel from "../../../Modals/UpdateContactModel"
import NewContactModel from "../../../Modals/CreateContactModel";
import { FaTable } from "react-icons/fa";
import Loading from '../../../pages/Loading';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyDeleteContext } from '../../../ContextApi/DeleteContext';
import { SlOptions } from "react-icons/sl";
import { IoMdPersonAdd } from "react-icons/io";
import {resetDelete} from "../../Redum/DeleteSlice";

function AccountRelated({ accountID, accountData }) {
  let contactArr;
  const dispatch = useDispatch();
  const { contactData, abcDeleteContact, updateContactById, addContactById,loading,error,deleteRedum } = useSelector((state) => state.contact);
  const [deleteById, setDeleteById] = useState(null);
  const [editById, setEditById] = useState(null);
  
  const { deleteContext, setDeleteContext } = useContext(MyDeleteContext);

  useEffect(() => {
    if (   addContactById.status || updateContactById.status || deleteRedum.status) {
      console.log(addContactById);
      
      dispatch(fetchContactByIdSlice(accountID));
      

    }
  }, [ addContactById,updateContactById,deleteRedum]);
  useEffect(()=>{
    if(accountID) {
      dispatch(fetchContactByIdSlice(accountID));

    }
  },[accountID])

  if (contactData.data) {
    contactArr = contactData.data.records;
  }

  return (
    <div className="Contacts bg-slate-50  p-3 min-h-[50vh] rounded-md shadow-lg">
      <ToastContainer />

      <div className="contact-wrapper">
        <div className="wrapper-1 items-center mb-4">
          <div className="part-1 font-bold text-xl underline flex">
            <span>
            Contacts
            </span>
            
          
          </div>
          <UpdateContactModel
            editById={editById}
            setEditById={setEditById}
          />
          <div className='flex ml-2 mr-auto'>
            <div className='ml-auto mr-4'>
              <button className='bg-green-600 rounded-md text-white px-2 py-1 hover:bg-green-400 border-0'
                onClick={() => document.getElementById('my_modal_22').showModal()}
              >
                <IoMdPersonAdd className='text-2xl'/>
              </button>
            </div>
            {contactData.data &&
              <div className='part-3 bg-slate-100 text-center p-1 flex items-center justify-center'>
                <Link className='text-blue-600 hover:text-blue-400 underline font-bold' to={`/contact/getAllContactBy/${accountID}`}>
                  <FaTable className='text-3xl text-sky-800 h-[100%] w-[100%]'/>
                </Link>
              </div>
            }
          </div>
        </div>
        <div className="part-2">
          {!loading  && contactData.data ? (
            <div className={`contact ${contactData.data.totalSize > 0 ? 'grid lg:grid-cols-3 gap-2 md:grid-cols-2' : 'h-[10vh]'} p-2`}>
              {contactData.data.totalSize > 0 ? (
                contactArr && contactArr.map((vl) => {
                  const { Id, Name, Email, Phone } = vl;
                  return (
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
                  );
                })
              ) : (
                <h1 className='text-center font-bold m-10'>Empty</h1>
              )}
            </div>
          ) : (
            <Loading/>
          )}
        </div>
      </div>
      <DeleteContactModel deleteById={deleteById}/>
      <NewContactModel/>
    </div>
  );
}

export function Card({ Id, Name, Email, Phone, setDeleteById, deleteById, setEditById, editById }) {
  return (
    <div className="card p-3 my-2">
      <div className="div flex justify-between p-2 items-center">
        <p className=' font-bold'>{Name}</p>
        <div class="btn-group">
          <button type="button" class="text-white px-1 py-1 rounded-md bg-sky-700 hover:bg-sky-500" data-bs-toggle="dropdown" aria-expanded="false">
            <SlOptions />
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item hover:bg-blue-100" href="#" onClick={() => {
                setEditById(Id);
                document.getElementById('my_modal_15').showModal();
              }}>
                Edit
              </a>
            </li>
            <li>
              <a class="dropdown-item hover:bg-red-100" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                setDeleteById(Id);
                document.getElementById('my_modal_7').showModal();
              }}>
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrapper">
        <div className="title flex gap-2">
          <p className=' font-bold'> Title:</p>
          <p>{Name}</p>
        </div>
        <div className='phone flex gap-2'>
          <p className=' font-bold'>Email:</p>
          <p>{Email}</p>
        </div>
        <div className="phone flex gap-2">
          <p className=' font-bold'>Phone</p>
          <p>{Phone}</p>
        </div>
      </div>
    </div>
  );
}

export function AccountDiv({ fetchByIdAccountRecord }) {
  return (
    <div className="AccountDiv my-4 dark:bg-white bg-slate-50 p-4 rounded-lg shadow-lg">
      <div className="wrapper-1">
        <div className="div">
          <p className='font-bold text-xl sm:text-2xl md:text-2xl'>Account</p>
          <p className="text-gray-800 text-base sm:text-lg md:text-xl">{fetchByIdAccountRecord?.data?.Name}</p>
        </div>
      </div>
      <div className="wrapper-2 grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div>
          <p className='font-bold text-lg'>Type</p>
          <p className="text-gray-800 text-base">{fetchByIdAccountRecord?.data?.Type || ""}</p>
        </div>
        <div>
          <p className='font-bold text-lg'>Phone</p>
          <p className="text-gray-800 text-base">{fetchByIdAccountRecord?.data?.Phone || ""}</p>
        </div>
        <div>
          <p className='font-bold text-lg'>Website</p>
          <p className="text-gray-800 text-base">{fetchByIdAccountRecord?.data?.Website || ""}</p>
        </div>
        <div>
          <p className='font-bold text-lg'>Account Owner</p>
          <p className="text-gray-800 text-base">{fetchByIdAccountRecord?.data?.Phone || ""}</p>
        </div>
      </div>
    </div>
  );
}


export default AccountRelated;
