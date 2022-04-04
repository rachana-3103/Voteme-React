import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../component/Layout'
const Index = () => {
    return (
        <Layout>
            <div>
            <header>
                <div className="container">
                    <div className="header-inner">
                        <div className="logo">
                            <a href="!#"><img src="assets/images/logo.png" alt="" /></a>
                        </div>
                        <div className="nav-menu">
                            <div className="toggle">
                                <div className="one"></div>
                                <div className="two"></div>
                                <div className="three"></div>
                            </div>
                            <ul className="nav">
                                <li className="active"><a href="!#">Home</a></li>
                                <li><a href="#about-us">About</a></li>
                                <li><a href="#how-it-works">How it works</a></li>
                                <li><a href="#get-in-touch">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="header-right">
                            <div className="header-btn-group">
                                <Link to="/login">Login</Link>
                                <Link to="/login">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section id="home-banner" className="home-hero-sec">
                <div className="banner-image" style={{ backgroundImage: `url('assets/images/hero-background.jpg')` }}>
                    <div className="container">
                        <div className="slider-text">
                            <h1 className="big-title">Vote For Best <br></br> and accurate...<br></br> ask your <span className="orange-text"> Queries</span></h1>
                            <div className="slider-small-text">Solve your any type of queries by asking and also help others by voting their queries</div>
                            <div className="slider-btn"><a routerLink="./queries" routerLinkActive="router-link-active" href="#foo">VOTE FOR BEST<span className="tick-icon"><img src="assets/images/tick.svg" alt="" /></span></a></div>
                        </div>
                    </div>
                </div>
            </section >

            <section id="features" className="feature-sec">
                <div className="container">
                    <div className="center-heading">
                        <h2 className="main-heading">Features</h2>
                        <div className="sub-heading">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever since the</div>
                    </div>
                    <div className="features-inr">
                        <div className="feat-list">
                            <div className="f-icon"><img src="assets/images/program.svg" alt="" /></div>
                            <h3 className="f-title">Lorem Ipsum is simply dummy text</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever.</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img src="assets/images/program.svg" alt="" /></div>
                            <h3 className="f-title">Lorem Ipsum is simply dummy text</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever.</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img src="assets/images/program.svg" alt="" /></div>
                            <h3 className="f-title">Lorem Ipsum is simply dummy text</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever.</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img src="assets/images/program.svg" alt="" /></div>
                            <h3 className="f-title">Lorem Ipsum is simply dummy text</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever.</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img src="assets/images/program.svg" alt="" /></div>
                            <h3 className="f-title">Lorem Ipsum is simply dummy text</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever.</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img src="assets/images/program.svg" alt="" /></div>
                            <h3 className="f-title">Lorem Ipsum is simply dummy text</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="how-it-works">
                <div className="center-heading">
                    <h2 className="main-heading">Ask Your Query With Few Steps</h2>
                    <div className="sub-heading">Lorem Ipsum is simply dummy text of printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                </div>
                <div className="voteme-steps">
                    <div className="voteme-left center-text">
                        <img src="assets/images/que-cartoon.png" alt="" />
                        <div className="left-disc">
                            <h2 className="app-info-title">Are you confused about your query?</h2>
                            <div className="sub-heading">Here's a solution for you.<br></br> Put your query on VoteMe and Resolve your query.</div>
                        </div>
                    </div>
                    <div className="voteme-right">
                        <div className="steps-main left">
                            <div className="steps one">
                                <img src="assets/images/user-login.svg" alt="" />
                                <span className="steps-title">One Click Sign in</span>
                            </div>
                            <div className="steps two">
                                <img src="assets/images/create-query.svg" alt="" />
                                <span className="steps-title">Cretate your query<br></br> (up to 6 answer)</span>
                            </div>
                        </div>
                        <div className="steps-main center">
                            <div className="steps three">
                                <img src="assets/images/set-time-limit.svg" alt="" />
                                <span className="steps-title">Set time limit</span>
                            </div>
                            <div className="app-img">
                                <img src="assets/images/app-screen.jpg" alt="" />
                            </div>
                        </div>
                        <div className="steps-main right">
                            <div className="steps four">
                                <img src="assets/images/invite-friends.svg" alt="" />
                                <span className="steps-title">Invite friends and famliy<br></br>to ask for vote </span>
                            </div>
                            <div className="steps five">
                                <img src="assets/images/get-result.svg" alt="" />
                                <span className="steps-title">Get result as<br></br>his query solution</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about-us" className="about-sec">
                <div className="container">
                    <div className="center-heading">
                        <h2 className="main-heading">About Us</h2>
                        <div className="sub-heading">Lorem Ipsum is simply dummy text of printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                    </div>
                    <div className="about-content">
                        <div className="about-left">
                            <img src="assets/images/about-img.jpg" alt="" />
                        </div>
                        <div className="about-right">
                            <div className="abt-disc">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has not only five centurie.</p>
                                <p>but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centurie.</p>
                                <div className="cta-btn"><a className="btn-inr" routerLink="/queries" href="#foo">Know More</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="join-us" className="join-us" style={{ backgroundImage: `url('assets/images/join-us-banner.jpg')` }}>
                <div className="container d-flex">
                    <div className="join-us-left col-6">
                        <h2 className="main-heading">Join Us Today</h2>
                        <div className="sub-heading">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500</div>
                        <div className="g-pay-btn"><a href="#foo" target="_blank"><img src="assets/images/g-pay-logo.png" alt="" /></a></div>
                    </div>
                    <div className="join-us-right col-6 d-flex">
                        <div className="recent-queries col-6">
                            <img src="assets/images/recent-queries.jpg" alt="" />
                            <div className="query-title">Recent Queries</div>
                        </div>
                        <div className="add-queries col-6">
                            <div className="query-title">Add Queries</div>
                            <img src="assets/images/add-queries.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="get-in-touch" className="get-in-touch">
                <div className="container">
                    <div className="center-heading">
                        <h2 className="main-heading">Get In Touch With Us</h2>
                    </div>
                    <div className="contact-inr">
                        <div className="cd-disc col-6">
                            <div className="cd-inr add">
                                <strong>Address: </strong>
                                <span>Lorem Ipsum is the <br></br>dummy text of printing</span>
                            </div>
                            <div className="cd-inr mail">
                                <strong>Email: </strong>
                                <span><a href="mailto:info@companyname.com">info@companyname.com</a></span>
                            </div>
                            <div className="cd-inr phn">
                                <strong>Phone: </strong>
                                <span><a href="tel:+1 2345 6789">+1 2345 6789</a></span>
                            </div>
                            <div className="c-map">
                                <img src="assets/images/c-map-img.jpg" alt="" />
                            </div>
                        </div>
                        <div className="c-form col-6">
                            <form style={{ marginLeft: '30px' }}>
                                <div className="form-field"><input className="form-control" type="text" placeholder="Your name" name="" /></div>
                                <div className="form-field"><input className="form-control" type="text" placeholder="Your email" name="" /></div>
                                <div className="form-field"><input className="form-control" type="text" placeholder="Your subject" name="" /></div>
                                <div className="form-field"><textarea className="form-control" placeholder="Your message"></textarea></div>
                                <div className="cta-btn"><input type="submit" className="btn-inr" name="" value="Submit" /></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </Layout>
    );
}

export default Index;