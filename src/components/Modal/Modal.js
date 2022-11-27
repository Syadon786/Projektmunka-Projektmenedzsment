import React from 'react'
import { forwardRef } from 'react'
import Button from '../Button/Button'

const Modal = forwardRef(({id, title, children, btnColor="primary", approveText, approveFunc, className, hide=false}, ref) => {
    return (
        <div className={`modal fade ${className ? className : ""}`} ref={ref} tabIndex="-1" id={id}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <Button color="light" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                </div>
                <div className="modal-body">      
                {children}
                </div>              
                <div className="modal-footer">
                    <Button color="secondary" data-bs-dismiss="modal">Close</Button>
                    {hide ? <></>   
                    : <Button color={btnColor} data-bs-dismiss="modal" onClick={() => approveFunc()}>{approveText}</Button> }             
                </div>
                </div>
            </div>
        </div>
      )
})

export default Modal