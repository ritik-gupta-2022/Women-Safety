import { useState } from 'react';
import { HiUser, HiLockClosed, HiMail, HiPhone, HiHome } from 'react-icons/hi';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { signUpFailure, signUpStart, signUpSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const {loading , error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!userDetails.username || !userDetails.password || !userDetails.email || !userDetails.phoneNo || !userDetails.address || !userDetails.name){
      toast.error("All fields are required");
      return dispatch(signUpFailure("All fields are required"));
    }

    try{
      signUpStart();

      const res = await fetch('/api/auth/user-signup', {
        method: 'POST',
        headers:{'Content-Type':'application/json' },
        body:JSON.stringify(userDetails),
      })

      const data = await res.json();

      if(data.success===false){
        toast.error(data.message);
        return dispatch(signUpFailure(data.message));
      }

      if (res.status === 201) {
        dispatch(signUpSuccess(data));
        navigate('/sign-in');
        toast.success(`Account Created Successfully`);
        
      }
    }
    catch(err){
      dispatch(signUpFailure(err.message));
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-2">
      <form onSubmit={handleSubmit} className="bg-white p-7 rounded-lg shadow-lg w-full max-w-sm transition-transform transform hover:shadow-2xl duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-gray-700">
            <HiUser className="text-gray-500 mr-2 text-xl" />
            Username
          </label>
          <Input 
            name="username" 
            value={userDetails.username} 
            onChange={handleChange} 
            placeholder="Enter your username" 
            required 
            className="shadow-md border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out" 
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-gray-700">
            <HiUser className="text-gray-500 mr-2 text-xl" />
            Name
          </label>
          <Input 
            name="name" 
            value={userDetails.name} 
            onChange={handleChange} 
            placeholder="Enter your full name" 
            required 
            className="shadow-md border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out" 
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-gray-700">
            <HiMail className="text-gray-500 mr-2 text-xl" />
            Email
          </label>
          <Input 
            type="email"
            name="email" 
            value={userDetails.email} 
            onChange={handleChange} 
            placeholder="Enter your email" 
            required 
            className="shadow-md border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out" 
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-gray-700">
            <HiLockClosed className="text-gray-500 mr-2 text-xl" />
            Password
          </label>
          <Input 
            type="password" 
            name="password" 
            value={userDetails.password} 
            onChange={handleChange} 
            placeholder="Enter your password" 
            required 
            className="shadow-md border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out" 
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-gray-700">
            <HiPhone className="text-gray-500 mr-2 text-xl" />
            Phone Number
          </label>
          <Input 
            type="tel" 
            name="phoneNo" 
            value={userDetails.phoneNo} 
            onChange={handleChange} 
            placeholder="Enter your phone number" 
            required 
            className="shadow-md border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out" 
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center mb-2 text-gray-700">
            <HiHome className="text-gray-500 mr-2 text-xl" />
            Address
          </label>
          <Input 
            name="address" 
            value={userDetails.address} 
            onChange={handleChange} 
            placeholder="Enter your address" 
            required 
            className="shadow-md border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out" 
          />
        </div>

        <Button type="submit" className="mt-4 w-full bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          Sign Up
        </Button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/signin" className="text-blue-600 hover:underline">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
