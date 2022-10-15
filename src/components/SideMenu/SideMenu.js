import React, {useState} from 'react'

import "./SideMenu.css";
import logo from "../../assets/react-2.svg";

const SideMenu = () => {
    const [active, setActive] = useState(true);

    const SideMenuConfig = {
        inactive:  {
        toggleAlignment: "right",
        status: "inactive"
        },
        active: {
        toggleAlignment: "left",
        status: ""
        }
    }

    const toggleMenu = (e) => {
        setActive(!active);   
    };

    const configIndex = active ? "active" : "inactive";

    return (  
    <div className={`side-menu ${SideMenuConfig[configIndex].status}`}>
        <div className="top-section">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="toggle-menu-btn" onClick={toggleMenu}>
                <i class={`bi bi-arrow-${SideMenuConfig[configIndex].toggleAlignment}-square-fill`}></i>
            </div>
        </div>

        <div className="search-controller">
            <button className="search-menu-btn">
                <i class="bi bi-search"></i>
            </button>
            <input type="text" placeholder="search"></input>         
        </div>
        <div className="divider"/>
    </div>
    )
}

export default SideMenu