import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import { PostData } from "../../functions";
import { API_URL } from "../..";
import axios from "axios";
import swal from "sweetalert";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Carmodelyear = () => {
  const [disableLink, setDisableLink] = useState(true);
  const {
    motorFormsData,
    handleBeforeUnload,
    motornextStep,
    handleSubmitMotorform,
  } = UseMotorContext();
  const [Years, setYears] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(9);
  const showmore = () => {
    setItemsToShow(Years.length);
  };
  const showless = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setItemsToShow(9);
  };
  useEffect(() => {
    const date = new Date();
    let month = date.getMonth();
    let currentdate = date.getFullYear();
    if (month >= 5) {
      currentdate = currentdate + 1;
    }
    const y = [];
    for (let i = currentdate; i >= 1950; i--) {
      y.push({ year: i });
    }
    setYears(y);
    const shouldShowMore = Number(motorFormsData.registration_year) < 2014;
    if (shouldShowMore) {
      setItemsToShow(y.length);
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [motorFormsData]);
  const navigate=useNavigate()
  const handleLabelClick = async (data) => {
    handleSubmitMotorform("model_year", data.toString());
    handleSubmitMotorform("registration_year", data.toString());
    navigate("/Carmaker")
  };
  const Progress = 20;
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
                    <li>Select vehicle model year</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {Years ? (
                        Years.slice(0, itemsToShow).map((v, i) => {
                          return (
                            <div
                              key={i}
                              className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                            >
                              <label
                                className={
                                  motorFormsData &&
                                    motorFormsData?.model_year == v.year
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                                onClick={() => handleLabelClick(v.year)}
                              >
                                <input
                                  type="radio"
                                  name="options"
                                  defaultChecked={
                                    motorFormsData &&
                                      motorFormsData?.model_year == v.year
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                />
                                {v.year}
                              </label>
                            </div>
                          );
                        })
                      ) : (
                        <>Loading</>
                      )}
                    </div>
                    {itemsToShow === 9 ? (
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={showmore}
                        >
                          Show More
                        </p>
                      </div>
                    ) : (
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={showless}
                        >
                          Show Less
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Carpolicyinfo" className="buttonactions">
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
                        to="/Carmaker"
                        aria-disabled
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
      <MotorInsurancedetails />
      <Footer />
    </div>
  );
};
export default Carmodelyear;
