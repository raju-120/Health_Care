import { Appointment } from "../models/appointment.model.js";
import { Payment } from "../models/payment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";
import mongoose from "mongoose";


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//console.log("Stripe key: ", process.env.STRIPE_SECRET_KEY)

const { ObjectId } = mongoose.Types;

const paymentIntent = asyncHandler(async(req, res) =>{
    //console.log("payment Intent: ", req.body)
    const booking = req.body;
    const price =  booking.price;
    const amount = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: amount,
        "payment_method_types" : [
            "card"
        ]
    });
    console.log(paymentIntent);
    res.send({
        clientSecret : paymentIntent.client_secret
    })});


    const payment = asyncHandler(async (req, res) => {
        const paymentData = req.body;
    
        try {
            console.log("Received payment data:", paymentData);
    
            if (!paymentData.bookingId || !paymentData.transactionId) {
                return res.status(400).json({ error: "Invalid payment data" });
            }
    
            const paymentResult = await Payment.create(paymentData);
    
            const id = paymentData.bookingId;
            const filter = { _id: new ObjectId(id) };
    
            const updatedDoc = {
                $set: {
                    paid: true,
                    transactionId: paymentData.transactionId
                }
            };
    
            const updatedResult = await Appointment.updateOne(filter, updatedDoc);
            console.log("Updated booking result:", updatedResult);
            console.log("Payment result:", paymentResult);
    
            res.status(200).json({ paymentResult, updatedResult });
        } catch (error) {
            console.error('Error processing payment:', error);
            res.status(500).json({ error: error.message });
        }
    });

export {
    paymentIntent,
    payment
}