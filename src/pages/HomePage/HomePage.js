import React from 'react'

import Page from '../../components/Page/Page'

const HomePage = () => {
  return (
    <Page title="Home" noCard>
        <div className='d-flex justify-content-center'>
        <div className="card my-4  p-4 bg-white shadow text-center">
            Dummy content
        </div>
        </div>
    </Page>
  )
}

export default HomePage