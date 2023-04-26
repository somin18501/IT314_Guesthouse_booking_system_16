import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { Navigate } from "react-router-dom"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#1532f1",
			color: "#000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#fe0301",
			color: "#fe0301"
		}
	}
}

export default function PaymentFormPage({book,pid,onChange}) {

    const [success, setSuccess ] = useState(false)
    const [redirect,setRedirect] = useState(false);
    const stripe = useStripe()
    const elements = useElements()

    async function handleCancelPay(){
        if(confirm("Sure? want to Cancel Booking") == true){
            const response = await axios.delete('/deletebooking/'+book._id);
            setRedirect(true);
        }
    }

    async function handleSubmit(e){
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    
        if(!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("/payment", {
                    amount: book.price*100,
                    id
                })
    
                if(response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                    alert('Payment Successfull!!!');
                }else{
                    console.log('coming here');
                }
    
            } catch (error) {
                const response = await axios.delete('/deletebooking/'+book_id);
                setRedirect(true);
                console.log("Error", error);
            }
        } else {
            const response = await axios.delete('/deletebooking/'+book_id);
            setRedirect(true);
            console.log(error.message)
        }
    }

    if(success){
        return <Navigate to={'/account/bookings/'+book._id}/>
    }

    if(redirect){
        onChange(false);
        return <Navigate to={'/place/'+pid}/>
    }

	return (
        <div>
            <div className="p-2">
                <b>Booking Id:</b> {book._id} <br />
                <b>check In:</b> {book.checkIn} <br />
                <b>check Out:</b> {book.checkOut} <br />
                <b>No. of Guests:</b> {book.numOfGuests} <br />
                <b>name:</b> {book.numOfGuests} <br />
                <b>phone:</b> {book.numOfGuests} <br />
                <b>Amount:</b> Rs {book.price} 
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow rounded-2xl shadow-md shadow-gray-300">
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                </fieldset>
                <button className="primary">Pay</button>
            </form>
            <div className="mt-4">
                <button className="primary" onClick={handleCancelPay}>Cancel</button>
            </div>
        </div>
	);
}