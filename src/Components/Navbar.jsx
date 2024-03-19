import React from 'react'

export default function Navbar() {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer'>Home</li>
        <li className='cursor-pointer'>Your Todos</li>
        </ul>  
    </nav>
  )
}
