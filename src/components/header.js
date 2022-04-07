import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../MainApp.scss";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  const { countCartItems, signedIn } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(signedIn);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
        } else setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
  }, [signedIn]);

  function signOut() {
    Auth.signOut()
      .then((data) => {
        setIsLoggedIn(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <nav>
      <img src="logo4.png" alt="cankart logo" width="350" height="60"></img>
      <div className="logo"></div>

      <ul>
        <li onClick={() => window.location.reload(false)}>Home</li>
        <li>Our Products</li>
        <li>About </li>
        <li>Contact</li>
        {isLoggedIn ? <li onClick={signOut}>Sign Out</li> : ""}
        <li onClick={() => props.showCart(true)}>
          <FontAwesomeIcon height={1.5} icon={faCartShopping} />{" "}
          {countCartItems ? (
            <span className="badge">{countCartItems}</span>
          ) : (
            ""
          )}
        </li>{" "}
      </ul>
      {/* <div className="Search">
        <i className="fa fa search"> </i>
        <i className="fa fa shopping Basket"> </i>{" "}
      </div> */}
    </nav>
  );
}
