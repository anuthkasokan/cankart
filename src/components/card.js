import React from "react";

const CardComponent = (props) => {
  console.log(props);
  return (
    <div className="card" key={props.item.videogameId}>
      <div className="card_img">
        <img src={props.item.imageUrl} />
      </div>
      <div clasName="card_header">
        <h2 className="prod-name">{props.item.name}</h2>
        <p className="prod-desc">{props.item.company}</p>
        <p className="price">
          {props.item.price}
          <span>$</span>
        </p>
        <div className="add-btn">Buy</div>
      </div>
    </div>
  );
};

export default CardComponent;
