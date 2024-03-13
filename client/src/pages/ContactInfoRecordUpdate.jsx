import React, { useEffect, useState } from 'react'
import { ContactDescSlice } from "../features/Contact/ContactSlice"
import { useDispatch, useSelector } from 'react-redux'
import { describeDataModifying } from "./AccountInfoRecord";
import {updateContactByIdSlice} from "../features/Contact/ContactSlice";

export default function ContactInfoRecordUpdate({ data, accountData,updateContact }) {
    const dispatch = useDispatch();
    const [contactData, setContactData] = useState(data);
    const { descContact } = useSelector((state) => state.contact);
    useEffect(() => {
        if (!descContact.data) {
            dispatch(ContactDescSlice());
        }
    }, [])
    if (!descContact.data) {
        return <h1>Loading descContact</h1>
    }
    const result = describeDataModifying(descContact);
    console.log(result);



    return (
        <div className="Contact">
            <div className="wrapper sm:p-2">
                <div className="section-1">
                    <h1 className=' bg-gray-300'>Contact Information</h1>
                    <div className="section grid grid-cols-2 gap-4 p-2">
                        <div className="part-1">
                            <div className='Account Owner'>
                                <div className="label">
                                    <span className="label-text text-slate-700">Contact Owner</span>
                                </div>
                                <h1>Muneer Ahamed Shaik</h1>

                            </div>
                            <div className=' Name'>
                                <div className="label">
                                    <span className="label-text text-slate-700">Name *</span>
                                </div>
                                <div className=' Name-part border-2 p-2 rounded-md'>
                                    <div className="div">
                                        <div className="label">
                                            <div className="label-text text-slate-700">
                                                {
                                                    result["Salutation"].label
                                                }
                                            </div>
                                        </div>
                                        <select className="select select-bordered w-full max-w-xs bg-white rounded-sm select-sm"
                                            name={result["Salutation"].name}
                                            onChange={(e) => {
                                                setContactData({ ...contactData, [e.target.name]: e.target.value })

                                            }}
                                            value={(contactData[result['Salutation'].name]) ? contactData[result['Salutation'].name] : ""}
                                        >
                                            <option value={""}>--None--</option>

                                            {
                                                result["Salutation"].picklistValues && result["Salutation"].picklistValues.map((vl) => {
                                                    const { label, value } = vl;
                                                    return (
                                                        <option value={value} name={label}>{label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="div">
                                        <div className="label">
                                            <div className="label-text text-slate-700">
                                                {
                                                    result["First Name"].label
                                                }
                                            </div>
                                        </div>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                            name={result["First Name"].name}
                                            value={(contactData[result['First Name'].name]) ? contactData[result['First Name'].name] : ""}
                                            onChange={(e) => {
                                                setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                            }}
                                        />
                                    </div>
                                    <div className="div">
                                        <div className="label">
                                            <div className="label-text text-slate-700">
                                                {
                                                    result["Last Name"].label
                                                }
                                            </div>
                                        </div>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                            name={result["Last Name"].name}
                                            value={(contactData[result['Last Name'].name]) ? contactData[result['Last Name'].name] : ""}
                                            onChange={(e) => {
                                                setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                            }}
                                        />
                                    </div>



                                </div>

                            </div>

                            <div className="AccountName">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            "Account Name"
                                        }
                                    </div>
                                </div>

                                <select className="select select-bordered w-full max-w-xs bg-white rounded-sm select-sm"
                                    name={result["Account ID"]?.name}
                                    onChange={(e) => {
                                        setContactData({ ...contactData, [e.target.name]: e.target.value })

                                    }}
                                    value={(contactData[result['Account ID'].name]) ? contactData[result['Account ID'].name] : ""}
                                >
                                    {
                                        accountData && accountData.records.map((vl) => {
                                            const { Id, Name } = vl;
                                            return (
                                                <option value={Id}>{Name}</option>
                                            )
                                        })

                                    }
                                </select>

                            </div>

                            <div className="Title">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Title"]?.label
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Title"]?.name}
                                    value={(contactData[result['Title']?.name]) ? contactData[result['Title']?.name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Department">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Department"]?.label || "Department"
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Department"]?.name}
                                    value={(contactData[result['Department']?.name]) ? contactData[result['Department']?.name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Birthdate">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Birthdate"]?.label || "Birthdate"
                                        }
                                    </div>
                                </div>
                                <input type="date" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Birthdate"]?.name}
                                    value={(contactData[result['Birthdate']?.name]) ? contactData[result['Birthdate']?.name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Reports To">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Reports To"]?.label || "Reports To"
                                        }
                                    </div>
                                </div>
                                <input type="type" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Reports To ID"]?.name}
                                    value={(contactData[result['Reports To ID']?.name]) ? contactData[result['Reports To ID']?.name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Lead Source">
                                <div className="label block">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Lead Source"]?.label || "Reports To"
                                        }
                                    </div>
                                    <select className="select select-bordered w-full max-w-xs bg-white rounded-sm select-sm"
                                        name={result["Lead Source"].name}
                                        onChange={(e) => {
                                            setContactData({ ...contactData, [e.target.name]: e.target.value })

                                        }}
                                        value={(contactData[result['Lead Source'].name]) ? contactData[result['Lead Source'].name] : ""}
                                    >
                                        <option value={""}>--None--</option>

                                        {
                                            result["Lead Source"].picklistValues && result["Lead Source"].picklistValues.map((vl) => {
                                                const { label, value } = vl;
                                                return (
                                                    <option value={value} name={label}>{label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>



                            </div>

                        </div>
                        <div className="part-2">
                            <div className="Phone">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Phone"]?.label || "Phone"
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Business Phone"].name}
                                    value={(contactData[result['Business Phone'].name]) ? contactData[result["Business Phone"].name] : ""}


                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Home Phone">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Home Phone"]?.label || "Title"
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Home Phone"]?.name}
                                    value={(contactData[result['Home Phone']?.name]) ? contactData[result['Home Phone']?.name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Mobile">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Mobile"]?.label || "Mobile"
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Mobile Phone"].name}
                                    value={(contactData[result["Mobile Phone"].name]) ? contactData[result["Mobile Phone"].name] : ""} onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Other Phone">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Other Phone"]?.label
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Other Phone"]?.name}
                                    value={(contactData[result['Other Phone']?.name]) ? contactData[result['Other Phone']?.name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Fax
">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Fax"]?.label || "Fax"
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Business Fax"].name}
                                    value={(contactData[result["Business Fax"].name]) ? contactData[result["Business Fax"].name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Email
">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Email"]?.label
                                        }
                                    </div>
                                </div>
                                <input type="email" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Email"]?.name}
                                    value={(contactData[result['Email']?.name]) ? contactData[result['Email']?.name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Assistant
">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Assistant"]?.label || "Assistant"
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Assistant's Name"].name}
                                    value={(contactData[result["Assistant's Name"].name]) ? contactData[result["Assistant's Name"].name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Asst. Phone">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Asst. Phone"]?.label
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Asst. Phone"]?.name}
                                    value={(contactData[result['Asst. Phone']?.name]) ? contactData[result['Asst. Phone']?.name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>


                        </div>
                    </div>

                </div>
                <div className="section-2">
                    <h1 className=' bg-gray-300'>Address Information</h1>
                    <div className=' second-section grid md:grid-cols-2 p-3 gap-4'>

                        <div className="first-section">
                            <div className='Billing-address'>
                                <h1 className=' font-bold'>Mailing Address
                                </h1>
                                <div className="label">
                                    <span className="label-text text-slate-700">{result["Mailing Street"].label}</span>
                                </div>
                                <textarea className="textarea textarea-bordered bg-slate-50  w-full max-w-xs rounded-sm" placeholder="Mailing Street"
                                    name={result['Mailing Street'].name}
                                    onChange={(e) => {
                                        setContactData({ ...contactData, [e.target.name]: e.target.value })

                                    }}
                                    value={(contactData[result['Mailing Street'].name]) ? contactData[result['Mailing Street'].name] : ""}
                                > </textarea>
                            </div>

                            <div className='Mailing City'>
                                <div className="label">
                                    <span className="label-text text-slate-700">{result['Mailing City'].label}</span>
                                </div>
                                <input type="text" placeholder="Mailing City" className="input  w-full max-w-xs bg-white border-2 border-slate-200 input-sm rounded-sm"
                                    name={result['Mailing City'].name}
                                    onChange={(e) => {
                                        setContactData({ ...contactData, [e.target.name]: e.target.value })

                                    }}
                                    value={(contactData[result['Mailing City'].name]) ? contactData[result['Mailing City'].name] : ""}

                                />
                            </div>

                            <div className="Mailing-section grid grid-cols-2 gap-2">

                                <div className="section-1">
                                    <div className='Mailing Zip'>
                                        <div className="label">
                                            <span className="label-text text-slate-700">{result["Mailing Zip/Postal Code"].label}</span>
                                        </div>
                                        <input type="text" placeholder={"Zip Code"} className="input  w-full max-w-xs bg-white border-2 border-slate-200 input-sm rounded-sm"
                                            name={result['Mailing Zip/Postal Code'].name}
                                            onChange={(e) => {
                                                setContactData({ ...contactData, [e.target.name]: e.target.value })

                                            }}
                                            value={(contactData[result['Mailing Zip/Postal Code'].name]) ? contactData[result['Mailing Zip/Postal Code'].name] : ""}
                                        />
                                    </div>

                                </div>
                                <div className="section-2">

                                    <div className='Mailing State/Province'>
                                        <div className="label">
                                            <span className="label-text text-slate-700">{result["Mailing State/Province"].label}</span>
                                        </div>
                                        <input type="text" placeholder="Mailing State" className="input  w-full max-w-xs bg-white border-2 border-slate-200 input-sm rounded-sm"
                                            name={result["Mailing State/Province"].name}
                                            onChange={(e) => {
                                                setContactData({ ...contactData, [e.target.name]: e.target.value })

                                            }}
                                            value={(contactData[result['Mailing State/Province'].name]) ? contactData[result['Mailing State/Province'].name] : ""}


                                        />
                                    </div>

                                </div>

                            </div>

                            <div className='Mailing Country'>
                                <div className="label">
                                    <span className="label-text text-slate-700">{result['Mailing Country'].label}</span>

                                </div>
                                <input type="text" placeholder="Mailing Country" className="input  mailing-country w-full max-w-xs bg-white border-2 border-slate-200 input-sm rounded-sm"
                                    name={result['Mailing Country'].name}
                                    onChange={(e) => {
                                        setContactData({ ...contactData, [e.target.name]: e.target.value })

                                    }}
                                    value={(contactData[result['Mailing Country'].name]) ? contactData[result['Mailing Country'].name] : ""}
                                />


                            </div>
                        </div>




                        <div className="second-section">
                            <div className='other-address'>
                                <h1 className=' font-bold'>Other Address</h1>
                                <div className="label">
                                    <span className="label-text text-slate-700">{result['Other Street'].label}</span>
                                </div>
                                <textarea className="textarea textarea-bordered bg-slate-50  w-full max-w-xs rounded-sm " placeholder="other street"
                                    name={result['Other Street'].name}
                                    onChange={(e) => {
                                        setContactData({ ...contactData, [e.target.name]: e.target.value })

                                    }}
                                    value={(contactData[result['Other Street'].name]) ? contactData[result['Other Street'].name] : ""}
                                > </textarea>
                            </div>

                            <div className='Other-city'>
                                <div className="label">
                                    <span className="label-text text-slate-700">{result['Other City'].label}</span>
                                </div>
                                <input type="text" placeholder="City" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-sm input-sm"
                                    name={result['Other City'].name}
                                    onChange={(e) => {
                                        setContactData({ ...contactData, [e.target.name]: e.target.value })

                                    }}
                                    value={(contactData[result['Other City'].name]) ? contactData[result['Other City'].name] : ""}
                                />
                            </div>

                            <div className="Other-section grid grid-cols-2 gap-2">

                                <div className="section-1">
                                    <div className='Other Zip/Postal Code'>
                                        <div className="label">
                                            <span className="label-text text-slate-700">{result["Other Zip/Postal Code"].label}</span>
                                        </div>
                                        <input type="text" placeholder="Other Zip" className="input   max-w-xs bg-white border-2 border-slate-200 input-sm rounded-sm"
                                            name={result["Other Zip/Postal Code"].name}
                                            onChange={(e) => {
                                                setContactData({ ...contactData, [e.target.name]: e.target.value })

                                            }}
                                            value={(contactData[result['Other Zip/Postal Code'].name]) ? contactData[result['Other Zip/Postal Code'].name] : ""}
                                        />
                                    </div>

                                </div>
                                <div className="section-2">

                                    <div className='Other State'>
                                        <div className="label">
                                            <span className="label-text text-slate-700">{result['Other State/Province'].label}</span>
                                        </div>
                                        <input type="text" placeholder="Other State" className="input  bg-white border-2 border-slate-200 input-sm rounded-sm"
                                            name={result['Other State/Province'].name}
                                            onChange={(e) => {
                                                setContactData({ ...contactData, [e.target.name]: e.target.value })

                                            }}
                                            value={(contactData[result['Other State/Province'].name]) ? contactData[result['Other State/Province'].name] : ""}
                                        />
                                    </div>

                                </div>

                            </div>

                            <div className='Other-Country'>
                                <div className="label">
                                    <span className="label-text text-slate-700">{result["Other Country"].label}</span>

                                </div>
                                <input type="text" placeholder="Shipping Country" className="input  Other-country w-full max-w-xs bg-white border-2 border-slate-200 rounded-sm input-sm"
                                    name={result["Other Country"].name}
                                    onChange={(e) => {
                                        setContactData({ ...contactData, [e.target.name]: e.target.value })

                                    }}
                                    value={(contactData[result['Other Country'].name]) ? contactData[result['Other Country'].name] : ""}
                                />


                            </div>
                        </div>

                    </div>

                </div>
                <div className="section-3">
                    <h1 className=' bg-gray-300'>Address Information</h1>
                    <div className="section ">
                        <div className="wrapper grid md:grid-cols-2 sm:gap-2 md:gap-4">
                            <div className="Languages">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Languages"]?.label || "Languages"
                                        }
                                    </div>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full  rounded-sm input-sm bg-white"
                                    name={result["Languages"]?.name}
                                    value={(contactData[result['Languages']?.name]) ? contactData[result['Languages']?.name] : ""}
                                    onChange={(e) => {
                                        setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                    }}
                                />

                            </div>
                            <div className="Level">
                                <div className="label">
                                    <div className="label-text text-slate-700">
                                        {
                                            result["Level"].label
                                        }
                                    </div>
                                </div>
                                <select className="select select-bordered w-full max-w-xs bg-white rounded-sm select-sm"
                                    name={result["Level"].name}
                                    onChange={(e) => {
                                        setContactData({ ...contactData, [e.target.name]: e.target.value })

                                    }}
                                    value={(contactData[result['Level'].name]) ? contactData[result['Level'].name] : ""}
                                >
                                    <option value={""}>--None--</option>

                                    {
                                        result["Level"].picklistValues && result["Level"].picklistValues.map((vl) => {
                                            const { label, value } = vl;
                                            return (
                                                <option value={value} name={label}>{label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                        </div>

                    </div>


                </div>
                <div className="section-4 mt-2">
                    <h1 className=' bg-gray-300'>Description Information</h1>
                    <div className="Level">
                        <div className="label">
                            <div className="label-text text-slate-700">
                                {
                                    result["Description"]?.label || "Description"
                                }
                            </div>
                        </div>
                        <textarea placeholder="Type here" className="input input-bordered w-full  rounded-sm  bg-white"
                            name={result["Contact Description"]?.name || "Description"}
                            value={(contactData[result['Contact Description']?.name]) ? contactData[result['Contact Description']?.name] : ""}
                            onChange={(e) => {
                                setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                            }}
                        />

                    </div>

                </div>

            </div>
            <div className="modal-action border-t-2 p-2 flex">
                <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn bg-primary text-white border-0 btn-sm"
                        onClick={() => {
                            // setEditAccountId(null)

                        }}
                    >Close</button>
                </form>
                <div onClick={(e) => e.stopPropagation()}>
                    <button className="btn bg-success text-white border-0 btn-sm " onClick={() => {
                        const dumpData = {};
                        for (const key in contactData) {
                            if (contactData[key] != null) {
                                dumpData[key] = contactData[key];

                            }
                        }
                         delete dumpData["attributes"];
                         delete dumpData["CleanStatus"];
                         delete dumpData["CreatedById"];
                         delete dumpData["CreatedDate"];
                         delete dumpData["IsDeleted"];
                         delete dumpData["LastModifiedById"];
                         delete dumpData["LastModifiedDate"];
                         delete dumpData["LastReferencedDate"];
                         delete dumpData["LastViewedDate"];
                         delete dumpData["OwnerId"];
                         delete dumpData["PhotoUrl"];
                         delete dumpData["SystemModstamp"];
                         if (dumpData["MailingAddress"]) {
                             delete dumpData["MailingAddress"];
                         }
                         if (dumpData["OtherAddress"]) {
                             delete dumpData["OtherAddress"];
                         }
                        console.log(dumpData);
                        console.log("---------------------------------")
                        console.log(contactData);
                        // updateAccountAdded(dumpData);
                        updateContact(dumpData,dumpData.Id)


                    }}>Save</button>

                </div>

            </div>
        </div>
    )
}

