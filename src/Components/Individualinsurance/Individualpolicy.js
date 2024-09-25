import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useEffect } from "react";
import swal from "sweetalert";
import admin from "../../config";
import { API_URL } from "../..";
import Individualnsurancedetails from "../Common/Individualnsurancedetails";
import { io } from "socket.io-client";
let countt = 0
const Individualpolicy = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
    handleIndividualPhoneChange,
    individualtooltip
  } = UseMotorContext();

  const navigate = useNavigate();
  const Progress = 30;
  const [Companies, setCompanies] = useState([])
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    if (countt === 0) {
      const newSocket = io('http://localhost:8000', {
        query: {
          userType: 'lob',
          lob: "liveOnMedical"// or 'unregistered'
        },
      })
      setSocket(newSocket)
    }
    const stored = localStorage.getItem("IndividualInsurance");
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Logic to capture when the user leaves the page
        if (countt >= 3) {
          alert("warning !! Too many requests")
        } else {
          countt++
        }
        const newSocket = io('http://localhost:8000', {
          query: {
            userType: 'lob',
            lob: "liveOnMedical"// or 'unregistered'
          },
        })
        setSocket(newSocket)
        // ViewingTravelLOB()
      } else if (document.visibilityState === 'hidden' && countt == 2) {
        if (socket) {
          socket.disconnect()
        }
        setTimeout(() => {
          countt = 0
        }, 10000);
      }
    }


    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener on component unmount
    
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
    }
    (async () => {
      await fetch(API_URL + "/api/getAllCompanies")
        .then((response) => response.json())
        .then((data) => setCompanies(data.data))

    })()
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );

  }, [IndividualInsurance]);

  const handleIndividualDate = (date) => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      medical_current_insurer_expiry_date: date,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };

  const handlePush = (e, bool) => {
    if (bool === false) {
      setIndividualInsurance((prev) => ({
        ...prev,
        medical_policy_active: false
      }))
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );
      navigate("/Individualinsurancepersonaldetails");
    } else {
      setIndividualInsurance((prev) => ({
        ...prev,
        medical_policy_active: true
      }))
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );
    }
  };
  console.log("Companies", Companies)

  const handlenext = () => {
    if(IndividualInsurance.medical_policy_active == true &&  !IndividualInsurance.medical_current_insurer ){
      swal({
        text: "Please Select the Current Insurer",
        icon: "warning",
      });
      return false;
    }
  else if(IndividualInsurance.medical_policy_active == true && !IndividualInsurance.medical_current_insurer_expiry_date){
    swal({
      text: "Please Select the Expiry Date",
      icon: "warning",
    });
    return false;
  }
  else{
    navigate("/Individualinsurancepersonaldetails");
  }
  }

  console.log("individualtooltip", individualtooltip)

  return (
    <div>
      <Header />
      <Individualmedicalbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <div className="row">
                    <ul style={{ paddingLeft: "0px" }}>
                      <li style={{ listStyle: "none", fontWeight: "bolder" }}>
                        Do you have an active medical policy in UAE ?
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-12 mb-4">
                    <ul style={{ paddingLeft: "0px" }}></ul>
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                          <label className={`btn btn-default ${IndividualInsurance.medical_policy_active && 'active'}`} onClick={(e) => handlePush(e, true)}>
                            <input type="radio" name={`options`} />
                            <div >Yes</div>
                          </label>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                          <label className={`btn btn-default ${!IndividualInsurance.medical_policy_active && 'active'}`} onClick={(e) => handlePush(e, false)}>
                            <input type="radio" name={`options`} />
                            <div >No</div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {IndividualInsurance.medical_policy_active ? (
                    <>
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                        <div className="row">
                          <div className="col-lg-6">
                            <InputGroup className="mb-4">
                              <InputGroup.Text id="basic-addon1">
                                <i className="fa fa-user" aria-hidden="true"></i>
                              </InputGroup.Text>
                              <select
                                name="medical_current_insurer"
                                className="form-control"
                                value={IndividualInsurance.medical_current_insurer}
                                onChange={handleIndividualInsurance}
                              >

                                {Companies.length === 0 ? (
                                  <option value={""} hidden>Select Current Insurer</option>
                                ) : (

                                  Companies &&
                                  <>
                                    <option value={""} hidden>Select Current Insurer</option>
                                    {Companies.map((val) => (
                                      <option value={val._id} key={val._id}>
                                        {val.company_name}
                                      </option>
                                    ))}
                                  </>
                                )}
                              </select>
                            </InputGroup>
                          </div>
                          <div className="col-lg-6">
                            <InputGroup className="mb-4">
                              <InputGroup.Text id="basic-addon1">
                                <i
                                  className="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                              </InputGroup.Text>
                              <DatePicker
                                placeholderText="Expiry date"
                                className="form-control"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                selected={
                                  IndividualInsurance.medical_current_insurer_expiry_date
                                    ? new Date(IndividualInsurance?.medical_current_insurer_expiry_date)
                                    : null
                                }
                                onKeyDown={(e) => e.preventDefault()}
                                onChange={(startDate) => {
                                  handleIndividualDate(startDate);
                                }}
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect={false}
                                minDate={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)} // 30 days prior
                                maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year after
                              />
                            </InputGroup>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-8 col-md-12 col-sm-12 col-xs-12 buttons mt-4 mb-3 "
                        style={{ justifyContent: "right" }}
                      >
                        {/* {IndividualInsurance.medical_current_insurer_expiry_date &&
                          IndividualInsurance.medical_current_insurer ? (
                          <Link
                            to="/Individualinsurancepersonaldetails"
                            className="buttonactions"
                          >
                            Next
                            <i
                              className="fa fa-chevron-right"
                              aria-hidden="true"
                            ></i>
                          </Link>
                        ) : (
                          <div
                            className="col-lg-8 col-md-12 col-sm-12 col-xs-12 buttons mt-4 mb-3 "
                            style={{ justifyContent: "right" }}
                          >
                            <Link
                              className="buttonactions"
                              onClick={() => {
                                let errorText = "";

                                if (!IndividualInsurance.medical_current_insurer) {
                                  errorText = "Please fill the current_insurer";
                                } else if (!IndividualInsurance.medical_current_insurer_expiry_date) {
                                  errorText = "Please Enter Your expiry date";
                                }

                                if (errorText) {
                                  swal({
                                    // title: "Error!",
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
                        )} */}


                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/" className="buttonactions">
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                      onClick={handlenext}
                    >
                      <Link
                       
                        className="buttonactions"
                      >
                        Next
                        <i
                          className="fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
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

export default Individualpolicy;
