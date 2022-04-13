import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthData } from "../helper/AuthData";
import { Link } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        Image: "",
        Email: "",
    });
    const { FirstName, LastName, Image, Email } = user;
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const userInfo = AuthData();
        if(userInfo !== null){
            let result = await axios.get(userInfo.apiUrl, { headers: userInfo.header });
            setUser(result.data.Data);
        }
    };
    return (
        <div>
            <header>
                <div className="container">
                    <div className="header-inner">
                        <div className="logo">
                            <a href="/abc"><img src="assets/images/logo.png" alt="" /></a>
                        </div>
                        <div className="nav-menu">
                            <div className="toggle">
                                <div className="one"></div>
                                <div className="two"></div>
                                <div className="three"></div>
                            </div>
                            <ul className="nav">
                                <li
                                //  className="active"
                                ><a href="/">Home</a></li>
                                <li><a href="/">About</a></li>
                                <li><a href="/">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="header-right-block">
                            <div className="h-search"><input type="search" name="" placeholder="Search" /><button type="button"><i className="fa fa-search" aria-hidden="true"></i></button></div>
                            <div className="submit-btn">
                                <Link to="/createQuery"> <button type="button">Ask your query</button></Link>
                            </div>
                            <div className="header-profile">
                                <span className="header-profile-img"><img src={Image} alt="" /></span>
                                <div className="profile-dw-inner">
                                    <div className="dw-img-block flex-box">
                                        <img src={Image} alt="" />
                                        <div className="user-name">{FirstName} {LastName} <span className="user-email"><a href="/abc">{Email}</a></span></div>
                                    </div>
                                    <ul className="dw-list">
                                        <li>Notifications
                                            <span className="switch-togle">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                            </span>
                                        </li>
                                        <li><a href="/abc">Language</a></li>
                                        <li><a href="/abc">Settings</a></li>
                                        <li><a href="/">Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;