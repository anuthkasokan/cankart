import React, { useState, useEffect } from "react";
import "./App.css";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import "./MainApp.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import Cart from "./components/cart";
import MainContext from "./components/main_Content";
import StripeContainer from "./components/StripeContainer";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  const [showItem, setShowItem] = useState(false);
  const [checkout, setCheckout] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [signedIn, setSignedIn] = useState(false);

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

  useEffect(() => {
    setAuthListener();
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user) {
          setSignedIn(true);
        } else setSignedIn(false);
      })
      .catch((err) => {
        console.log(err);
        setSignedIn(false);
      });
  }, []);

  async function setAuthListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          console.log("signedIn");
          setSignedIn(true);
          break;
        case "signOut":
          setSignedIn(false);
          break;
        default:
          setSignedIn(false);
      }
    });
  }

  return (
    <div className="container">
      <>
        <Header
          showCart={goToCart}
          signedIn={signedIn}
          countCartItems={cartItems.length}
        />
        <AmplifyAuthenticator>
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
        </AmplifyAuthenticator>
        <Footer />
      </>
    </div>
  );
}

export default App;
