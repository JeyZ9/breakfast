// CreditForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreditForm = () => {
    const [customerData, setCustomerData] = useState({ name: '', email: '' });

    const handleCreateCustomer = async () => {
        try {
            // Make a POST request using Axios
            const response = await axios.post(
                'http://localhost:8080/api/stripe/create-customer',
                {
                    name: customerData.name,
                    email: customerData.email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            // Check if the request was successful
            if (response.status === 200) {
                console.log('Customer created successfully');
            } else {
                console.error('Failed to create customer');
            }
        } catch (error) {
            console.error('Error creating customer:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };
    
    

    return (
        <div>
            {/* Your form inputs and UI elements */}
            <input
                type="text"
                placeholder="Name"
                value={customerData.name}
                onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
            />
            <input
                type="test"
                placeholder="Email"
                value={customerData.email}
                onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
            />

            {/* Button to trigger the creation of a customer */}
            <button onClick={handleCreateCustomer}>Create Customer</button>
        </div>
    );
};

export default CreditForm;
