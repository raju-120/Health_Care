import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";
import ReactPrint from 'react-to-print';
import moment from 'moment';
import logo from '../../../assets/images/logo.png';
import Paid from "../../../assets/images/paid.png";

export default function PaymentInvoice() {
    const { id } = useParams();
    const componentRef = useRef();  // Reference for the printable component
    const [specificID, setSpecificID] = useState({});

    useEffect(() => {
        const getSpecificID = async () => {
            try {
                const result = await fetch(`/api/payment/paymentid/${id}`);
                const data = await result.json();
                setSpecificID(data);
            } catch (error) {
                console.log("ID not found", error.message);
            }
        };

        if (id) {
            getSpecificID();
        }
    }, [id]);

    return (
        <>
            {specificID && (
                <div className="container">
                    <div className="container mt-14 p-20" ref={componentRef}>
                        <div className="row">
                            <div className="md:col-12">
                                <div className="row">
                                    <div className="col-md-4">
                                        <Barcode value={specificID?.transactionId || "http://evercare.com/invoice"} width={1} height={50} displayValue={false} />
                                    </div>
                                    <div className="col-md-8 text-right">
                                        <img src={logo} alt="Logo" />
                                        <p className="mt-2">Appointment Number: +96578955</p>
                                        <p>Email: evencare@gmail.com</p>
                                        <p>Address: Vungchung</p>
                                    </div>
                                </div>
                                <br />
                                <div className="row mt-5 text-center">
                                    <h2 className="text-4xl font-semibold uppercase mb-5" style={{ color: '#325aa8' }}>Invoice</h2>
                                    <h4 className="font-semibold">ID: {specificID?.transactionId}</h4>
                                    <p>Date: {moment().format('Do MMMM YYYY h:mm a')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Patient Name</th>
                                        <th>Doctor Name</th>
                                        <th>Appointment Date</th>
                                        <th>Transaction ID</th>
                                        <th>Bill</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover">
                                        <td className="text-xl font-semibold">{specificID?.pname}</td>
                                        <td className="text-lg font-semibold">{specificID?.doctor}</td>
                                        <td>{specificID?.date}</td>
                                        <td>{specificID?.transactionId}</td>
                                        <td>{specificID?.price} TK</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-end mr-20">
                                <div>
                                    <h1>Total Amount:</h1>
                                </div>
                                <div>
                                    <p>{specificID?.price} TK</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around mt-10">
                            <h1 className="text-lg font-bold text-lime-500 p-8">Thank You For the Payment.</h1>
                            <img src={Paid} className="w-20 rounded-full" alt="Paid logo" />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <ReactPrint
                            trigger={() => <button className='btn btn-primary'>Print Invoice</button>}
                            content={() => componentRef.current}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
