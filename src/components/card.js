import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";

const CardComponent = (props) => {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    Storage.get(props.item.imageUrl).then((data) => {
      setImageURL(data);
    });
  });

  return (
    <div className="card">
      <div className="card_img">
        <img src={imageURL} />
      </div>
      <div className="card_header">
        <h2 className="prod-name">{props.item.name}</h2>
        <p className="prod-desc">{props.item.company}</p>
        <p className="price">
          {props.item.price}
          <span>$</span>
        </p>
        <div className="add-btn" onClick={() => props.showItem(true)}>
          Buy
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
