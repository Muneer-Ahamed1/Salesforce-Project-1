import { useDispatch, useSelector } from "react-redux";
import ContactInfoRecord from "../pages/ContactInfoRecord";
import { useState , useRef,useEffect} from "react";
import { createContactByIdSlice } from "../features/Contact/ContactSlice";


export default function NewContactModel() {
  const dispatch = useDispatch();
  const { accountData, addAccountRecord } = useSelector((state) => state.account);
  const newContactAdded = () => {
    if (Object.keys(contactData).length == 0) {
      return alert("Please fill something");
    }
    for (let key in contactData) {
      if (contactData[key].length == 0) {
        delete contactData[key];
      }
    }
    console.log(contactData)
    dispatch(createContactByIdSlice(contactData));
    setContactData({});
    setBtnData(true)

    
  }
  const [contactData, setContactData] = useState({});
 

  const btnRef = useRef();
  const[btnData,setBtnData]=useState(false);

  useEffect(() => {
    if (btnData) {
      setContactData({});

      btnRef.current.click();
      setBtnData(false);
    }

  }, [btnData])
  return (
    <dialog id="my_modal_22" className="modal">
      <div className="modal-box w-11/12 max-w-4xl bg-white">
        <h3 className="font-bold text-lg pb-2">New Contact</h3>
        <hr />

        <ContactInfoRecord
          contactData={contactData}
          setContactData={setContactData}
          accountData={accountData}
        />
        <div className=" flex gap-2">
        <form method={"dialog"} >
              <button className="btn  text-white border-0 btn-sm  bg-red-600"
              >Close</button>
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
                newContactAdded();


              }}

              >Save</button>

            </form>}
            </div>
        </div>
    </dialog>
  )

}