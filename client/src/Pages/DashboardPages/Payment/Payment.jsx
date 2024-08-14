import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';
import { useEffect, useState } from 'react';

export default function Payment() {
    const { id } = useParams();
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
    const [booking, setBooking] = useState(null);
    
    console.log("first payment: ", booking);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await fetch(`/api/appointment/booking/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBooking(data?.data); 
                } else {
                    const errorText = await response.text();
                    console.error('Failed to fetch booking data:', errorText);
                }
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookingData();
    }, [id]);

    return (
        <div className='mx-auto mt-14'>
            <h2 className='text-3xl mb-3 mt-5'>Payment for {booking?.department} </h2>
            <p className="text-xl mt-10">
                Please pay <strong> {booking?.price} TK </strong> for your appointment on <strong>{booking?.date}</strong> to  <strong>{booking?.doctor} </strong>
            </p>
            <div className='mt-10 w-96'>
                <Elements stripe={stripePromise}>
                    {booking && <CheckOutForm booking={booking} />}
                </Elements>
            </div>
        </div>
    );
}
