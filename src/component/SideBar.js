import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {

    return (
        <div className='left-sidebar'>
            <div class="sidebar-inner">
                <ul>
                    <li className={window.location.pathname === "/home" ? "active" : ""}>
                        <Link to="/home"><img className="sidebar-icon" src="assets/images/home.svg" alt="" />
                            <img className="sidebar-icon hover-icon" src="assets/images/hover-home.svg" alt="" /> Home</Link >
                    </li>

                    <li className={window.location.pathname === "/queries" ? "active" : ""}>
                        <Link to="/queries"><img className="sidebar-icon" src="assets/images/question-mark.svg" alt="" />
                            <img className="sidebar-icon hover-icon" src="assets/images/hover-question-mark.svg" alt="" /> Queries</Link>
                        <ul className="sidebar-submenu">
                            <li><a href="/my-query">Top 10 Queries</a></li>
                            <li><a href="/my-query">Recent Queries</a></li>
                            <li><a href="/my-query">Most Popular Queries</a></li>
                            <li><a href="/my-query">General</a></li>
                        </ul>
                    </li>

                    <li className={window.location.pathname === "/my-query" ? "active" : ""}>
                        <Link to="/my-query"><img className="sidebar-icon" src="assets/images/question-mark.svg" alt="" />
                            <img className="sidebar-icon hover-icon" src="assets/images/hover-question-mark.svg" alt="" /> My Queries</Link>
                    </li>

                    <li className={window.location.pathname === "/my-profile" ? "active" : ""}><Link to='/my-profile'><img className="sidebar-icon" src="assets/images/man-user.svg" alt="" />
                        <img className="sidebar-icon hover-icon" src="assets/images/hover-man-user.svg" alt="" /> My Profile</Link></li>

                    <li className={window.location.pathname === "/terms-condition" ? "active" : ""}><Link to="/terms-condition"><img className="sidebar-icon" src="assets/images/term-condition.svg" alt="" />
                        <img className="sidebar-icon hover-icon" src="assets/images/hover-term-condition.svg" alt="" /> Terms & Conditions</Link></li>

                    <li className={window.location.pathname === "/help" ? "active" : ""}><Link to="/help"><img className="sidebar-icon" src="assets/images/help.svg" alt="" />
                        <img className="sidebar-icon hover-icon" src="assets/images/hover-help.svg" alt="" /> Help</Link></li>

                    <li ><Link to="/logout"><img className="sidebar-icon" src="assets/images/logout.svg" alt="" />
                        <img className="sidebar-icon hover-icon" src="assets/images/hover-logout.svg" alt="" /> Logout</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;