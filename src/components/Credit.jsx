import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Credit() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      console.log(token);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
        <div className="my-auto flex flex-col gap-4">
        <label htmlFor="credit">CARD NUMBER</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        </div>

        <div className="my-auto flex flex-col gap-4">
            <label htmlFor="credit">CARD NUMBER</label>
            <input id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="0000 - 0000 - 0000 - 0000" className='border border-gray-400 h-[6vh] px-5 outline-none' required />
        </div>

        <div className="my-auto grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-4">
                <label htmlFor="">MONTH</label>
                <select name="" id="" className='outline-none px-3 border border-gray-400 h-[6vh] text-gray-500'>
                    <option value="" disabled selected>Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="">YEAR</label>
                <select name="" id="" className='outline-none px-3 border border-gray-400 h-[6vh] text-gray-500'>
                    <option value="" disabled selected>Select Year</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="">CVV</label>
                <input type="text" className='outline-none px-3 border border-gray-400 h-[6vh]' maxLength={3} />
            </div>
        </div>
        <button type="submit">Submit</button>
    </form>
  )
}

export default Credit