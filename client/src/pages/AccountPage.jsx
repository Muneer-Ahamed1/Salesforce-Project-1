import React, { useEffect, useState } from 'react'
import { fetchAllAccountRecordsSlice } from "../features/Account/AccountSlice";
import { FaPlus } from "react-icons/fa";


import { useSelector, useDispatch } from 'react-redux';
import AccountMain from '../features/Account/component/AccountMain';
import OwnerShip from '../features/Account/component/OwnerShip';
import { ToastContainer } from 'react-toastify';
import SearchBar from '../features/Account/component/SearchBar';

function AccountPage() {
    const dispatch = useDispatch();
    const accountData = useSelector((state) => state.account);
    const accountDeleted = accountData.deleteAccount;
    const newAccountRecord = accountData.addAccountRecord;
    const { fetchOwnerShip } = OwnerShip();
    const [searchQuery, setSearchQuery] = useState("");
    function onChangeQuery(vl) {
        setSearchQuery(vl);

    }


    useEffect(() => {
        if (accountDeleted.status == true || !accountData.accountData) {
            dispatch(fetchAllAccountRecordsSlice());
        }
    }, [accountDeleted.status]);
    console.log(accountData);

    if (accountData.accountData && fetchOwnerShip.data) {
        return <div className=' sm:p-2'>

            <div className="create-account flex justify-evenly m-4 ml-2 gap-3">
                <SearchBar
                    onChangeQuery={onChangeQuery}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <button className="btn btn-outline btn-primary btn-sm rounded-md" onClick={() => document.getElementById('my_modal_4').showModal()}><FaPlus />
                </button>
            </div>
            <AccountMain accountData={accountData.accountData}
                fetchOwnerShip={fetchOwnerShip}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onChangeQuery={onChangeQuery}

            />



        </div>
    }
    if (accountData.error.error) {
        return <h1 className=' felx justify-center items-center md:text-xl font-semibold text-lg'>SomeThing went wrong!!</h1>
    }

}

export default AccountPage