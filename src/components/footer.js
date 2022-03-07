import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <div className="footer">
            <p>copyright @2022</p>
            <div className="social">
                <i className="fa fa facebook"></i>
                <i className="fa fa instagram"></i>
            </div>
        </div>
    )
}