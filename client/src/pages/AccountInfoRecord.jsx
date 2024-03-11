import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { templateAccountSlice } from "../features/Account/AccountSlice";

function AccountInfoRecord({ AccountData, setAccountData }) {
    console.log(AccountData);
    const dispatch = useDispatch();
    const accountDescribe = useSelector((state) => state.account.accountDescribe);

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

    if(!AccountData){
        return <h1>{"ACCOUNT DATA IS NULL"}</h1>
    }



    return (
        <>
            <form className='formData flex flex-col' onSubmit={(e)=>e.preventDefault}>
                <h1 className=' bg-slate-400 text-white px-2 py-1 rounded-md'>Account Information</h1>

                <div className="first-section grid md:grid-cols-2 p-3 justify-items-center">
                    <div className="left-wrap">

                        <div className='name'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Account Name"].label}*</span>
                            </div>
                            <input type="text" placeholder="Account Name" className="input  w-full max-w-xs bg-white border-2 border-slate-200" required
                                name={"Name"}
                                onChange={(e) => {
                                    console.log("ddfssss==="+e.target.value);
                                    setAccountData((prev)=>({ ...prev, [e.target.name]: e.target.value }))


                                }}
                                value={(AccountData['Name']) ? AccountData['Name'] : ""}
                            />
                        </div>

                        <div className='parent'>
                            <div className="label">
                                <span className="label-text text-slate-700">Parent Account *</span>
                            </div>
                            <input type="text" className="input w-[80%] max-w-xs bg-white border-2 border-slate-200" placeholder="Search" 
                            
                            />

                        </div>

                        <div className='accountNumber'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Account Number"].label} </span>
                            </div>
                            <input type="text" placeholder="Account Number" className="input  w-full max-w-xs bg-white border-2 border-slate-200"
                                name={result["Account Number"].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData["AccountNumber"]) ? AccountData["AccountNumber"] : ""}

                            />
                        </div>

                        <div className='accountSite'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Account Site"].label} </span>
                            </div>
                            <input type="text" placeholder="Account Site" className="input  w-full max-w-xs bg-white border-2 border-slate-200"
                                name={result["Account Site"].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                                }}
                                value={(AccountData["Account Site"]) ? AccountData["Account Site"] : ""}
                            />
                        </div>
                        <div className='Account Type'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Account Type"].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white " name={result["Account Type"].name}
                             onChange={(e) => {
                                setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                            }}
                            value={(AccountData["Account Type"]) ? AccountData["Account Type"] : ""}
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
                            <select className="select select-bordered w-full max-w-xs bg-white " name={result["Industry"].name}
                            
                            onChange={(e) => {
                                setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                            }}
                            value={(AccountData["Industry"]) ? AccountData["Industry"] : ""}
                            
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
                            <input type="text" placeholder="Account Revenue" className="input  w-full max-w-xs bg-white border-2 border-slate-200"
                                name={result['Annual Revenue'].name}
                                onChange={(e) => {
                                    setAccountData({ ...AccountData, [e.target.name]: e.target.value })
    
                                }}
                                value={(AccountData[result['Annual Revenue'].name]) ? AccountData[result['Annual Revenue'].name] : ""}
                            
                            />

                        </div>

                    </div>
                    <div className=' right-wrap'>

                        <div className='Rating'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Account Rating'].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white "
                            
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
                            <input type="text" placeholder="Phone" className="input  w-full max-w-xs bg-white border-2 border-slate-200" 
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
                            <input type="text" placeholder="Fax" className="input  w-full max-w-xs bg-white border-2 border-slate-200" 
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
                            <input type="text" placeholder="Website" className="input  w-full max-w-xs bg-white border-2 border-slate-200" 
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
                            <input type="Ticker" placeholder="Ticker Symbol" className="input  w-full max-w-xs bg-white border-2 border-slate-200" 
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
                            <select className="select select-bordered w-full max-w-xs bg-white " name={result['Ownership'].name}
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
                            <input type="text" placeholder="Employee" className="input  w-full max-w-xs bg-white border-2 border-slate-200"
                            name={result['Employees'].name}
                            onChange={(e) => {
                                setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                            }}
                            value={(AccountData[result['Employees'].name]) ? AccountData[result['Employees'].name] : ""}
                            />
                        </div>


                        <div className='SIC Code'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['SIC Code'].label}</span>
                            </div>
                            <input type='text' placeholder={result['SIC Code'].label} className="input  w-full max-w-xs bg-white border-2 border-slate-200" 
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
                                <span className="label-text text-slate-700">{result["Billing Address"].label}</span>
                            </div>
                            <textarea className="textarea textarea-bordered bg-slate-50  w-full max-w-xs" placeholder="Billing Address"
                            name={result['Billing Address'].name}
                            onChange={(e) => {
                                setAccountData({ ...AccountData, [e.target.name]: e.target.value })

                            }}
                            value={(AccountData[result['Billing Address'].name]) ? AccountData[result['Billing Address'].name] : ""}
                            > </textarea>
                        </div>

                        <div className='Billing-city'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Billing City'].label}</span>
                            </div>
                            <input type="text" placeholder="Billing Address" className="input  w-full max-w-xs bg-white border-2 border-slate-200" 
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
                                    <input type="text" placeholder={"Zip Code"} className="input  w-full max-w-xs bg-white border-2 border-slate-200" 
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
                                    <input type="text" placeholder="Billing State" className="input  w-full max-w-xs bg-white border-2 border-slate-200" 
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
                            <input type="text" placeholder="Billing Country" className="input  billing-country w-full max-w-xs bg-white border-2 border-slate-200 " 
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
                            <textarea className="textarea textarea-bordered bg-slate-50  w-full max-w-xs" placeholder="Shipping Address"
                            name={result['Shipping Street'].name}
                            > </textarea>
                        </div>

                        <div className='Shipping-city'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Shipping City'].label}</span>
                            </div>
                            <input type="text" placeholder="City" className="input  w-full max-w-xs bg-white border-2 border-slate-200"
                            name={result['Shipping City'].name}
                            />
                        </div>

                        <div className="Shipping-section grid grid-cols-2 gap-2">

                            <div className="section-1">
                                <div className='Shipping Zip'>
                                    <div className="label">
                                        <span className="label-text text-slate-700">{result["Shipping Zip/Postal Code"].label}</span>
                                    </div>
                                    <input type="text" placeholder="Shipping Zip" className="input   max-w-xs bg-white border-2 border-slate-200" 
                                    name={result["Shipping Zip/Postal Code"].name}
                                    />
                                </div>

                            </div>
                            <div className="section-2">

                                <div className='Shipping State'>
                                    <div className="label">
                                        <span className="label-text text-slate-700">{result['Shipping State/Province'].label}</span>
                                    </div>
                                    <input type="text" placeholder="Shipping State" className="input  bg-white border-2 border-slate-200" 
                                    name={result['Shipping State/Province'].name}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className='Shipping-Country'>
                            <div className="label">
                                <span className="label-text text-slate-700">{result["Shipping Country"].label}</span>

                            </div>
                            <input type="text" placeholder="Shipping Country" className="input  Shipping-country w-full max-w-xs bg-white border-2 border-slate-200" 
                            name={result["Shipping Country"].name}
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
                            <select className="select select-bordered w-full max-w-xs bg-white ">
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

                            <input type="date" placeholder="expiration date" className="exp-date w-full max-w-xs bg-white border-2 border-slate-200 py-1 px-2 rounded-md" 
                            name={result['SLA Expiration Date'].name}
                            />
                        </div>

                        <div className="number-location">
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Number of Locations'].label}</span>
                            </div>
                            <input type="text" placeholder="Location" className="input w-full max-w-xs bg-white border-2 border-slate-200 py-1 px-2 rounded-md" 
                            name={result['Number of Locations'].name}
                            />

                        </div>

                        <div className="active">
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Active'].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white" name={result['Active'].name}>
                                <option value={''}>--None--</option>

                                {
                                    result['Active'].picklistValues &&  result['Active'].picklistValues.map((vl) => {
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
                            <select className="select select-bordered w-full max-w-xs bg-white ">
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
                            <input type="text" placeholder="Serial Number" className="input  w-full max-w-xs bg-white border-2 border-slate-200" 
                            name={result['SLA Serial Number'].name}
                            />
                        </div>

                        <div className="upsell-opportunity">
                            <div className="label">
                                <span className="label-text text-slate-700">{result['Upsell Opportunity'].label}</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs bg-white"
                            name={result["Upsell Opportunity"].name}

                            >
                                <option value={""}>--None--</option>

                                {
                                    result["Upsell Opportunity"].picklistValues &&  result["Upsell Opportunity"].picklistValues.map((vl) => {
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
                    <textarea className="textarea textarea-bordered bg-slate-50  w-[90%]" placeholder="Description"
                    
                    > </textarea>

                </div>
            </form>
        </>
    )
}


const describeDataModifying = (describe) => {
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

export default AccountInfoRecord