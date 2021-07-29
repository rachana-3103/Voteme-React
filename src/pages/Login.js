import React from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ToastMessage from '../helper/ToastMessage';

const Login = () => {
    const history = useHistory();
    const signup = (res) => {
        const googleresponse = {
            FirstName: res.givenName,
            LastName: res.familyName,
            Email: res.email,
            Token: res.googleId,
            Type: '1',
            Image: res.imageUrl
        };
        axios.post('http://localhost:3000/voteme/signup', googleresponse)
            .then((result) => {
                localStorage.setItem("userData", JSON.stringify(result));
                history.push('/home');
                ToastMessage('Login Sucessfully!');
            });
    };
    const responseGoogle = (response) => {
        let res = response.profileObj;
        signup(res);
    }
    return (
        <div>
            <section className="login-page">
                <div className="login-block">
                    <div className="login-block-inner">
                        <div className="main-logo">
                            <img src="assets/images/logo.png" alt="" />
                            <span>Where you ask your query and also vote...</span>
                        </div>
                    </div>
                    <div className="login-title">LOGIN</div>
                    <div className="welcome-text">Welcome! Please click on the button below to sign-in to VoteME with your <a className="google" href="/abc">Google</a> OR <a className="fb" href="/abc">Facebook</a> OR <a className="twitter" href="/abc">Twitter</a> Account.</div>
                    <div className="login-btn-group">
                        <GoogleLogin
                            clientId="380405377161-qifkrve8noqkbat7ulhv2mpelallljr8.apps.googleusercontent.com"
                            buttonText="Log with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={
                                (renderProps) => (
                                    <span className="login-with-google" onClick={renderProps.onClick} disabled={renderProps.disabled}><a href='/abc'><img src="assets/images/google.svg" alt="" /> Login With Google</a></span>
                                )}
                        />
                        <span className="login-with-fb"><a href="$"><img src="assets/images/facebook.svg" alt="" /> Login With Facebook</a></span>
                        <span className="login-with-twitter"><a href="$"><img src="assets/images/twitter.svg" alt="" /> Login With Twitter</a></span>
                    </div>
                </div>
            </section>
        </div >
    );
}

export default Login;
