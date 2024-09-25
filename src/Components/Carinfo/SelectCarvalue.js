import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { Form } from "react-bootstrap";
import { API_URL } from "../..";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MotorInsurancedetails from "../Common/MotorInsurancedetails";


const SelectCarvalue = () => {



  const [disableLink, setDisableLink] = useState(false);
  const { motorFormsData, handleBeforeUnload, handleSubmitMotorform, motortooltip, setMotortooltip } =
    UseMotorContext();
  const [temMinValue, settemMinValue] = useState(motorFormsData.aslider_value);
  const [minCarValue, setminCarValue] = useState(motorFormsData.minCarValue);
  const [maxCarValue, setmaxCarValue] = useState(motorFormsData.maxCarValue);
  const [estimetedminCarValue, setestimetedminCarValue] = useState(0);
  const [estimetedmaxCarValue, setestimetedmaxCarValue] = useState(0);
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");
  const [warning, setWarning] = useState("");

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // const handleApiResponse = (response) => {
  //   if (response.data) {
  //     console.log("i am inside check me ", response.data.minCarValue)
  //     handleSubmitMotorform("minDep", response.data.minDep);
  //     handleSubmitMotorform("maxDep", response.data.maxDep);
  //     // handleSubmitMotorform("minCarValue", +response.data.minCarValue);
  //     handleSubmitMotorform("maxCarValue", +response.data.maxCarValue);
  //     let url = localStorage.getItem("firsturl")
  //     // if (url && url === "/Carvariant") {
  //     //   handleSubmitMotorform("aslider_value", +response.data.minCarValue)
  //     // }

  //     // }
  //     // if (response.data.minCarValue > response.data.maxCarValue) {
  //     //   setminCarValue(response.data.maxCarValue);
  //     //   setmaxCarValue(response.data.minCarValue);
  //     //   setestimetedminCarValue(response.data.maxCarValue);
  //     //   setestimetedmaxCarValue(response.data.minCarValue);
  //     // }
  //     //  else
  //     // {
  //     response.data.minCarValue && setminCarValue(+response.data.minCarValue);
  //     motorFormsData.aslider_value == 0 && handleSubmitMotorform(
  //       "aslider_value", +response.data.minCarValue
  //     );
  //     response.data.maxCarValue && setmaxCarValue(+response.data.maxCarValue);
  //     response.data.minCarValue && setestimetedminCarValue(+response.data.minCarValue);
  //     response.data.maxCarValue && setestimetedmaxCarValue(+response.data.maxCarValue);
  //   }
  // };

  // console.log("motorFormsData>>>>>>>>>>>>>>>>>>>>>", motorFormsData)


  // const fetchData = async () => {
  //   setLoading(true);
  //   await axios
  //     .post(API_URL + "/api/getCarEstimatedValue", {
  //       model_year: motorFormsData?.model_year,
  //       car_maker: motorFormsData?.car_maker,
  //       car_model: motorFormsData.car_model,
  //       car_variant: motorFormsData.CarvarientName,
  //     })
  //     .then((response) => {
  //       setDisableLink(false);
  //       setLoading(false);
  //       handleApiResponse(response);
  //     })
  //     .catch((error) => {
  //       setDisableLink(true);
  //       ;
  //       setLoading(false);
  //       setError(true);
  //       setMessage(error?.response?.data?.message);
  //     });
  // };

  const [NonFormatedValue, setNonFormatedValue] = useState(null);
  // const handleSelect = (e) => {
  //   const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
  //   const numericValue = Number(rawValue); // Convert to a number
  //   // Check if numericValue is NaN or an empty string, then set it to 0
  //   const formattedValue =
  //     isNaN(numericValue) || rawValue.trim() === "" ? 0 : numericValue;
  //   // Store the formatted value in localStorage
  //   setNonFormatedValue(formattedValue);
  //   // Update the state with the formatted value
  //   setminCarValue(formattedValue.toLocaleString());
  //   settemMinValue(formattedValue.toLocaleString());

  //   console.log(">>>minCarvakue",formattedValue)
  //   if (formattedValue === motorFormsData.minCarValue) {
  //     setWarning("")
  //   }
  //   else if (formattedValue === motorFormsData.maxCarValue) {
  //     setWarning("")
  //   }
  //   else if (formattedValue <
  //     motorFormsData.minCarValue) {

  //     setWarning("We will need an approval from the insurer.")
  //   } else if (
  //     formattedValue >
  //     motorFormsData.maxCarValue) {

  //     setWarning("We will need an approval from the insurer.")
  //   }
  //   else {
  //     //console.log("thik")
  //     setWarning("")
  //   }

  // };

  const handleSelect = (e) => {



    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
    const numericValue = Number(rawValue); // Convert to a number
    // Check if numericValue is NaN or an empty string, then set it to 0
    const formattedValue =
      isNaN(numericValue) || rawValue.trim() === "" ? 0 : numericValue;
    // Store the formatted value in localStorage

    let newData = formatAmount(formattedValue)
    setCheck(newData)

    console.log(newData, "newData")

    setNonFormatedValue(formattedValue);
    // Update the state with the formatted value
    // setminCarValue(formattedValue.toLocaleString());
    // settemMinValue(formattedValue.toLocaleString());

    handleSubmitMotorform("aslider_value", +formattedValue)

    if (formattedValue === motorFormsData?.minCarValue) {
      setWarning("");
    } else if (formattedValue === motorFormsData?.maxCarValue) {
      setWarning("");
    } else if (formattedValue < motorFormsData?.minCarValue) {
      setWarning("We will need an approval from the insurer.");
    } else if (formattedValue > motorFormsData?.maxCarValue) {
      setWarning("We will need an approval from the insurer.");
    } else {
      setWarning("");
    }
  };


  useEffect(() => {

    //console.log("minCarvakue",   motorFormsData.minCarValue,"aslider_value",  motorFormsData.aslider_value)
    if (motorFormsData.aslider_value === motorFormsData.minCarValue) {
      setWarning("")
    }
    else if (motorFormsData.aslider_value === motorFormsData.maxCarValue) {
      setWarning("")
    }
    else if (motorFormsData.aslider_value <
      motorFormsData.minCarValue) {

      setWarning("We will need an approval from the insurer.")
    } else if (
      motorFormsData.aslider_value >
      motorFormsData.maxCarValue) {

      setWarning("We will need an approval from the insurer.")
    }
    else {
      //console.log("thik")
      setWarning("")
    }
  }, [motorFormsData.aslider_value])
  const Progress = 40;
  ////console.log({ estimetedminCarValue });
  ////console.log(minCarValue, "Min car value");


  const [check, setCheck] = useState(0);



  function formatAmount(amount) {
    if (amount !== null) {
      const numericValue = parseFloat(amount.toString().replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        // Use toLocaleString with custom options for grouping
        return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });
      }
      return ''; // Return an empty string if the input is not a valid number
    }
    return ''; // Return an empty string if the input is null
  }

  console.log(check)

  console.log('motortooltip:', motortooltip);

  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <ul>
                    <li>What is the value of your vehicle?
                    </li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {Loading ? (
                        <div id="loading"></div>
                      ) : Error ? (
                        <div>{Message}</div>
                      ) : (
                        <>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mb-2" style={{position:'relative'}}>
                            <Form.Control
                              type="text"
                              value={check || formatAmount(motorFormsData.aslider_value)}
                              onChange={(e) => handleSelect(e)}
                              onKeyDown={(e) =>
                                ["e", "E", "+", "-"].includes(e.key) &&
                                e.preventDefault()
                              }
                              placeholder="Enter value of your vehicle"
                              aria-label="Full Name"
                            />

                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip.valueOfVehicle}
                                </Tooltip>
                              }
                            >
                              <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>



                          {warning !== "" && (<span>
                            <i
                              className="fa fa-warning text-danger "
                              style={{ marginRight: "5px" }}
                            />
                            {warning}
                          </span>)}
                          <span>
                            {" "}
                            We estimate that your car value is AED{" "}
                            <b>{formatAmount(motorFormsData?.minCarValue)}</b> to AED{" "}
                            <b>{formatAmount(motorFormsData?.maxCarValue)}</b>
                          </span>

                          <br />
                          <br />
                          <span>
                            <b>Note:</b> The <b>car value</b> range shown is a
                            guide, and is subject to approval from the insurance
                            company. <b>Final premium</b> may vary based on the
                            car value approved by the chosen insurer.
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Carvariant" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    {
                      disableLink ? (<div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link className="buttonactions disabled">
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                      </div>) : (<div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          onClick={

                            () => {
                              localStorage.setItem("firsturl", "/SelectCarvalue")
                              handleSubmitMotorform(
                                "aslider_value",
                                motorFormsData.aslider_value
                              )
                            }
                          }
                          to="/Carregisterlocation" className="buttonactions">
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                      </div>)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MotorInsurancedetails />
      <Footer />
    </div>
  );
};
export default SelectCarvalue;
