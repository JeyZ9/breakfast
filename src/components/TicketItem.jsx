import React from 'react'
import { IoAirplaneOutline } from 'react-icons/io5';
import { LuBaggageClaim } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useTickets } from '../contexts/TicketsContext';

function TicketItem(props) {

    const {formatTime} = useTickets();

  return (
    <>
        <div className="my-5 text-gray-700">
            <div className="rounded-[5px] flex px-5 py-5 bg-white hover:shadow-lg">
                <div className="w-[5rem]">
                    <img src={`data:image/jpeg;base64,${props.flight.image.data}`} className='rounded-[5px] w-[5vw]' alt="logo" />
                </div>

                <div className="grid grid-cols-3 w-full">
                    <div className="flex flex-col justify-between px-5">
                        <div className="text-2xl font-semibold">
                            <h1>{props.flight.airlineName}</h1>
                        </div>

                        <div className="flex gap-5 justify-between">
                            <div className="">
                                <h2>{formatTime(props.flight.departure)}</h2>
                                <p className='text-[.7rem] text-gray-500'>{props.flight.origin.airportCode}</p>
                            </div>
                            <div className="flex items-center text-2xl text-gray-400">
                                <i><IoAirplaneOutline /></i>
                            </div>

                            <div className="">
                                <h2>{formatTime(props.flight.arrival)}</h2>
                                <p className='text-[.7rem] text-gray-500'>{props.flight.destination.airportCode}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end justify-end">
                        <div className="w-full flex items-center justify-around">
                            <div className="">
                                <h3>0000</h3>
                                <p className='text-[.7rem] text-gray-500'>{props.stop.stop_name}</p>
                            </div>
                            <div className="text-gray-500 text-2xl">
                                <i><LuBaggageClaim /></i>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end justify-end">
                        <div className="flex">
                            <div className="flex items-center">
                                <div className="flex items-center">     
                                    <h1 className='text-sm font-semibold'>฿ {props.price}</h1>
                                    <p className='text-xs text-gray-500'>/Pax</p>
                                </div>
                            </div>
                            <Link to={`/tickets/booking/${props.ticketId}/${props.flight.origin.city}/${props.flight.destination.city}`}>
                                <button className='ml-5 px-5 py-1 rounded-lg bg-orange-400 hover:bg-orange-600 text-white'>Select</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TicketItem