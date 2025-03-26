import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const EditContact = () => {
  const { id } = useParams(); 
  const { store, dispatch } = useGlobalReducer(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    const contactToEdit = store.contacts.find((contact) => contact.id === parseInt(id));
    if (contactToEdit) {
      setForm(contactToEdit);
    }
  }, [id, store.contacts]);
  const formChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone || !form.email) {
      alert("Please fill out all fields before saving.");
      return;
    }
    fetch(`https://playground.4geeks.com/contact/agendas/SMartinGonzalez/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update contact");
        }
        return response.json();
      })
      .then((updatedContact) => {
        dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
        navigate("/");
      })
      .catch((error) => console.error("Error updating contact:", error));
  };
  return (
  <div className='container mt-4'>
          <h1>Edit Contact</h1>
          <form onSubmit={formSubmit} className='mt-3'>
            <div className='mb-3'>
              <label className='form-label'>Full Name</label>
              <input type="text" className='form-control' name="name" placeholder='Ente full name' value={form.name} onChange={formChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Address</label>
              <input type="text" className='form-control' name="address" placeholder='Enter full address' value={form.address} onChange={formChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Phone</label>
              <input type="tel" className='form-control' name="phone" placeholder='Enter phone number' value={form.phone} onChange={formChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input type="email" className='form-control' name="email" placeholder='Enter email' value={form.email} onChange={formChange} />
            </div>
            <button type='submit' className='btn btn-primary'>Save Contact</button>
            <Link to="/">
              <p className='mt-2'>Go back to contacts</p>
            </Link>
          </form>
      </div>
    )
  }

export default EditContact