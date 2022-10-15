import React, {useEffect, useState} from 'react'
import { faker } from "@faker-js/faker";

import "./SideMenu.css";
import logo from "../../assets/react-2.svg";
import MenuItem from '../MenuItem/MenuItem';

const SideMenu = () => {
    const [active, setActive] = useState(false);
    const [dummyUser, setDummyUser] = useState({});
    
    useEffect(() => {
        setDummyUser({
            picture: faker.image.avatar(),
            name: faker.name.fullName(),
            email: faker.internet.email()
        });
    }, []);

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
                <i className={`bi bi-arrow-${SideMenuConfig[configIndex].toggleAlignment}-square-fill`}></i>
            </div>
        </div>

        <div className="search-controller">
            <button className="search-menu-btn">
                <i className="bi bi-search"></i>
            </button>
            <input type="text" placeholder="search"></input>         
        </div>
        <div className="divider"/>
        <div className="main-menu">
            <ul>
                <MenuItem path="/home" label="Dashboard" iconName="speedometer2" menuStatus={active} />
                <MenuItem label="Content" iconName="newspaper" menuStatus={active}>
                    <MenuItem path="/tree" submenu label="Tree demo" iconName="bar-chart-steps" menuStatus={active}/>
                    <MenuItem submenu menuStatus={active}
                    onClick={() => alert("Just a dummy")}
                    />
                </MenuItem>
                <MenuItem path="/notfound" label="Not found test" iconName="bug" menuStatus={active} />
            </ul>
        </div>
       
        <div className="side-menu-footer">
            <div className="avatar">
                <img src={dummyUser.picture} alt="user profile-pic"/>            
            </div>
            <div className={`user-info ${active ? "active" : ""}`}>
                    <h5>{dummyUser.name}</h5>
                    <p>{dummyUser.email}</p>
            </div>                     
        </div>
    </div>
    )
}

export default SideMenu