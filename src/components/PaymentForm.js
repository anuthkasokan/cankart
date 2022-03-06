import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log(id);
        const response = await axios.post(
          "https://dhfk7faw67.execute-api.ca-central-1.amazonaws.com/dev/payment",
          {
            amount: 1,
            id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              //"x-api-key": "DXqrlENUCa2mnRrilXOYs8N4S0wXcFc09zjZBIei",
              "Access-Control-Allow-Methods": "*",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Credentials": true,
              //"x-api-id": "t9ln42u4sg",
              // testsource: "testtoken",
            },
          }
        );
        console.log(response);
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error: ", error);
        console.log("message: ", error.message);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h2>Congratulations! Happy gaming!!</h2>
        </div>
      )}
    </>
  );
}
