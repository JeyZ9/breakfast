import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreditForm from './CreditForm'; // Replace with the actual path to your CreditForm component

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY); // Replace with your actual Stripe public key

function Credit() {
  return (
    <Elements stripe={stripePromise}>
      <CreditForm />
    </Elements>
  );
}

export default Credit;
