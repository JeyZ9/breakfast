import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import seo from '../assets/seo.png';
import { Link } from 'react-router-dom';

function MyOrder() {
    const [status, setStatus] = useState({
        all: true,
        issued: false,
        confirmed: false,
        waiting: false,
        cancelled: false
    });

    const handleStatusChange = (newStatus) => {
        setStatus({
            all: false,
            issued: false,
            confirmed: false,
            waiting: false,
            cancelled: false,
            ...newStatus
        });
    };

    return (
        <div className='w-[60vw] text-gray-600'>
            <div className="mx-10 my-5 flex flex-col bg-white px-5 rouneded-[5px]">
                <div className="flex justify-between py-5">
                    <h1 className='text-2xl font-bold'>My Order List</h1>
                    <div className="flex items-center gap-2">
                        <input id='search_or' type="text" placeholder='Input your flight Code.' className='text-sm px-2 py-2 w-[14vw] border-2 rounded-[5px] focus:outline-orange-500' />
                        <button className='p-2 bg-orange-500 rounded-[5px] text-2xl text-white'><CiSearch /></button>
                    </div>
                </div>
                <div className="">
                    <ul className='flex gap-x-10'>
                        {Object.entries(status).map(([key, value]) => ( // loop object ออกมาเป็น key: value (all: false)
                            <li key={key} className={`text-sm ${value ? 'text-orange-500 border-b-2' : ''} border-orange-500 p-4`}>
                                <button onClick={() => handleStatusChange({ [key]: true })}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-10 gap-y-4">
                <img className='w-[10vw]' src={seo} alt="" />
                <h1 className='text-2xl font-semibold'>There's no order history.</h1>
                <p className='text-md font-medium text-gray-400'>You can try finding your order or create a new booking</p>
                <label htmlFor='search_or' className='text-sm font-medium text-white bg-orange-400 hover:bg-orange-600 px-10 py-2 rounded-[5px]'>Find Your Order</label>
                <div className="flex text-xs gap-5">
                    <Link className='border-b border-gray-600' to={`/`}>Book a flight</Link>
                    <Link className='border-b border-gray-600'>Book a hotel</Link>
                </div>
            </div>
        </div>
    );
}

export default MyOrder;
