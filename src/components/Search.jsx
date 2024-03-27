import React, { useContext, useEffect, useState } from 'react'
import { FaExchangeAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Search() {
    const [ date, setDate ] = useState('')
    const currentDate = new Date()
    const dateNow = currentDate.toISOString().split("T")[0]

    const [ change, setChange ] = useState(true)
    const [ origin_select, setOrigin_select ] = useState('')
    const [ destination_select, setDestination_select] = useState('')
    
    useEffect(() => {
        if(change){
            setOrigin_select(destination_select)
            setDestination_select(origin_select)
        }
        setChange(true)
    },[change])

    const handleChange = () => {
        setChange(!change)
    }

  return (
    <div className='px-4 py-4 shadow-md min-w-[70vw] mt-6 bg-white text-gray-700'>
        <div className="my-1">
            <h1 className='text-2xl font-bold'>Flight</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, eius.</p>
        </div>

        <div className="flex my-1">
            <div className="flex justify-between m-auto">
                <div className="rounded-[5px] flex flex-col border py-1 px-3 border-gray-400 min-w-[14vw] mx-1">
                    <label htmlFor="origin">Origin</label>
                    <input type='text' className='outline-none' value={origin_select} onChange={(e) => setOrigin_select(e.target.value)} id='origin' />
                </div>

                <div className="relative flex justify-center items-center">
                    <div className="absolute">
                        <button onClick={handleChange} className={`bg-orange-500 hover:bg-orange-600 p-[4px] flex justify-center items-center rounded-full text-[10px] text-white`}><FaExchangeAlt /></button>
                    </div>
                </div>

                <div className="rounded-[5px] flex flex-col border py-1 px-3 border-gray-400 min-w-[14vw] mx-1">
                    <label htmlFor="destination">Destination</label>
                    <input type='text' className='focus:outline-none' value={destination_select} onChange={(e) => setDestination_select(e.target.value)} id='destination' />
                </div>
            </div>

                <div className="rounded-[5px] flex flex-col border py-1 px-3 border-gray-400 min-w-[14vw] m-auto">
                    <label htmlFor="date">Date</label>
                    <input type='date' className='outline-none' value={date > dateNow &&  date !== '' ? date : dateNow} onChange={(e) => setDate(e.target.value)} id='date' />
                </div>
                
                <Link className='m-auto' to={`/tickets${origin_select && destination_select != '' && origin_select.toLowerCase() !== destination_select.toLowerCase() ? '/' + origin_select : ''}/to${destination_select.toLowerCase() !== origin_select.toLowerCase() ? '/' + destination_select : ''}`}>
                    <button disabled={origin_select === '' || destination_select === '' ? true : false} className={`bg-orange-400 hover:bg-orange-600 min-w-[14vw] py-1 rounded-[5px] text-white`}>Search</button>
                </Link>
        </div>
    </div>
  )
}

export default Search