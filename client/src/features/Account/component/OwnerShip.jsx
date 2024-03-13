import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnerShipSlice } from '../AccountSlice';
function OwnerShip() {
    const dispatch=useDispatch();
    const {fetchOwnerShip}=useSelector((state)=>state.account);
    useEffect(() => {
        console.log("dfsdfsdfdf I am here")
        if (!fetchOwnerShip.data) {
          dispatch(fetchOwnerShipSlice());
        }
      }, [fetchOwnerShip.data])
  return (
    {
        fetchOwnerShip:fetchOwnerShip
    }
  )
}

export default OwnerShip