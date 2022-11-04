import React from 'react'
import Button from '../Button/Button'

const FormModal = ({id, title, children, btnColor, approveFunc, approveText}) => {
    return (
        <>
        <div className="modal fade" tabIndex="-1" id={id}>
        <div className="modal-dialog">
            <form className="col-md-12 go-right">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <Button color="light" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                </div>
                <div className="modal-body">      
                {children}
                </div>              
                <div className="modal-footer">
                    <Button onClick={(e) => e.preventDefault()} color="secondary" data-bs-dismiss="modal">Close</Button>
                    <Button color={btnColor} data-bs-dismiss="modal" onClick={(e) =>  {
                        e.preventDefault();
                        approveFunc();
                    }}>{approveText}</Button>
                </div>
                </div>
            </form>
            </div>
        </div>
        </>
      )
}

export default FormModal