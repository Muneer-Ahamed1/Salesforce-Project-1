import React from 'react'
import AccountDetail from '../features/Account/component/AccountDetail'

function AccountDetailPage({accountID}) {
  return (
    <div className="AccountDetail-wrapper">
        <AccountDetail
        accountID={accountID}
        />
    </div>
  )
}

export default AccountDetailPage