import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchContactByIdSlice } from "../ContactSlice";
import DeleteContactModel from "../../../Modals/DeleteContactModal"
import { ToastContainer } from 'react-toastify';
import UpdateContactModel from "../../../Modals/UpdateContactModel";
function ContactById() {
    const { contactData, deleteContact } = useSelector((state) => state.contact);

    const { id } = useParams();
    const [deleteById, setDeleteById] = useState();
    const[editById,setEditById]=useState();

    const dispatch = useDispatch();
    useEffect(() => {
        if (!contactData.data || deleteContact.status) {
            dispatch(fetchContactByIdSlice(id));

        }
        console.log("fdd");

    }, [id, deleteContact.status])
    if (!contactData.data) {
        return <h1>Contact Data something Loading </h1>
    }




    return (
        <div className="Contact-Id">
            <ToastContainer />
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contact Name</th>
                            <th>Title</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>

                        </tr>

                    </thead>
                    <tbody>


                        {
                            contactData.data && (contactData.data.totalSize > 0) ? (
                                contactData.data.records.map((vl, index) => {
                                    const { Name, Email, Phone, Id } = vl;
                                    return (<tr key={Id}>
                                        <th>{index + 1}</th>
                                        <td>{Name}</td>
                                        <td>Data Coordiator</td>
                                        <td>{Email}</td>
                                        <td>{Phone}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    option
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"
                                                        onClick={() => {
                                                            document.getElementById('my_modal_15').showModal()
                                                            setEditById(Id);

                                                        }
                                                        }
                                                    >Edit </a></li>
                                                    <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                        onClick={() => {
                                                            document.getElementById('my_modal_7').showModal()
                                                            setDeleteById(Id);

                                                        }
                                                        }


                                                    >Delete </a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>)
                                })
                            ) : (<h1 className=' text-center'></h1>)
                        }
                    </tbody>
                    <DeleteContactModel
                        deleteById={deleteById}
                    />
                    <UpdateContactModel
                        editById={editById}
                        setEditById={setEditById}
                    />                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Contact Name</th>
                            <th>Title</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default ContactById