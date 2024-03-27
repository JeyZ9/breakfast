import React, { useEffect, useState } from "react";
import { useTickets } from "../contexts/TicketsContext";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoAirplaneOutline } from "react-icons/io5";
import { LuArrowRight } from "react-icons/lu";

function PaymentDetail() {
  const { tickets } = useTickets();
  const { id } = useParams();
  const [summary, setSummary] = useState(true);
  const [passenger, setPassenger] = useState(true);
  const [pricePopup, setPricePopup] = useState(false);

  const handleSummary = () => {
    setSummary(!summary);
  };

  const handlePassenger = () => {
    setPassenger(!passenger);
  };

  const handlePrice = () => {
    setPricePopup(!pricePopup);
  };

  const ticket = tickets.find((item) => item.ticketId === parseInt(id));
  // setTicket(fetchTicket)

  return (
    <div className="flex flex-col gap-10">
      {ticket && (
        <div className="h-[70vh] border border-gray-400 p-10">
          {summary && passenger && (
            <div className="overflow-y-auto h-full on-scrollbar">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col justify-between border border-gray-400 p-4 gap-5">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h1>FLIGHT CODE</h1>
                    <h1>{ticket.flight.flightNum}</h1>
                  </div>
                  <div className="flex justify-between item-center text-center">
                    <p className="flex items-center">STATUS</p>
                    <div className="text-white bg-orange-400 px-4 py-1 rounded-full">
                      NEED PAYMENT
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between border border-gray-400 p-4 gap-5">
                  <h1>PRICE DETAIL</h1>
                  <div className="flex justify-between border-b border-gray-400 pb-4 text-[.85rem]">
                    <h2>
                      DEPART ({ticket.flight.origin.airportCode} -{" "}
                      {ticket.flight.destination.airportCode})
                    </h2>
                    <div className="flex gap-2">
                      <p>฿ {ticket.price}</p>
                      <button onClick={() => handlePrice()}>
                        {pricePopup ? <BiChevronUp /> : <BiChevronDown />}
                      </button>
                    </div>
                  </div>
                  {pricePopup ? (
                    <div className="flex flex-col text-sm font-normal border-b border-gray-400 p-4">
                      <div className="flex justify-between">
                        <p>Ticket:</p>
                        <p>฿ {ticket.price}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Baggage:</p>
                        <p>฿ 0</p>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex justify-between">
                    <div className="">
                      <h1>TOTAL PRICE</h1>
                      <p className="text-[.85rem] font-normal">FOR 0 PAX</p>
                    </div>
                    <h1>฿ 0000</h1>
                  </div>
                </div>
                <div className="flex flex-col justify-between border border-gray-400 p-4 gap-5">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-400">
                    <h1>FLIGHT SUMMARY</h1>
                    <a
                      onClick={() => handleSummary()}
                      className="text-[.85rem] text-orange-400 cursor-pointer"
                    >
                      DETAIL
                    </a>
                  </div>
                  <div className="">
                    <h1 className="text-sm">DEPARTURE FLIGHT</h1>
                    <p className="text-sm font-normal">
                      {ticket.flight.origin.airportCode} -{" "}
                      {ticket.flight.destination.airportCode}
                    </p>
                    <p className="text-[.85rem] text-gray-500">
                      {ticket.flight.departureDate}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between border border-gray-400 p-4 gap-5">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-400">
                    <h1>PASSENGERS</h1>
                    <a
                      onClick={() => handlePassenger()}
                      className="text-[.85rem] text-orange-400 cursor-pointer"
                    >
                      DETAIL
                    </a>
                  </div>
                  <div className="flex justify-between items-center font-medium text-gray-500">
                    <h2 className="text-sm">Mr.WISARUT SAELAO</h2>
                    <p className="text-[.85rem]">CLIENT</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {summary === false && (
            <div className="overflow-y-auto h-full on-scrollbar">
              <button
                className="text-2xl text-orange-400"
                onClick={() => handleSummary()}
              >
                <MdKeyboardBackspace />
              </button>
              <h1 className="flex justify-center border-b">FLIGHT SUMMARY</h1>
              <div className="">
                <div className="my-5 rounded-2xl border border-gray-500 flex flex-col">
                  <div className="px-5 py-5 text-sm flex justify-between font-medium">
                    <div className="">
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
                  </div>
                  <div className="flex flex-col px-5 py-5 gap-5">
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

                    <div className="flex flex-col gap-6">
                      <div className="w-auto flex flex-col gap-5">
                        <div className="grid grid-cols-2">
                          <div className="flex flex-col items-start justify-center">
                            <h1>DEPARTURE</h1>
                            <h2 className="font-semibold text-gray-600">
                              {ticket.flight.departure}
                            </h2>
                            <p className="text-[.7rem] text-gray-500 ">
                              {ticket.flight.departureDate}
                            </p>
                          </div>

                          {/* <div className="flex items-center font-semibold text-gray-400 text-md">
                              <div className="">
                                <h2>{ticket.flight.direct}</h2>
                              </div>
                            </div> */}

                          <div className="flex flex-col items-start justify-center">
                            <h1>ARRIVAL</h1>
                            <h2 className="font-semibold text-gray-600">
                              {ticket.flight.arrival}
                            </h2>
                            <p className="text-[.7rem] text-gray-500">
                              {ticket.flight.arrivalDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-start gap-5">
                        <div className="w-[25vh] text-gray-600">
                          <h1>ORIGIN</h1>
                          <div className="flex gap-2 text-md font-semibold">
                            <h1>{ticket.flight.origin.city}</h1>
                            <h2>{ticket.flight.origin.airportCode}</h2>
                          </div>
                          <div className="text-sm text-gray-500">
                            <p>{ticket.flight.origin.name}</p>
                          </div>
                        </div>

                        <div className="w-[25vh] text-gray-600">
                          <h1>DESTINATION</h1>
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
                        <h1>DETAIL</h1>
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
                </div>
              </div>
            </div>
          )}
          {passenger === false && (
            <div className="h-[30vh]">
              <button
                className="text-2xl text-orange-400"
                onClick={() => handlePassenger()}
              >
                <MdKeyboardBackspace />
              </button>
              <h1 className="flex justify-center border-b mb-5">PASSENGERS</h1>
              <div className="h-full flex flex-col">
                <div className="grid grid-cols-2 my-auto">
                  <div className="">
                    <h1>FRIEST NAME</h1>
                    <p>xxxxxxxxxx</p>
                  </div>
                  <div className="my-auto">
                    <h1>SURNAME</h1>
                    <p>xxxxxxxxxx</p>
                  </div>
                </div>
                <div className="my-auto">
                  <h1>EMAIL</h1>
                  <p>xxxxx@gmail.com</p>
                </div>
                <div className="my-auto">
                  <h1>PHONE NUMBERS</h1>
                  <p>+66000000000</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <button className="py-5 flex justify-center items-center w-full border-4 font-bold text-lg text-orange-400 border-orange-400">
        Pay Now
      </button>
    </div>
  );
}

export default PaymentDetail;
