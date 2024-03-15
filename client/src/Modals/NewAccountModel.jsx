import { useDispatch, useSelector } from "react-redux";
import { createRecordApiSlice } from "../features/Account/AccountSlice";
import AccountInfoRecord from "../pages/AccountInfoRecord";
import {resetError} from "../features/Account/AccountSlice"
import { useEffect, useState, useRef } from "react";

export default function NewAccountModel() {
  const dispatch = useDispatch();
  const { accountData, addAccountRecord } = useSelector((state) => state.account);
  const btnRef = useRef();
  const[btnData,setBtnData]=useState(false);
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
    setBtnData(true)


  },[
    addAccountRecord.status
  ])

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
        />

        <div className="modal-action border-t-2 p-2 flex">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn bg-primary text-white border-0 btn-sm" onClick={()=>dispatch(resetError())}>Close</button>  

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
                console.log("I AM IN NO ASV")
                newAccountAdded();


              }}

              >Save</button>

            </form>}
        </div>
      </div>
    </dialog>
  )

}