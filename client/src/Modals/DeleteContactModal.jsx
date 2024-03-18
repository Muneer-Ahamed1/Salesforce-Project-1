
import { useDispatch,useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import {abcDeleteApi} from "../features/Auth/AuthApi";
import {toast} from "react-toastify"
// import {deleteRedumSlice} from "../features/Redum/DeleteSlice";
import {resetLoading} from "../features/Contact/ContactSlice"
import {MyDeleteContext} from "../ContextApi/DeleteContext"
import {deleteRedumSlice} from "../features/Contact/ContactSlice";
export default function DeleteContactModel({ deleteById }) {
    const dispatch = useDispatch();
    const contactData = useSelector((state) => state.contact);
    const[deleteBool,setDeleteBool]=useState(false);
    
    const { deleteContext, setDeleteContext } = useContext(MyDeleteContext);
  
    
    console.log("Delted stage");
    useEffect(()=>{
      console.log("Delted Stage");
      console.log(deleteBool)
      console.log(deleteContext)
      if(deleteBool) {
        toast.warn("Deleted pending")

      abcDeleteApi(deleteById).then((data)=>{
        if(data.status==204) {
          setDeleteContext(true);
          setDeleteBool(false)
          toast.success("Deleted value")



        }
      }).catch((err)=>{
        console.log(err)
        toast.error("Not Deleted")
        setDeleteContext(false)
      })
      setDeleteBool(false)

    }
    },[deleteBool])
    useEffect(()=>{
      if(deleteContext) {
      setDeleteBool(false)

      }
    },[deleteContext])





    return <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
      <dialog id="my_modal_7" className="modal">
        <div className="modal-box bg-slate-50">
          <h3 className="font-bold text-lg">{"DeleteAccount"}</h3>
          <p className="py-4">{
            "Do you want to delete this contact"
          }</p>
          <div className="modal-action">
            <form method="dialog" >
              {/* if there is a button in form, it will close the modal */}
              <button className="btn border-0 mx-4 bg-red-600 text-white rounded-md btn-sm"
                onClick={() => {
                  dispatch(deleteRedumSlice(deleteById));
                  // dispatch(resetLoading());
                }}
              >Delete</button>
  
              <button className="btn bg-blue-600 border-0 text-white btn-sm rounded-md">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  }