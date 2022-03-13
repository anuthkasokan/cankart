/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51KYPrEE5iK0SDtJgLUzXCziS0LE0dJF3vCoPXmVZGiu6VKU79NijcH4Twf9M7GatyjsnD03V91VOt7Fv0pbTEhTT00FfU4Brjt"
);
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const cors = require("cors");

// declare a new express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

/**********************
 * Example get method *
 **********************/

app.get("/payment", cors(), function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/payment/*", cors(), function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/payment", cors(), async function (req, res) {
  // Add your code here
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents
      .create({
        amount: amount,
        currency: "cad",
        payment_method_types: ["card"],
        description: "test payment from cankart",
        payment_method: id,
        confirm: true,
      })
      .then(
        function (result) {
          console.log("payment:", result);
          res.json({
            message: "Payment successful",
            success: true,
          });
        },
        function (err) {
          switch (err.type) {
            case "StripeCardError":
              // A declined card error
              console.log("error", err.message);
              res.json({
                message: err.message,
                success: false,
              });
              // => e.g. "Your card's expiration year is invalid."
              break;
            case "StripeRateLimitError":
              // Too many requests made to the API too quickly
              console.log("error", err.message);
              res.json({
                message: err.message,
                success: false,
              });
              break;
            case "StripeInvalidRequestError":
              // Invalid parameters were supplied to Stripe's API
              console.log("error", err.message);
              res.json({
                message: err.message,
                success: false,
              });
              break;
            case "StripeAPIError":
              // An error occurred internally with Stripe's API
              console.log("error", err.message);
              res.json({
                message: err.message,
                success: false,
              });
              break;
            case "StripeConnectionError":
              // Some kind of error occurred during the HTTPS communication
              console.log("error", err.message);
              res.json({
                message: err.message,
                success: false,
              });
              break;
            case "StripeAuthenticationError":
              // You probably used an incorrect API key
              console.log("error", err.message);
              res.json({
                message: err.message,
                success: false,
              });
              break;
            default:
              // Handle any other types of unexpected errors
              console.log("error", err.message);
              res.json({
                message: err.message,
                success: false,
              });
              break;
          }
        }
      );
  } catch (error) {
    console.log("error", error);
    res.json({
      message: error.message,
      success: false,
    });
  }
  //res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/payment/*", cors(), function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/payment", cors(), function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/payment/*", cors(), function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/payment", cors(), function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/payment/*", cors(), function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
