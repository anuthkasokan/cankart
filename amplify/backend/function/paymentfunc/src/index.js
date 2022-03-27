const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51KYPrEE5iK0SDtJgLUzXCziS0LE0dJF3vCoPXmVZGiu6VKU79NijcH4Twf9M7GatyjsnD03V91VOt7Fv0pbTEhTT00FfU4Brjt"
);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "cad",
      description: "New game",
      payment_method: id,
      confirm: true,
    });
    console.log("payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.listen(4000, () => {
  console.log("Server is listening");
});
