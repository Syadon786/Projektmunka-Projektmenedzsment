import React from 'react'

const Page = ({title, children, noCard}) => {
  return (
    <div className="container pt-3">
      {title ? <h5>{title}</h5> : null}
      <div className={!noCard ? "card bg-white shadow p-3" : null}>
        {children}
      </div>
    </div>
  )
}

export default Page