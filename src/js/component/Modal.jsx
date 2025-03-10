import React from "react";

export const Modal = (props) => {
    return (
        <div>


            <div className="modal fade" id={"exampleModal"+props.index} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Contact?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Do you really want to delete the contact {props.contactName}?
                        </div>
                        <div className="modal-footer">
                            <button onClick={props.action} type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, I am sure</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}