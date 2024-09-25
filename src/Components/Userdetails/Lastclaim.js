import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import { useDispatch } from "react-redux";
import {
  fetchDrivingExperienceError,
  fetchDrivingExperienceSuccess,
} from "../../redux/reducers/MotoformDataReducerSlice";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Lastclaim = () => {
  const {
    HandleSubmitMotorFormdata,
    motorFormsData,
    handleBeforeUnload,
    handleSubmitMotorform,
  } = UseMotorContext();
  let last_year_claim_year = motorFormsData.last_year_claim_year;
  let last_year_claim_certificate_year = motorFormsData.last_year_claim_certificate_year;
  const [CertificateDLexperience, setCertificateDLexperience] = useState([]);
  const [ClaimYears, setClaimYears] = useState([]);
  const [showMoreCertificateDLexperience, setShowMoreCertificateDLexperience] =
    useState(false);
  const [showMoreClaimYears, setShowMoreClaimYears] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  const handleCertificateDLexperienceToggle = () => {
    setShowMoreCertificateDLexperience(!showMoreCertificateDLexperience);
  };
  const handleClaimYearsToggle = () => {
    setShowMoreClaimYears(!showMoreClaimYears);
  };
  useEffect(() => {
    const shouldShowMore = motorFormsData.last_year_claim > 5;
    setShowMoreCertificateDLexperience(shouldShowMore);
    const claimsCertificateFromIssurer =
      motorFormsData.claims_certificate_from_issurer > 5;
    setShowMoreClaimYears(claimsCertificateFromIssurer);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await axios
        .get(API_URL + "/api/motorClaimsYears")
        .then((res) => {
          console.log(res.data.data);
          dispatch(fetchDrivingExperienceSuccess(res.data.data)); // Update state on success
        })
        .catch((error) => {
          dispatch(fetchDrivingExperienceError()); // Update state on error
          //console.log(error);
        });
    })();
  }, []);
  useEffect(() => {
    const claimy = [];
    for (let i = 0; i <= last_year_claim_year+1; i++) {
      claimy.push({ year: i });
    }
    const certificatey = [];
    for (let i = 0; i <= last_year_claim_certificate_year+1; i++) {
      certificatey.push({ year: i });
    }
    setClaimYears(claimy);
    setCertificateDLexperience(certificatey);
  }, []);
  let date = new Date(motorFormsData.date_of_birth);
  let current_date = new Date();
  let age = current_date.getFullYear() - date.getFullYear();
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        {motorFormsData.loading ? (
          <div id="loading"></div>
        ) : motorFormsData.error ? (
          <div className="alert alert-danger" role="alert">
            Something Went Wrong!
          </div>
        ) : (
          <div className="container">
            <h5 className="gheading">You’re almost there, last </h5>
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col-lg-12 nopadding">
                <div className="row form_abcd">
                  {/*  Claim Years  */}
                  {motorFormsData.last_year_claim_question && (
                    <>
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        <ul>
                          <li>{motorFormsData.last_year_claim_question}</li>
                        </ul>
                      </div>
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            {ClaimYears.slice(
                              0,
                              age <= 18
                                ? 2
                                : showMoreCertificateDLexperience
                                ? ClaimYears.length
                                : 9
                            ).map((v) => {
                              return (
                                <div
                                  className={
                                    age <= 18
                                      ? "col-lg-6 col-md-6 col-sm-6 col-xs-6 radiohide mb-3"
                                      : "col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                  }
                                  key={v.year}
                                  onClick={() => {
                                    handleSubmitMotorform(
                                      "last_year_claim",
                                      v.year
                                    );
                                  }}
                                >
                                  <label
                                    className={`btn btn-default ${
                                      motorFormsData.last_year_claim == v.year
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="options"
                                      defaultChecked={
                                        motorFormsData.last_year_claim ==
                                        v.year
                                      }
                                    />
                                    {v.year == 0
                                      ? "Never"
                                      : v.year>
                                        motorFormsData.last_year_claim_year
                                      ? "above  " + (v.year-1) + " years"
                                      : v.year + " years ago"}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          .
                        </div>
                      </div>
                      {ClaimYears.length > 9 && (
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                          <p
                            className="showcom"
                            style={{ cursor: "pointer" }}
                            onClick={handleCertificateDLexperienceToggle}
                          >
                            {showMoreCertificateDLexperience
                              ? "Show Less"
                              : "Show More"}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  {/*Certificate  Claim Years */}
                  {motorFormsData.last_year_claim_certificate_question && (
                    <>
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        <ul>
                          <li>
                            {
                              motorFormsData.last_year_claim_certificate_question
                            }
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            {CertificateDLexperience.slice( 0,
                              age <= 18
                                ? 2
                                : showMoreClaimYears
                                ? CertificateDLexperience.length
                                : 9
                            ).map((v) => (
                              <div
                                className={
                                  age <= 18
                                    ? "col-lg-6 col-md-6 col-sm-6 col-xs-6 radiohide mb-3"
                                    : "col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                }
                                key={v.year}
                                onClick={() => {
                                  handleSubmitMotorform(
                                    "claims_certificate_from_issurer",
                                    v.year
                                  );
                                }}
                              >
                                <label
                                  className={`btn btn-default ${
                                    motorFormsData.claims_certificate_from_issurer ==
                                    v.year
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      motorFormsData.claims_certificate_from_issurer ==
                                      v.year
                                    }
                                  />
                                  <div className="claims_certificate_from_issurer">
                                    {v.year == 0
                                      ? "No"
                                      : v.year>
                                        motorFormsData.last_year_claim_certificate_year
                                      ? `Yes, ${v.year-1} years above`
                                      : `Yes, ${v.year} years proof`}
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {CertificateDLexperience.length > 9 && (
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                          <p
                            className="showcom"
                            style={{ cursor: "pointer" }}
                            onClick={handleClaimYearsToggle}
                          >
                            {showMoreClaimYears ? "Show Less" : "Show More"}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  {/* Navigation Buttons */}
                  <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                        <a
                          href="#1"
                          onClick={() => {
                            HandleSubmitMotorFormdata();
                          }}
                        >
                          <Link
                            to={
                              motorFormsData.policy_id ==
                              "645102bba95bd184969066b2"
                                ? "/Nationality"
                                : "/Uaedrivingexp"
                            }
                            className="buttonactions"
                          >
                            <i
                              className="fa fa-chevron-left"
                              aria-hidden="true"
                            ></i>
                            Back
                          </Link>
                        </a>
                      </div>
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <a onClick={HandleSubmitMotorFormdata}>
                          <Link to="/Getquote" className="buttonactions">
                            Next{" "}
                            <i
                              className="fa fa-chevron-right"
                              aria-hidden="true"
                            ></i>
                          </Link>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <MotorInsurancedetails />
      <Footer />
    </div>
  );
};
export default Lastclaim;