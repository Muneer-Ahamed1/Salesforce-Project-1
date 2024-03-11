import React, { useState } from 'react'
import AccountInfoRecord from "../../../pages/AccountInfoRecord";
function EditedRecord({fetchByIdAccountRecord,setEditStatus,editStatus}) {
    console.log(fetchByIdAccountRecord);
    
    const [accountData,setAccountData]=useState(fetchByIdAccountRecord.data);
    
  return (
    <div className="editedRecord">
        <AccountInfoRecord
         AccountData ={accountData}
         setAccountData ={setAccountData}
        />
        <div className=' flex justify-end mr-4 gap-2 my-2'>
            <button className=' px-3 py-2 rounded bg-slate-700 hover:bg-slate-400 text-white'
            >Cancel</button>
            <button className=' px-3 py-2 rounded bg-green-700 hover:bg-green-400 text-white'>Save</button>
        </div>
    </div>
  )
}

export default EditedRecord