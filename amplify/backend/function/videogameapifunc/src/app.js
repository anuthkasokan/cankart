const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(awsServerlessExpressMiddleware.eventContext());

app.post("/payment", cors(), async (req, res) => {
  console.log("entered payment!");
  console.log(req.body);
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Call of Duty 7",
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
app.listen(process.env.PORT || 3000, () => {
  console.log("server is listening on port 3000");
});
