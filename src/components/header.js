import React from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import "../MainApp.scss";

export default function header(props) {
  const { countCartItems } = props;

  return (
    <nav>
      <img src="logo4.png" alt="cankart logo" width="350" height="60"></img>
      <div className="logo"></div>

      <ul>
        <li>Home</li>
        <li>Our Products</li>
        <li>About </li>
        <li>Contact</li>
        <li>
          {" "}
          <AmplifySignOut></AmplifySignOut>
        </li>
        <li onClick={() => props.showCart(true)}>
          Cart{" "}
          {countCartItems ? (
            <button className="badge">{countCartItems}</button>
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
