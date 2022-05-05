import React, { useState } from 'react';
import { Link, useLocation , useNavigate} from 'react-router-dom';
import ToastMessage from '../helper/ToastMessage';

const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [subMenu, setSubMenu] = useState(false);

    const subMenuSet = () => {
        setSubMenu(subMenu ? false : true);
    }
    const logout = () => {
        ToastMessage('Logout Sucessfully!', true);
        navigate('/');
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
                            <li><Link to="/all"><span style={{ fontSize: '12px' }}>All Queries</span></Link></li>
                            <li> <Link to="/recent"><span style={{ fontSize: '12px' }}>Recent Queries</span></Link></li>
                            <li><Link to="/top10"><span style={{ fontSize: '12px' }}>Top 10 Queries</span></Link></li>
                            <li><Link to="/popular"><span style={{ fontSize: '12px' }}>Most Popular Queries</span></Link></li>
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

                    <li style={{cursor:'pointer' , fontSize:'13px' , fontWeight:'500'}} onClick={()=>logout()} ><img className="sidebar-icon" src="assets/images/logout.svg" alt="" />
                        <img className="sidebar-icon hover-icon" src="assets/images/hover-logout.svg" alt="" /> Logout</li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
