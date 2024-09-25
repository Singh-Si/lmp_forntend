import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup, ProgressBar } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import HomeInsurancedetails from "../Common/HomeInsurancedetails";
const Homecondition = () => {
  // fetch the data from backend

  const [serverData, setServerData] = useState([]);

  const handleFetch = async () => {
    try {

      const response = await fetch(`${admin}/getAllHomeConditions`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setServerData(data.data);
      const initialHomeCondition = data && data.data.length > 0 ? data.data.map((item) => ({
        _id: item._id,
        value: false,
        name: item.home_condition_label
      })) : [];
      if (HomeInsurance.home_condition.length === 0) {
        setHomeInsurance((prevState) => ({
          ...prevState,
          home_condition: initialHomeCondition,
        }))
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
  const handlePush = (val, id, value) => {
    if (HomeInsurance.home_condition.length > 0) {
      // Check if the _id already exists in the array
      let arr = HomeInsurance.home_condition
      const existingIndex = arr.findIndex((item) => item._id === id);
      // If the _id exists, update the existing entry; otherwise, add a new entry
      if (existingIndex !== -1) {
        arr[existingIndex].value = value; // Update the existing entry's value
      }
      setHomeInsurance((prevState) => ({
        ...prevState,
        home_condition: arr,
      }));
      localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
    };
  }
  const isHomeConditionChecked = (id) => {
    const entry = HomeInsurance.home_condition.find((item) => item._id === id);
    // If entry exists and the value matches, return true (checked), else return false (unchecked)
    return entry ? entry.value : false;
  };
  // for submitting the data
  const handleSubmit = async () => {
    const localStorageItem = localStorage.getItem("HomeInsurance");

    const data = JSON.parse(localStorageItem);

    const { home_condition, } = data;

    const dataToSend = {
      home_condition: home_condition,
      location: 'Homequotes'
    };

    await HandleSubmitHomeFormdata(dataToSend);
  };


  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);

  // for converting the string to camel case
  function convertToCamelCase(str) {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

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
                      serverData.slice(5, serverData.length).map((data) => (
                        <div className="col-lg-5 " key={data._id}>
                          <ul>
                            <li className="gap_line">{convertToCamelCase(data.home_condition_label)}</li>
                          </ul>
                          <div
                            className="button-group-pills"
                            data-toggle="buttons"
                          >
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
                      <Link to="/Homecondition" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        to="/Homequotes"
                        className="buttonactions"
                        onClick={handleSubmit}
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
      <HomeInsurancedetails />
      <Footer />
    </div>
  );
};

export default Homecondition;
