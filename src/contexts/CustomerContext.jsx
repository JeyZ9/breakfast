import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import CustomerReducer from "../reducer/CustomerReducer";

export const CustomerContext = createContext()

const CustomerProvider = ({ children }) => {

    const [ customers, setCustomers ] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCustomer = async () => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_CUSTOMER_API_PATH}/get`)
                const data = response.data
                setCustomers(data)
            }catch(error){
                console.error("Error fetching customers ", error)
            }finally{
                setLoading(false)
            }
        }
        fetchCustomer()
    },[])

    // console.log("CHECK CUSTOMER LIST : ", customers)

    
    const initState = {
        customers : [],
    }

    const [state, dispatch] = useReducer(CustomerReducer, initState);

    useEffect(() => {
        dispatch({type: "SET_CUSTOMER", payload: customers})
    }, [customers])

    const loginCustomer = async (customerId) => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_CUSTOMER_API_PATH}/get/${customerId}`
            // , {
            //     params: {
            //         email: email,
            //         password: password
            //     }
            // }
            );
            const loginCustomer = response.data;
            const loginCustomers = [loginCustomer];
            setCustomers(loginCustomers);
        } catch (error) {
            console.error('Error loading customer data:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const updateCustomer = async (customerId, updatedData) => {
        try{
            setLoading(true);
            const response = await axios.put(`${import.meta.env.VITE_CUSTOMER_API_PATH}/update/${customerId}`, updatedData)
            const updatedCustomer = response.data;
            const updatedCustomers = customers.map(customer => customer.id === customerId ? updatedCustomer : customer);
            setCustomers(updatedCustomers)
        }catch{
            console.error("Error update customer ", error);
        }finally{
            setLoading(false)
        }
    }

    const registerCustomer = async (customerData) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_CUSTOMER_API_PATH}/create`, customerData);
          if (response.status === 200) {
            return { success: true, data: response.data };
          } else {
            return { success: false, error: "เกิดข้อผิดพลาดในการสมัครสมาชิก" };
          }
        } catch (error) {
          return { success: false, error: "เกิดข้อผิดพลาดในการส่งคำขอ: " + error.message };
        }
      };

    return <CustomerContext.Provider value={{...state, customers, updateCustomer, loginCustomer, registerCustomer}}>{children}</CustomerContext.Provider>
}

export default CustomerProvider

export const useCustomer = () => {
    return useContext(CustomerContext)
}