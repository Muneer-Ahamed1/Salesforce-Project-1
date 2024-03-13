
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { templateAccountSlice,accountUpdateByIdSlice } from "../features/Account/AccountSlice";

function AccountInfoUpdate({ data, accountData ,updateAccountAdded}) {
    console.log(data);
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.account);
    const accountDescribe = useSelector((state) => state.account.accountDescribe);
    const [AccountData,setAccountData]=useState(data);

    useEffect(() => {
        if (!accountDescribe.data) {
            dispatch(templateAccountSlice());
        }

    }, [])
    console.log(accountDescribe.data);
    if (!accountDescribe.data) {
        return <h1>Waiting for data fetching</h1>
    }

    const result = describeDataModifying(accountDescribe);

    if (!AccountData) {
        return <h1>{"ACCOUNT DATA IS NULL"}</h1>
    }
    console.log("Resdsddsdas")
    console.log(result)

    return (
        <>
            <form className='formData flex flex-col' onSubmit={(e) => e.preventDefault}>
                <h1 className=' bg-slate-400 text-white px-2 py-1 rounded-md'>Account Information</h1>

                <div className="first-section grid md:grid-cols-2 p-3">
                    <div className="left-wrap">

                        <div className='name'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Account Name"].label}*</span>
                            </div>
                            <input type="text" placeholder="Account Name" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm" required
                                name={"Name"}
                                onChange={(e) => {
                                    console.log("ddfssss===" + e.target.value);
                                    setAccountData((prev) => ({ ...prev, [e.target.name]: e.target.value }))


                                }}
                                value={(AccountData['Name']) ? AccountData['Name'] : ""}
                            />
                            <p className=' text-red-600'>{(error.error && error?.message?.status && error?.message?.Name?.status) ? error?.message?.Name?.message : ""}</p>
                        </div>

                        <div className='parent'>
                            <div className="label">
                                <span className="label-text text-slate-700">Parent Account </span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white rounded-sm select-sm"
                                name={result["Account ID"]?.name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Account ID'].name]) ? AccountData[result['Account ID'].name] : ""}
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

                        <div className='accountNumber'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Account Number"].label} </span>
                            </div>
                            <input type="text" placeholder="Account Number" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result["Account Number"].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData["AccountNumber"]) ? AccountData["AccountNumber"] : ""}

                            />
                            <p className=' text-red-600'>{(error.error && error?.message?.status && error?.message?.AccountNumber?.status) ? error?.message?.AccountNumber?.message : ""}</p>

                        </div>

                        <div className='accountSite'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Account Site"].label} </span>
                            </div>
                            <input type="text" placeholder="Account Site" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result["Account Site"].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Account Site'].name]) ? AccountData[result['Account Site'].name] : ""}
                            />
                        </div>
                        <div className='Account Type'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Account Type"].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white rounded-md select-sm " name={result["Account Type"].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Account Type'].name]) ? AccountData[result['Account Type'].name] : ""}
                            >

                                {
                                    result["Account Type"].picklistValues && result["Account Type"].picklistValues.map((vl) => {
                                        const { label, value } = vl;
                                        return (
                                            <option value={value} name={label}>{label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='Account Industry'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Industry"].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white rounded-md select-sm " name={result["Industry"].name}

                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Industry'].name]) ? AccountData[result['Industry'].name] : ""}

                            >

                                {
                                    result["Industry"].picklistValues && result["Industry"].picklistValues.map((vl) => {
                                        const { label, value } = vl;
                                        return (
                                            <option value={value} name={label}>{label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='AnnualRevenue'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Annual Revenue'].label}</span>
                            </div>
                            <input type="text" placeholder="Account Revenue" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['Annual Revenue'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Annual Revenue'].name]) ? AccountData[result['Annual Revenue'].name] : ""}

                            />
                            <p className=' text-red-600'>{(error.error && error?.message?.status && error?.message?.AnnualRevenue?.status) ? error?.message?.AnnualRevenue?.message : ""}</p>


                        </div>

                    </div>
                    <div className=' right-wrap'>

                        <div className='Rating'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Account Rating'].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white rounded-md select-sm"

                                name={result['Account Rating'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Account Rating'].name]) ? AccountData[result['Account Rating'].name] : ""}
                            >
                                <option value={''}>--None--</option>


                                {
                                    result["Account Rating"].picklistValues && result["Account Rating"].picklistValues.map((vl) => {
                                        const { label, value } = vl;
                                        return (
                                            <option value={value} name={label}>{label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='Phone'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Account Phone"].label}</span>
                            </div>
                            <input type="text" placeholder="Phone" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['Account Phone'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Account Phone'].name]) ? AccountData[result['Account Phone'].name] : ""}




                            />
                        </div>

                        <div className='Fax'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Account Fax'].label}</span>
                            </div>
                            <input type="text" placeholder="Fax" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['Account Fax'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Account Fax'].name]) ? AccountData[result['Account Fax'].name] : ""}
                            />
                        </div>

                        <div className='Website'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Website'].label}</span>
                            </div>
                            <input type="text" placeholder="Website" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['Website'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Website'].name]) ? AccountData[result['Website'].name] : ""}


                            />
                        </div>

                        <div className='Ticker Symbol'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Ticker Symbol'].label}</span>
                            </div>
                            <input type="Ticker" placeholder="Ticker Symbol" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['Ticker Symbol'].name}

                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Ticker Symbol'].name]) ? AccountData[result['Ticker Symbol'].name] : ""}


                            />
                        </div>

                        <div className='Ownership'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Ownership'].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white rounded-md select-sm" name={result['Ownership'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Ownership'].name]) ? AccountData[result['Ownership'].name] : ""}

                            >
                                <option value={""}>--None--</option>

                                {
                                    result['Ownership'].picklistValues && result['Ownership'].picklistValues.map((vl) => {
                                        const { label, value } = vl;
                                        return (
                                            <option value={value} name={label}>{label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='Employees'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Employees'].label}</span>
                            </div>
                            <input type="text" placeholder="Employee" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['Employees'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Employees'].name]) ? AccountData[result['Employees'].name] : ""}
                            />
                            <p className=' text-red-600'>{(error.error && error?.message?.status && error?.message?.NumberOfEmployees?.status) ? error?.message?.NumberOfEmployees?.message : ""}</p>



                        </div>


                        <div className='SIC Code'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['SIC Code'].label}</span>
                            </div>
                            <input type='text' placeholder={result['SIC Code'].label} className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['SIC Code'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['SIC Code'].name]) ? AccountData[result['SIC Code'].name] : ""}
                            />
                        </div>
                    </div>
                </div>
                <h1 className=' bg-slate-400 text-white px-2 py-1 rounded-md'>Address Information</h1>
                <div className=' second-section grid md:grid-cols-2 p-3 gap-4'>

                    <div className="first-section">
                        <div className='Billing-address'>
                            <h1 className=' font-bold'>Billing Address</h1>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Billing Street"].label}</span>
                            </div>
                            <textarea className="textarea textarea-bordered bg-slate-50  w-full max-w-xs rounded-md " placeholder="Billing Street"
                                name={result['Billing Street'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Billing Street'].name]) ? AccountData[result['Billing Street'].name] : ""}
                            > </textarea>
                        </div>

                        <div className='Billing-city'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Billing City'].label}</span>
                            </div>
                            <input type="text" placeholder="Billing Address" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['Billing City'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Billing City'].name]) ? AccountData[result['Billing City'].name] : ""}

                            />
                        </div>

                        <div className="billing-section grid grid-cols-2 gap-2">

                            <div className="section-1">
                                <div className='Billing Zip'>
                                    <div className="label">
                                        <span className="label-text text-slate-700">{result["Billing Zip/Postal Code"].label}</span>
                                    </div>
                                    <input type="text" placeholder={"Zip Code"} className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                        name={result['Billing Zip/Postal Code'].name}
                                        onChange={(e) => {
                                            setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                        }}
                                        value={(AccountData[result['Billing Zip/Postal Code'].name]) ? AccountData[result['Billing Zip/Postal Code'].name] : ""}
                                    />
                                </div>

                            </div>
                            <div className="section-2">

                                <div className='Billing State'>
                                    <div className="label">
                                        <span className="label-text text-slate-700">{result["Billing State/Province"].label}</span>
                                    </div>
                                    <input type="text" placeholder="Billing State" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                        name={result["Billing State/Province"].name}
                                        onChange={(e) => {
                                            setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                        }}
                                        value={(AccountData[result['Billing State/Province'].name]) ? AccountData[result['Billing State/Province'].name] : ""}


                                    />
                                </div>

                            </div>

                        </div>

                        <div className='Billing-Country'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Billing Country'].label}</span>

                            </div>
                            <input type="text" placeholder="Billing Country" className="input  billing-country w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['Billing Country'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Billing Country'].name]) ? AccountData[result['Billing Country'].name] : ""}
                            />


                        </div>
                    </div>




                    <div className="second-section">
                        <div className='Shipping-address'>
                            <h1 className=' font-bold'>Shipping Address</h1>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Shipping Street'].label}</span>
                            </div>
                            <textarea className="textarea textarea-bordered bg-slate-50  w-full max-w-xs rounded-md " placeholder="Shipping Address"
                                name={result['Shipping Street'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Shipping Street'].name]) ? AccountData[result['Shipping Street'].name] : ""}
                            > </textarea>
                        </div>

                        <div className='Shipping-city'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Shipping City'].label}</span>
                            </div>
                            <input type="text" placeholder="City" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['Shipping City'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Shipping City'].name]) ? AccountData[result['Shipping City'].name] : ""}
                            />
                        </div>

                        <div className="Shipping-section grid grid-cols-2 gap-2">

                            <div className="section-1">
                                <div className='Shipping Zip'>
                                    <div className="label">
                                        <span className="label-text text-slate-700">{result["Shipping Zip/Postal Code"].label}</span>
                                    </div>
                                    <input type="text" placeholder="Shipping Zip" className="input   max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                        name={result["Shipping Zip/Postal Code"].name}
                                        onChange={(e) => {
                                            setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                        }}
                                        value={(AccountData[result['Shipping Zip/Postal Code'].name]) ? AccountData[result['Shipping Zip/Postal Code'].name] : ""}
                                    />
                                </div>

                            </div>
                            <div className="section-2">

                                <div className='Shipping State'>
                                    <div className="label">
                                        <span className="label-text text-slate-700">{result['Shipping State/Province'].label}</span>
                                    </div>
                                    <input type="text" placeholder="Shipping State" className="input  bg-white border-2 border-slate-200 rounded-md input-sm"
                                        name={result['Shipping State/Province'].name}
                                        onChange={(e) => {
                                            setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                        }}
                                        value={(AccountData[result['Shipping State/Province'].name]) ? AccountData[result['Shipping State/Province'].name] : ""}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className='Shipping-Country'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Shipping Country"].label}</span>

                            </div>
                            <input type="text" placeholder="Shipping Country" className="input  Shipping-country w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result["Shipping Country"].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Shipping Country'].name]) ? AccountData[result['Shipping Country'].name] : ""}
                            />


                        </div>
                    </div>

                </div>
                <h1 className='additonal-information bg-slate-400 text-white px-2 py-1 rounded-md'>Additional Information</h1>


                <div className="third-section grid grid-cols-2 p-3">
                    <div className="section-1">
                        <div className="customer-priority">
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Customer Priority'].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white rounded-md select-sm"
                                name={result["Customer Priority"].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Customer Priority'].name]) ? AccountData[result['Customer Priority'].name] : ""}
                            >
                                <option value="">--None--</option>

                                {
                                    result['Customer Priority'].picklistValues && result["Customer Priority"].picklistValues.map((vl) => {
                                        const { label, value } = vl;
                                        return (
                                            <option value={value} name={label}>{label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='expiration-date'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['SLA Expiration Date'].label}</span>
                            </div>

                            <input type="date" placeholder="expiration date" className="exp-date w-full max-w-xs bg-white border-2 border-slate-200 py-1 px-2 rounded-md input-sm"
                                name={result['SLA Expiration Date'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['SLA Expiration Date'].name]) ? AccountData[result['SLA Expiration Date'].name] : ""}
                            />
                        </div>

                        <div className="number-location">
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Number of Locations'].label}</span>
                            </div>
                            <input type="text" placeholder="Location" className="input w-full max-w-xs bg-white border-2 border-slate-200 py-1 px-2 rounded-md input-sm"
                                name={result['Number of Locations'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Number of Locations'].name]) ? AccountData[result['Number of Locations'].name] : ""}
                            />

                        </div>

                        <div className="active">
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Active'].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white rounded-md select-sm"
                                name={result['Active'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Active'].name]) ? AccountData[result['Active'].name] : ""}

                            >
                                <option value={''}>--None--</option>

                                {
                                    result['Active'].picklistValues && result['Active'].picklistValues.map((vl) => {
                                        const { label, value } = vl;
                                        return (
                                            <option value={value} name={label}>{label}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                    </div>

                    <div className="section-2">


                        <div className="spa">
                            <div className="label">
                                <span className="label-text text-slate-700">{
                                    result['SLA'].label
                                }</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white rounded-md select-sm"
                                name={result['SLA'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['SLA'].name]) ? AccountData[result['SLA'].name] : ""}
                            >
                                <option value={''}>--None--</option>

                                {
                                    result['SLA'].picklistValues && result['SLA'].picklistValues.map((vl) => {
                                        const { label, value } = vl;
                                        return (
                                            <option value={value} name={label}>{label}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                        <div className='sla-serialNumber'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['SLA Serial Number'].label}</span>
                            </div>
                            <input type="text" placeholder="Serial Number" className="input  w-full max-w-xs bg-white border-2 border-slate-200 rounded-md input-sm"
                                name={result['SLA Serial Number'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['SLA Serial Number'].name]) ? AccountData[result['SLA Serial Number'].name] : ""}
                            />
                        </div>

                        <div className="upsell-opportunity">
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Upsell Opportunity'].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white rounded-md select-sm"
                                name={result["Upsell Opportunity"].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData[result['Upsell Opportunity'].name]) ? AccountData[result['Upsell Opportunity'].name] : ""}
                            >
                                <option value={""}>--None--</option>

                                {
                                    result["Upsell Opportunity"].picklistValues && result["Upsell Opportunity"].picklistValues.map((vl) => {
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

                <h1 className='additonal-information bg-slate-400 text-white px-2 py-1 rounded-md'>Description</h1>
                <div className="four-section">
                    <div className="label">
                        <span className="label-text text-slate-700">{"Description"}</span>
                    </div>
                    <textarea className="textarea textarea-bordered bg-slate-50  w-[90%] rounded-md " placeholder="Description"
                        name={"Description"}
                        onChange={(e) => {
                            setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                        }}
                        value={(AccountData["Description"]) ? AccountData["Description"] : ""}


                    >
                        Description
                    </textarea>

                </div>
                
<div className="modal-action border-t-2 p-2 flex">
<form method="dialog">
  {/* if there is a button, it will close the modal */}
  <button className="btn bg-primary text-white border-0 btn-sm"
  onClick={()=>{
    // setEditAccountId(null)

}}
  >Close</button>
</form>
<div onClick={(e)=>e.stopPropagation()}>
  <button className="btn bg-success text-white border-0 btn-sm " onClick={()=>{
    const dumpData={};
    for(const key in AccountData) {
      if(AccountData[key]!=null) {
        dumpData[key]=AccountData[key];

      }
    }
    delete dumpData["attributes"];
    delete dumpData["CleanStatus"];
    delete dumpData["CreatedById"];
    delete dumpData["CreatedDate"];
    delete dumpData["Id"];
    delete dumpData["IsDeleted"];
    delete dumpData["LastModifiedById"];
    delete dumpData["LastModifiedDate"];
    delete dumpData["LastReferencedDate"];
    delete dumpData["LastViewedDate"];
    delete dumpData["OwnerId"];
    delete dumpData["PhotoUrl"];
    delete dumpData["SystemModstamp"];
    if(dumpData["BillingAddress"]){
      delete dumpData["BillingAddress"];
    }
    if(dumpData["ShippingAddress"]){
      delete dumpData["ShippingAddress"];
    }
    console.log(dumpData);
    console.log(AccountData);
    updateAccountAdded(dumpData);


}}>Save</button>

  </div>
  
</div>
             
            </form>
        </>
    )
}


export const describeDataModifying = (describe) => {
    let result = {};
    describe.data.fields.forEach((field) => {
        const { label, ...rest } = field;

        if (!result[label]) {
            result[label] = {};
        }

        result[label] = { ...result[label], label, ...rest };
    });
    return result;
}

export default AccountInfoUpdate










































