import { useDispatch, useSelector } from "react-redux";
import { createRecordApiSlice } from "../features/Account/AccountSlice";
import AccountInfoRecord from "../pages/AccountInfoRecord";
import {resetError} from "../features/Account/AccountSlice"
import { useEffect, useState, useRef, useContext } from "react";
import {FormValidationContext} from "../ContextApi/FormValidation"

export default function NewAccountModel() {
  const dispatch = useDispatch();
  const { accountData, addAccountRecord } = useSelector((state) => state.account);
  const btnRef = useRef();
  const[btnData,setBtnData]=useState(false);
  const[errorBool,setErrorBool]=useState(false);
  const {errorHandler,setErrorHandler}=useContext(FormValidationContext);

  let dumpValidation = {
    error: false,
    Name: {
        error: false,
        message: ""
    },
    AccountNumber: {
        error: false,
        message: ""
    },
    AnnualRevenue:{
        error:false,
        message: ""
    },
    NumberOfEmployees:{
        error:false,
        message: ""
    },
    Sic:{
        error:false,
        message: ""
        
    },
   
};
const[errors,setErrors]=useState(dumpValidation);
  const [AccountData, setAccountData] = useState({});
console.log("I AM INSIDE NEWACCOUNT MODEL")
  useEffect(() => {
    console.log(addAccountRecord);
    if (btnData ) {
      setAccountData({});

      btnRef.current.click();
      setBtnData(false);
    }

  }, [btnData])


useEffect(()=>{
  setErrorHandler(errorHandler);
},[errorBool])  

  const validateForm = (formData) => {
    console.log("I AM STARTING OF FORM")
    console.log(formData);
  
    // Validate Name
    if (!formData["Name"]) {
      errorHandler.error=true
      errorHandler["Name"]="Name is required" 
    }
    if (formData.AccountNumber) {
      
      if (isNaN(formData.AccountNumber) || formData.AccountNumber < 0) {
        errorHandler.error=true

        errorHandler["AccountNumber"] = "AccountNumber must be a  number";
      }
      
    }
  
  
    // Validate AnnualRevenue if present
    if (formData.AnnualRevenue) {
      if (isNaN(formData.AnnualRevenue) || formData.AnnualRevenue < 0) {
        console.log(" I AM INSIDE ANUALREVENUE")
        console.log(isNaN(formData.AnnualRevenue))
        console.log(formData.AnnualRevenue);
        errorHandler.error=true
        errorHandler["AnnualRevenue"] = "Annual revenue must be a positive number";
      }
    }
  
    // Validate NumberOfEmployees if present
    if (formData.NumberOfEmployees && (isNaN(formData.NumberOfEmployees) || formData.NumberOfEmployees < 0)) {
      errorHandler.error=true
      errorHandler["NumberOfEmployees"]= "Number of employees must be a positive number";
    }
  
    // Validate Sic if present
    if (formData.Sic) {
      if (isNaN(formData.Sic) || formData.Sic < 0) {
        errorHandler.error=true
        errorHandler["Sic"] = "SIC must be a positive number";
      }
    }
    console.log("I AM IN THE FORM VALIDATION LINE")
    
  return errorHandler;
  };
 

  console.log(errors);

  const newAccountAdded = () => {
    if (Object.keys(AccountData).length > 0) {
      return dispatch(createRecordApiSlice(AccountData));

    }
  }
 

  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box w-11/12 max-w-4xl bg-white  min-h-[70vh] ">
        <h3 className="font-bold text-lg pb-2">New Account</h3>
        <hr />
        <AccountInfoRecord AccountData={AccountData}
          setAccountData={setAccountData}
          accountData={accountData}
          errors={errors}
          setErrors={setErrors}
        />

        <div className="modal-action border-t-2 p-2 flex">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn bg-primary text-white border-0 btn-sm" onClick={()=>{dispatch(resetError())
            setAccountData({});
            setErrorHandler({
              error: false,
              Name:null,
              AccountNumber: null,
              AnnualRevenue:null,
              NumberOfEmployees:null,
              Sic:null
             
          });
                        }}>Close</button>  

          </form>
          {(btnData) ?
            <form method={"dialog"} >
              <button className="btn bg-success text-white border-0 btn-sm "
                ref={btnRef}
              >Save</button>

            </form> : <form onSubmit={(e) => {
              e.preventDefault();
              // Stop the propagation of the event
              setBtnData(false);
              e.stopPropagation();
            }}>
              <button className="btn bg-success text-white border-0 btn-sm " onClick={(e) => {
                e.stopPropagation()
                setErrorBool(!errorBool);
                setErrorHandler(validateForm(AccountData));
                console.log("I AM ERROR HANDLER");
                console.log(errorHandler);
                if(!errorHandler.error){

                 newAccountAdded();
                 setBtnData(true)
                }



              }}

              >Save</button>

            </form>}
        </div>
      </div>
    </dialog>
  )

}