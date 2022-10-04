import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Navbarfnc from '../Navbar';

const RegisterScreen = ({ history }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();



    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (password !== confirmpassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords do not match");
        }

        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/auth/register",
                {
                    username,
                    email,
                    password,
                },
                config
            );

            //localStorage.setItem("authToken", data.token);
            navigate({
                pathname: '/adminLogin',

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
                <form onSubmit={registerHandler} className={"loginForm login-screen__form"}>
                    <header className="head-form">
                        <h2>Admin Register</h2>


                    </header>

                    <br />
                    {error && <span className="error-message">{error}</span>}
                    <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input

                            type="text"
                            required
                            id="name"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input

                            type="email"
                            required
                            id="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group-label">
                        <label htmlFor="password">Password:</label>
                        <input
                            className="pass"
                            type="password"
                            required
                            id="password"
                            autoComplete="true"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group-label">
                        <label htmlFor="confirmpassword">Confirm Password:</label>
                        <input
                            className="pass"
                            type="password"
                            required
                            id="confirmpassword"
                            autoComplete="true"
                            placeholder="Confirm password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div class="col-lg-6 login-btm login-button">
                        <button type="submit" className="btn btn-outline-primary btn-md loginButton">REGISTER</button>
                    </div>


                    <span className="register-screen__subtext">
                        Already have an account? <Link to="/adminLogin">Login</Link>
                    </span>


                </form>
            </div>

        </>
    );
};

export default RegisterScreen;


