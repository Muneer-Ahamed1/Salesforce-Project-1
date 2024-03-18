import { useDispatch, useSelector } from "react-redux";
import ContactInfoRecord from "../pages/ContactInfoRecord";
import { useState, useRef, useEffect } from "react";
import { createContactByIdSlice } from "../features/Contact/ContactSlice";


export default function NewContactModel() {
  const dispatch = useDispatch();
  const { accountData, addAccountRecord } = useSelector((state) => state.account);
  let formBool = false;
  const defaultTemplate = {
    "error": {
      error: false
    },
    "LastName": {
      error: false,
      message: ""
    },
    "Email": {
      error: false,
      message: ""
    },
    "Salutation": {
      error: false,
      message: ""
    }

  }
  const [errorValidation, setErrorValidation] = useState(defaultTemplate)
  const newContactAdded = () => {
    if (Object.keys(contactData).length == 0) {
      toast.warn("Please fill something")
    }
    for (let key in contactData) {
      if (contactData[key].length == 0) {
        delete contactData[key];
      }
    }
    dispatch(createContactByIdSlice(contactData));
    setContactData({});
    setErrorValidation(defaultTemplate)
    setBtnData(true)


  }
  const validationField = (name, value, setErrorValidation) => {
    const updatedErrorValidation = { ...errorValidation }; // Create a copy of the current state

    switch (name) {
      case 'Email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(value);

        if (!isValidEmail) {
          // Update error state for Email field
          updatedErrorValidation[name].error = true;
          errorValidation[name].error = true;
          updatedErrorValidation[name].message = "Please provide a valid email";
          errorValidation[name].message = "Please provide a valid email";
          setErrorValidation(updatedErrorValidation);

        }

        break;
      case 'Phone':
        const phoneRegex = /^(\+\d{1,3}\s?)?(\(\d{1,4}\))?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/;
        const isValid = "";

    }

    // Update the state with the new error validation
  };


  const [contactData, setContactData] = useState({});



  const btnRef = useRef();
  const [btnData, setBtnData] = useState(false);

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
          errorValidation={errorValidation}
          setErrorValidation={setErrorValidation}
        />
        <div className=" flex  gap-2 justify-end">
          <form method={"dialog"} >
            <button className="btn  text-white border-0 btn-sm  bg-red-600 rounded-md"
              onClick={() => {
                setContactData({})
                setErrorValidation(defaultTemplate)
              }}
            >Close</button>
          </form>

          {(btnData) ?
            <form method={"dialog"} >
              <button className="btn bg-success text-white border-0 btn-sm rounded-md"
                ref={btnRef}
              >Save</button>

            </form> : <form onSubmit={(e) => {
              e.preventDefault();
              // Stop the propagation of the event
              setBtnData(false);
              e.stopPropagation();
            }}>
              <button className="btn bg-success text-white border-0 btn-sm  rounded-md" onClick={(e) => {
                e.stopPropagation()
                console.log(contactData);
                console.log(errorValidation)
                if (!contactData.hasOwnProperty('LastName') || contactData['LastName'].length == 0) {
                  let dumpValidation = { ...errorValidation };
                  dumpValidation["LastName"].error = true;
                  errorValidation["error"].error = true

                  dumpValidation["error"].error = true
                  dumpValidation["LastName"].message = "Complete this field"
                  setErrorValidation(dumpValidation);
                }
                if (!contactData.hasOwnProperty('Salutation') || contactData['Salutation'].length == 0) {
                  let dumpValidation = { ...errorValidation };
                  dumpValidation["Salutation"].error = true;
                  errorValidation["Salutation"].error = true
                  dumpValidation["error"].error = true
                  errorValidation["error"].error = true
                  dumpValidation["Salutation"].message = "Salutation is required"

                  setErrorValidation({ ...dumpValidation });
                }
                for (const key in contactData) {
                  if (errorValidation[key] && contactData[key].length > 0) {
                    console.log(key);
                    console.log(contactData[key])

                    let validData = validationField(key, contactData[key], setErrorValidation);
                    console.log("I AM IN VALIDATION")
                  }
                }
                console.log("I am outside");
                console.log(errorValidation)




                if (!errorValidation.error.error && !errorValidation['Email'].error) {
                  newContactAdded();
                }

              }}

              >Save</button>

            </form>}
        </div>
      </div>
    </dialog>
  )

}