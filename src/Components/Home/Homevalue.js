import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HomeInsurancedetails from "../Common/HomeInsurancedetails";

const Homevalue = () => {
  // fetch the data from backend
  const { HomeInsurance, setHomeInsurance, handleHomeInsurance, hometooltip } =
    UseMotorContext();

  const handleSelect = (name, e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = Number(rawValue).toLocaleString();

    if (formattedValue === "NaN") {
      formattedValue = ""; // Handle NaN input (e.g., empty input)
    }

    setHomeInsurance((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));

    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };



  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);

  const Navigate = useNavigate();

  const handleselectdata = (name, e) => {
    console.log(name, e.target.value);

    setHomeInsurance((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  }



  const handleSubmit = () => {
    console.log(HomeInsurance);
    if (HomeInsurance.plan_type === "642279d4fb67d39380fef82d") {
      if (!HomeInsurance.building_value || HomeInsurance.building_value === "0") {
        swal("Please enter Building value", "", "warning");
        return false;
      }
      // if(!HomeInsurance.content_value){
      //   alert("Please enter content value");
      //   return false;
      // }
      // if(!HomeInsurance.personal_belongings_value){
      //   alert("Please enter personal belongings value");
      //   return false;
      // }
      else {
        localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
        Navigate("/Homehelper");
      }
    }

    if (HomeInsurance.plan_type === "642279f2fb67d39380fef834") {
      if (!HomeInsurance.content_value || HomeInsurance.content_value === "0") {
        swal("Please enter Content value", "", "warning");
        return false;
      }
      if (!HomeInsurance.personal_belongings_value || HomeInsurance.personal_belongings_value === "0") {
        swal("Please enter Personal belongings value", "", "warning");
        return false;
      }
      else {
        localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
        Navigate("/Homehelper");
      }
    }

    if (HomeInsurance.plan_type === "64227a40fb67d39380fef83b") {
      if (!HomeInsurance.content_value || HomeInsurance.content_value === "0") {
        swal("Please enter Content value", "", "warning");
        return false;
      }
      if (!HomeInsurance.building_value || HomeInsurance.building_value === "0") {
        swal("Please enter Building value", "", "warning");
        return false;
      }
      if (!HomeInsurance.personal_belongings_value || HomeInsurance.personal_belongings_value === "0") {
        swal("Please enter Personal belongings value", "", "warning");
        return false;
      }
      else {
        localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
        Navigate("/Homehelper");
      }
    }

    if (HomeInsurance.plan_type === "64227a65fb67d39380fef842") {
      if (!HomeInsurance.content_value) {
        swal("Please enter Content value", "", "warning");
        return false;
      }
      if (!HomeInsurance.building_value) {
        swal("Please enter Building value", "", "warning");
        return false;
      }
      if (!HomeInsurance.personal_belongings_value) {
        swal("Please enter Personal belongings value", "", "warning");
        return false;
      }
      else {
        localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
        Navigate("/Homehelper");
      }
    }

  }

  // Function to format amount with commas
  // function formatAmount(amount) {
  //   const numericValue = parseFloat(amount.replace(/,/g, ''));
  //   if (!isNaN(numericValue)) {
  //     return numericValue.toLocaleString('en-US');
  //   }
  //   return amount;
  // }

  // Function to handle numeric input change
  // function handleNumericInputChange(fieldName, event) {
  //   // Allow only numeric input
  //   const sanitizedValue = event.target.value.replace(/[^0-9]/g, '');

  //   // Update the state or handle the value as needed
  //   handleselectdata(fieldName, { target: { value: sanitizedValue } });
  // }

  // function formatAmount(amount) {
  //   const numericValue = parseFloat(amount.replace(/,/g, ''));
  //   if (!isNaN(numericValue)) {
  //     // Use toLocaleString with custom options for grouping
  //     return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
  //   }
  //   return amount;
  // }

  // // Function to handle numeric input change
  // function handleNumericInputChange(fieldName, event) {
  //   // Allow only numeric input
  //   const sanitizedValue = event.target.value.replace(/[^0-9]/g, '');

  //   // Update the state or handle the value as needed
  //   handleselectdata(fieldName, { target: { value: sanitizedValue } });
  // }

  function formatAmount(amount) {
    if (amount !== null) {
      const numericValue = parseFloat(amount.toString().replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        // Use toLocaleString with custom options for grouping
        return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
      }
      return ''; // Return an empty string if the input is not a valid number
    }
  }






  console.log('HomeInsurance:', HomeInsurance)
  console.log('hometooltip:', hometooltip)

  return (
    <div>
      <Header />
      <Homebanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <h5
            className="gheading"
            style={{ color: "#F43130", lineHeight: "15px" }}
          >
            Discount % should be reduced
          </h5>
          <h5 className="gheading mb-4">Insurance your home instantly</h5>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  {HomeInsurance.plan_type === "642279d4fb67d39380fef82d" ? (
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>Building Value (AED)</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4" style={{position:'relative'}}>
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={formatAmount(HomeInsurance.building_value)}
                                  onChange={(e) => handleselectdata("building_value", e)}
                                  required
                                  placeholder="Building value"
                                  aria-label="Building value"
                                />
                              </InputGroup>
                              <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                  <Tooltip id="tooltip-right">
                                    {hometooltip?.buildingValue}
                                  </Tooltip>
                                }
                              >
                                <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : HomeInsurance.plan_type === "642279f2fb67d39380fef834" ? (
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>Content Value (AED)</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={formatAmount(HomeInsurance.content_value)}
                                  onChange={(e) =>
                                    handleselectdata("content_value", e)
                                  }
                                  required
                                  placeholder="Content Value"
                                  aria-label="Content Value"
                                />
                              </InputGroup>
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {hometooltip?.contentValue}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>Personal belonging Value (AED)</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={
                                    formatAmount(HomeInsurance.personal_belongings_value)
                                  }
                                  onChange={(e) =>
                                    handleselectdata("personal_belongings_value", e)
                                  }
                                  required
                                  placeholder="Personal belongings value"
                                  aria-label="Personal belongings value"
                                />
                              </InputGroup>
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {hometooltip?.personalbelongingValue}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>Content Value (AED)</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={formatAmount(HomeInsurance.content_value)}
                                  onChange={(e) =>
                                    handleselectdata("content_value", e)
                                  }
                                  required
                                  placeholder="Content Value"
                                  aria-label="Content Value"
                                />
                              </InputGroup>
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {hometooltip?.contentValue}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>Building Value (AED)</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={formatAmount(HomeInsurance.building_value)}
                                  onChange={(e) =>
                                    handleselectdata("building_value", e)
                                  }
                                  required
                                  placeholder="Building value"
                                  aria-label="Building value"
                                />
                              </InputGroup>
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {hometooltip?.buildingValue}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>Personal belonging Value (AED)</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={
                                    formatAmount(HomeInsurance.personal_belongings_value)
                                  }
                                  onChange={(e) =>
                                    handleselectdata("personal_belongings_value", e)
                                  }
                                  required
                                  placeholder="Personal belongings value"
                                  aria-label="Personal belongings value"
                                />
                              </InputGroup>
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {hometooltip?.personalbelongingValue}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Homeplan" className="buttonactions">
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
                      onClick={handleSubmit}
                    >
                      <Link
                        // to="/Homehelper"
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
      <HomeInsurancedetails />
      <Footer />
    </div>
  );
};

export default Homevalue;
