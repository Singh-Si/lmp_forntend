import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup, ProgressBar } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import axios from "axios";
import { API_URL } from "../..";
import swal from "sweetalert";
const Homecondition = () => {
  // for condition


  const [arr, setArr] = useState([]);
  // fetch the data from backend
  const [serverData, setServerData] = useState([]);
  const handleFetch = async () => {
    try {
      const response = await fetch(`${admin}/getAllHomeConditions`)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setServerData(data.data);
      const initialHomeCondition = data && data.data.length > 0 ? data.data.slice(0, 5).map((item) => ({
        _id: item._id,
        value: false,
      })) : [];
      if (HomeInsurance.home_condition.length !== 5) {

        setArr(initialHomeCondition)
      }

    } catch (error) {
      //console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  // fetch data from store local storage

  const Progress = 80;

  const { HomeInsurance, setHomeInsurance, HandleSubmitHomeFormdata } = UseMotorContext();


  useEffect(() => {
    // Update the HomeInsurance whenever arr state changes
    setHomeInsurance((prevState) => ({
      ...prevState,
      home_condition: arr,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [arr, setHomeInsurance]);

  const handlePush = (val, id, value) => {
    setArr((prevArr) => {
      const newArr = prevArr.map((item) =>
        item._id === id ? { ...item, value: !item.value } : item
      );
      return newArr;
    });
    // Rest of your code...
    setHomeInsurance((prevState) => ({
      ...prevState,
      [val]: arr,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };




  const isHomeConditionChecked = (id) => {
    const entry = arr.find((item) => item._id === id);

    // If entry exists and the value matches, return true (checked), else return false (unchecked)
    return entry ? entry.value : false;
  };

  // for submitting the data

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
      country,
      home_condition,
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
      homeAddress: address,
      home_condition: home_condition,
      content_value: content_value,
      building_value: building_value,
      personal_belongings_value: personal_belongings_value,
      domestic_value: domestic_value,
      location: window.location.pathname.replace("/", ""),
    };
    HandleSubmitHomeFormdata(dataToSend);

    setHomeInsurance((prevState) => ({
      ...prevState,
      home_condition: arr,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));


  };

  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setArr(parsedData.home_condition || []);
      setHomeInsurance(parsedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);

  // for converting the string to camel case
  function convertToCamelCase(str) {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }
  console.log("home_condition", HomeInsurance.home_condition.length)
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
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    {serverData.length === 0 ? (
                      <div>No data available</div>
                    ) : (
                      serverData.slice(0, 5).map((data) => (
                        <div className="col-lg-5 " key={data._id}>
                          <ul>
                            <li className="homecondtext">{convertToCamelCase(data.home_condition_label)}</li>
                          </ul>
                          <div
                            className="button-group-pills"
                            data-toggle="buttons">
                            <div className="row" style={{ justifyContent: "space-between" }}>
                              <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${!isHomeConditionChecked(data._id)
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name={`options-${data._id}`}
                                    defaultChecked={!isHomeConditionChecked(
                                      data._id
                                    )}
                                  />
                                  <div
                                    onClick={() =>
                                      handlePush(
                                        "home_condition",
                                        data._id,
                                        false
                                      )
                                    }
                                  >
                                    No
                                  </div>
                                </label>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${isHomeConditionChecked(data._id)
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name={`options-${data._id}`}
                                    defaultChecked={isHomeConditionChecked(
                                      data._id
                                    )}
                                  />
                                  <div
                                    onClick={() =>
                                      handlePush(
                                        "home_condition",
                                        data._id,
                                        true
                                      )
                                    }
                                  >
                                    Yes
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Homeaddress" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                      onClick={handleSubmit}
                    >
                      <Link
                        to="/Homecondition2"
                        className="buttonactions"
                      >
                        Next
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Insurancedetails />
      <Footer />
    </div>
  );
};

export default Homecondition;
