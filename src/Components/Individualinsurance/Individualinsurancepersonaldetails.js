import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import  PhoneInput,{ formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber }  from "react-phone-number-input";
import Input from 'react-phone-number-input/input'
import flags from 'react-phone-number-input/flags'
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useEffect } from "react";
import swal from "sweetalert";
import admin from "../../config";
import { CSpinner } from "@coreui/react";
import flag from '../../Image/uaeflag.png'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { API_URL } from "../..";
import Individualnsurancedetails from "../Common/Individualnsurancedetails";
const Individualinsurancepersonaldetails = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
    handleIndividualDate,
    handleIndividualPhoneChange, HandleSubmitIndividualFormdata,
    // individualtooltip
  } = UseMotorContext();
  const [nationality, setnationality] = useState([]);
  const [terms, setterms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [individualtooltip, setIndividualtooltip] = useState({});
  const Progress = 30;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const Navigate = useNavigate();


  const handleSubmit = async () => {
    let errorText = "";

    if (!IndividualInsurance.full_name) {
      errorText = "Please Enter Your Name";
    }
    else if (
      !IndividualInsurance?.email ||
      !emailRegex.test(IndividualInsurance?.email)
    ) {
      errorText = "Please Enter a Valid Email";
    }
    else if (!IndividualInsurance.phone_number) {
      errorText = "Please enter a phone number";
    }
    // else if (IndividualInsurance.phone_number.length < 13 || IndividualInsurance.phone_number.length > 13) {
    //   errorText = "Please enter a valid phone number";
    // }
    else if (IndividualInsurance.phone_number && isValidPhoneNumber(IndividualInsurance.phone_number) == false) {
      errorText = "Please enter a valid phone number";
    }
    else if (!IndividualInsurance.date) {
      errorText = "Please enter a date of birth";
    }
    else if (!IndividualInsurance.gender) {
      errorText = "Please enter an option gender";
    }
    else if (!terms || terms == false) {
      errorText = "Please Select Terms And Conditions";
    }
    if (errorText) {
      swal({
        // title: "Error!",
        text: errorText,
        icon: "warning",
      });
    }
    else {
      setLoading(true);

      let dataToSend = {
        name: IndividualInsurance.full_name,
        email: IndividualInsurance.email,
        phoneno: IndividualInsurance.phone_number,
        date_of_birth: IndividualInsurance.date,
        gender: IndividualInsurance.gender,
        nationality: IndividualInsurance.nationality,
        medical_policy_active: IndividualInsurance.medical_policy_active,
        location:"Individualinsurancepersonaldetails"
      };
      if (IndividualInsurance.medical_policy_active) {
        dataToSend = {
          ...dataToSend,
          medical_current_insurer: IndividualInsurance.medical_current_insurer,
          medical_current_insurer_expiry_date: IndividualInsurance.medical_current_insurer_expiry_date
        }
      }

      await HandleSubmitIndividualFormdata(dataToSend);
      
      Navigate('/Individualcountry')
      setLoading(false);
      
    }
  };

  const fetchData = async () => {
    await fetch(`${admin}/getAllNattionlity`)
      .then((res) => res.json())
      .then((data) => setnationality(data.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchData();
    getIndividualtooltip()
  }, []);



  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);

  const getIndividualtooltip = () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`${API_URL}/api/getIndividualToooltip`, requestoptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('individual tooltip data:', data);
          setIndividualtooltip(data?.data)
        })
        .catch((error) => {
          console.log('error:', error);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }

  return (
    <div>
      <Header />
      <Individualmedicalbanner />
      {loading && (
        <div className="loader-overlay" style={{background:"transparent"}}>
          <div className="loader">
            <CSpinner color="danger" />
          </div>
        </div>
      )}
     
     <div className={`content ${loading ? 'loading' : ''}`}>
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="row">
                    <ul style={{ paddingLeft: "0px" }}>
                      <li style={{ listStyle: "none" }}>
                        Please fill in the insured’s details :
                      </li>
                    </ul>
                    <div className="col-lg-6" style={{position:'relative'}} >
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="full_name"
                          value={IndividualInsurance.full_name}
                          onChange={handleIndividualInsurance}
                          required
                          placeholder="Full Name"
                          aria-label="Full Name"
                        />
                      </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {individualtooltip?.insuredDetails?.name}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="fa fa-envelope-o"
                            aria-hidden="true"
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="email"
                          name="email"
                          value={IndividualInsurance.email}
                          onChange={handleIndividualInsurance}
                          placeholder="Email ID"
                          aria-label="Email ID"
                        />
                      </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {individualtooltip?.insuredDetails?.email}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        {/* <PhoneInput
                          international
                          className="form-control"
                          defaultCountry="AE"
                          value={IndividualInsurance.phone_number}
                          onChange={handleIndividualPhoneChange}
                          
                        /> */}

                        {/* <PhoneInput
                          international
                          className="form-control"
                          countries={['AE']}
                          defaultCountry="AE"
                          value={IndividualInsurance.phone_number}
                          onChange={handleIndividualPhoneChange}
                          disableDropdown={true}
                        /> */}

                        <img src={flag} alt="United Arab Emirates" style={{
                          marginTop: "7px",
                          height: "46px",
                          width: "43px",
                        }} 
                        />
                        <Input
                          defaultCountry="AE"
                          country="AE"
                          className="form-control"
                          international
                          withCountryCallingCode
                          value={IndividualInsurance.phone_number}
                          onChange={handleIndividualPhoneChange}
                          placeholder="Enter phone number"
                          /> 


                      </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {individualtooltip?.insuredDetails?.phone}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
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
                            IndividualInsurance.date
                              ? new Date(IndividualInsurance?.date)
                              : null
                          }
                          onKeyDown={(e) => e.preventDefault()}
                          onChange={(startDate) => {
                            handleIndividualDate(startDate);
                          }}
                          maxDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          showTimeSelect={false}
                          />
                      </InputGroup>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {individualtooltip?.insuredDetails?.date}
                              </Tooltip>
                            }
                          >
                            <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                    </div>
                    <div className="col-lg-6">
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <select
                          className="form-control"
                          name="gender"
                          value={IndividualInsurance.gender}
                          onChange={handleIndividualInsurance}
                        >
                          <option hidden>Gender</option>
                          <option value={"Male"}>Male</option>
                          <option value={"Female (Single)"}>
                            Female (Single)
                          </option>
                          <option value={"Female (Married)"}>
                            Female (Married)
                          </option>
                        </select>
                      </InputGroup>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="d-flex labelssss mb-3">
                    <Form.Check
                      className="abcds_abcs"
                      type="checkbox"
                      name="isselecctcontactterms"
                      // checked={IndividualInsurance.isselecctcontactterms}
                      onChange={(e) => setterms(e.target.checked)} 
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
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Individualpolicy" className="buttonactions">
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    {/* {IndividualInsurance.email &&
                      IndividualInsurance.full_name &&
                      IndividualInsurance.phone_number &&
                      IndividualInsurance.gender &&
                      IndividualInsurance.date &&
                      IndividualInsurance.isselecctcontactterms &&
                      emailRegex.test(IndividualInsurance.email) ? ( */}
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                      onClick={handleSubmit}
                    >
          
                      <Link
                        // to="/Individualcountry"
                        className="buttonactions"
                      >
                        Next
                        <i
                          className="fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                    {/* ) : (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          className="buttonactions"
                          onClick={() => {
                            
                          }}
                        >
                          Next
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Individualnsurancedetails />
      <Footer />
    </div>
  );
};

export default Individualinsurancepersonaldetails;
