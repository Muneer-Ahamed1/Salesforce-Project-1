import React from 'react'
import AccountRelated from '../features/Account/component/AccountRelated'

function AccountRelatedPage({accountID}) {
  return (
    <div className="wrapper-AccountRelated">
        <AccountRelated
        accountID={accountID}
        />

    </div>
  )
}

export default AccountRelatedPage