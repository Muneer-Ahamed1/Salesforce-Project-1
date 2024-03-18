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
     if(!accountData)
 {
   dispatch(fetchAllAccountRecordsSlice());
 }
   },[accountData])


 


  return (
   <div className="overflow-x-auto lg: px-10 md :mx-auto">
  <ToastContainer />

  <table className="table table-xs w-full bg-white shadow-lg rounded-lg overflow ">
    <thead className="bg-blue-500 text-white">
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
      {(addAccountRecord.status) ? (
        <div>
          <div className="h-[50vh] w-[100vh] flex justify-center items-center">
            <span className="loading loading-spinner text-neutral"></span>
          </div>
        </div>
      ) : (
        accountData && accountData.records.map((account, index) => {
          const { Name, Site, Phone, Id, OwnerId } = account;
          if (searchQuery === '' || Name.toLowerCase().includes(searchQuery)) {
            return (
              <tr key={Id} className="transition-all hove ">
                <td>{index + 1}</td>
                <td>
                  <Link className="text-blue-600 hover:text-blue-400 text-center" to={`/account/record/${Id}`}>{Name}</Link>
                </td>
                <td>{Site}</td>
                <td>{Phone}</td>
                <td>{OwnerShipById(fetchOwnerShip.data.records, OwnerId)}</td>
                <td>
                  <div className="btn-group">
                    <button type="button" className="px-2 py-1 bg-blue-600 text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-blue-500" data-bs-toggle="dropdown" aria-expanded="false">
                      <SlOptions />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item transition-colors duration-300 ease-in-out hover:bg-blue-100" href="#" onClick={() => {
                          document.getElementById('my_modal_3').showModal();
                          fetchIdRecord(Id);
                          setEditAccountId(Id);
                        }}>Edit</a>
                      </li>
                      <li>
                        <a className="dropdown-item transition-colors duration-300 ease-in-out hover:bg-red-100" href="#" onClick={() => {
                          document.getElementById('my_modal_1').showModal();
                          setDeleteAccount(Id);
                        }}>Delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          }
          return null; // If search query does not match, return null
        })
      )}
    </tbody>
  </table>
  <DeleteAccountModel deleteAccount={deleteAccount} />
  <NewAccountModel />
  <UpdateAccountModal id={EditAccountId} setEditAccountId={setEditAccountId} />
</div>


  )
}




export default AccountMain