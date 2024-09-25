import React, { useState } from "react";
import "../../Login.css";
import logo from "../../Image/logo.png";
import login from "../../Image/login.png";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import Topbar from "../Common/Topbar";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_URL } from "../..";
import { set } from "firebase/database";
const Register = () => {
  const [startDate, setStartDate] = useState('');
  // Validate Email Id
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Validate Phone Number
  const PhoneNoValidate = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  // Validate Lower case letters
  var lowerCaseLetters = /[a-z]/g;
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  // Validate numbers
  var numbers = /[0-9]/g;
  // special Characters numbers
  var specialChar =
    /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!emailRegex.test(formData.email)) {
        swal({
          title: "Error!",
          text: "Please enter a valid email address.",
          type: "error",
          icon: "error",
        }).then(function () {
          return false;
        });
      } else if (!PhoneNoValidate.test(formData.mobile)) {
        swal({
          title: "Error!",
          text: "Please Enter Mobile Number",
          type: "error",
          icon: "error",
        }).then(function () {
          return false;
        });
      } else if (!lowerCaseLetters.test(formData.password)) {
        swal("Please Enter at least one Lowercase character");
      } else if (!upperCaseLetters.test(formData.password)) {
        swal("Please Enter at least  one upper Case character");
      } else if (!numbers.test(formData.password)) {
        swal("Please Enter at least one  number ");
      } else if (!specialChar.test(formData.password)) {
        swal("Please Enter at least one  special character ");
      } else if (formData.password !== formData.confirm_password) {
        swal({
          title: "Error!",
          text: "Password and confirm password do not match.",
          type: "error",
          icon: "error",
        }).then(function () {
          return false;
        });
      }else if(startDate == ''){
        swal({
          title: "Error!",
          text: "Please Enter Date Of Birth",
          type: "error",
          icon: "error",
        }).then(function () {
          return false;
        });
      }
       else {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirm_password,
            date_of_brith: startDate,
          }),
        };
        setLoading(true);
        await fetch(API_URL+"/api/addCustomer?usertype=client", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.status == 200) {
              setLoading(false);
              swal({
                title: "Success!",
                text: data.message,
                type: "success",
                icon: "success",
              }).then(function () {
                navigate("/login");
              });
              setFormData({
                name: "",
                mobile: "",
                email: "",
                password: "",
                confirm_password: "",
              });
            } else {
              setLoading(false);
              swal({
                title: "Error!",
                text: data.message,
                type: "error",
                icon: "error",
              }).then(function () {
                // navigate('/Register');
              });
            }
          });
      }
    } catch (err) {
      {};
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
              <h2>SIGN UP</h2>
              <form onSubmit={handleSubmit}>
                <div
                  className="col-lg-11"
                  style={{ display: "block", margin: "auto" }}
                >
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      required
                      name="name"
                      placeholder="Full  Name"
                      aria-label="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      aria-label="Email ID"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-mobile" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      name="mobile"
                      required
                      placeholder="Mobile Number"
                      aria-label="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </div>
                <div
                  className="col-lg-11"
                  style={{ display: "block", margin: "auto" }}
                >
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      required
                      name="password"
                      placeholder="Enter Password"
                      aria-label="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <InputGroup.Text id="basic-addon1" onClick={() => setShowPassword(!showPassword)} style={{cursor:'pointer'}}>
                      <i className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i>
                    </InputGroup.Text>
                  </InputGroup>
                </div>
                <div
                  className="col-lg-11"
                  style={{ display: "block", margin: "auto" }}
                >
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type={showConfirmPassword ? 'text' : 'password'} 
                      required
                      name="confirm_password"
                      placeholder="Confirm Password"
                      aria-label="Confirm Password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                    />
                    <InputGroup.Text id="basic-addon1" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{cursor:'pointer'}}>
                      <i className={showConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i>
                    </InputGroup.Text>
                  </InputGroup>
                </div>
                <div
                  className="col-lg-11"
                  style={{ display: "block", margin: "auto" }}
                >
                  <InputGroup className="mb-4 dateeeee">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <DatePicker
                      selected={startDate ? startDate : ""}
                      onChange={setStartDate}
                      name="date"
                      placeholderText={"Please Enter Date Of Birth"}
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      peekNextMonth
                      showTimeSelect={false}
                      onKeyDown={(e) => { e.preventDefault(); }}
                    />
                  </InputGroup>
                </div>
                <div
                  className="col-lg-11"
                  style={{ display: "block", margin: "auto" }}
                >
                  {Loading ? (
                    <button
                      style={{ cursor: "pointer" }}
                      className="login_btnup"
                    >
                      Please wait
                    </button>
                  ) : (
                    <button type="submit" className="login_btnup">
                      Sign Up
                    </button>
                  )}
                </div>
              </form>
              <span className="login_forgot">
                Already have an account ? <Link to="/Login">Sign In</Link>
              </span>
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

export default Register;
