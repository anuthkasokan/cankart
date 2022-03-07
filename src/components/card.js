import React from 'react';

const CardComponent = (props) => {
    console.log(props)
    return (
        <div className="card" key={props.item.id}>
            <div className="card_img">
                <img src={props.item.thumb} />
            </div>
            <div clasName="card_header">
                <h2 className="prod-name">{props.item.product_name}</h2>
                <p className="prod-desc">{props.item.description}</p>
                <p className="price">{props.item.price}<span>{props.item.currency}</span></p>
                <div className="add-btn">Buy</div>
            </div>
        </div>
    )
}

export default CardComponent;