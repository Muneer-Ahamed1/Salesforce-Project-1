import React from 'react'
import AccountDetail from '../features/Account/component/AccountDetail'

function AccountDetailPage({accountID,accountData,fetchByIdAccountRecord}) {
  return (
    <div className="AccountDetail-wrapper">
        <AccountDetail
        accountData={accountData}
        accountID={accountID}
        fetchByIdAccountRecord={fetchByIdAccountRecord}
        />
    </div>
  )
}

export default AccountDetailPage