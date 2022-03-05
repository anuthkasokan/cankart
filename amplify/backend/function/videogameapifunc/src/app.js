const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(awsServerlessExpressMiddleware.eventContext());

app.post("/payment", async (req, res) => {
  console.log("entered payment!");
  // console.log(req.body);
  // let { amount, id } = req.body;
  // try {
  //   const payment = await stripe.paymentIntents.create({
  //     amount,
  //     currency: "USD",
  //     description: "Call of Duty 7",
  //     payment_method: id,
  //     confirm: true,
  //   });
  //   console.log("payment", payment);
  //   res.json({
  //     message: "Payment successful",
  //     success: true,
  //   });
  // } catch (error) {
  //   console.log("error", error);
  //   res.json({
  //     message: "Payment failed",
  //     success: false,
  //   });
  // }
  res.json({
    message: "Payment successful",
    success: true,
  });
});

app.get("/videogames/{videogameId}", function (req, res) {
  res.statusCode = 200;
  res.json({ success: "call succeeded" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is listening on port 3000");
});
