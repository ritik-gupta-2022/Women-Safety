import React from 'react';
import { AlertCircle } from 'lucide-react'; 
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AlertIcon = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const handleClick = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      const coords = [position.coords.longitude, position.coords.latitude];
      console.log(coords);
      const res = await fetch('api/feature/send-alert',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({lon:position.coords.longitude, lat:position.coords.latitude})
      }); 

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

  return ( currentUser && !currentUser?.isAdmin && 
    <div
      onClick={handleClick}
      className="fixed bottom-4 right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer text-white hover:bg-red-600 transition-colors"
    >
      <AlertCircle className="w-6 h-6" /> {/* ShadCN icon */}
    </div>
  );
};

export default AlertIcon;
