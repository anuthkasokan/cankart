import React, { useState } from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "./MainApp.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import MainContext from "./components/main_Content";
import StripeContainer from "./components/StripeContainer";

Amplify.configure(awsconfig);

function App() {
  const [showItem, setShowItem] = useState(false);

  const showStripe = (item) => {
    setShowItem(item);
  };

  return (
    <div className="container">
      <>
        <Header />
        {showItem ? (
          <StripeContainer />
        ) : (
          <MainContext showStripe={showStripe} />
        )}
        <Footer />
      </>
    </div>
  );
}

export default withAuthenticator(App);
