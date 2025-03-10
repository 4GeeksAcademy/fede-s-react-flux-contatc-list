import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../component/Modal.jsx";

import { Context } from "../store/appContext";

export const Contacts = () => {

    const { store, actions } = useContext(Context);

    const handleDeleteContact = async (id) => {
        await actions.deleteContact(id);
    };

    useEffect(() => {
        actions.getContacts()
    }, []);


    return (
        <div className="list-group w-75 container">
            <h1 className="mb-4">Contact List</h1>
            <Link className="btn btn-primary w-25 mb-4" to={"/addcontact/"}>Add Contact +</Link>

            {/* <!-- Contact --> */}
            {store && store.contacts?.map((contact, index) => {
                return (
                    <div key={index} className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{contact.name}</h5>
                            <div className="row text-center">
                                <span><Link to={"/editcontact/" + contact.id}><i className="fa-solid fa-pen-to-square edit-icon"></i></Link></span>
                                <span><i type="button" className="fa-solid fa-trash delete-icon" data-bs-toggle="modal" data-bs-target={"#exampleModal" + index}>
                                </i></span>
                                <Modal index={index} contactName={contact.name} action={() => { handleDeleteContact(contact.id) }} />
                            </div>
                        </div>
                        <p className="mb-1"><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
                        <p className="mb-1"><i className="fa-solid fa-envelope"></i> {contact.email}</p>
                        <small><i className="fa-solid fa-phone"></i> {contact.phone}</small>
                    </div>
                );
            })}

        </div>
    )
}