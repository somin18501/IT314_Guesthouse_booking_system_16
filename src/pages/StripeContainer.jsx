import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import React from 'react'
import PaymentFormPage from "./PaymentFormPage"

const PUBLIC_KEY = "pk_test_51N0lU4SJipMCcMk399dHr7gnJVp9Isl65r8gWwN46mIg2VR61d9qzoZT1j7SdOPrGESRKMC5WvypOsPzQ201spcx00DCwodfoC"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({book,pid,onChange}) {
	return (
		<Elements stripe={stripeTestPromise}>
            <PaymentFormPage book={book} pid={pid} onChange={onChange}/>
		</Elements>
	)
}