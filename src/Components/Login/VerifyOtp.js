import React, { useState,useEffect } from "react";
import "../../Login.css";
import logo from "../../Image/logo.png";
import login from "../../Image/login.png";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import Topbar from "../Common/Topbar";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { UseUserContext } from "../../UserContextAppProvider";
import orimg from "../../../src/Image/or.svg";
import { API_URL } from "../..";


const VerifyOtp = () => {
    const navigate = useNavigate();
    const { setToken, setUserData } = UseUserContext();
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(60);


    useEffect(() => {
        let timer;
        if (isCooldown) {
            timer = setInterval(() => {
                setCooldownTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsCooldown(false);
                        setCooldownTime(60);
                        return 60;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCooldown]);


    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your submit logic here
        console.log("Entered OTP is: " + otp.join(""));
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    otp: otp.join(""),
                }),
            };
            await fetch(API_URL + "/api/verify_otp", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data, "check valu")
                    if (data.status === 200) {
                        setUserData(data.data)
                        setToken(data?.token);
                        localStorage.setItem("usertoken", data.token);
                        if (localStorage.getItem("usertoken") != null || localStorage.getItem("usertoken") != undefined
                            || localStorage.getItem("usertoken") != "") {
                            // navigate("/Mypolicies");
                            window.location.href = "/Mypolicies";
                        }
                    } else {
                        swal({
                            title: "Error!",
                            text: data.message,
                            type: "error",
                            icon: "error",
                        }).then(function () {
                            // navigate('/');
                        });
                    }
                });
        } catch (error) {
            console.log(error)
        }
    };

    const handleResendOtp = async () => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                }),
            };
            await fetch(API_URL + "/api/send_otp_email", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setIsCooldown(true);
                })
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="login" style={{ background: "#F5F5F5" }}>
            <Topbar />
            <div className="row">
                <div className="col-lg-6" style={{ paddingRight: "0px" }}>
                    <div className="login_form">
                        <Link to="/"><img className="login_logo" src={logo} /></Link>
                        <div className="login_form1">
                            <h2>Enter OTP</h2>
                            <form onSubmit={handleSubmit}>
                                <div
                                    className="col-lg-11"
                                    style={{ display: "block", margin: "auto" }}
                                >
                                    <div className="otp-box">
                                        {otp.map((data, index) => {
                                            return (
                                                <input
                                                    key={index}
                                                    className="otp-field"
                                                    type="text"
                                                    name="otp"
                                                    maxLength="1"
                                                    value={data}
                                                    onChange={(e) => handleChange(e.target, index)}
                                                    onFocus={(e) => e.target.select()}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        textAlign: "center",
                                                        fontSize: "1.5rem",
                                                        fontWeight: "bold",
                                                        border: "1px solid #ced4da",
                                                        borderRadius: "4px",
                                                        outline: "none",
                                                    }}
                                                />
                                            )
                                        }
                                        )}
                                    </div>
                                </div>

                                <div
                                    className="col-lg-6"
                                    style={{ display: "block", margin: "auto" }}
                                >
                                    <button type="submit" className="login_btnup" onClick={handleSubmit}>
                                        Verify OTP
                                    </button>
                                    <button
                                        type="button"
                                        className="resend_btnup"
                                        style={{ backgroundColor: isCooldown ? '#ccc' : '#ED1C24', cursor: isCooldown ? 'not-allowed' : 'pointer' }}
                                        onClick={isCooldown ? null : handleResendOtp}
                                        disabled={isCooldown}>
                                        {isCooldown ? `Resend OTP in ${cooldownTime}s` : 'Resend OTP'}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="col-lg-6" style={{ paddingLeft: "0px" }}>
                    <img style={{ width: "100%" }} src={login} />
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
