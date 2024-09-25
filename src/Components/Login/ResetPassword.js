import React, { useState } from "react";
import "../../Login.css";
import logo from "../../Image/logo.png";
import login from "../../Image/login.png";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import Topbar from "../Common/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { UseUserContext } from "../../UserContextAppProvider";
import { API_URL } from "../..";
const ResetPassword = () => {
  const { usertoken, setToken } = UseUserContext();
  const navigate = useNavigate();
  const [Loading, setisLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(null);
  // Validate Lower case letters
  var lowerCaseLetters = /[a-z]/g;
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  // Validate numbers
  var numbers = /[0-9]/g;
  // special Characters numbers
  var specialChar =
    /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
  const { token } = useParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    //console.log(formData.email);
    e.preventDefault();

    try {
      if (!lowerCaseLetters.test(formData.password)) {
        swal("Please Enter at least one Lowercase character");
      } else if (!upperCaseLetters.test(formData.password)) {
        swal("Please Enter at least  one upper Case character");
      } else if (!numbers.test(formData.password)) {
        swal("Please Enter at least one  number ");
      } else if (!specialChar.test(formData.password)) {
        swal("Please Enter at least one  special character ");
      } else if (formData.password !== formData.cpassword) {
        swal("Password not match!");
      } else {
        const data = {
          password: formData.password,
        };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(data),
        };
        setisLoading(true);
        await fetch(API_URL + "/api/forgotPassword", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 200) {
              setToken(data.data.token);
              localStorage.setItem("usertoken", data.data.token);

              localStorage.setItem("userdata", JSON.stringify(data.data));
              setisLoading(false);

              swal({
                title: "Success!",
                text: data.message,
                type: "success",
                icon: "success",
              }).then(function () {
                navigate("/");
              });
            } else {
              setisLoading(false);
              setError(true);
              setErrorMessage(data.message);
              swal({
                title: "Error!",
                text: data.message,
                type: "error",
                icon: "error",
              }).then(function () { });
            }
          });
      }
    } catch (err) {
      setisLoading(false);
      setError(true);
      {};
    }
  };
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
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
              <h2>Reset Your Password</h2>
              <p className="emailaddress">
                Enter your email address to reset your password
              </p>
              <div
                className="col-lg-11"
                style={{ display: "block", margin: "auto" }}
              >
                <InputGroup className="mb-4">
                  
                  <Form.Control
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    aria-label="Password"
                  />
                  <InputGroup.Text id="basic-addon1" onClick={() => setShowPassword(!showPassword)} style={{cursor:'pointer'}}>
                      <i className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i>
                    </InputGroup.Text>
                </InputGroup>
                    <InputGroup className="mb-4">
                  <Form.Control
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="cpassword"
                    onChange={handleChange}
                    placeholder="Confirm Your Password"
                    aria-label="Confirm Password"
                  />
                   <InputGroup.Text id="basic-addon1" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{cursor:'pointer'}}>
                      <i className={showConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i>
                    </InputGroup.Text>
                </InputGroup>
              </div>
              <span className="text-danger text-center">
                {Loading ? "Please wait..." : Error ? ErrorMessage : ""}
              </span>
              <div
                className="col-lg-11"
                style={{ display: "block", margin: "auto" }}
              >
                <button
                  onKeyUp={handleEnter}
                  onClick={handleSubmit}
                  className="login_btnup"
                >
                  Submit
                </button>
              </div>
              <span className="login_forgot">
                Already a user? <Link to="/Login">Sign In</Link>
              </span>
            </div>
            <span>
              {Loading ? "Please wait" : Error ? "Somthing Went Wrong" : ""}
            </span>
          </div>
        </div>
        <div className="col-lg-6" style={{ paddingLeft: "0px" }}>
          <img style={{ width: "100%" }} src={login} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
