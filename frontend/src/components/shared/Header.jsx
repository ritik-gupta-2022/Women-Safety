import React from 'react'
import { HiOutlineUser } from 'react-icons/hi'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-purple-700 text-white">
        <h1 className="text-2xl font-bold">Women Security</h1>
        <div className="flex items-center space-x-4">
          <span>User Home</span>
          <HiOutlineUser size={24} />
        </div>
    </header>
  )
}

export default Header