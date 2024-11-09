import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { HiUser, HiLockClosed } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

const SignIn = () => {
  const {loading , error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!credentials.username || !credentials.password){
        toast.error('Please fill out all fields');
      return dispatch(signInFailure('Please fill out all fields'));
    }

    try{

      dispatch(signInStart());

      const res = await fetch('/api/auth/user-signin', {
        method : 'POST',
        headers :{ 'Content-Type' : 'application/json'},
        body:JSON.stringify(credentials)
      })

      const data = await res.json();

      if(res.ok){
        console.log(data)
        toast.success(`Welcome back ${data.name}`);
        dispatch(signInSuccess(data));
        navigate('/');
      }
      else{
        toast.error(data.message);
        console.log(data.message);
        dispatch(signInFailure(data.message));
      }
    }
    catch(err){
      toast.error(err.message);
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm transition-transform transform  hover:shadow-2xl duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back!</h2>
        
        <div className="mb-4">
          <label className="flex items-center mb-2 text-gray-700">
            <HiUser className="text-gray-500 mr-2 text-xl" />
            Username
          </label>
          <Input 
            name="username" 
            value={credentials.username} 
            onChange={handleChange} 
            placeholder="Enter your username" 
            required 
            className="shadow-md border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out" 
          />
        </div>
        
        <div className="mb-6">
          <label className="flex items-center mb-2 text-gray-700">
            <HiLockClosed className="text-gray-500 mr-2 text-xl" />
            Password
          </label>
          <Input 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            placeholder="Enter your password" 
            required 
            className="shadow-md border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out" 
          />
        </div>

        <Button type="submit" className="mt-4 w-full bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          Log In
        </Button>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
