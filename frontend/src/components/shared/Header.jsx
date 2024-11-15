import React from 'react'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button';

const Header = () => {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <header className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
        <div className="flex items-center space-x-2">
          <FaUserCircle className="w-10 h-10" />
          <span className="text-lg font-semibold">Welcome, {currentUser.name}</span>
        </div>
        <div className="flex space-x-4">
          <Button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg">
            <FaSignOutAlt className="w-5 h-5 inline-block mr-2" />
            Logout
          </Button>
        </div>
      </header>
  )
}

export default Header