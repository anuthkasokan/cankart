import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import product_card from "../data/product_data";
import CardComponent from "./card";
import "../MainApp.scss";
import { API, Storage } from "aws-amplify";

const MainContext = () => {
  useEffect(() => {
    const getGameList = () => {
      return API.get("cankartapi", "/getList", {})
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getGameList();
  });

  return (
    <div className="main_content">
      {product_card.map((item) => (
        <CardComponent item={item} />
      ))}
    </div>
  );
};
export default MainContext;
