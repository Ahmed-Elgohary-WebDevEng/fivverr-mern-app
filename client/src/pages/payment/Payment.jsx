import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import sendRequest from "../../utils/send-request.util";
import { useParams } from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JMLveJ3SoQBBOfeo3jm3bHe2sXHebjAaxjODhQbpGpFgGmLmT3vytwXaWDKOxR3J4PWQmwkvTzFuKfI3mHRZk6s0072dsgZM3"
);

function Payment(props) {
  // create state for client secret
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await sendRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={".pay"}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
