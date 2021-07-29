import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <div className="footer-inr">
                        <div className="container">
                            <div className="f-col f-col-1">
                                <img src="assets/images/logo_white.png" alt=""/>
                                <span className="f-disc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text.</span>
                            </div>
                            <div className="f-col f-col-2">
                                <h5 className="ftr-title">Quick Links</h5>
                                <ul>
                                    <li><a href="#home-banner">Home</a></li>
                                    <li><a href="#features">Features</a></li>
                                    <li><a href="#how-it-works">My Quaries</a></li>
                                    <li><a href="#about-us">About Us</a></li>
                                    <li><a href="#get-in-touch">Contact</a></li>
                                </ul>
                            </div>
                            <div className="f-col f-col-3">
                                <h5 className="ftr-title">Contact Us</h5>
                                <div className="f-add">Lorem Ipsum is simply <br></br>dummy text of the printinga</div>
                                <div className="f-call"><a href="tel:+1 2345 6789">+1 2345 6789</a></div>
                                <div className="f-email"><a href="mailto:info@companyname.com">info@companyname.com</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="f-copyright">
                        <div className="container">©Copyright 2020 Vote ME</div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;