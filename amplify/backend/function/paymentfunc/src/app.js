/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
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
app.use(awsServerlessExpressMiddleware.eventContext());
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

/**********************
 * Example get method *
 **********************/

app.get("/payment", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.listen(4000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
