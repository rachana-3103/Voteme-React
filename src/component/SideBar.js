import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation();
    const [subMenu, setSubMenu] = useState(false);

    const subMenuSet = () => {
        setSubMenu(subMenu ? false : true);
    }

    return (
        <div className='left-sidebar'>
            <div class="sidebar-inner">
                <ul>
                    <li className={location.pathname === "/home" ? "active" : ""}>
                        <Link to="/home"><img className="sidebar-icon" src="assets/images/home.svg" alt="" />
                            <img className="sidebar-icon hover-icon" src="assets/images/hover-home.svg" alt="" /> Home</Link >
                    </li>

                    <li className={location.pathname === "/query" ? "active" : ""} onClick={subMenuSet}>
                        <Link to='#'><img className="sidebar-icon" src="assets/images/question-mark.svg" alt="" />
                            <img className="sidebar-icon hover-icon" src="assets/images/hover-question-mark.svg" alt="" /> Queries </Link>

                        {subMenu && <ul className="sidebar-submenu">
                            <li><Link to="/queryAll"><span style={{ fontSize: '12px' }}>All Queries</span></Link></li>
                            <li> <Link to="/queryRecent"><span style={{ fontSize: '12px' }}>Recent Queries</span></Link></li>
                            <li><Link to="/queryTop10"><span style={{ fontSize: '12px' }}>Top 10 Queries</span></Link></li>
                            <li><Link to="/queryPopular"><span style={{ fontSize: '12px' }}>Most Popular Queries</span></Link></li>
                        </ul>}
                    </li>


                    <li className={location.pathname === "/my-query" ? "active" : ""}>
                        <Link to="/my-query"><img className="sidebar-icon" src="assets/images/question-mark.svg" alt="" />
                            <img className="sidebar-icon hover-icon" src="assets/images/hover-question-mark.svg" alt="" /> My Queries</Link>
                    </li>

                    <li className={location.pathname === "/my-profile" ? "active" : ""}><Link to='/my-profile'>
                        <img className="sidebar-icon" src="assets/images/man-user.svg" alt="" />
                        <img className="sidebar-icon hover-icon" src="assets/images/hover-man-user.svg" alt="" /> My Profile</Link></li>

                    <li className={location.pathname === "/terms-condition" ? "active" : ""}><Link to="/terms-condition">
                        <img className="sidebar-icon" src="assets/images/term-condition.svg" alt="" />
                        <img className="sidebar-icon hover-icon" src="assets/images/hover-term-condition.svg" alt="" /> Terms & Conditions</Link></li>

                    <li className={location.pathname === "/help" ? "active" : ""}><Link to="/help">
                        <img className="sidebar-icon" src="assets/images/help.svg" alt="" />
                        <img className="sidebar-icon hover-icon" src="assets/images/hover-help.svg" alt="" /> Help</Link></li>

                    <li ><Link to="/logout"><img className="sidebar-icon" src="assets/images/logout.svg" alt="" />
                        <img className="sidebar-icon hover-icon" src="assets/images/hover-logout.svg" alt="" /> Logout</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
