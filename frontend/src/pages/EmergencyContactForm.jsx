import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../redux/user/userSlice';

const EmergencyContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    phoneNo: '',
    relationship: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const {currentUser} = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        setLoading(true);
        const res = await fetch('/api/contact/add-contact',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(contact)
        });
        const data = await res.json();
        if (res.status === 201) {
            dispatch(updateCurrentUser(data));
            toast.success('Emergency contact added successfully.');
            setContact({ name: '', phoneNo: '', relationship: '', email: '' });
        }
        else{
            toast.error(data.message || 'Failed to add emergency contact.');
        }
    } 
    catch(err) {
        toast.error(err.message || 'Failed to add emergency contact.');
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Add Emergency Contact</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNo"
            value={contact.phoneNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Relationship</label>
          <input
            type="text"
            name="relationship"
            value={contact.relationship}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-600"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default EmergencyContactForm;
