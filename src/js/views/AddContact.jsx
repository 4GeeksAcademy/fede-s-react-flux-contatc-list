import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import React from "react";



export const AddContact = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();


    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        id: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleEditContact = (contact) => {

        const payload = {
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            address: contact.address,
        }
        let respuesta = actions.editContact(contact.id, payload)
        if (respuesta) {
            navigate('/contacts');
        }else{
            alert("Something went wrong.")
        }
    }

    const handleAddContact = async (e) => {
        e.preventDefault();

        await actions.addContact(contact);

        setContact({
            name: "",
            email: "",
            phone: "",
            address: "",
            id: 0,
        })
        navigate('/contacts')
    };

    // useEffect(() => {
    //     if (params.id && store.contacts.length > 0) {
    //         const contactoEntero = store.contacts.find((item)=>item.id === parseInt(params.id))
    //         setContact({
    //             name: contactoEntero.name,
    //             email: contactoEntero.email,
    //             phone: contactoEntero.phone,
    //             address: contactoEntero.address,
    //             id: contactoEntero.id,
    //         })
    //         setTimeout(()=>{
    //             console.log("ESTE ES EL CONTACT",contact)

    //         },1800)
    //     }

    // }, [params.id, store.contacts]);

    useEffect(() => {
        if (params.id && store.contacts.length > 0) {
            const foundContact = store.contacts.find(c => c.id == params.id);
            if (foundContact) {
                setContact(foundContact);
            }
        }
    }, [params.id, store.contacts]); // Se ejecuta cuando cambian estos valores

    return (
        <div className=" w-75 container">
            <h1>Contact List</h1>
            <form className="row gx-3 gy-2 align-items-center">
                <div className="col-sm-3">
                    <label className="visually-hidden" htmlFor="specificSizeInputName">Name</label>
                    <input name="name" value={contact.name} onChange={handleChange} type="text" className="form-control" id="specificSizeInputName" placeholder="Federico Serron" required />
                </div>
                <div className="col-sm-3">
                    <label className="visually-hidden" htmlFor="specificSizeInputGroupUsername">Email</label>
                    <div className="input-group">
                        <div className="input-group-text">@</div>
                        <input name="email" type="email" className="form-control"
                            value={contact.email} id="specificSizeInputGroupUsername" onChange={handleChange} placeholder="Email" required />
                    </div>
                </div>
                <div className="col-sm-3">
                    <label className="visually-hidden" htmlFor="specificSizeInputName">Phone</label>
                    <input name="phone" type="text" value={contact.phone} className="form-control" id="specificSizeInputName" onChange={handleChange} placeholder="+598 111 111 111" required />
                </div>
                <div className="col-sm-3">
                    <label className="visually-hidden" htmlFor="specificSizeInputName">Address</label>
                    <input name="address" type="text" className="form-control" id="specificSizeInputName" value={contact.address} onChange={handleChange} placeholder="0123 Bartels St" required />
                </div>
                <div className="col-auto">
                    <button onClick={params.id ? async () => { await handleEditContact(contact) } : handleAddContact} type="submit" className="btn btn-primary">{params.id ? 'Edit' : 'Add New Contact'}</button>
                </div>
            </form>
        </div>
    );
}