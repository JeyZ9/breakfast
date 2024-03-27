import React from 'react'
import { LuArrowRight } from "react-icons/lu";
import { Link } from 'react-router-dom';

function CheckDetail(props) {
  return (
    <>
        <div className="my-5 rounded-2xl border border-gray-500 px-5 py-5">
            <h1 className='text-xl text-gray-700'>Passenger Details</h1>
            <p className='my-4 text-orange-400'>Nams as on ID card/passport without title and punctuation.</p>
            <h2 className='my-4 text-lg text-gray-700'>Client</h2>
            <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col">
                    <label htmlFor="Name" className='text-sm text-gray-700 font-normal'>First/ Given Name</label>
                    <input type="text" id='Name' placeholder='ex.Parkpoom' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400' />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="surName" className='text-sm text-gray-700 font-normal'>Last Name/ Surname</label>
                    <input type="text" id='surName' placeholder='ex.Jaidee' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400' />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Title" className='text-sm text-gray-700 font-normal'>Title</label>
                    <select id='Title' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400'>
                        <option value="">Mr</option>
                        <option value="">Mrs</option>
                        <option value="">Ms</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Date" className='text-sm text-gray-700 font-normal'>Date of Birth</label>
                    <input type="date" id='Date' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400'/>
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="Nationality" className='text-sm text-gray-700 font-normal'>Nationality</label>
                    <select id='Nationality' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400'>
                        <option value="TH">Thailand</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="my-5 rounded-2xl border border-gray-500 px-5 py-5">
            <h1 className='mb-4 text-xl text-gray-700'>Contact Details</h1>
            <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col">
                    <label htmlFor="NameContact" className='text-sm text-gray-700 font-normal'>First/ Given Name</label>
                    <input type="text" id='NameContact' placeholder='ex.Parkpoom' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400' />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="surNameContact" className='text-sm text-gray-700 font-normal'>Last Name/ Surname</label>
                    <input type="text" id='surNameContact'placeholder='ex.Jaidee' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400' />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Title" className='text-sm text-gray-700 font-normal'>Title</label>
                    <select id='Title' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400'>
                        <option value="">Mr</option>
                        <option value="">Mrs</option>
                        <option value="">Ms</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className='text-sm text-gray-700 font-normal'>Email</label>
                    <input type="email" id='email' placeholder='example@gmail.com' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400'/>
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="Nationality" className='text-sm text-gray-700 font-normal'>Nationality</label>
                    <div className="flex">
                        <select id='Nationality' className='border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400'>
                            <option value="+66">+66</option>
                        </select>
                        <input type="text" placeholder='ex.654890462' className='px-2 border-b border-orange-400 outline-none hover:border-orange-500 text-gray-400' />
                    </div>
                </div>
            </div>
        </div>
        <div className="my-5 rounded-2xl border border-gray-500 px-5 py-5">
            <h1 className='mb-4 text-xl text-gray-700'>Add ons</h1>
            <div className="mb-4 p-4 flex bg-orange-100 rounded-[5px]">
                <p className='font-normal'>Depart:</p>
                <div className='flex items-center w-[40%] justify-between'>
                    <h1>
                        {props.flight.origin.city} (
                        {props.flight.origin.airportCode})
                    </h1>
                    <p>
                        <LuArrowRight />
                    </p>
                    <h1>
                        {props.flight.destination.city} (
                        {props.flight.destination.airportCode})
                    </h1>
                </div>
            </div>
            <div className="flex text-center items-center mb-4">
                <h1 className='p-1 text-center'>{props.flight.origin.airportCode}-{props.flight.destination.airportCode}</h1>
                <p className='font-bold text-gray-400 p-1'> | </p>
                <img src={`data:image/jpeg;base64,${props.flight.image.data}`} className='w-[2rem] h-[2rem] p-1 rounded-full' alt="" />
                <h1 className='font-normal p-1'>{props.flight.flightNum}</h1>
            </div>
            <div className="flex flex-col">
                <label className='text-sm text-gray-400' htmlFor="baggage">Client</label>
                <select id="baggage" className='text-gray-500 border border-gray-400 outline-none w-[35%] rounded-[5px] flex item-center mb-4'>
                    <option value="">No Additional Baggage</option>
                    <option value="">+15kg</option>
                    <option value="">+20kg</option>
                    <option value="">+25kg</option>
                    <option value="">+30kg</option>
                </select>
            </div>
        </div>
        <div className="flex flex-col h-[15vh] justify-between">
            <div className="flex items-center text-center">
                <input type="checkbox" name="" id="" />
                <p className='mx-1 font-normal text-gray-600'>I want to receive Flightplan's exclusive promotions via newsletter.</p>
            </div>
            <p className='font-normal text-gray-600'>By clicking the "Checkout" button, you have agreed to terms and conditions of Flightplan.</p>
            <Link to={`/tickets/payment/${props.ticketId}`} className="flex justify-end items-center">
                <button className='text-white py-2 px-20 rounded-[5px] bg-orange-500'>Checkout</button>
            </Link>
        </div>
    </>
  )
}

export default CheckDetail