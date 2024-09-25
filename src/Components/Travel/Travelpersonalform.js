import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Travelbanner from "../Banner/Travelbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { API_URL } from '../..'
import axios from "axios";
import { MotoformData } from "../../redux/reducers/MotoformDataReducerSlice";
import { Input } from "react-select/animated";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import TravelInsurancedetails from "../Common/TravelInsurancedetails";

const Travelpersonalform = () => {
  const { handleSubmitMotorform } = UseMotorContext()
  const navigate = useNavigate();
  const { travelsFormsData, settravelsFormsData, HandleSubmitTravelFormdata, traveltootip } = UseMotorContext();
  const Progress = 40;

  useEffect(() => {
    localStorage.setItem('travelsFormsDataLocation', window.location.pathname.replace("/", ""))
  }, [])
  // useEffect(() => {

  //   localStorage.setItem('travelsFormsData', travelsFormsData.leadid )
  // }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    settravelsFormsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const dateInUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    settravelsFormsData((prevData) => ({
      ...prevData,
      date_of_birth: date,
    }));
  };

  const handlePhoneInputChange = (value) => {
    settravelsFormsData((prevData) => ({
      ...prevData,
      phone_no: value, // Assuming the property name is 'phone_no' in your state
    }));
  };

  const handlecheck = (e) => {
    const { name, checked } = e.target;
    settravelsFormsData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };




  const handleNextClick = async () => {
    if (travelsFormsData.name === "") {
      swal("Please enter your name", "", "warning");
      return false;
    }

    else if (travelsFormsData.phone_no === "" || travelsFormsData.phone_no === null || travelsFormsData.phone_no === undefined) {
      swal("Please enter your phone number", "", "warning");
      return false;
    }

    else if (travelsFormsData.email === "") {
      swal("Please enter your email", "", "warning");
      return false;
    }

    else if (!travelsFormsData.email.includes("@") || !travelsFormsData.email.includes(".")) {
      swal("Please enter a valid email", "", "warning");
    }

    else if (travelsFormsData.date_of_birth === "") {
      swal("Please enter your date of birth", "", "warning");
      return false;
    }

    else if (travelsFormsData.date_of_birth > new Date()) {
      swal("Please enter a valid date of birth", "", "warning");
      return false;
    }

    else if (travelsFormsData.passport_no === "") {
      swal("Please enter your passport number", "", "warning");
      return false;
    }

    else if (travelsFormsData.travel_insurance_for === "641c25df29b5921dc20ff9eb" && travelsFormsData.personalterms === false) {
      swal("Please agree to the terms and conditions", "", "warning");
      return false;
    }

    else {
      localStorage.setItem(
        "travelsFormsData",
        JSON.stringify(travelsFormsData)
      );


      let obj = {

        "travel_insurance_for": travelsFormsData.travel_insurance_for,
        "travel_trip_type": travelsFormsData.type_of_trip,
        "nationality": travelsFormsData.nationality,
        "travel_start_date": travelsFormsData.start_date,
        "travel_end_date": travelsFormsData.end_date,
        "no_of_travel": travelsFormsData.no_of_travel,
        "travel_plan_type": travelsFormsData.plan_type,
        "name": travelsFormsData.name,
        "phoneno": travelsFormsData.phone_no,
        "email": travelsFormsData.email,
        "date_of_birth": travelsFormsData.date_of_birth,
        "passport_no": travelsFormsData.passport_no,
        "insuranceType": "Travel",
        "locationname": "Travelpersonalform"


      }
      if (travelsFormsData.businessentitytoken) {
        obj["businessentitytoken"] = travelsFormsData.businessentitytoken
      }

      const { type_of_trip } = travelsFormsData;

      if (type_of_trip === "641d6ffe2e8acf350eaab1fa") {
        // If type_of_trip is "individual", go to Beneficiarydetails component
        obj['location'] = "Beneficarydetails";

      } else if (type_of_trip === "641d700e2e8acf350eaab204") {
        // If type_of_trip is "family", go to Familydetails component
        obj['location'] = "Familydetails";
      }



      await HandleSubmitTravelFormdata(obj);
      if (type_of_trip === "641d6ffe2e8acf350eaab1fa") {
        // If type_of_trip is "individual", go to Beneficiarydetails component
        navigate("/Beneficarydetails");

      } else if (type_of_trip === "641d700e2e8acf350eaab204") {
        // If type_of_trip is "family", go to Familydetails component
        navigate("/Familydetails");
      }
    }
  };

  console.log(traveltootip, "traveltootip")

  return (
    <div>
      <Header />
      <Travelbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: 'center' }}>
            <div className="col-lg-12">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <ul className="mb-3">
                    <li>Please fill your details:</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-5 col-xs-11" style={{position:'relative'}}>
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-user" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <Form.Control
                            required
                            name="name"
                            placeholder="Traveler Name"
                            value={travelsFormsData.name}
                            aria-label="Traveler Name"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.personalDetails?.name}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-5 col-xs-11" style={{position:'relative'}}>
                        <PhoneInput
                          international
                          name="phone_no"
                          className="form-control"
                          defaultCountry="AE"
                          value={travelsFormsData.phone_no}
                          onChange={handlePhoneInputChange}
                        />
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.personalDetails?.phone}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-5 col-xs-11" style={{position:'relative'}}>
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            required
                            name="email"
                            placeholder="Email ID"
                            value={travelsFormsData.email}
                            aria-label="Email ID"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.personalDetails?.email}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-5 col-xs-11" style={{position:'relative'}}>
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <DatePicker
                            className="form-control"
                            selected={
                              travelsFormsData.date_of_birth === null
                                ? null
                                : new Date(travelsFormsData.date_of_birth)
                            }
                            onChange={handleDateChange}
                            placeholderText="Date Of Birth"
                            maxDate={new Date()}
                            peekNextMonth
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            showTimeSelect={false}
                          />

                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.personalDetails?.date}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-5 col-xs-11" style={{position:'relative'}}>
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 448 512"
                            >
                              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                              <path d="M0 64C0 28.7 28.7 0 64 0H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM183 278.8c-27.9-13.2-48.4-39.4-53.7-70.8h39.1c1.6 30.4 7.7 53.8 14.6 70.8zm41.3 9.2l-.3 0-.3 0c-2.4-3.5-5.7-8.9-9.1-16.5c-6-13.6-12.4-34.3-14.2-63.5h47.1c-1.8 29.2-8.1 49.9-14.2 63.5c-3.4 7.6-6.7 13-9.1 16.5zm40.7-9.2c6.8-17.1 12.9-40.4 14.6-70.8h39.1c-5.3 31.4-25.8 57.6-53.7 70.8zM279.6 176c-1.6-30.4-7.7-53.8-14.6-70.8c27.9 13.2 48.4 39.4 53.7 70.8H279.6zM223.7 96l.3 0 .3 0c2.4 3.5 5.7 8.9 9.1 16.5c6 13.6 12.4 34.3 14.2 63.5H200.5c1.8-29.2 8.1-49.9 14.2-63.5c3.4-7.6 6.7-13 9.1-16.5zM183 105.2c-6.8 17.1-12.9 40.4-14.6 70.8H129.3c5.3-31.4 25.8-57.6 53.7-70.8zM352 192A128 128 0 1 0 96 192a128 128 0 1 0 256 0zM112 384c-8.8 0-16 7.2-16 16s7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H112z" />
                            </svg>
                          </InputGroup.Text>
                          <Form.Control
                            required
                            name="passport_no"
                            placeholder="Passport Number"
                            value={travelsFormsData?.passport_no}
                            aria-label="Passport Number"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.personalDetails?.passport}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>


                    </div>
                  </div>
                  {travelsFormsData.travel_insurance_for === "641c25df29b5921dc20ff9eb" &&
                    <div className="col-lg-12 d-flex m-3">
                      <Form.Check
                        className="abcds_abcs"
                        type="checkbox"
                        name="personalterms"
                        style={{ marginRight: '10px' }}
                        defaultChecked={travelsFormsData.personalterms}
                        onChange={handlecheck}
                      />
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
                    </div>
                  }
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                    >

                      <Link to="/Travelplantype" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>Back
                      </Link>

                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: 'right' }}
                      onClick={handleNextClick}
                    >
                      <Link className="buttonactions">
                        Next <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TravelInsurancedetails />
      <Footer />
    </div>
  )
};

export default Travelpersonalform;
