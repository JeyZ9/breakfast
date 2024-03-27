import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {useTickets} from '../contexts/TicketsContext'
import TicketItem from '../components/TicketItem';
import FilterBar from '../components/FilterBar';
import Loading from '../components/Loading';
import Search from '../components/Search';

function TicketCard() {
    const {title} = useParams()
    const { tickets } = useTickets()
    const [ticketItem, setTicketItem ] = useState([])

    const [stop, setStop] = useState({
        direct: false,
        transit: false,
        one: false
      });
      const [airline, setAirline] = useState([
        { name: "Bangkok Airways", checked: false, price: 1000 },
        { name: "Thai AirAsia", checked: false, price: 1000 },
        { name: "Thai Airways", checked: false, price: 1000 },
        { name: "Thai Lion Air", checked: false, price: 1000 },
        { name: "Thai Vietjet Air", checked: false, price: 1000 }
      ]);
      const [departure, setDeparture] = useState([
        { name: "Early Flight", checked: false, price: 1000 },
        { name: "Morning Flight", checked: false, price: 1000 },
        { name: "Afternoon Flight", checked: false, price: 1000 },
        { name: "Night Flight", checked: false, price: 1000 }
      ]);
    
      useEffect(() => {
        const fetchTicket = tickets.filter(item => {
        if(item.flight.destination.city.toLowerCase() === title.toLowerCase()){
          if ((stop.direct && item.stop.stop_name === "Direct") ||
              (stop.transit && item.stop.stop_name === "Transit") ||
              (stop.one && item.stop.stop_name === "One stop")) {
            return true;
          }
          // some คือตรวจสมาชิกใน array ว่ามีค่าใดเป็น true และ ชื่อตรงใน database
          if (airline.some(airlineItem => airlineItem.checked && airlineItem.name === item.flight.airlineName)) {
            return true;
          }
          if (departure.some(departureItem => departureItem.checked && departureItem.name === item.flight.departure)) {
            return true;
          }
        //   ค่าเป็นเท็จแสดงทั้งหมด
          if(!stop.direct && !stop.transit && !stop.one &&
            !airline.some(airline => airline.checked) &&
            !departure.some(departureItem => departureItem.checked)
          ){
            return true;
          }
        }
          return false;
        });
        setTicketItem(fetchTicket);
      }, [tickets, stop, airline, departure]);
    
    //   ใช้ค่า name เป็น key และ value เป็นค่าใหม่ที่เราได้รับจาก checkbox ที่เปลี่ยนแปลงแล้ว
      const handleStopChange = (name, value) => {
        setStop(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
    //  prevState คือค่าของ state airline ก่อนที่เราจะทำการอัปเดต
    // const updatedAirline = [...prevState]; จะทำการสร้างคัดลอกของอาร์เรย์ airline เพื่อให้เราได้มีการอัปเดตค่าที่เปลี่ยนแปลงได้อย่างถูกต้อง
    // updatedAirline[index].checked = value; คือการอัปเดตค่าของ checkbox ในตำแหน่งที่ระบุด้วย index เป็น value ที่เราได้รับจากการเปลี่ยนแปลงของ checkbox
      const handleAirlineChange = (index, value) => {
        setAirline(prevState => {
          const updatedAirline = [...prevState];
          updatedAirline[index].checked = value;
          return updatedAirline;
        });
      };
    
      const handleDepartureChange = (index, value) => {
        setDeparture(prevState => {
          const updatedDeparture = [...prevState];
          updatedDeparture[index].checked = value;
          return updatedDeparture;
        });
      };
  return (
    <div className='flex flex-col items-center justify-start h-auto gap-y-10 bg-orange-100'>
            <Search/>
        <div className="grid grid-rows-1 grid-cols-3 max-w-[70vw] gap-1 my-auto h-screen">
            <div className="">
                {/* <FilterBar /> */}
                <FilterBar {...tickets} handleAirlineChange={handleAirlineChange} handleDepartureChange={handleDepartureChange} handleStopChange={handleStopChange} stop={stop} airline={airline} departure={departure} setAirline={setAirline} setDeparture={setDeparture} setStop={setStop}/>
            </div>

            <div className="col-span-2 overflow-y-auto overflow-x-hidden on-scrollbar">
                {ticketItem.map((item) =>{
                    return <TicketItem {...item} key={item.ticketId} />
                })}
                {ticketItem.length === 0 &&
                <div className="w-full flex justify-center items-center h-[80vh]">
                    <Loading />
            </div>
            }
            </div>

        </div>
    </div>
  )
}

export default TicketCard;