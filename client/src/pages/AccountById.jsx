import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountDetailPage from './AccountDetailPage';
import AccountRelatedPage from './AccountRelatedPage';
import { AccountDiv } from '../features/Account/component/AccountRelated';
import { fetchContactByIdSlice } from "../features/Contact/ContactSlice";
import { fetchAllAccountRecordsSlice, fetchRecordByIdSlice } from "../features/Account/AccountSlice";
import { RiContactsFill } from "react-icons/ri";
import { AiFillMacCommand } from "react-icons/ai";

import Loading from './Loading';

function useThemeToggle(navigateAcc) {
  useEffect(() => {
    const handleThemeToggle = () => {
      if (navigateAcc) {
        // If navigateAcc is true
        if (document.documentElement.classList.contains('light')) {
          localStorage.setItem("data-theme", "dark");
          document.documentElement.classList.remove('light');
        }
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', localStorage.getItem("data-theme"));
      } else {
        // If navigateAcc is false
        localStorage.setItem("data-theme", "light");
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
        }
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', localStorage.getItem("data-theme"));
      }
      console.log("I AM HERE = " + navigateAcc);
    };

    handleThemeToggle();

    return () => {
      // Cleanup function
      // You can add cleanup logic here if needed
    };
  }, [navigateAcc]);
}

function AccountById() {
  const accountID = useParams().id;
  const { accountData, fetchByIdAccountRecord } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  console.log(accountID);
  const [navigateAcc, setNavigateAcc] = useState(false);

  // Custom useEffect for theme toggling
  useThemeToggle(navigateAcc);

  useEffect(() => {
    if (!accountData) {
      dispatch(fetchAllAccountRecordsSlice());
    }
    if (!fetchByIdAccountRecord.data || fetchByIdAccountRecord.data.Id !== accountID) {
      dispatch(fetchRecordByIdSlice(accountID));
    }
    console.log("ACCCC");
  }, [accountData, fetchByIdAccountRecord.data, accountID]);

  console.log(accountData);
  console.log(fetchByIdAccountRecord);

  if (!fetchByIdAccountRecord.data && !accountData) {
    return <Loading />;
  }

  return (
    <div className={`container min-h-[90vh] sm:p-4 rounded my-2  bg-sky-100 dark:bg-cyan-50 `}>
      <AccountDiv fetchByIdAccountRecord={fetchByIdAccountRecord} />
      <div className='wrapper'>
        {/* <nav className='flex items-center gap-4 md:px-4 py-2 px-2 rounded bg-sky-50 dark:bg-cyan-100 border-b-2 m-2'>
      <a onClick={() => setNavigateAcc(false)} className={`focus:outline-none ${!navigateAcc ? "text-blue-500 underline font-bold" : "text-gray-600"} hover:text-blue-700 text-lg font-medium`}>
        <span className="text-xl md:text-2xl"><i className="fas fa-users"></i></span>
        <span className="hidden md:inline ml-2">Contacts</span>
      </a>
      <a onClick={() => setNavigateAcc(true)} className={`focus:outline-none ${navigateAcc ? "text-blue-500 underline font-bold" : "text-gray-600"} hover:text-blue-700 text-lg font-medium`}>
        <span className="text-xl md:text-2xl"><i className="fas fa-tasks"></i></span>
        <span className="hidden md:inline ml-2">Tasks</span>
      </a>
    </nav> */}
        <div className=' border-b-2 border-b-white'>
          <nav role="tablist" className="tabs tabs-bordered bg-white dark:bg-gray-400 shadow-md rounded-lg md:w-[15%] w-[30%] ">
            <a role="tab" className={`tab text-black dark:text-gray-300  dark:hover:bg-gray-200 font-semibold ${!navigateAcc ? "bg-blue-500 underline font-bold tab-active text-white rounded-md hover:bg-blue-600" : "hover:bg-gray-100 "} `}
            onClick={() => setNavigateAcc(false)}
            >Related</a>
            <a role="tab" className={`tab    dark:text-white text-black rounded-md font-bold ${navigateAcc ? "bg-blue-500 underline font-bold tab-active text-white hover:bg-blue-600" : "bg-gray-100 "}`}
            onClick={() => setNavigateAcc(true)}
            >Details</a>
          </nav>
        </div>



        <div className="wrapper-data p-2">
          {
            (navigateAcc) ? <AccountDetailPage
              accountID={accountID}
              accountData={accountData}
              fetchByIdAccountRecord={fetchByIdAccountRecord}
            /> : <AccountRelatedPage
              accountID={accountID}
              accountData={accountData}
              fetchByIdAccountRecord={fetchByIdAccountRecord}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default AccountById;
