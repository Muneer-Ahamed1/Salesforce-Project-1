import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OwnerShipById from './OwnerShipById';
import OwnerShip from "./OwnerShip"
import {fetchRecordByIdSlice} from "../AccountSlice";


function UneditedRecord({fetchOwnerShip}) {
  const {fetchByIdAccountRecord,accountUpdateData}=useSelector((state)=>state.account);
  const dispatch=useDispatch();  
  useEffect(()=>{
    if(accountUpdateData.status) {
      dispatch(fetchRecordByIdSlice());

    }
  },[accountUpdateData.status])
  
  if(!fetchByIdAccountRecord.data) {
    return <h1>Loading</h1>
  }
 

  return (
<div className={`uneditedDataAccount dark:bg-cyan-50 bg-slate-200`}>
<div class="p-4  md:w-[80%] mx-auto ">
<h2 class="text-2xl font-bold mb-4">{fetchByIdAccountRecord.data["Name"]}</h2>

  <div className=' md:p-8  rounded grid grid-cols-2 justify-center'>
  <div class="section-1">
      <div class="mb-4">
        <p class="text-gray-600">Account Owner:</p>
        <p>{OwnerShipById(fetchOwnerShip.data.records,fetchByIdAccountRecord.data['OwnerId'])}</p>
      </div>
      <div class="mb-4">
        <p class="text-gray-600">Account Name:</p>
        <p>{fetchByIdAccountRecord.data["Name"]}</p>
      </div>
      <div class="mb-4">
        <p class="text-gray-600">Account Number:</p>
        <p>{fetchByIdAccountRecord.data["AccountNumber"]}</p>
      </div>
  
    <div class="mb-4">
      <p class="text-gray-600">Rating:</p>
      <p>{fetchByIdAccountRecord.data["Rating"]}</p>
    </div>
    <div class="mb-4">
      <p class="text-gray-600">Phone:</p>
      <p>{fetchByIdAccountRecord.data["Phone"]}</p>
    </div>
    <div class="mb-4">
      <p class="text-gray-600">Website:</p>
      <p>{fetchByIdAccountRecord.data["Website"]}</p>
    </div>
    <div class="mb-4">
      <p class="text-gray-600">Ticker Symbol:</p>
      <p>{fetchByIdAccountRecord.data["TickerSymbol"]}</p>
    </div>
    <div class="mb-4">
      <p class="text-gray-600">Industry:</p>
      <p>{fetchByIdAccountRecord.data["Industry"]}</p>
    </div>
    <div class="mb-4">
      <p class="text-gray-600">Annual Revenue:</p>
      <p>{fetchByIdAccountRecord.data["AnnualRevenue"]}</p>
    </div>
    <div class="mb-4">
      <p class="text-gray-600">Ownership:</p>
      <p>{fetchByIdAccountRecord.data["Ownership"]}</p>
    </div>
    <div className=' mb-4'>
      <p className='text-gray-600'>CreatedDate By:</p>
      <p>{formatDate(new Date(Date.parse(
      fetchByIdAccountRecord.data['CreatedDate']
    )))}</p>      </div>
  
   
  </div>
  <div className="section-2 text-end">
  <div class="mb-4">
      <p class="text-gray-600">Employees:</p>
      <p>{fetchByIdAccountRecord.data["NumberOfEmployees"]}</p>
    </div>
    <div class="mb-4">
      <p class="text-gray-600">SIC Code:</p>
      <p>{fetchByIdAccountRecord.data["Sic"]}</p>
    </div>
    <div class="mb-4">
      <p class="text-gray-600">Billing Address:</p> 
      <p>{fetchByIdAccountRecord.data["BillingAddress"]?.street || ""}</p>
      <p>{fetchByIdAccountRecord.data["BillingAddress"]?.city+" "+ " "+ (fetchByIdAccountRecord.data["BillingAddress"])?fetchByIdAccountRecord.data["BillingAddress"]?.postalCode : ""}</p>
      <p>{fetchByIdAccountRecord.data["BillingAddress"]?.state|| ""}</p>
      <p>{fetchByIdAccountRecord.data["BillingAddress"]?.country|| ""}</p>

    </div>
    <div class="mb-4">
      <p class="text-gray-600">Shipping Address:</p>
      <p>{fetchByIdAccountRecord.data["ShippingAddress"]?.street || ""}</p>
      <p>{fetchByIdAccountRecord.data["ShippingAddress"]?.city || "" +" "+ (fetchByIdAccountRecord.data["ShippingAddress"])?fetchByIdAccountRecord.data["ShippingAddress"]?.postalCode : ""}</p>
      <p>{fetchByIdAccountRecord.data["ShippingAddress"]?.state || ""}</p>
      <p>{fetchByIdAccountRecord.data["ShippingAddress"]?.country || ""}</p>    </div>
    <div class="mb-4">
      <p class="text-gray-600">Customer Priority:</p>
      <p>{fetchByIdAccountRecord.data["CustomerPriority__c"]}</p>    
    </div>
    <div class="mb-4">
      <p class="text-gray-600">SLA:</p>
      <p>{fetchByIdAccountRecord.data["SLA__c"]}</p>     
    <div class="mb-4">
      <p class="text-gray-600">SLA Expiration Date:</p>
      <p>{fetchByIdAccountRecord.data["SLAExpirationDate__c"]}</p>     </div>
    </div>
    <div className='mb-4'>
      <p className="text-gray-600">SLA Serial Number:</p>
      <p>{fetchByIdAccountRecord.data["SLASerialNumber__c"]}</p>     </div>
    <div className='mb-4'>
      <p className="text-gray-600">Number of Locations:</p>
      <p>{fetchByIdAccountRecord.data["NumberofLocations__c"]}</p>     
    </div>
    <div className='mb-4'>
      <p className='text-gray-600'>Upsell Opportunity:</p>
      <p>{fetchByIdAccountRecord.data["UpsellOpportunity__c"]}</p>     
    </div>
    <div className=' mb-4'>
      <p className='text-gray-600'>Active:</p>
      <p>{fetchByIdAccountRecord.data["Active__c"]}</p>     
    </div>

    <div className=' mb-4'>
      <p className='text-gray-600'>Last Modified By:</p>
      <p>{formatDate(new Date(Date.parse(
      fetchByIdAccountRecord.data['LastModifiedDate']
    )))}</p>      </div>

  </div>
  </div>
  <div className='mb-4  p-8'>
    <p className=' text-gray-600'>Description</p>
    <p>{fetchByIdAccountRecord.data["Description"]}</p>    

  </div>


</div>

    </div>
    )
}

export default UneditedRecord;

function formatDate(date) {
  const options = {

    day: "2-digit",
    month: "2-digit",

    year: "numeric"
  };

  return date.toLocaleDateString("en-IN", options);
}