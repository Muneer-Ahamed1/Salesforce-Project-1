import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import NewAccountModel from "../../../Modals/NewAccountModel"
import DeleteAccountModel from '../../../Modals/DeleteAccountModel';
import UpdateAccountModal from '../../../Modals/UpdateAccountModal';
import {fetchRecordByIdSlice} from "../../Account/AccountSlice";
import { Link } from 'react-router-dom';

function AccountMain({ accountData }) {
  console.log(accountData);
  const [deleteAccount, setDeleteAccount] = useState(null);
  const[EditAccountId,setEditAccountId]=useState(null);
  console.log(EditAccountId);

  const dispatch=useDispatch();
 

  const fetchIdRecord=(id)=>{

    dispatch(fetchRecordByIdSlice(id));


  }
  


  return (
    <div className="account grid-cols-4">
      <ToastContainer />
      {

        accountData && accountData.records.map((account) => {
          const { Name, Site, Phone, Id } = account;
          return (
            <div className=' grid grid-cols-4 text-center border-b-2 ' key={Id}>
              <Link className=' text-blue-600 hover:text-blue-400 text-center' to={`/account/record/${Id}`}>{Name}</Link>
              <h1>{Site }</h1>
              <h1>{Phone }</h1>
              <div>
                <div class="btn-group">
                  <button type="button" class="px-3 py-2 bg-blue-600 text-white rounded-md " data-bs-toggle="dropdown" aria-expanded="false">
                    opt
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
            </div>
          )
        })
      }
      <DeleteAccountModel deleteAccount={deleteAccount} />
      <NewAccountModel />
      <UpdateAccountModal id={EditAccountId} setEditAccountId={setEditAccountId}/>


    </div>
  )
}




export default AccountMain