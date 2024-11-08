import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {Label} from '../components/ui/label';
import {Button} from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ComplaintRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0); // Add a state for key to reset form
  const {currentUser} = useSelector((state)=> state.user);

  const [formData, setFormData] = useState({
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.description || !formData.location){
      toast.error("All fields are required");
      return setError("All fields are required");
    }

    try{
      setLoading(true);

      const res = await fetch('/api/complaint/register-complaint',{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(formData),
      })

      const data = await res.json();

      if(res.status===201){
        setLoading(false);
        setError(null);
        toast.success("Complaint registered Successfully");
      }
      else{
        setLoading(false);
        setError(data.message);
        toast.error(data.message);
      }

     
    }
    catch(err){
      setLoading(false);
      setError(err.message);
      toast.error(err.message);
    }
  };
    return (
        <div className="flex justify-center mt-10">
          <Card className="w-full max-w-lg p-4 shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Register Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" >
                {/* name */}
                <Label htmlFor="name" className="block text-sm font-medium">
                  Name
                </Label>
                <Input
                  type="text"
                  value={currentUser.name}
                  className="w-full"
                  disabled
                />

                {/* email */}
                <Label htmlFor="name" className="block text-sm font-medium">
                  Email
                </Label>
                <Input
                  type="email"
                  value={currentUser.email}
                  className="w-full"
                  disabled
                />

                {/* phone */}
                <Label htmlFor="name" className="block text-sm font-medium">
                    Phone No.
                </Label>
                <Input
                  type='number'
                  value={currentUser.phoneNo}
                  className="w-full"
                  disabled
                />

                {/* Description */}
                <Label htmlFor="description" className="block text-sm font-medium">
                  Description
                </Label>
                <Input
                  as="textarea"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Describe your complaint"
                  required
                />
    
               
    
                {/* Location */}
                <Label htmlFor="location" className="block text-sm font-medium">
                  Location
                </Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter location"
                  required
                />
    
    
                {/* Submit Button */}
                <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                  Submit Complaint
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    };

export default ComplaintRegister