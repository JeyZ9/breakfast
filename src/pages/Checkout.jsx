import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoAirplaneOutline } from "react-icons/io5";
import { LuArrowRight } from "react-icons/lu";
import { useTickets } from "../contexts/TicketsContext";
import CheckDetail from "../components/checkDetail";

function Checkout() {
  const { id } = useParams();
  const { tickets, formatTime, formatDateTime } = useTickets();
  const [popup, setPopup] = useState(false);

  const [ priceEffect, setPriceEffect ] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY >= 35 ? setPriceEffect(true) : setPriceEffect(false)
    })
  },[])

  const handlePopup = () => {
    setPopup(!popup);
  };

  console.log(tickets);

  const ticket = tickets.find((item) => {
    return item.ticketId === parseInt(id);
  });

  return (
    <>
      <div className="3xl:px-[20em] px-[10em] font-medium relative">
        {ticket && (
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <div
                className="my-5 rounded-2xl border border-gray-500 "
                key={ticket.ticketId}
              >
                <div className="px-5 py-5 text-sm flex justify-between font-medium">
                  <div className="font-s">
                    <div className="flex items-center gap-2 text-gray-600">
                      <h1>
                        {ticket.flight.origin.city} (
                        {ticket.flight.origin.airportCode})
                      </h1>
                      <p>
                        <LuArrowRight />
                      </p>
                      <h1>
                        {ticket.flight.destination.city} (
                        {ticket.flight.destination.airportCode})
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button onClick={() => handlePopup()} className="text-lg">
                      {popup ? <BiChevronUp /> : <BiChevronDown />}
                    </button>
                  </div>
                </div>
                {popup ? (
                  <div className="flex px-5 py-5">
                    <div className="flex flex-col text-md font-semibold text-gray-600">
                      <img
                        className="w-[5rem] rounded-[5px]"
                        src={`data:image/jpeg;base64,${ticket.flight.image.data}`}
                        alt="logo"
                      />
                      <h1>{ticket.flight.airlineName}</h1>
                      <p className="text-gray-500 text-sm">
                        {ticket.flight.flightNum}
                      </p>
                    </div>

                    <div className="grid grid-cols-3">
                      <div className="w-[12vw] grid grid-cols-2 px-5">
                        <div className="grid grid-rows-3 gap-8 items-center text-2xl text-gray-400">
                          <div className="flex justify-center items-center overflow-hidden z-10">
                            <div className="p-[4px] bg-gray-600 rounded-full"></div>
                          </div>

                          <div className="flex justify-center items-center">
                            <i className="z-50 rotate-90 flex justify-center items-center">
                              <IoAirplaneOutline className=" bg-white" />
                            </i>

                            <div className="bg-gray-500 3xl:h-[12vh] h-[16vh] w-[1px] absolute -translate-y-[0vh]"></div>
                          </div>

                          <div className="flex justify-center items-center">
                            <div className="p-[5px] border-2 border-gray-600 rounded-full overflow-hidden z-10 bg-white"></div>
                          </div>
                        </div>

                        <div className="grid grid-row-3 gap-5 ">
                          <div className="flex flex-col items-start justify-center">
                            <h2 className="font-semibold text-gray-600">
                              {formatTime(ticket.flight.departure)}
                            </h2>
                            <p className="text-[.7rem] text-gray-500 ">
                              {formatDateTime(ticket.flight.departureDate)}
                            </p>
                          </div>

                          <div className="flex items-center font-semibold text-gray-400 text-md">
                            <div className="">
                              {/* <h2>{ticket.stop_name}</h2> */}
                            </div>
                          </div>

                          <div className="flex flex-col items-start justify-center">
                            <h2 className="font-semibold text-gray-600">
                              {formatTime(ticket.flight.arrival)}
                            </h2>
                            <p className="text-[.7rem] text-gray-500">
                              {formatDateTime(ticket.flight.arrivalDate)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-start">
                        <div className="w-[25vh] text-gray-600">
                          <div className="flex gap-2 text-md font-semibold">
                            <h1>{ticket.flight.origin.city}</h1>
                            <h2>{ticket.flight.origin.airportCode}</h2>
                          </div>
                          <div className="text-sm text-gray-500">
                            <p>{ticket.flight.origin.name}</p>
                          </div>
                        </div>

                        <div className="w-[25vh] text-gray-600">
                          <div className="flex gap-2 text-md font-semibold">
                            <h1>{ticket.flight.destination.city}</h1>
                            <h2>{ticket.flight.destination.airportCode}</h2>
                          </div>
                          <div className="text-sm text-gray-500">
                            <p>{ticket.flight.destination.name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-sm flex flex-col gap-1">
                        <div className="text-gray-600">
                          <p>Cabin Baggage {ticket.baggageWeight} kg</p>
                        </div>
                        <div className="text-green-600">
                          <p>Estimated ticket issued &lt; 2 h</p>
                        </div>
                        <div className="text-green-600">
                          <p>Reschedule</p>
                        </div>
                        <div className="text-gray-400">
                          <p>Non Refundable</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="">
                <CheckDetail {...ticket} />
              </div>
            </div>

            <div className="relative">
              <div className={`flex flex-col justify-between p-5 gap-3 h-[40vh] ${priceEffect ? 'fixed my-5 top-0' : ''}`}>
                <div className={`px-5 shadow-md grid grid-rows-3 text-lg w-[22vw] h-[40vh] top-0`}>
                  <div className="border-b border-gray-500 flex items-center">
                    <h1>Price Details</h1>
                  </div>
                  <div className="flex justify-between border-b border-gray-500 text-sm items-center">
                    <div className="flex gap-1 items-center">
                      <p>Depart</p>
                      <p>({ticket.flight.origin.airportCode}</p>
                      <p>
                        <LuArrowRight />
                      </p>
                      <p>{ticket.flight.destination.airportCode})</p>
                    </div>
                    <p>฿ {ticket.price}</p>
                  </div>
                  <div className="flex justify-between items-start pt-5">
                    <h1>Total Price</h1>
                    <div className="flex flex-col items-end">
                      <h1 className="text-red-400">฿ {ticket.price}</h1>
                      <p className="text-sm text-gray-300">THB - Thai Bath</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
