import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Nationality = () => {
  const [country, setResponse] = useState([]);
  const {
    motorFormsData,
    handleBeforeUnload,
    HandleSubmitMotorFormdata,
    handleSubmitMotorform,
  } = UseMotorContext();
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    const checkElements = document.getElementsByClassName("nationality");
    for (let el of checkElements) {
      if (motorFormsData.nationality === el.innerHTML) {
        el.parentElement.classList.add("active");
      }
    }
  }, []);
  // const [response, Loading, Error] = useFetch(API_URL + "/api/getAllCountries");
  // const Countries = response?.data?.data || [];
  const navigate = useNavigate()
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getAllNattionlity?lob=Motor`);
      const data = await response.json();
      setResponse(data.data);
      if (data?.data?.length > 0) {
        let dataarr = data?.data;
        let countrytoifind = dataarr.find(
          (item) => item.nationality_name === "UNITED ARAB EMIRATES"
        );
        if (!motorFormsData.nationality) {
          handleSubmitMotorform(
            "nationality",
            countrytoifind
              ? countrytoifind?.nationality_name
              : data?.data[0].nationality_name
          );
        }
      }
    } catch (error) {
      //console.error("Error fetching data:", error);
    }
  };
  const [itemsToShow, setItemsToShow] = useState(false);
  const showmore = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setItemsToShow(!itemsToShow);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (country.length > 0) {
      const index = country.findIndex(
        (val) => val.nationality_name === motorFormsData.nationality
      );
      //console.log(index, "check");
      if (index > 8) {
        setItemsToShow(true);
      }
    }
  }, [country]);
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <h5 className="gheading">Yeah ! Now only 3 Questions remaining</h5>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <ul>
                    <li>Please select your nationality.</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3">
                        <select
                          className="form-control"
                          onChange={(e) => {
                            handleSubmitMotorform(
                              "nationality",
                              e.target.value
                            );
                            navigate("/Uaedrivingexp")
                          }}
                          value={motorFormsData.nationality}
                        >
                          <option value="" hidden>
                            Select Country
                          </option>
                          {country.map((item, index) => (
                            <option key={index} value={item.nationality_name}>
                              {item.nationality_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {country && country.length > 0 && (
                        <>
                          {(itemsToShow
                            ? country?.slice(0, country.length)
                            : country?.slice(0, 9)
                          ).map((v) => {
                            return (
                              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                              key={v.nationality_name}
                              >
                                <label
                                  className={`btn btn-default ${motorFormsData?.nationality ===
                                      v?.nationality_name
                                      ? "active"
                                      : ""
                                    }`}
                                  onClick={(e) => {
                                    handleSubmitMotorform(
                                      "nationality",
                                      v?.nationality_name
                                    );
                                    navigate("/Uaedrivingexp")
                                  
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultValue={
                                      motorFormsData?.nationality ===
                                        v?.nationality_name
                                        ? v?.nationality_name
                                        : v?.nationality_name
                                    }
                                  />
                                  {v?.nationality_name}
                                </label>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                    <>
                      {country && country.length > 9 && (
                        <>
                          {itemsToShow ? (
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                              <p
                                className="showcom"
                                style={{ cursor: "pointer" }}
                                onClick={showmore}
                              >
                                Show Less
                              </p>
                            </div>
                          ) : (
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                              <p
                                className="showcom"
                                style={{ cursor: "pointer" }}
                                onClick={showmore}
                              >
                                Show More
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <a onClick={HandleSubmitMotorFormdata}>
                        <Link to="/Personaldetails" className="buttonactions">
                          <i className="fa fa-chevron-left" aria-hidden="true"></i>
                          Back
                        </Link>
                      </a>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <a onClick={HandleSubmitMotorFormdata}>
                        <Link
                          to={
                            motorFormsData.policy_id ===
                              "645102bba95bd184969066b2"
                              ? "/Lastclaim"
                              : "/Uaedrivingexp"
                          }
                          className="buttonactions"
                        >
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                      </a>
                    </div>
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
export default Nationality;