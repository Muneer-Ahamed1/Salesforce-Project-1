import React, { useEffect, useState } from 'react'
import { fetchAllAccountRecordsSlice,resetData } from "../features/Account/AccountSlice";
import { FaPlus } from "react-icons/fa";
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import AccountMain from '../features/Account/component/AccountMain';
import OwnerShip from '../features/Account/component/OwnerShip';
import { ToastContainer } from 'react-toastify';
import SearchBar from '../features/Account/component/SearchBar';
import Loading from './Loading';

function AccountPage() {
    const dispatch = useDispatch();
    const accountData = useSelector((state) => state.account);
    const {addAccountRecord,accountUpdateData}=useSelector((state)=>state.account);
    const {loading}=useSelector((state)=>state.account)
    const accountDeleted = accountData.deleteAccount;
    const newAccountRecord = accountData.addAccountRecord;
    const { fetchOwnerShip } = OwnerShip();
    const [searchQuery, setSearchQuery] = useState("");
    function onChangeQuery(vl) {
        setSearchQuery(vl);

    }
    useEffect(()=>{
        if(addAccountRecord.status || accountUpdateData.status) {
          
          dispatch(fetchAllAccountRecordsSlice());
           dispatch(resetData());
    
        }
    
      },[addAccountRecord.status,dispatch,accountUpdateData.status]) 


    useEffect(() => {
        if (accountDeleted.status == true || !accountData.accountData) {
            dispatch(fetchAllAccountRecordsSlice());
        }
    }, [accountDeleted.status]);
    useEffect(()=>{
        if(!accountData)
    {
      dispatch(fetchAllAccountRecordsSlice());
    }
      },[accountData])
      
    const {error}=useSelector((state)=>state.account);
 
    console.log(accountData);
    const auth = useSelector((state) => state.auth);
    const account = useSelector((state) => state.account);

    
   if(loading) {
    return <Loading/>
   }
    if (accountData.accountData && fetchOwnerShip.data) {
        return <div className=' sm:p-2'>
            {(!accountData.data) ?
                <>
                    <motion.div
                        className="create-account flex justify-evenly m-4 ml-2 gap-3"
                        initial={{ opacity: 0, y: -20 }} // Initial animation states
                        animate={{ opacity: 1, y: 0 }}    // Animation states when component mounts
                        transition={{ duration: 0.5 }}    // Animation duration
                    >
                        <SearchBar
                            onChangeQuery={onChangeQuery}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        <motion.button
                            className="btn btn-outline btn-primary btn-sm rounded-md"
                            whileHover={{ scale: 1.05, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }} // Animation when hovering
                            whileTap={{ scale: 0.95 }} // Animation when clicked
                            onClick={() => document.getElementById('my_modal_4').showModal()}
                        >
                            <FaPlus />
                        </motion.button>
                    </motion.div>
                    <AccountMain accountData={accountData.accountData}
                        fetchOwnerShip={fetchOwnerShip}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onChangeQuery={onChangeQuery}

                    />
                </> : <Loading />
            }



        </div>
    }
    if (accountData.error.error) {
        return <Loading/>
    }

}

export default AccountPage