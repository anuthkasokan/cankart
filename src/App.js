import React, { useState } from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "./MainApp.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import Cart from "./components/cart";
import MainContext from "./components/main_Content";
import StripeContainer from "./components/StripeContainer";

Amplify.configure(awsconfig);

function App() {
  const [showItem, setShowItem] = useState(false);
  const [checkout, setCheckout] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.videogameId === product.videogameId);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.videogameId === product.videogameId
            ? {
                ...exist,
                qty: exist.qty + 1,
              }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.videogameId === product.videogameId);
    if (exist.qty === 1) {
      setCartItems(
        cartItems.filter((x) => x.videogameId !== product.videogameId)
      );
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.videogameId === product.videogameId
            ? {
                ...exist,
                qty: exist.qty - 1,
              }
            : x
        )
      );
    }
  };

  const showStripe = (item) => {
    setShowCart(false);
    setShowItem(item);
  };
  const totalPrice = (item) => {
    setCheckout(item);
  };

  const goToCart = (item) => {
    setShowCart(item);
  };

  return (
    <div className="container">
      <>
        <Header showCart={goToCart} countCartItems={cartItems.length} />
        {showCart ? (
          <Cart
            onAdd={onAdd}
            onRemove={onRemove}
            cartItems={cartItems}
            showStripe={showStripe}
            totalPrice={totalPrice}
          ></Cart>
        ) : showItem ? (
          <StripeContainer checkout={checkout} />
        ) : (
          <MainContext onAdd={onAdd} />
        )}
        <Footer />
      </>
    </div>
  );
}

export default withAuthenticator(App);
