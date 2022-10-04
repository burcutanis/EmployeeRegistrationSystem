import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import "./Login.css";
import Navbarfnc from '../Navbar';

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate({
                pathname: '/'
            })
        }
    });

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/auth/login",
                { email, password },
                config
            );

            localStorage.setItem("authToken", data.token);

            //history.push("/");

            navigate({
                pathname: '/home',
                search: createSearchParams({
                    loggedIn: true
                }).toString()
            })


        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            <Navbarfnc />



            <div className="login-screen">
                <form onSubmit={loginHandler} className={"loginForm login-screen__form"}>
                    <header className="head-form">
                        <h2>Admin Log In</h2>

                        <p>login here using your username and password</p>
                    </header>

                    <br />
                    {error && <span className="error-message">{error}</span>}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input

                            type="email"
                            required
                            id="email"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            tabIndex={1}
                        />
                    </div>
                    <div className="form-group-label">
                        <label htmlFor="password">
                            Password:

                        </label>
                        <input
                            className="pass"
                            type="password"
                            required
                            id="password"
                            autoComplete="true"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            tabIndex={2}
                        />
                    </div>




                    <div class="col-lg-6 login-btm login-button">
                        <button type="submit" className="btn btn-outline-primary btn-md loginButton">LOGIN</button>
                    </div>



                    <span >
                        Forget Password? <Link to="/adminForgotpassword" >
                            Forgot Password?
                        </Link>
                    </span>
                    <br />


                    <span >
                        Don't have an account? <Link to="/adminRegister">Register</Link>
                    </span>
                </form>
            </div>


        </>
    );
};

export default LoginScreen;



