import React from 'react'

import Page from '../../components/Page/Page'
import { useProject } from '../../contexts/ProjectContext'

const HomePage = () => {
  const {actProject} = useProject();

  return (
    <Page title="Home" noCard>
        <div className='d-flex justify-content-center'>
        <div className="card my-4  p-4 bg-white shadow text-center">
            {`${actProject.label} content`}
        </div>
        </div>
    </Page>
  )
}

export default HomePage