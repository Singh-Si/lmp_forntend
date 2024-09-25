import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Yachtbanner from "../Banner/Yachtbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import { useDispatch } from "react-redux";
import { AddYacht } from "../../redux/reducers/YachtDataReducerSlice";
import YachtInsurancedetails from "../Common/YachtInsurancedetails";

const Territorycoverage = () => {
  const dispatch = useDispatch()
  const Progress = 40;
  const { YachtFormsData, handlYachteSelectFormValue, handlYachtEstimatedSelect,
    handlYachteSelectFormValuedata } = UseMotorContext();
  const obj = {
    email: YachtFormsData.email,
    territoryCoverage: YachtFormsData.territoryCoverage,
    location: 'Claimsexperience'

  }
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]); // Add state for questions

  useEffect(() => {
    // Function to fetch questions and update their _id key

    const handleFetch = async () => {
      try {
        const response = await fetch(`${API_URL}/api/getActiveYachtCondition`)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestions(data.data);
        const initialHomeCondition = data && data.data.length > 0 ? data.data.map((item) => ({
          _id: item._id,
          value: false,
          name: item.yacht_condition_label
        })) : [];
        // //console.log({initialHomeCondition:YachtFormsData.territoryCoverage.length})
        if (YachtFormsData.territoryCoverage.length === 0) {
          dispatch(AddYacht({ name: "territoryCoverage", value: initialHomeCondition }))
        }
      } catch (error) {
        //console.log(error.message);
      }
    };
    handleFetch();
  }, []); // Empty dependency array to run only on component mount
  const isHomeConditionChecked = (id) => {
    const entry = YachtFormsData.territoryCoverage.find((item) => item._id === id);

    // If entry exists and the value matches, return true (checked), else return false (unchecked)
    return entry ? entry.value : false;
  };
  const handlePush = (id, value) => {
    if (YachtFormsData.territoryCoverage.length > 0) {
      // Clone the territoryCoverage array to a new array
      let newArr = [...YachtFormsData.territoryCoverage];

      // Find the index of the item with the matching _id
      const existingIndex = newArr.findIndex((item) => item._id === id);

      if (existingIndex !== -1) {
        // Update the value of the existing entry in the new array
        newArr[existingIndex] = { ...newArr[existingIndex], value: value };
      } else {
        // If the item doesn't exist, you might want to add it
        // newArr.push({ _id: id, value: value }); // Uncomment this if needed
      }

      // Dispatch the updated array to your store
      dispatch(AddYacht({ name: "territoryCoverage", value: newArr }));
    }
  };

  return (
    <div>
      <Header />
      <Yachtbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      Territory of the Coverage :
                    </li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    {questions.length === 0 ? (
                      <div>No data available</div>
                    ) : (
                      questions.slice(0, 5).map((data) => (
                        <div className="col-lg-6 " key={data._id}>
                          <ul>
                            <li className="homecondtext">{data.yacht_condition_label}</li>
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
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/yachtpersonaldetails" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <a
                        onClick={() => {
                          handlYachteSelectFormValuedata(obj)
                          navigate("/Claimsexperience")
                        }}

                        className="buttonactions">
                        Next<i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <YachtInsurancedetails />
      <Footer />
    </div>
  );
};

export default Territorycoverage;
