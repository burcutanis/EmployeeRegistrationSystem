import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbarfnc from '../Navbar';

import "./ResetPassword.css";


const ResetPasswordScreen = ({ match }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const params = useParams();
    console.log(params.resetToken);

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try {
            console.log(params.resetToken);
            const { data } = await axios.put(
                `http://localhost:4000/api/auth/passwordreset/${params.resetToken}`,
                {
                    password,
                },
                config
            );

            console.log(data);
            setSuccess(data.data);
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
            <div className="resetpassword-screen">
                <form
                    onSubmit={resetPasswordHandler}
                    className="resetpassword-screen__form"
                >
                    <h3 className="resetpassword-screen__title">Reset Password</h3>
                    {error && <span className="error-message">{error} </span>}
                    {success && (
                        <span className="success-message">
                            {success} <Link to="/adminLogin">Login</Link>
                        </span>
                    )}
                    <div className="form-group-label">
                        <label htmlFor="password">
                            New Password:
                        </label>
                        <input
                            className="pass"
                            type="password"
                            required
                            id="password"
                            autoComplete="true"
                            placeholder="Enter new password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            tabIndex={2}
                        />
                    </div>
                    <div className="form-group-label">
                        <label htmlFor="password">
                            Confirm New Password:

                        </label>
                        <input
                            className="pass"
                            type="password"
                            required
                            id="confirmpassword"
                            autoComplete="true"
                            placeholder="Confirm new password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            tabIndex={2}
                        />
                    </div>


                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default ResetPasswordScreen;