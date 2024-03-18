import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchContactByIdSlice } from '../ContactSlice';
import DeleteContactModel from '../../../Modals/DeleteContactModal';
import { ToastContainer, toast } from 'react-toastify'; // Import 'toast' from 'react-toastify'
import UpdateContactModel from '../../../Modals/UpdateContactModel';
import Loading from '../../../pages/Loading';
import { MyDeleteContext } from '../../../ContextApi/DeleteContext';
import { useContext } from 'react';
import { abcDeleteApi } from '../../Auth/AuthApi';
import { resetDelete } from '../../Redum/DeleteSlice';
import { deleteRedumSlice } from "../../Redum/DeleteSlice";

function ContactById() {
  const { contactData, updateContactById, loading, deleteRedum } = useSelector((state) => state.contact);
  const { id } = useParams();
  const [deleteById, setDeleteById] = useState(null); // Initialize state with 'null' instead of undefined
  const [editById, setEditById] = useState(null); // Initialize state with 'null' instead of undefined
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateContactById.status || deleteRedum.status) {
      console.log(id);
      dispatch(fetchContactByIdSlice(id));


    }
  }, [updateContactById, deleteRedum]);

  useEffect(() => {
    if (id && !contactData.data) {
      dispatch(fetchContactByIdSlice(id));

    }
  }, [id])



  if (!contactData.data) {
    return <Loading />;
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
            {!loading && contactData.data &&
              contactData.data.totalSize > 0 ?
              contactData.data.records.map((vl, index) => {
                const { Name, Email, Phone, Id } = vl;
                return (
                  <tr key={Id}>
                    <th>{index + 1}</th>
                    <td>{Name}</td>
                    <td>Data Coordiator</td>
                    <td>{Email}</td>
                    <td>{Phone}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          option
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item hover:bg-blue-100"
                              href="#"
                              onClick={() => {
                                document.getElementById('my_modal_15').showModal();
                                setEditById(Id);
                              }}
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item hover:bg-red-100"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => {
                                document.getElementById('my_modal_7').showModal();
                                setDeleteById(Id);
                              }}
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })

              : ""
            }
          </tbody>
         

        </table>
      </div>
      <DeleteContactModel deleteById={deleteById} />
      <UpdateContactModel editById={editById} setEditById={setEditById} />
    </div>
  );
}

export default ContactById;
