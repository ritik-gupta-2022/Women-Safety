import React from 'react';
import axios from 'axios';
import { AlertCircle } from 'lucide-react'; // ShadCN icon
import { toast } from 'react-toastify';

const AlertIcon = () => {
  // Function to handle the API call on icon click
  const handleClick = async () => {
    try {
      const res = await fetch('api/feature/send-alert'); // Replace with your API URL
      const data = await res.json();
      if(res.status===200){
        toast.success("SOS Alert sent to your emergency contacts");
      }
      else{
        toast.error(data.message);
      }
    } 
    catch (err) {
      toast.error(err.message);
      console.error('Error calling API:', err);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-4 right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer text-white hover:bg-red-600 transition-colors"
    >
      <AlertCircle className="w-6 h-6" /> {/* ShadCN icon */}
    </div>
  );
};

export default AlertIcon;
