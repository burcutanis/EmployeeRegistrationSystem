import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbarfnc from '../NavbarUser';
import "./CompleteRegister.css";


const CompleteRegister = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const params = useParams();
    console.log(params.registerToken);
    const registerCompleted = true;

    const completeRegistrationHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        try {
            console.log(params.registerToken);
            const { data } = await axios.put(
                `http://localhost:4000/client/auth/completeRegistration/${params.registerToken}`,
                {
                    registerCompleted,
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
                    onSubmit={completeRegistrationHandler}
                    className="resetpassword-screen__form"
                >
                    <h3 className="resetpassword-screen__title">Complete Registration</h3>
                    {error && <span className="error-message">{error} </span>}
                    {success && (
                        <span className="success-message">
                            {success} <Link to="/userLogin">Login</Link>
                        </span>
                    )}
                    <button type="submit" className="btn btn-primary">
                        Complete Registration
                    </button>
                </form>
            </div>
        </>
    );
};

export default CompleteRegister;