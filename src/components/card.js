import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";

const CardComponent = (props) => {
  const [imageURL, setImageURL] = useState("");
  const { item, onAdd } = props;

  useEffect(() => {
    Storage.get(item.imageUrl).then((data) => {
      setImageURL(data);
    });
  });

  return (
    <div className="card">
      <div className="card_img">
        <img src={imageURL} alt="sampleImage" />
      </div>
      <div className="card_header">
        <h2 className="prod-name">{item.name}</h2>
        <p className="prod-desc">{item.company}</p>
        <p className="price">
          {item.price}
          <span>$</span>
        </p>
        {/* <div className="add-btn" onClick={() => props.showItem(true)}>
          Buy
        </div> */}
        <div className="add-btn" onClick={() => onAdd(item)}>
          Add To Cart
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
