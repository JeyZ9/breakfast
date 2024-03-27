import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [customerId, setCustomerId] = useState()
  useEffect(()=>{
    const getCustomerId = () => {
      const customerId = localStorage.getItem('customerId')
      return customerId;
    }
    setCustomerId(getCustomerId())
  },[customerId, localStorage])
  console.log(customerId)
  return (
    <header className='z-50'> 
        <div className="flex justify-between px-10 py-4 font-semibold items-center shadow-md">
            <h1 className='text-2xl'><Link to={`/`}>FlightPlane</Link></h1>

            <ul className='flex justify-between w-[20vw] items-center'>
                <li className='ml-auto'><Link to={`/`}>Home</Link></li>
                <li className='ml-auto'><Link to={`/flight`}>Flight</Link></li>
                <li className='ml-auto'><Link to={`${customerId == 'null' || !customerId ? '/login' : '/profile/order/all'}`}>Orders</Link></li>
                <li className='ml-auto'><Link to={`${customerId == 'null' || !customerId ? '/login' : '/profile/myprofile'}`}>Profile</Link></li>
                {/* <li className='ml-auto'><Link to={`/profile/myprofile`}>Profile</Link></li> */}
            </ul>
            
        </div>
    </header>
  )
}

export default Header