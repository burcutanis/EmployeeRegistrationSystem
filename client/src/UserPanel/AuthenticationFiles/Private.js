import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbarfnc from '../NavbarUser';


const PrivateScreen = ({ history }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("userAuthToken")}`,
                },
            };
            console.log(localStorage.getItem("userAuthToken"));

            try {
                const { data } = await axios.get("/api/private", config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("userAuthToken");
                setError("You are not authorized please login");
            }
        };

        fetchPrivateDate();
    }, []);


    return error ? (

        <span className="error-message">{error}</span>
    ) : (
        <>
            <Navbarfnc />
            <div>{privateData}</div>

        </>

    );
};

export default PrivateScreen;