import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Yachtbanner from "../Banner/Yachtbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { ClaimExperienceValidation } from "../../Validators/yachtDetailsValidator";
import swal from "sweetalert";
import axios from "axios";
import { API_URL } from "../..";
import YachtInsurancedetails from "../Common/YachtInsurancedetails";
const OpearatorExperience = () => {
  const { YachtFormsData, handlYachteSelect, handlYachteSelectFormValue, handlYachtEstimatedSelect,
    handlYachtestimatedSelectFormValue, handlYachteSelectFormValuedata, handlePushYacht, convertToCamelCase, isYachtConditionChecked } = UseMotorContext();
  const Progress = 40;
  const obj = {
    YachtOperaterExperienceQuestions: YachtFormsData.YachtOperaterExperienceQuestions,
    yatchClaimsExperience1: YachtFormsData.yatchClaimsExperience1,
    location: "Yachtquotes"
  }
  const [serverData, setServerData] = useState([]);
  const [showMoreCertificateDLexperience, setShowMoreCertificateDLexperience] = useState(false);
  const [ClaimYears, setClaimYears] = useState([]);
  const handleCertificateDLexperienceToggle = () => {
    setShowMoreCertificateDLexperience(!showMoreCertificateDLexperience);
  };

  const last_year_claim_question = "Opearator's Experience"


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
      await axios.get(`${API_URL}/api/getYachtExpQuestion?type=claim2`).then((response) => {
        setServerData(response.data.question);
        console.log("")
        setlast_year_claim_year(response.data.Experience.number)
        const initialHomeCondition = response.data && response.data.question.length > 0 ? response.data.question.map((item) => ({
          _id: item._id,
          value: false,
          name: item.name
        })) : [];
        if (YachtFormsData.YachtOperaterExperienceQuestions.length === 0) {
          handlYachteSelectFormValue("YachtOperaterExperienceQuestionsdata", initialHomeCondition)
        }
      })


    } catch (error) {
      //console.log(error.message);
    }
  };
  const dataSetUp = () => {
    if (last_year_claim_year) {
      const experienceArray = [];
      for (let i = 0; i < last_year_claim_year + 2; i++) {
        if (i === 0) {
          experienceArray.push({ min: 0, max: 6 });
        } else if (i === 1) {
          experienceArray.push({ min: 6, max: 12 });
        } else {
          experienceArray.push({ min: i - 1, max: i });
        }
      }
      setClaimYears(experienceArray);
      const shouldShowMore = YachtFormsData.yatchClaimsExperience1.max >= 108;
      setShowMoreCertificateDLexperience(shouldShowMore);
    }
  }
  const handleDrivingExpSelect = (data) => {

    handlYachteSelectFormValue("yatchClaimsExperience1", data);
    handlYachtestimatedSelectFormValue("yatchClaimsExperience1", data);
  };

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
                          ).map((v, i) => {
                            let drivingis =
                              i === 0 || i === 1
                                ? { min: v?.min, max: v?.max }
                                : { min: v?.min * 12, max: v?.max * 12 };
                            let maximum =
                              i === 0 ? 0 : i === 1 ? 1 : v?.max;
                            console.log(maximum, "maximum")
                            let drivingexperienceyear =
                              last_year_claim_year + 1;
                            return (
                              <div
                                className={"col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                }
                                key={v}
                                onClick={() => handleDrivingExpSelect(drivingis)}
                              >
                                <label
                                  className={`btn btn-default ${YachtFormsData.yatchClaimsExperience1?.min ==
                                    drivingis.min &&
                                    YachtFormsData.yatchClaimsExperience1?.max ==
                                    drivingis.max
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      YachtFormsData.yatchClaimsExperience1?.min ===
                                        v?.min &&
                                        YachtFormsData.yatchClaimsExperience1?.max ===
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
                                      v?.min + "-" + v?.max + " years"}
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
                                  className={`btn btn-default ${isYachtConditionChecked(data._id, "YachtOperaterExperienceQuestions")
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={() =>
                                    handlePushYacht(
                                      data._id,
                                      true, "YachtOperaterExperienceQuestions"
                                    )
                                  }
                                >
                                  <input
                                    type="radio"
                                    name={`options-${data._id}`}
                                    defaultChecked={isYachtConditionChecked(
                                      data._id, "YachtOperaterExperienceQuestions"
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
                                      false, "YachtOperaterExperienceQuestions"
                                    )
                                  }
                                  className={`btn btn-default ${!isYachtConditionChecked(data._id, "YachtOperaterExperienceQuestions")
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name={`options-${data._id}`}
                                    defaultChecked={!isYachtConditionChecked(
                                      data._id, "YachtOperaterExperienceQuestions"
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
                      Sailing Qualification(s) ? (If yes, please attach a
                      scanned copy of the same)
                    </li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label
                          onClick={() => {
                            handlYachteSelectFormValue("yatchSailingQualification", true)
                            handlYachtestimatedSelectFormValue("yatchSailingQualification", true)
                          }}
                          className={`btn btn-default ${YachtFormsData.yatchSailingQualification && 'active'}`}>
                          <input type="radio" name="options" checked="" />

                          Yes
                        </label>
                        <br />
                        <br />
                        
                      </div>

                      <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label
                          onClick={() => {
                            handlYachteSelectFormValue("yatchSailingQualification", false)
                            handlYachtestimatedSelectFormValue("yatchSailingQualification", false)
                          }}
                          className={`btn btn-default ${!YachtFormsData.yatchSailingQualification && 'active'}`}>
                          <input type="radio" name="options" />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 mb-4">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      Will professional crew be employed ? (If yes, please
                      attach a scanned copy of CV and qualification of the
                      Captain)
                    </li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label
                          onClick={() => {
                            handlYachteSelectFormValue("yatchProfessinalEmplaoyed", true)
                            handlYachtestimatedSelectFormValue("yatchProfessinalEmplaoyed", true)
                          }}
                          className={`btn btn-default ${YachtFormsData.yatchProfessinalEmplaoyed && 'active'}`}>
                          <input type="radio" name="options" checked="" />
                          Yes
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label
                          onClick={() => {
                            handlYachteSelectFormValue("yatchProfessinalEmplaoyed", false)
                            handlYachtestimatedSelectFormValue("yatchProfessinalEmplaoyed", false)
                          }
                          }
                          className={`btn btn-default ${!YachtFormsData.yatchProfessinalEmplaoyed && 'active'}`}>
                          <input type="radio" name="options" />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
             */}
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Claimsexperience  " className="buttonactions">
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
                            navigate("/Yachtquotes")
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

export default OpearatorExperience;
