import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import PhoneInput from "react-phone-number-input";
import Homebanner from "../Banner/Homebanner";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HomeInsurancedetails from "../Common/HomeInsurancedetails";

const Homepersonaldetails = () => {
  const Progress = 40;
  const {
    HomeInsurance,
    setHomeInsurance,
    handleHomeInsurance,
    handleHomeDate,
    handleHomePhoneChange, HandleSubmitHomeFormdata, hometooltip
  } = UseMotorContext();
  const [startDate, setStartDate] = useState();
  const [serverData, setServerData] = useState([]);
  // Validate Email Id
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fetchData = async () => {
    await fetch(`${admin}/getAllNattionlity?lob=Home`)
      .then((res) => res.json())
      .then((result) => {
        setServerData(result.data)
        if (result.data?.length > 0) {
          let dataarr = result?.data;
          //console.log("nationality array",dataarr)
          let countrytoifind = dataarr.find(
            (item) => item.nationality_name === "UNITED ARAB EMIRATES"
          );
          //console.log("nationality check",countrytoifind)
          if (!HomeInsurance.nationality) {
            setHomeInsurance((prevData) => ({
              ...prevData,
              nationality: countrytoifind?.nationality_name,
            }));
            localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
          }
        }
      })
      .catch((e) => { });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const localStorageItem = localStorage.getItem("HomeInsurance");

    const data = JSON.parse(localStorageItem);

    const {
      property_type,
      ownership_status,
      plan_type,
      content_value,
      building_value,
      personal_belongings_value,
      claim_status,
      domestic_value,
      full_name,
      email,
      insurance_type,
      phone_number,
      date,
      address,
      nationality,
      home_condition,
      noOfClaimYear,
    } = data;

    const dataToSend = {
      name: full_name,
      email: email,
      phoneno: phone_number,
      date_of_birth: date,
      insuranceType: "Home",
      home_property_type: property_type,
      home_ownership_status: ownership_status,
      home_plan_type: plan_type,
      home_claim_years: claim_status,
      content_value: content_value,
      building_value: building_value,
      personal_belongings_value: personal_belongings_value,
      domestic_value: domestic_value,
      nationality: nationality,
      last_year_claim: noOfClaimYear,
    };
    await HandleSubmitHomeFormdata(dataToSend);

  };


  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      setHomeInsurance(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);


  const handlecheck = (e) => {
    const { name, checked } = e.target;
    setHomeInsurance((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  console.log('hometooltip:', hometooltip)


  return (
    <div>
      <Header />
      <Homebanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <ul style={{ paddingLeft: "0px" }}>
                      <li style={{ listStyle: "none", marginLeft: "15px" }}>
                        Please fill your details :
                      </li>
                    </ul>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <ul>
                        <li>Full name</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="name"
                          required
                          name="full_name"
                          value={HomeInsurance.full_name}
                          onChange={handleHomeInsurance}
                          placeholder="Full Name"
                          aria-label="Full Name"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {hometooltip?.personalDetails.name}
                          </Tooltip>
                        }
                      >
                        <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <ul>
                        <li>Email</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="fa fa-envelope-o"
                            aria-hidden="true"
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          name="email"
                          type="email"
                          value={HomeInsurance.email}
                          onChange={handleHomeInsurance}
                          placeholder="Email ID"
                          aria-label="Email ID"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {hometooltip?.personalDetails.email}
                          </Tooltip>
                        }
                      >
                        <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <ul>
                        <li>Phone number</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <PhoneInput
                          international
                          className="form-control"
                          defaultCountry="AE"
                          value={HomeInsurance.phone_number}
                          onChange={handleHomePhoneChange}
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {hometooltip?.personalDetails.phone}
                          </Tooltip>
                        }
                      >
                        <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Date of birth</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <DatePicker
                          placeholderText="Date Of Birth"
                          className="form-control"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          selected={
                            HomeInsurance.date
                              ? new Date(HomeInsurance?.date)
                              : null
                          }
                          onChange={(startDate) => {
                            handleHomeDate(startDate);
                          }}
                          maxDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          showTimeSelect={false}
                        />
                      </InputGroup>
                    </div>
                    {/* <div className="col-lg-6">
                      <ul>
                        <li>Address</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          name="address"
                          type="text"
                          value={HomeInsurance.address}
                          onChange={handleHomeInsurance}
                          placeholder="Address of the property to be Insured "
                          aria-label="Address of the property to be Insured "
                        />
                      </InputGroup>
                    </div> */}
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3">
                          <ul>
                            <li>Select Your Nationality</li>
                          </ul>
                          <select
                            name="nationality"
                            className="form-control"
                            placeholder="Select Nationality"
                            value={HomeInsurance.nationality}
                            onChange={handleHomeInsurance}
                          >
                            <option hidden>Select Your Country</option>

                            {serverData.length === 0 ? (
                              <option>No options available</option>
                            ) : (
                              serverData &&
                              serverData.map((val) => (
                                <option value={val.nationality_name} key={val.nationality_name}>
                                  {val.nationality_name}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex m-3">
                    <Form.Check
                      className="abcds_abcs"
                      type="checkbox"
                      name="personalterms"
                      style={{ marginRight: '10px' }}
                      defaultChecked={HomeInsurance.personalterms}
                      onChange={handlecheck}
                    />
                    <strong>
                      <label>
                        By Clicking on "Proceed",I declare that I am a resident of
                        UAE and holding a valid Visa and agree to the website{" "}
                        <Link
                          target="_blank"
                          className="termscond"
                          to="/Privacypolicy"
                        >
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                          target="_blank"
                          className="termscond"
                          to="/Termsandcond"
                        >
                          Terms of Use
                        </Link>
                      </label>
                    </strong>
                  </div>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Homehelper" className="buttonactions">
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    {HomeInsurance.email &&
                      HomeInsurance.full_name &&
                      HomeInsurance.phone_number &&
                      HomeInsurance.date &&
                      HomeInsurance.personalterms &&
                      emailRegex.test(HomeInsurance.email) ? (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          to="/Homeaddress"
                          className="buttonactions"
                          onClick={handleSubmit}
                        >
                          Next
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    ) : (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          className="buttonactions"
                          onClick={() => {
                            let errorText = "";

                            if (!HomeInsurance.full_name) {
                              errorText = "Please Enter Your Name";
                            }
                            else if (
                              !HomeInsurance?.email ||
                              !emailRegex.test(HomeInsurance?.email)
                            ) {
                              errorText = "Please Enter a Valid Email";
                            }
                            else if (
                              !HomeInsurance?.phone_number
                            ) {
                              errorText = "Please Enter a Phone Number";
                            }
                            else if (
                              !HomeInsurance?.date
                            ) {
                              errorText = "Please Enter a Date Of Birth";
                            }
                            else if (
                              !HomeInsurance.personalterms || HomeInsurance.personalterms === false
                            ) {
                              errorText = "Please Agree To Terms And Conditions";
                            }

                            if (errorText) {
                              swal({

                                text: errorText,
                                icon: "warning",
                              });
                            }
                          }}
                        >
                          Next
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeInsurancedetails />
      <Footer />
    </div>
  );
};

export default Homepersonaldetails;
