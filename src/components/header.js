import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import "../MainApp.scss";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function header(props) {
  const { countCartItems } = props;

  return (
    <nav>
      <img src="logo4.png" alt="cankart logo" width="350" height="60"></img>
      <div className="logo"></div>

      <ul>
        <li onClick={() => window.location.reload(false)}>Home</li>
        <li>Our Products</li>
        <li>About </li>
        <li>Contact</li>
        <li>
          {" "}
          <AmplifySignOut></AmplifySignOut>
        </li>
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
