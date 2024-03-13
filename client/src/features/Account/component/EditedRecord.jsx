import React, { useEffect, useState } from 'react'
import AccountInfoRecord from "../../../pages/AccountInfoRecord";
import {fetchAllAccountRecordsSlice,accountUpdateByIdSlice,fetchRecordByIdSlice} from "../AccountSlice";
import { useDispatch,useSelector} from 'react-redux';

function EditedRecord({fetchByIdAccountRecord,setEditStatus,editStatus,accountID}) {
    console.log(fetchByIdAccountRecord);
    const dispatch=useDispatch();
    const {updateAccountRecord}=useSelector((state)=>state.account);
    const data=useSelector((state)=>state.account.accountData);


    useEffect(()=>{
      
    },[])

    const submitEditData=()=>{
      const dumpData={};
      for(const key in accountData) {
        if(accountData[key]!=null) {
          dumpData[key]=accountData[key];

        }
      }
      delete dumpData["attributes"];
      delete dumpData["CleanStatus"];
      delete dumpData["CreatedById"];
      delete dumpData["CreatedDate"];
      delete dumpData["Id"];
      delete dumpData["IsDeleted"];
      delete dumpData["LastModifiedById"];
      delete dumpData["LastModifiedDate"];
      delete dumpData["LastReferencedDate"];
      delete dumpData["LastViewedDate"];
      delete dumpData["OwnerId"];
      delete dumpData["PhotoUrl"];
      delete dumpData["SystemModstamp"];
      if(dumpData["BillingAddress"]){
        delete dumpData["BillingAddress"];
      }
      if(dumpData["ShippingAddress"]){
        delete dumpData["ShippingAddress"];
      }
      console.log(dumpData);
      console.log("MNDSSSSSSSSSSSSSSSS")
    

      let editData={
        id:accountID,
        data:dumpData
      }
      dispatch(accountUpdateByIdSlice(editData))
      console.log(editData);
     


    }
    
    const [accountData,setAccountData]=useState(fetchByIdAccountRecord.data);
    
  return (
    <div className="editedRecord">
        <AccountInfoRecord
         AccountData ={accountData}
         setAccountData ={setAccountData}
         accountData={data}
        />
        <div className=' flex justify-end mr-4 gap-2 my-2'>
            <button className=' px-3 py-2 rounded bg-slate-700 hover:bg-slate-400 text-white'
            onClick={()=>setEditStatus(true)}
            >
              Cancel</button>
            <button className=' px-3 py-2 rounded bg-green-700 hover:bg-green-400 text-white'
            onClick={()=>{submitEditData()
            }}
            >Save</button>
        </div>
    </div>
  )
}

export default EditedRecord