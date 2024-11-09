import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../redux/user/userSlice';

const EmergencyContactDetails = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const res = await fetch('api/contact/get-contacts');
        const data = await res.json();
        if(res.status===200){
            setContacts(data);
        }
        else{
            toast.error(data.message || 'Failed to fetch emergency contacts');
        }
      } 
      catch(err){
        toast.error(err.message || 'Failed to fetch emergency contacts');
      }
      finally{
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
        console.log(id);
        const res = await fetch(`api/contact/delete-contact/${id}/${currentUser._id}`, {method:'DELETE'});
        const data = await res.json();
        console.log(data);
        if(res.status===200){
            toast.success("Contact deleted Successfully");
            setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
            dispatch(updateCurrentUser(data));
        }
        else{
            toast.error(data.message || 'Failed to delete emergency contacts');
        }
    } 
    catch (err) {
        toast.error(err.message || 'Failed to fetch emergency contacts');
    }
  };

  if (loading) return <p>Loading contacts...</p>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Emergency Contacts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">{contact.name}</h2>
            <p className="text-gray-600"><strong>Phone:</strong> {contact.phoneNumber}</p>
            <p className="text-gray-600"><strong>Relationship:</strong> {contact.relationship}</p>
            <p className="text-gray-600"><strong>Email:</strong> {contact.email}</p>
            <button
              onClick={() => handleDelete(contact.id)}
              className="mt-4 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContactDetails;
