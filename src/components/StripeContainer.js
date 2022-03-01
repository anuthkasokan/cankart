import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

function StripeContainer() {
  const PUBLIC_KEY =
    "pk_test_51KYPrEE5iK0SDtJgru8w74FC3t2rQ5HqndfYO9vEaMBn10enyR1nir5MWLGd4vpI9ogjFk3zjAhMNs9sKTHlZgxg00c9gk9rEl";

  const stripePromise = loadStripe(PUBLIC_KEY);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
