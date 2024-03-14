import React from 'react'

function OwnerShipById(ownerShip,id) {
    let ownerId="None";
   for(let i=0;i<ownerShip.length;i++) {

    if(ownerShip[i].Id==id) {
        return ownerId=ownerShip[i].Name
    }
   }
   
    return ownerId;


}

export default OwnerShipById