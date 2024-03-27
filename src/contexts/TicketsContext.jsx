import React, { createContext, useState, useEffect, useContext, useReducer } from "react";
import TicketReducer from '../reducer/TicketReducer';
import axios from "axios";

export const TicketsContext = createContext();

const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  // get data from api
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tickets/get");
        const data = response.data;
        setTickets(data);
        // console.log("data log : ", data)
      } catch (error) {
        console.error("Error fetching tickets", error);
      }
    };
    fetchTickets();
  }, []);

  // console.log("CHECK ARRAY  : ", tickets)

  // object
  const initState = {
    tickets: [],
    inputMin: '',
    inputMax: '',
  };

  const [state, dispatch] = useReducer(TicketReducer, initState);

  // fetch Ticket all conponent
  useEffect(() => {
    dispatch({ type: "SET_TICKETS", payload: tickets });
  }, [tickets]);

  // input min price in filterBar
  const handleMin = (e) => {
    dispatch({
      type: "MIN_PRICE",
      payload: e.target.value
    })
  }

  // input max price in filterBar
  const handleMax = (e) => {
    dispatch({
      type:"MAX_PRICE",
      payload: e.target.value
    })
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const formattedTime = `${hours}.${minutes}`;
    return formattedTime;
  };

  const formatDateTime = (dateTime) => {
    const currentDateTime = new Date(dateTime);
    return currentDateTime.toLocaleDateString();
  }

  return <TicketsContext.Provider value={{ ...state, handleMin, handleMax, formatTime, formatDateTime }}>{children}</TicketsContext.Provider>;
};

export default TicketsProvider;

export const useTickets = () => {
  return useContext(TicketsContext);
};
