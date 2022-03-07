import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import product_card from "../data/product_data"
import CardComponent from "./card"
import '../MainApp.scss';

const MainContext = () => {
    console.log(product_card);
    return (
        <div className="main_content">
            {
                product_card.map((item) =>
                    <CardComponent item={item} />
                )
            }
        </div>
    )
}
export default MainContext;
