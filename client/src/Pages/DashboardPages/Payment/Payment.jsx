import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
import { useLoaderData, /* useNavigation */ } from 'react-router-dom';

import CheckOutForm from './CheckOutForm'; 


export default function Payment() {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
    const booking = useLoaderData();
    console.log("Booking Data: ", booking);
    
    return (
        <div className='mx-auto mt-14'>
            <h2 className='text-3xl mb-3 mt-5'>Payment for </h2>
            <p className="text-xl mt-10">
                Please pay <strong></strong>
                for your appointment on
            </p>
            <div className='mt-10 w-96'>
            <Elements stripe={stripePromise}>
                <CheckOutForm 
                    booking={booking}
                />
            </Elements>
            </div>
        </div>
  )
}
