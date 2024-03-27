import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTickets } from "../contexts/TicketsContext";

function FilterBar({handleAirlineChange,handleDepartureChange,handleStopChange, departure, airline, stop ,setStop, setAirline, setDeparture}) {

  const {inputMin, handleMin, inputMax, handleMax} = useTickets()

  const [ stopDrop, setStopDrop ] = useState(false)
  const handlePrice = () => {
    setStopDrop(!stopDrop)
  }

  const [ airlineDrop, setAirlineDrop ] = useState(false)
  const handleAirline = () => {
    setAirlineDrop(!airlineDrop)
  }

  const [ departureDrop, setDepartureDrop ] = useState(false)
  const handleDepartureDrop = () => {
    setDepartureDrop(!departureDrop)
  }

  const resetBtn = () => {
      handleMin({ target: { value: '' } });
      handleMax({ target: { value: '' } });

      setStop({ direct: false, transit: false, oneStop: false });

      const resetAirline = airline.map(item => ({ ...item, checked: false }));
      setAirline(resetAirline);

      const resetDeparture = departure.map(item => ({ ...item, checked: false }));
      setDeparture(resetDeparture);

      // setDepartureDrop(false);
      // setAirlineDrop(false);
      // setStopDrop(false);
  }

  return (
    <div className="flex justify-end text-gray-700">
      <div className="w-[70%] px-5 bg-white py-4 rounded-[5px]">
        <div className="flex justify-between font-semibold">
          <h1 className="">Filter</h1>
          <button className="hover:text-red-400" onClick={resetBtn}>Reset</button>
        </div>

        <div className="border-b border-gray-500 font-semibold py-4">
          <div className="flex justify-between">
            <h1>Stop</h1>
            <button onClick={() => handlePrice()}>
              {stopDrop?(
              <BiChevronUp />
              ):(
              <BiChevronDown />
              )}
            </button>
          </div>

          {stopDrop &&(
            <>
              {Object.keys(stop).map((key, index) => (
                <div key={index}>
                  <input type="checkbox" checked={stop[key]} onChange={e => handleStopChange(key, e.target.checked)} />
                  <label>{key}</label>
                </div>
              ))}
            </>
          )}

        </div>

        <div className="border-b border-gray-500 py-4">
          <h1 className="font-semibold">Price</h1>
          <div className="flex justify-between items-center py-1">
            <div className="flex justify-start">
              <input
                className="w-[90%] px-2 text-gray-500 shadow-md border-none outline-none rounded-md bg-transparent"
                type="text"
                placeholder="Min"
                value={inputMin}
                onChange={handleMin}

              />
            </div>
            <p>To</p>
            <div className="flex justify-end">
              <input
                className="w-[90%] px-2 text-gray-500 shadow-md border-none outline-none rounded-md bg-transparent"
                type="text"
                placeholder="Max"
                value={inputMax}
                onChange={handleMax}
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-500 py-4">
          <div className="flex justify-between">
            <h1 className="font-semibold">Airline</h1>
            <button onClick={() => handleAirline()}>
              {airlineDrop ? (
              <BiChevronUp />
              ):(
              <BiChevronDown />
              )}
            </button>
          </div>
          {airlineDrop && (
            <>
              {airline.map((item, index) => (
                <div key={index}>
                  <input type="checkbox" checked={item.checked} onChange={e => handleAirlineChange(index, e.target.checked)} />
                  <label>{item.name}</label>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="py-4 border-b border-gray-500">
          <div className="flex justify-between">
            <h1 className="font-semibold">Departure Time</h1>
            <button onClick={() => handleDepartureDrop()}>
              {departureDrop ? (
              <BiChevronUp />
              ):(
              <BiChevronDown />
              )}
            </button>
          </div>
          {departureDrop&&(
              <>
                {departure.map((item, index) => (
                  <div key={index}>
                    <input type="checkbox" checked={item.checked} onChange={e => handleDepartureChange(index, e.target.checked)} />
                    <label>{item.name}</label>
                  </div>
                ))}
              </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
