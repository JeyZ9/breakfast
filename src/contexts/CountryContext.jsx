import axios from 'axios';
import React, { createContext, useEffect, useReducer, useState } from 'react'
import CountryReducer from '../reducer/CountryReducer';

export const CountryContext = createContext();

const CountryProvider = ({ children }) => { // Fix typo: change 'chlidren' to 'children'

    const [countrys, setCountrys] = useState([]);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_COUNTRY_API_PATH}`);
                const data = response.data;
                setCountrys(data);
            } catch (error) {
                console.error("Error fetching country ", error);
            }
        }
        fetchCountry();
    }, []);

    const initState = {
        countrys: []
    }

    const [state, dispatch] = useReducer(CountryReducer, initState);

    useEffect(() => {
        dispatch({ type: "FETCH_COUNTRY", payload: countrys });
    }, [countrys]);

    // console.log("TEST API COUNTRY: ", countrys);

    return <CountryContext.Provider value={{ ...state, countrys }}>{children}</CountryContext.Provider>; // Fix typo: change 'chlidren' to 'children'
}

export default CountryProvider;

export const useCountry = () => {
    const context = React.useContext(CountryContext); // Fix recursive call: use React.useContext
    if (!context) {
        throw new Error("useCountry must be used within a CountryProvider")
    }
    return context;
}
