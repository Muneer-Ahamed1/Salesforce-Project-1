import React, { useEffect,useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './pages/Navbar'
import { useSelector,useDispatch } from 'react-redux'
import DeleteProvider from './ContextApi/DeleteContext'
import {templateAccountSlice,fetchAllAccountRecordsSlice,fetchOwnerShipSlice,fetchRecordByIdSlice} from "./features/Account/AccountSlice";
import {fetchContactByIdSlice,} from "./features/Contact/ContactSlice"
import Loading from './pages/Loading'

function App() {
  const dispatch=useDispatch();
  const {fetchByIdAccountRecord, fetchOwnerShip, fetchAllAccountRecord, accountDescribe,accountData}=useSelector(state=>state.account);
  const { descContact,contactDataById}=useSelector(state=>state.contact);
  

  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLoadingState = localStorage.getItem('loading');
    if (savedLoadingState) {
      setLoading(savedLoadingState === 'true');
    } else {
      // Default loading state when there's no saved state
      setLoading(true);
    }

    // Simulate fetching data
    setTimeout(() => {
      setLoading(false);
      // Save loading state when data fetching is complete
      localStorage.setItem('loading', 'false');
    }, 2000); // Set loading to false after 2 seconds (simulating data fetching)

    // Clear loading state on component unmount
    return () => {
      localStorage.removeItem('loading');
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Set loading to true before page reload
      localStorage.setItem('loading', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', localStorage.getItem("data-theme"));

  },[])












  return (
<div className={`App min-h-[100vh] flex flex-col  `}>
  
  <Navbar/>
  <DeleteProvider>
  {  (!loading)?
  <Outlet/>: <Loading/>
}
  </DeleteProvider>
  <footer className="footer footer-center p-4  text-base-content  mt-auto">
  <aside>
    <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
</div>  )
}

export default App