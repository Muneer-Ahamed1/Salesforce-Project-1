import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import NewAccountModel from "../../../Modals/NewAccountModel"
import DeleteAccountModel from '../../../Modals/DeleteAccountModel';
import UpdateAccountModal from '../../../Modals/UpdateAccountModal';
import { fetchRecordByIdSlice, fetchOwnerShipSlice,fetchAllAccountRecordsSlice,resetData } from "../../Account/AccountSlice";
import { Link } from 'react-router-dom';
import { SlOptions } from "react-icons/sl";

import OwnerShipById from './OwnerShipById';


function AccountMain({ accountData,fetchOwnerShip,searchQuery }) {
  console.log(accountData);
  const [deleteAccount, setDeleteAccount] = useState(null);
  const [EditAccountId, setEditAccountId] = useState(null);
  console.log(EditAccountId);
  const {addAccountRecord,accountUpdateData}=useSelector((state)=>state.account);

  const dispatch = useDispatch();
  console.log(searchQuery);


  const fetchIdRecord = (id) => {

    dispatch(fetchRecordByIdSlice(id));

  }
  


  useEffect(()=>{
    if(addAccountRecord.status || accountUpdateData.status) {
      
      dispatch(fetchAllAccountRecordsSlice());
      dispatch(resetData());

    }

  },[addAccountRecord.status,dispatch,accountUpdateData.status])


  return (
    <div className="overflow-x-auto">
                  <ToastContainer />


      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Site</th>
            <th>Phone</th>
            <th>Owner</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {
            (addAccountRecord.status)?(<h1 className=' h-[50vh] w-[100vh] flex justify-center items-center'>
              <span class="loading loading-spinner text-neutral"></span>

              
            </h1>):

            accountData && accountData.records.map((account, index) => {
              const { Name, Site, Phone, Id,OwnerId } = account;
              if(searchQuery=='') {
              return (
                <tr key={Id}>
                  <th>{index + 1}</th>
                  <th> <Link className=' text-blue-600 hover:text-blue-400 text-center' to={`/account/record/${Id}`}>{Name}</Link></th>
                  <th>{Site}</th>
                  <th>{Phone}</th>
                  <th>{OwnerShipById(fetchOwnerShip.data.records,OwnerId)}</th>
                  <div>
                    <div class="btn-group">
                      <button type="button" class="px-2 py-1 bg-blue-600 text-white rounded-md " data-bs-toggle="dropdown" aria-expanded="false">
                        <SlOptions/>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"
                          onClick={() => {
                            document.getElementById('my_modal_3').showModal()
                            fetchIdRecord(Id);
                            setEditAccountId(Id);
                          }
                          }
                        >Edit </a></li>
                        <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal"
                          onClick={() => {
                            document.getElementById('my_modal_1').showModal()
                            setDeleteAccount(Id);

                          }
                          }


                        >Delete </a></li>
                      </ul>
                    </div>
                  </div>
                </tr>
              )
                        }
                        else{
                          if(Name.toLowerCase().includes(searchQuery)) {
                            return (
                              <tr key={Id}>
                                <th>{index + 1}</th>
                                <th> <Link className=' text-blue-600 hover:text-blue-400 text-center' to={`/account/record/${Id}`}>{Name}</Link></th>
                                <th>{Site}</th>
                                <th>{Phone}</th>
                                <th>{OwnerShipById(fetchOwnerShip.data.records,OwnerId)}</th>
                                <div>
                                  <div class="btn-group">
                                    <button type="button" class="px-2 py-1 bg-blue-600 text-white rounded-md " data-bs-toggle="dropdown" aria-expanded="false">
                                      <SlOptions/>
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li><a class="dropdown-item" href="#"
                                        onClick={() => {
                                          document.getElementById('my_modal_3').showModal()
                                          fetchIdRecord(Id);
                                          setEditAccountId(Id);
                                        }
                                        }
                                      >Edit </a></li>
                                      <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => {
                                          document.getElementById('my_modal_1').showModal()
                                          setDeleteAccount(Id);
              
                                        }
                                        }
              
              
                                      >Delete </a></li>
                                    </ul>
                                  </div>
                                </div>
                              </tr>
                            )
                          }
                        }
            })
          }
        </tbody>
        <DeleteAccountModel deleteAccount={deleteAccount} />
        <NewAccountModel />
        <UpdateAccountModal id={EditAccountId} setEditAccountId={setEditAccountId} />

      </table>
    </div>
  )
}




export default AccountMain