import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Travelbanner from "../Banner/Travelbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import { CSpinner } from "@coreui/react";
import TravelInsurancedetails from "../Common/TravelInsurancedetails";

const Traveldetailsform = () => {
  const navigate = useNavigate()
  const { travelsFormsData, settravelsFormsData } = UseMotorContext();
  useEffect(() => {
    gettypeoftripdetails();
    
  }, []);
  
  useEffect(() => {
    getCountrydetails();
  }, []);
    

  
  
  const Progress = 20;
  
  const [typeoftrip, settypeoftrip] = useState([]);
  const [country, setCountry] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(false);
  const [loading, setLoading] = useState(false);
  
  console.log("country", country);
  // const gettypeoftripdetails = async () => {
  //   var requestOptions = {
  //     method: "GET",
  //   };
  //   fetch(
  //     API_URL + "/api/getTravelPlanTypes",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       settypeoftrip(result.data);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  const gettypeoftripdetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getTravelPlanTypes`);
      const result = await response.json();
      settypeoftrip(result.data);
    } catch (error) {
      console.log("error", error);
    }
  };


  const getCountrydetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/getAllNattionlity?lob=travel&planFor=${travelsFormsData.travel_insurance_for}`);
      const result = await response.json();
      console.log("result", result.data);
      setCountry(result.data);

      if (result.data?.length > 0) {
        let countrytoifind
        if(travelsFormsData.travel_insurance_for === "641c25e929b5921dc20ff9ee"){
         countrytoifind = result.data.find(
          (item) => item.nationality_name === "UNITED ARAB EMIRATES"
        );
        }
        else{
           countrytoifind = result.data.find(
          (item) => item.nationality_name === "INDIA"
          );
          }

        if (!travelsFormsData.nationality) {
          settravelsFormsData((prevData) => ({
            ...prevData,
            nationality: countrytoifind?.nationality_name,
            nationality_id: countrytoifind?._id,
          }));
          localStorage.setItem(
            "travelsFormsData",
            JSON.stringify(travelsFormsData)
          );
        }
      }
    } catch (error) {
      console.log("error", error);
    }
    finally {
      setLoading(false);
    }
  };


  // const getCountrydetails = async () => {
  //   var requestOptions = {
  //     method: "GET",
  //   };

  //   fetch(
  //     API_URL + "/api/getAllNattionlity",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setCountry(result.data);
  //       if (result.data?.length > 0) {
  //         let dataarr = result?.data;
  //         //console.log("nationality array",dataarr)
  //         let countrytoifind = dataarr.find(
  //           (item) => item.nationality_name === "UNITED ARAB EMIRATES"
  //         );
  //         //console.log("nationality check",countrytoifind)
  //         if (!travelsFormsData.nationality) {
  //           settravelsFormsData((prevData) => ({
  //             ...prevData,
  //             nationality: countrytoifind?.nationality_name,
  //           }));
  //           localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
  //         }
  //       }
  //       // //console.log(result.data); // Updated value of insureyourtravel
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  // //console.log(country);

  const calculateEndDate = () => {
    const startDate = new Date(travelsFormsData.start_date);
    const numberOfDays = parseInt(travelsFormsData.no_of_travel); // Convert to a number
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + numberOfDays);
    return newEndDate;
  };


  // useEffect(() => {
  //   const newEndDate = calculateEndDate();
  //   settravelsFormsData((prevData) => ({
  //     ...prevData,
  //     end_date: newEndDate,
  //   }));
  // }, [travelsFormsData.start_date, travelsFormsData.no_of_travel]);


  // const handleStartDateChange = (date) => {
  //   const travelsFormsData = JSON.parse(
  //     localStorage.getItem("travelsFormsData")
  //   );
  //   const no_of_travel = parseInt(travelsFormsData.no_of_travel); // Convert to a number
  //   // const dateInUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  //   settravelsFormsData((prevData) => ({
  //     ...prevData,
  //     start_date: date,
  //     end_date:
  //       travelsFormsData.plan_type === "641d418b19807a3c58191f7f"
  //         ? new Date(date.getTime() + no_of_travel * 24 * 60 * 60 * 1000)
  //         : new Date(date.getTime() + no_of_travel * 24 * 60 * 60 * 1000),
  //   }));
  // };
  // const handleEndDateChange = (date) => {
  //   settravelsFormsData((prevData) => ({
  //     ...prevData,
  //     end_date: date,
  //   }));
  // };

  const handleTypeOfTripChange = (_id) => {
    settravelsFormsData((prevData) => ({
      ...prevData,
      type_of_trip: _id,
    }));
  };

  const handleDestinationChange = (e, val) => {
    const selectedOption = val ? val : JSON.parse(e.target.value);
    console.log("selectedOption", selectedOption);
    console.log("name", selectedOption.nationality_name);
    console.log("id", selectedOption._id);

    settravelsFormsData((prevData) => ({
      ...prevData,
      nationality: selectedOption?.nationality_name,
      nationality_id: selectedOption?._id,
    }));
    localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
    navigate("/Travelpersonalform")
    // console.log("travelsFormsData", travelsFormsData);
    // console.log(localStorage.getItem("travelsFormsData"));


  };

  // const handleNextClick = () => {
  //   // localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
  //   console.log("travelsFormsData", travelsFormsData);

  // };


  const showmore = () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    setItemsToShow(!itemsToShow);
  };

  useEffect(() => {
    if (country.length > 0) {
      const index = country.findIndex(
        (val) => val.nationality_name === travelsFormsData.nationality
      );
      // //console.log(index, "check");
      if (index > 8) {
        setItemsToShow(true);
      }
    }
  }, [country]);




  return (
    <div>
      <Header />
      <Travelbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12">
              <div className="row form_abcd">
                <h5>Type of trip</h5>

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <ul>
                    <li>Type of trip</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {typeoftrip.map((item, index) => (
                        <div
                          key={index}
                          className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide"
                        >
                          <label
                            className={
                              travelsFormsData.type_of_trip === item._id
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                            onClick={() => handleTypeOfTripChange(item._id)}
                          >
                            <input
                              type="radio"
                              name="options"
                              defaultChecked={
                                travelsFormsData.type_of_trip === item._id
                              }
                            />
                            {item.travel_plan_type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <ul>
                    <li>Destination</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3">


                        <select
                          name="country"
                          className="form-control"
                          placeholder="Select Destination"
                          onChange={(e) => handleDestinationChange(e)}
                        // value={travelsFormsData.nationality}
                        >
                          {travelsFormsData.nationality !== "" ? <option value="" hidden > {travelsFormsData.nationality} </option> :
                            <option value="" hidden > Select Country </option>
                          }
                          {country.map((item, index) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {item.nationality_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {loading &&
                  <div className="d-flex justify-content-center">
                    <CSpinner color="danger" />
                  </div>
                }
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {country && country.length > 0 && (
                        <>
                          {(itemsToShow
                            ? country?.slice(0, country.length)
                            : country?.slice(0, 9)
                          ).map((val) => {
                            return (
                              <div
                                className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide"
                                key={val}
                              >
                                <label
                                  className={`btn btn-default ${travelsFormsData.nationality ===
                                    val.nationality_name
                                    ? "active"
                                    : ""
                                    }`}
                                  name="country"
                                  onClick={(e) =>
                                    handleDestinationChange(e, val)
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="country"
                                    defaultChecked={
                                      travelsFormsData.nationality ===
                                      val.nationality_name
                                    }
                                    value={val}
                                  />
                                  {val.nationality_name}
                                </label>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                      <p
                        className="showcom"
                        style={{ cursor: "pointer" }}
                        onClick={() => showmore()}
                      >
                        {itemsToShow ? "Show Less" : "Show More"}
                      </p>
                    </div>


                    {/* {itemsToShow ? (
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={() => showmore()}
                        >
                          Show Less
                        </p>
                      </div>
                    ) : (
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={() => showmore()}
                        >
                          Show More
                        </p>
                      </div>
                    )} */}
                  </div>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Traveldetailsform" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        to="/Travelpersonalform"
                        className="buttonactions"
                      // onClick={handleNextClick}
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
      <TravelInsurancedetails />
      <Footer />
    </div>
  );
};

export default Traveldetailsform;
