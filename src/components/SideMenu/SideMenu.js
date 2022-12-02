import React, {useEffect, useState} from 'react'

//import { faker } from "@faker-js/faker";

import "./SideMenu.css";
import logo from "../../assets/icons8-stacked-organizational-chart-highlighted-parent-node-100.png";
import MenuItem from '../MenuItem/MenuItem';
import Select from '../Select/Select';
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';

const SideMenu = () => {
    const [active, setActive] = useState(false);
    const { user } = useAuth();
    const {actProject} = useProject();
  
    useEffect(() => {

        document.onresize = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };    
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
            <div className="toggle-menu-btn-mobile" onClick={toggleMenu}>
                <i className={`bi bi-list`}></i>
            </div>
            
        </div>

        {Object.keys(actProject).length === 0 ? null : <Select/>}

        <div className="divider"/>
        <nav className="main-menu">
            <ul>
            {Object.keys(actProject).length === 0 ? 
            <>
                <MenuItem path="/new" label="New Project" iconName="plus-circle" menuStatus={active} />
                <MenuItem path="/home" label="Dashboard" iconName="speedometer2" menuStatus={active} />
                <MenuItem path="/logout" label="Logout" iconName="door-open" menuStatus={active}/>
            </> : 
            <>
                <MenuItem path="/new" label="New Project" iconName="plus-circle" menuStatus={active} />
                <MenuItem path="/home" label="Dashboard" iconName="speedometer2" menuStatus={active} />
                <MenuItem label="Content" iconName="newspaper" menuStatus={active}>
                    <MenuItem path="/tree" submenu label="Project Tree" iconName="diagram-3" menuStatus={active}/>
                    <MenuItem path="/gantt" submenu label="Gantt Chart" iconName="bar-chart-steps" menuStatus={active}/>
                </MenuItem>
                <MenuItem path="/messenger" label="Conversations" iconName="chat" menuStatus={active} />
                <MenuItem path="/logout" label="Logout" iconName="door-open" menuStatus={active}/>
            </>
            }
             
            </ul>
        </nav>
       
        <div className="side-menu-footer">
            <div className="user-container">
                <div className="avatar">
                    <img src={user ? user.photo : ""} alt="user profile-pic" referrerPolicy="no-referrer"/>            
                </div>
                <div className={`user-info ${active ? "active" : ""}`}>
                        <h5>{user ? user.name : ""}</h5>
                        {<p>{user ? user.email : ""}</p>}
                </div>      
            </div>               
        </div>
    </div>
    )
}

export default SideMenu