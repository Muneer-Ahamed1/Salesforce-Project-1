import React from 'react'
import AccountRelated from '../features/Account/component/AccountRelated'

function AccountRelatedPage({accountID,accountData,fetchByIdAccountRecord}) {
  return (
    <div className="wrapper-AccountRelated">
        <AccountRelated
        accountID={accountID}
        accountData={accountData}
        fetchByIdAccountRecord={fetchByIdAccountRecord}
        />

    </div>
  )
}

export default AccountRelatedPage