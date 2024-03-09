import React, { useEffect } from 'react'
import { fetchAllAccountRecordsSlice } from "../features/Account/AccountSlice";
import { useSelector, useDispatch } from 'react-redux';
import AccountMain from '../features/Account/component/AccountMain';
function AccountPage() {
    const dispatch = useDispatch();
    const accountData = useSelector((state) => state.account);
    const accountDeleted = accountData.deleteAccount;
    const newAccountRecord=accountData.addAccountRecord;


    useEffect(() => {
        if (accountDeleted.status == true || !accountData.accountData || newAccountRecord.status==true) {
            dispatch(fetchAllAccountRecordsSlice());
        }
    }, [accountDeleted.status,newAccountRecord.status]);
    console.log(accountData);
    if (accountData.loading) {
        return <h1>Fetching the data...</h1>
    }
    if (accountData.accountData) {
        return <div className=' p-2'>
            <div className="create-account flex justify-end m-4">
            <button className="btn btn-outline btn-primary btn-sm" onClick={()=>document.getElementById('my_modal_4').showModal()}>New</button>
            </div>
            <AccountMain accountData={accountData.accountData} />
        </div>
    }
    if (accountData.error.error) {
        return <h1>SomeThing went wrong!!</h1>
    }

}

export default AccountPage