import React from 'react'
import favorite from '../assets/favorite.png' 

function Traveler() {
  return (
    <>
        <div className='mx-10 my-20 text-gray-600 flex flex-col gap-y-4'>
            <h1 className='text-2xl font-bold'>Contact List</h1>
            <div className="bg-white p-5 text-gray-500 rounded-[5px] flex justify-center">
                <div className="flex flex-col justify-center items-center w-[40%] text-center gap-4">
                    <img src={favorite} alt="favorite icon" className='w-[10em]' />
                    <h2 className='text-gray-700 font-semibold text-md'>Let’s Save Your Passenger Data</h2>
                    <p className='text-md'>You can simply choose your saved passenger information from here in the booking process</p>
                    <button className='bg-orange-400 px-4 py-2 text-sm rounded-[5px] font-semibold text-white hover:bg-orange-600'>+ Add Passenger</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Traveler