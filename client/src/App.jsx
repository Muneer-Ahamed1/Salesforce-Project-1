import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './pages/Navbar'
import { useSelector,useDispatch } from 'react-redux'
import DeleteProvider from './ContextApi/DeleteContext'
import {templateAccountSlice,fetchAllAccountRecordsSlice,fetchOwnerShipSlice,fetchRecordByIdSlice} from "./features/Account/AccountSlice";
import {fetchContactByIdSlice,} from "./features/Contact/ContactSlice"

function App() {
  const dispatch=useDispatch();
  const {fetchByIdAccountRecord, fetchOwnerShip, fetchAllAccountRecord, accountDescribe}=useSelector(state=>state.account);
  const { descContact,contactDataById}=useSelector(state=>state.contact);
  // useEffect(()=>{
  //   if(fetchByIdAccountRecord.error) {
  //     dispatch(fetchRecordByIdSlice());
  //   }
  //   console.log("I AM INSIDE THE APP USEEFFECT")
  //   console.log(fetchOwnerShip);
  //   if(fetchOwnerShip.error) {

  //     dispatch(fetchOwnerShipSlice());

  //   }
  //   if(fetchOwnerShip.error) {

  //     dispatch(fetchOwnerShipSlice());

  //   }
  //   if(fetchAllAccountRecord.error) {

  //     dispatch(fetchAllAccountRecordsSlice());

  //   }
  //   if(accountDescribe.error) {
  //     dispatch(templateAccountSlice())
  //   }

  // },[fetchByIdAccountRecord,fetchOwnerShip,fetchAllAccountRecord])
  // useEffect(()=>{
  //   if(descContact.error) {
  //     dispatch(ContactDescSlice());

  //   }
  //   if(contactDataById.error) {
  //     dispatch(fetchContactByIdSlice());

  //   }

  // },[descContact,contactDataById])
  return (
<div className="App  bg-slate-100 min-h-[100vh] ">
  
  <Navbar/>
  <DeleteProvider>
  <Outlet/>
  </DeleteProvider>
</div>  )
}

export default App