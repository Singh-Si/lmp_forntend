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
import { ClaimExperienceValidation } from "../../Validators/yachtDetailsValidator";
import swal from "sweetalert";
import { API_URL } from "../..";
import axios from "axios";
import { useDispatch } from "react-redux";
import YachtInsurancedetails from "../Common/YachtInsurancedetails";
const Claimsexperience = () => {
  const dispatch = useDispatch()
  const { YachtFormsData, handlYachteSelect, handlYachteSelectFormValue, handlYachtEstimatedSelect,
    handlYachtestimatedSelectFormValue, handlYachteSelectFormValuedata, handlePushYacht, convertToCamelCase, isYachtConditionChecked } = UseMotorContext();
  const [showMoreCertificateDLexperience, setShowMoreCertificateDLexperience] = useState(false);
  const [ClaimYears, setClaimYears] = useState([]);
  const [serverData, setServerData] = useState([]);

  const handleCertificateDLexperienceToggle = () => {
    setShowMoreCertificateDLexperience(!showMoreCertificateDLexperience);
  };
  const Progress = 40;
  const obj = {

    yatchClaimsExperience: YachtFormsData.yatchClaimsExperience,
    yatchClaimsExperienceQuestions: YachtFormsData.yatchClaimsExperienceQuestions,
    location: "OpearatorExperience",
  }
  const last_year_claim_question = "Claims Experience"
  const [last_year_claim_year, setlast_year_claim_year] = useState(null);
  useEffect(() => {
    handleFetch()
  }, []);
  useEffect(() => {
    dataSetUp()
  }, [last_year_claim_year]);
  console.log("serverData", serverData)


  const handleFetch = async () => {

    try {
      await axios.get(`${API_URL}/api/getYachtExpQuestion?type=claim`).then((response) => {
        setServerData(response.data.question);
        console.log("")
        setlast_year_claim_year(response.data.Experience.number)
        const initialHomeCondition = response.data && response.data.question.length > 0 ? response.data.question.map((item) => ({
          _id: item._id,
          value: false,
          name: item.name
        })) : [];
        if (YachtFormsData.yatchClaimsExperienceQuestions.length === 0) {
          // alert("not empty")
          console.log("initialHomeCondition", initialHomeCondition)
          handlYachteSelectFormValue("yatchClaimsExperienceQuestionsdata", initialHomeCondition)
        }
      })


    } catch (error) {
      //console.log(error.message);
    }
  };
  const dataSetUp = () => {
    const claimy = [];
    if (last_year_claim_year) {
      for (let i = 0; i <= last_year_claim_year + 1; i++) {
        claimy.push(i);
      }
      setClaimYears(claimy);
      const shouldShowMore = +YachtFormsData.yatchClaimsExperience > 5;
      setShowMoreCertificateDLexperience(shouldShowMore);
    }
  }
  console.log({ last_year_claim_year })
  const navigate = useNavigate()
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

                {/* <div className="col-lg-8">
                  <select
                    name="yatchClaimsExperience"
                    onChange={(e) => {
                      handlYachteSelect(e)
                      handlYachtEstimatedSelect(e)
                    }}
                    className="form-control">
                    {
                      ClaimYears.length > 0 ? ClaimYears.map((item) => (
                        <option value={item}>{item == 0
                          ? "Never"
                          : item >
                            last_year_claim_year
                            ? "above  " + (item - 1) + " years"
                            : item + " years ago"}</option>
                      )) : <React.Fragment></React.Fragment>
                    }
                  </select>
                
                </div> */}
                {/*  Claim Years  */}
                {ClaimYears.length > 0 && (
                  <>
                    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                      <ul>
                        <li>{last_year_claim_question}</li>
                      </ul>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                      <div
                        className="button-group-pills"
                        data-toggle="buttons"
                      >
                        <div className="row">
                          {ClaimYears.slice(
                            0, showMoreCertificateDLexperience
                            ? ClaimYears.length
                            : 9
                          ).map((v) => {
                            return (
                              <div
                                className={"col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                }
                                key={v}
                                onClick={() => {
                                  handlYachteSelectFormValue("yatchClaimsExperience", v)
                                  handlYachtestimatedSelectFormValue("yatchClaimsExperience", v)
                                }}
                              >
                                <label
                                  className={`btn btn-default ${YachtFormsData.yatchClaimsExperience == v
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      YachtFormsData.yatchClaimsExperience ==
                                      v
                                    }
                                  />
                                  {v == 0
                                    ? "Never"
                                    : v >
                                      last_year_claim_year
                                      ? "above  " + (v - 1) + " years"
                                      : v + " years ago"}
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
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    {serverData.length === 0 ? (
                      <div>No data available</div>
                    ) : (
                      serverData.map((data) => (
                        <div className="col-lg-12 " key={data._id}>
                          <ul>
                            <li className="homecondtext">{convertToCamelCase(data.name)}</li>
                          </ul>
                          <div
                            className="button-group-pills"
                            data-toggle="buttons">
                            <div className="row" style={{ justifyContent: "space-between" }}>
                              <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${isYachtConditionChecked(data._id, "yatchClaimsExperienceQuestions")
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={() =>
                                    handlePushYacht(
                                      data._id,
                                      true, "yatchClaimsExperienceQuestions"
                                    )
                                  }
                                >
                                  <input
                                    type="radio"
                                    name={`options-${data._id}`}
                                    defaultChecked={isYachtConditionChecked(
                                      data._id, "yatchClaimsExperienceQuestions"
                                    )}
                                  />
                                  <div

                                  >
                                    Yes
                                  </div>
                                </label>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  onClick={() =>
                                    handlePushYacht(
                                      data._id,
                                      false, "yatchClaimsExperienceQuestions"
                                    )
                                  }
                                  className={`btn btn-default ${!isYachtConditionChecked(data._id, "yatchClaimsExperienceQuestions")
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name={`options-${data._id}`}
                                    defaultChecked={!isYachtConditionChecked(
                                      data._id, "yatchClaimsExperienceQuestions"
                                    )}
                                  />
                                  <div

                                  >
                                    No
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
                {/* <div className="col-lg-8 mb-4">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      Have you ever had insurance for any vessel cancelled,
                      declined or renewed at an increased premium ?
                    </li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label

                          onClick={() => {
                            handlYachteSelectFormValue("yatchClaimsExperienceQuestions", true)
                            handlYachtestimatedSelectFormValue("yatchClaimsExperienceQuestions", true)
                          }}
                          className={`btn btn-default ${YachtFormsData.yatchClaimsExperienceQuestions && 'active'}`}>
                          <input type="radio" name="options" checked={YachtFormsData.yatchClaimsExperienceQuestions} />

                          Yes

                        </label>
                      </div>
                      <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label

                          onClick={() => {
                            handlYachteSelectFormValue("yatchClaimsExperienceQuestions", false)
                            handlYachtestimatedSelectFormValue("yatchClaimsExperienceQuestions", false)

                          }}
                          className={`btn btn-default ${!YachtFormsData.yatchClaimsExperienceQuestions && 'active'}`}>
                          <input type="radio" name="options" checked={YachtFormsData.yatchClaimsExperienceQuestions} />

                          No

                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}
                <hr />

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/territoryCoverage  " className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}>
                      <a
                        onClick={() => {
                          let errorCheck = ClaimExperienceValidation(YachtFormsData)
                          //console.log(">>", errorCheck)
                          if (errorCheck.error) {
                            let message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
                            message = message.replace(/"/g, '')
                            swal({
                              text: `${message}`,
                              icon: "warning",
                              button: "Ok",
                            });

                          } else {
                            handlYachteSelectFormValuedata(obj)
                            navigate("/OpearatorExperience")
                          }
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

export default Claimsexperience;
