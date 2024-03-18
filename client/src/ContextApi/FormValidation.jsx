import React, { createContext, useState } from 'react';

export const FormValidationContext=createContext();
export default function FormValidation({children}) {
    
  let dumpValidation = {
    error: false,
    Name:null,
    AccountNumber: null,
    AnnualRevenue:null,
    NumberOfEmployees:null,
    Sic:null
   
};
    const [errorHandler,setErrorHandler]=useState(dumpValidation);
  return (
    <FormValidationContext.Provider value={{errorHandler,setErrorHandler}}>
        {children}
    </FormValidationContext.Provider>
  )
}



