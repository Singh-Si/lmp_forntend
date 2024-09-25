import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import { getData, useFetch } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDrivingExperience,
  fetchDrivingExperienceError,
  fetchDrivingExperienceSuccess,
} from "../../redux/reducers/MotoformDataReducerSlice";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Uaedrivingexp = () => {
  const {
    handleSubmitMotorform,
    motorFormsData,
    handleBeforeUnload,
    HandleSubmitMotorFormdata,
  } = UseMotorContext();
  let date = new Date(motorFormsData.date_of_birth);
  let current_date = new Date();
  let age = current_date.getFullYear() - date.getFullYear();

  const dispatch = useDispatch();
  const [DLexperience, setDLexperience] = useState([]);
  const [HomeDLexperience, setHomeDLexperience] = useState([]);
  useEffect(() => {
    if (motorFormsData.uaedrivingyear) {
      const experienceArray = [];
      for (let i = 0; i < motorFormsData.uaedrivingyear + 2; i++) {
        if (i === 0) {
          experienceArray.push({ min: 0, max: 6 });
        } else if (i === 1) {
          experienceArray.push({ min: 6, max: 12 });
        } else {
          experienceArray.push({ min: i - 1, max: i });
        }
      }
      setDLexperience(experienceArray);
    }
    if (motorFormsData.homedrivingyear) {
      const experienceArray = [];
      for (let i = 0; i < motorFormsData.homedrivingyear + 2; i++) {
        if (i === 0) {
          experienceArray.push({ min: 0, max: 6 });
        } else if (i === 1) {
          experienceArray.push({ min: 6, max: 12 });
        } else {
          experienceArray.push({ min: i - 1, max: i });
        }
      }
      setHomeDLexperience(experienceArray);
    }
  }, [motorFormsData.homedrivingyear, motorFormsData.uaedrivingyear]);
  const [showMoreDLExperience, setshowMoreDLExperience] = useState(false);
  const [showMoreHomeDLExperience, setshowMoreHomeDLExperience] =
    useState(false);
  const handleDLExperienceToggle = () => {
    setshowMoreDLExperience(!showMoreDLExperience);
  };
  const handleHomeDLExperienceToggle = () => {
    setshowMoreHomeDLExperience(!showMoreHomeDLExperience);
  };
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const handleDrivingExpSelect = (v) => {
    let data = { min: v?.min, max: v?.max };
    handleSubmitMotorform("drivingexp", data);
  };
  const handleDrivingExpUAESelect = (v) => {
    let data = { min: v?.min, max: v?.max };
    handleSubmitMotorform("drivingexpinuae", data);
  };
  useEffect(() => {
    console.log("driving experience",motorFormsData.drivingexp)
    if( motorFormsData.drivingexp && motorFormsData.drivingexp.max>=24){
      console.log("maximum hai")
      handleSubmitMotorform("drivingexpinuae",null)
    }
    const shouldShowMoreDL =
      motorFormsData.drivingexp &&
      motorFormsData.drivingexp.max > 60 &&
      motorFormsData.drivingexp.min > 48;
    setshowMoreDLExperience(shouldShowMoreDL);
    const shouldShowMoreHomeDL =
      motorFormsData.drivingexpinuae &&
      motorFormsData.drivingexpinuae.max > 60 &&
      motorFormsData.drivingexpinuae.min > 48;
    setshowMoreHomeDLExperience(shouldShowMoreHomeDL);
  }, [motorFormsData.drivingexp, motorFormsData.drivingexpinuae]);
  // //console.log("motorFormsData", motorFormsData.uaedrivingquestion);
  useEffect(() => {
    (async () => {
      await axios
        .get(API_URL + "/api/motorClaimsYears")
        .then((res) => {
          dispatch(fetchDrivingExperienceSuccess(res.data.data)); // Update state on success
        })
        .catch((error) => {
          dispatch(fetchDrivingExperienceError()); // Update state on error
          ;
        });
    })();
  }, []);
  // //console.log({ DLexperience });
  //console.log(HomeDLexperience, "experience");
  useEffect(() => {
    (async () => {
      await axios
        .get(API_URL + "/api/motorClaimsYears")
        .then((res) => {
          dispatch(fetchDrivingExperienceSuccess(res.data.data)); // Update state on success
        })
        .catch((error) => {
          dispatch(fetchDrivingExperienceError()); // Update state on error
          ;
        });
    })();
  }, []);
  //console.log({ DLexperience });
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <h5 className="gheading">Yeah ! Now only 2 Questions remaining</h5>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="button-group-pills" data-toggle="buttons">
                    {motorFormsData.loading ? (
                      <div id="loading"></div>
                    ) : motorFormsData.error ? (
                      <div className="alert alert-danger" role="alert">
                        Something Went Wrong!
                      </div>
                    ) : (
                      <>
                        {motorFormsData.uaedrivingquestion && (
                          <div className="row">
                            <ul className="drivingexp">
                              <li>{motorFormsData.uaedrivingquestion}</li>
                            </ul>
                            {DLexperience && DLexperience.length > 0 ? (
                              DLexperience.slice(
                                0,
                                age <= 18
                                  ? 2
                                  : showMoreDLExperience
                                  ? DLexperience.length
                                  : 9
                              ).map((v, i) => {
                                let drivingis =
                                  i === 0 || i === 1
                                    ? { min: v?.min, max: v?.max }
                                    : { min: v?.min * 12, max: v?.max * 12 };
                                let maximum =
                                  i === 0 ? 0 : i === 1 ? 1 : v?.max;
                                  console.log(maximum,"maximum")
                                let drivingexperienceyear =
                                  motorFormsData.uaedrivingyear+1;
                                return (
                                  <div
                                    key={i}
                                    className={
                                      age <= 18
                                        ? "col-lg-6 col-md-6 col-sm-6 col-xs-6 radiohide mb-3"
                                        : "col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                    }
                                  >
                                    <label
                                      className={
                                        motorFormsData.drivingexp?.min ===
                                          drivingis.min &&
                                        motorFormsData.drivingexp?.max ===
                                          drivingis.max
                                          ? "btn btn-default active" // Add 'active' class when the condition is true
                                          : "btn btn-default"
                                      }
                                      onClick={(e) =>
                                        handleDrivingExpSelect(drivingis)
                                      }
                                    >
                                      <input
                                        type="radio"
                                        name="options"
                                        defaultChecked={
                                          motorFormsData.drivingexp?.min ===
                                            v?.min &&
                                          motorFormsData.drivingexp?.max ===
                                            v?.max
                                            ? true
                                            : false
                                        }
                                      />
                                      {i === 0 || i === 1
                                        ? `${v?.min}-${v?.max} Months`
                                        :
                                        drivingexperienceyear === maximum
                                              ? "above " + v.min + "  years"
                                              : 
                                              v?.min + "-" + v?.max + " years"
                                          }
                                    </label>
                                  </div>
                                );
                              })
                            ) : (
                              <>data not found</>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {DLexperience.length > 9 && (
                  <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                    <p
                      className="showcom"
                      style={{ cursor: "pointer" }}
                      onClick={handleDLExperienceToggle}
                    >
                      {showMoreDLExperience ? "Show Less" : "Show More"}
                    </p>
                  </div>
                )}
                { age <= 18 ?
                  <>
                    {motorFormsData.homedrivingquestion && (
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <div className="button-group-pills" data-toggle="buttons">
                          <div className="row">
                            <ul className="drivingexp">
                              <li>{motorFormsData.homedrivingquestion}</li>
                            </ul>
                            {HomeDLexperience && HomeDLexperience.length > 0 ? (
                              HomeDLexperience.slice(
                                0,
                                age <= 18
                                  ? 2
                                  : showMoreHomeDLExperience
                                  ? HomeDLexperience.length
                                  : 9
                              ).map((v, i) => {
                                let drivingis =
                                  i === 0 || i === 1
                                    ? { min: v?.min, max: v?.max }
                                    : { min: v?.min * 12, max: v?.max * 12 };
                                let maximum =
                                  i === 0 ? 0 : i === 1 ? 1 : v?.max;
                                let drivingexperienceyear =
                                  motorFormsData.homedrivingyear;
                                return (
                                  <div
                                    className={
                                      age <= 18
                                        ? "col-lg-6 col-md-6 col-sm-6 col-xs-6 radiohide mb-3"
                                        : "col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                    }
                                  >
                                    <label
                                      className={
                                        !motorFormsData?.drivingexpinuae
                                          ? "btn btn-default"
                                          : motorFormsData.drivingexpinuae
                                              ?.min === drivingis?.min &&
                                            motorFormsData.drivingexpinuae
                                              ?.max === drivingis?.max
                                          ? "btn btn-default active"
                                          : "btn btn-default"
                                      }
                                      onClick={(e) =>
                                        handleDrivingExpUAESelect(drivingis)
                                      }
                                    >
                                      <input
                                        type="radio"
                                        name="options"
                                        defaultChecked={
                                          !motorFormsData?.drivingexpinuae
                                            ? true
                                            : motorFormsData.drivingexpinuae
                                                ?.min === v?.min &&
                                              motorFormsData.drivingexpinuae
                                                ?.max === v?.max
                                            ? true
                                            : false
                                        }
                                      />
                                    {i === 0 || i === 1
                                        ? `${v?.min}-${v?.max} Months`
                                        :
                                        drivingexperienceyear === maximum
                                              ? "above " + v.min + "  years"
                                              : 
                                              v?.min + "-" + v?.max + " years"
                                          }
                                    </label>
                                  </div>
                                );
                              })
                            ) : (
                              <>data not found</>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {HomeDLexperience.length > 9 && (
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={handleHomeDLExperienceToggle}
                        >
                          {showMoreHomeDLExperience ? "Show Less" : "Show More"}
                        </p>
                      </div>
                    )}
                  </>
               : motorFormsData.drivingexp?.max < 13?
                  <>
                    {motorFormsData.homedrivingquestion && (
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <div className="button-group-pills" data-toggle="buttons">
                          <div className="row">
                            <ul className="drivingexp">
                              <li>{motorFormsData.homedrivingquestion}</li>
                            </ul>
                            {HomeDLexperience && HomeDLexperience.length > 0 ? (
                              HomeDLexperience.slice(
                                0,
                                age <= 18
                                  ? 2
                                  : showMoreHomeDLExperience
                                  ? HomeDLexperience.length
                                  : 9
                              ).map((v, i) => {
                                let drivingis =
                                  i === 0 || i === 1
                                    ? { min: v?.min, max: v?.max }
                                    : { min: v?.min * 12, max: v?.max * 12 };
                                let maximum =
                                  i === 0 ? 0 : i === 1 ? 1 : v?.max;
                                let drivingexperienceyear =
                                  motorFormsData.homedrivingyear;
                                return (
                                  <div
                                    className={
                                      age <= 18
                                        ? "col-lg-6 col-md-6 col-sm-6 col-xs-6 radiohide mb-3"
                                        : "col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                    }
                                  >
                                    <label
                                      className={
                                        !motorFormsData?.drivingexpinuae
                                          ? "btn btn-default"
                                          : motorFormsData.drivingexpinuae
                                              ?.min === drivingis?.min &&
                                            motorFormsData.drivingexpinuae
                                              ?.max === drivingis?.max
                                          ? "btn btn-default active"
                                          : "btn btn-default"
                                      }
                                      onClick={(e) =>
                                        handleDrivingExpUAESelect(drivingis)
                                      }
                                    >
                                      <input
                                        type="radio"
                                        name="options"
                                        defaultChecked={
                                          !motorFormsData?.drivingexpinuae
                                            ? true
                                            : motorFormsData.drivingexpinuae
                                                ?.min === v?.min &&
                                              motorFormsData.drivingexpinuae
                                                ?.max === v?.max
                                            ? true
                                            : false
                                        }
                                      />
                                      {i === 0 || i === 1
                                        ? `${v?.min}-${v?.max} Months`
                                        : `${
                                            drivingexperienceyear+1 === maximum
                                              ? "above " + v.min + "  years"
                                              : v?.min + "-" + v?.max + " years"
                                          } `}
                                    </label>
                                  </div>
                                );
                              })
                            ) : (
                              <>data not found</>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {HomeDLexperience.length > 9 && (
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={handleHomeDLExperienceToggle}
                        >
                          {showMoreHomeDLExperience ? "Show Less" : "Show More"}
                        </p>
                      </div>
                    )}
                  
                </>:<></>}
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <a onClick={HandleSubmitMotorFormdata}>
                        <Link to="/Nationality" className="buttonactions">
                          <i className="fa fa-chevron-left" aria-hidden="true"></i>
                          Back
                        </Link>
                      </a>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      {age > 18 && motorFormsData.drivingexp?.max < 13 && motorFormsData.drivingexpinuae ?
                        <a onClick={HandleSubmitMotorFormdata}>
                          <Link
                            to="/Lastclaim"
                            // state={{ CertificateDLexperience, ClaimYears }}
                            className="buttonactions"
                          >
                            Next
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                          </Link>
                        </a>
                        : age > 18 && motorFormsData.drivingexp?.max > 12 ?
                          <a onClick={HandleSubmitMotorFormdata}>
                            <Link
                              to="/Lastclaim"
                              // state={{ CertificateDLexperience, ClaimYears }}
                              className="buttonactions"
                            >
                              Next
                              <i className="fa fa-chevron-right" aria-hidden="true"></i>
                            </Link>
                          </a> : age <= 18 && motorFormsData.drivingexp && motorFormsData.drivingexpinuae ?
                            <a onClick={HandleSubmitMotorFormdata}>
                              <Link
                                to="/Lastclaim"
                                // state={{ CertificateDLexperience, ClaimYears }}
                                className="buttonactions"
                              >
                                Next
                                <i className="fa fa-chevron-right" aria-hidden="true"></i>
                              </Link>
                            </a> : <>
                              <Link
                                // to="/Carmodel"
                                className="buttonactions disabled"
                                style={{ cursor: 'not-allowed' }}
                              >
                                Next
                                <i className="fa fa-chevron-right" aria-hidden="true"></i>
                              </Link>
                            </>

                      }

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
export default Uaedrivingexp;