import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import HomeInsurancedetails from "../Common/HomeInsurancedetails";
const Homehelper = () => {
  // fetch the data from backend

  const [serverData, setServerData] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [ownerShipStatus, setOwnerShipStatus] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch all data sequentially using await
      const response1 = await fetch(`${admin}/getAllHomePlanTypes`);
      const response2 = await fetch(`${admin}/getAllHomePropertyTypes`);

      const response3 = await fetch(`${admin}/getAllHomeOwnershipStatus`);

      // Check if all responses are ok
      if (!response1.ok || !response2.ok || !response3.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse all responses
      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();

      // Update state variables accordingly
      setServerData(data1.data);
      setPropertyType(data2.data);
      setOwnerShipStatus(data3.data);
    } catch (error) {
      //console.log(error.message);
    }
  };

  // Call the fetchData function in useEffect to fetch all data when the component mounts
  useEffect(() => {
    fetchData();
    // handleSubmit();
  }, []);

  // setting the data from homeInsurance context api

  const { HomeInsurance, setHomeInsurance } = UseMotorContext();

  // const handleSelect = (name, e) => {
  //   const rawValue = e.target.value.replace(/[^0-9]/g, "");
  //   const formattedValue = Number(rawValue).toLocaleString();

  //   console.log(name, formattedValue);
  //   return false;

  //   setHomeInsurance((prevState) => ({
  //     ...prevState,
  //     [name]: formattedValue,
  //   }));
  //   localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  // };
  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);



  const handleClaimStatusChange = (value) => {
    console.log("hiii iam here");
    console.log("Claim Status:", value);
    setHomeInsurance((prevState) => ({
      ...prevState,
      noOfClaimYear: value,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));

  };

  const handleDomesticHelperChange = (value) => {
    console.log("hiii iam here");
    console.log("Domestic Helper:", value);
    setHomeInsurance((prevState) => ({
      ...prevState,
      domestic_value: value,
    }));
  }

  const labelToValueMap = {
    "Never": 0,
    "1 Year ago": 1,
    "2 Year ago": 2,
    "3 Year ago": 3,
    "4 Year ago": 4,
    "5 Year ago": 5,
    "5 Year or above": 6,
  };

  const labelToValueMap1 = {
    "None": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "5 or above": 6,
  };



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
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                      <ul>
                        <li>Do you have any Claims in last 5 years ?</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">

                          {["Never", "1 Year ago", "2 Year ago", "3 Year ago", "4 Year ago", "5 Year ago", "5 Year or above"].map((item) => (
                            <div
                              key={item}
                              className="col-lg-4 col-md-4 col-sm-6 col-xs-6 radiohide mb-3"
                            >
                              
                              <label
                                className={
                                  HomeInsurance.noOfClaimYear === labelToValueMap[item]
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                                onClick={() => handleClaimStatusChange(labelToValueMap[item])}
                              >
                                <input
                                  type="radio"
                                  name="options"
                                  defaultChecked={
                                    HomeInsurance.noOfClaimYear === labelToValueMap[item]
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                  }
                                />
                                {item}
                              </label>
                              <h6
                                style={{
                                  marginBottom: "15px",
                                  textAlign: "center",
                                  fontSize: "16px",
                                }}
                              >
                              </h6>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>





                    <div className="col-lg-12">
                      <ul>
                        <li>Domestic Helper</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">

                          {["None", "1", "2", "3", "4", "5", "5 or above"].map((item) => (
                            <div
                              key={item}
                              className="col-lg-4 col-md-4 col-sm-6 col-xs-6 radiohide mb-3"
                            >
                              <label
                                className={
                                  HomeInsurance.domestic_value === labelToValueMap1[item]
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                                onClick={() => handleDomesticHelperChange(labelToValueMap1[item])}
                              >
                                <input
                                  type="radio"
                                  name="options"
                                  defaultChecked={
                                    HomeInsurance.domestic_value === labelToValueMap1[item]
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                />
                                {item}
                              </label>
                              <h6
                                style={{
                                  marginBottom: "15px",
                                  textAlign: "center",
                                  fontSize: "16px",
                                }}
                              >
                              </h6>
                            </div>
                          ))}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Homevalue" className="buttonactions">
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
                    >
                      <Link
                        to="/Homepersonaldetails"
                        className="buttonactions"
                      // onClick={handleSubmit}
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

export default Homehelper;
