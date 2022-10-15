import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import "./MenuItem.css";

const MenuItem = ({iconName="bucket", path, label="Dummy option", submenu, menuStatus, children, onClick, ...props}) => {
  const type = submenu ? "submenu" : "menu";
  const active = menuStatus ? "active" : "";
  const [collapsed, setCollapsed] = useState(true);
  return (
    <li>
        <Link to={path} className={`${type}-item ${active}`} onClick={children ? () => {setCollapsed(!collapsed)} : onClick} {...props}>
            <div className={`${type}-icon`}>
                <i className={`bi bi-${iconName}`}></i>
            </div>
            {menuStatus ? label : null}
        </Link>
        {children && collapsed ? null : <ul>{children}</ul>}
    </li>
  )
}

export default MenuItem