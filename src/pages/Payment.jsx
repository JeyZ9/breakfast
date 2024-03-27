import React, { useState } from 'react'
import { PiBankThin, PiCreditCardThin, PiPaypalLogo } from "react-icons/pi";
import Credit from '../stripe/Credit';
import Transfer from '../components/Transfer';
import PaymentDetail from '../components/PaymentDetail';

function Payment() {

    const [ credit, setCredit ] = useState(true)
    const [ transfer, setTransfer ] = useState(false)
    const [ paypal, setPaypal ] = useState(false)

    const handleCredit = () => {
        setCredit(true)
        setTransfer(false)
        setPaypal(false)
    }
    const handleTransfer = () => {
        setCredit(false)
        setTransfer(true)
        setPaypal(false)
    }
    const handlePaypal = () => {
        setCredit(false)
        setTransfer(false)
        setPaypal(true)
    }


  return (
    <div className=''>
        <div className="grid grid-cols-3 py-10 px-20 w-screen h-screen gap-5 text-gray-600 font-medium bg-orange">
            <div className="p-10 col-span-2 border border-gray-400 flex flex-col gap-5 h-[90vh]">
                <h1 className='text-xl font-semibold text-gray-700 border-b-2 py-4 border-gray-400'>SELECT PAYMENT METHOD</h1>
                <div className="grid grid-cols-3 h-[10vh] gap-5">
                    <button onClick={() => handleCredit()} className={`${credit ? 'text-white bg-orange-400 border-none' : ''} border border-gray-400 flex justify-center items-center`}>
                        <i className='ml-auto text-3xl'><PiCreditCardThin /></i>
                        <h1 className='mr-auto'>Credit Card</h1>
                    </button>
                    <button onClick={() => handleTransfer()} className={`${transfer ? 'text-white bg-orange-400 border-none' : ''} border border-gray-400 flex justify-center items-center`}>
                        <i className='ml-auto text-3xl'><PiBankThin /></i>
                        <h1 className='mr-auto'>Bank Transfer</h1>
                    </button>
                    <button onClick={() => handlePaypal()} className={`${paypal ? 'text-white bg-orange-400 border-none' : ''} border border-gray-400 flex justify-center items-center`}>
                        <i className='ml-auto text-3xl'><PiPaypalLogo /></i>
                        <h1 className='mr-auto'>PayPal</h1>
                    </button>
                </div>
            {credit && (
                <Credit />
            )}

            {transfer && (
                <Transfer />
            )}

            {paypal && (
                <div className="m-auto flex">
                    <h1>Coming Soon...</h1>
                </div>
            )}

            </div>

            <div className="col-span-1">
                <PaymentDetail />
            </div>
        </div>
    </div>
  )
}

export default Payment