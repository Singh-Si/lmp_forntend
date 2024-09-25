import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Yachtbanner from "../Banner/Yachtbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import axios from "axios";
import swal from "sweetalert";
import { model_yearValidation } from "../../Validators/yachtDetailsValidator";
import YachtInsurancedetails from "../Common/YachtInsurancedetails";
const YachtlYear = () => {
  const {
    YachtFormsData,
    handlYachteSelectFormValue,
    handlYachtEstimatedSelect,
    handlYachtestimatedSelectFormValue,
  } = UseMotorContext();
  const [Years, setYears] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(9);
  const showmore = () => {
    setItemsToShow(Years.length);
  };
  const showless = () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    setItemsToShow(9);
  };
  useEffect(() => {
    axios
      .post(API_URL + "/api/getYachtDetails")
      .then((res) => {
        setYears(res.data.data);
        if (res.data.data.length > 0) {
          if (YachtFormsData.model_year == "") {
            handlYachteSelectFormValue("model_year", res.data.data[0]["yearDesc"]);
            handlYachteSelectFormValue("registration_year", res.data.data[0]["yearDesc"]);
            handlYachtestimatedSelectFormValue("model_year", res.data.data[0]["yearDesc"]);
            handlYachtestimatedSelectFormValue("registration_year", res.data.data[0]["yearDesc"]);
          } else if (YachtFormsData.model_year !== "") {
            const isExistyearDesc = res.data.data.find(item => item.yearDesc == YachtFormsData.model_year)
            handlYachteSelectFormValue("model_year", isExistyearDesc["yearDesc"]);
            handlYachteSelectFormValue("registration_year", isExistyearDesc["yearDesc"]);
            handlYachtestimatedSelectFormValue("model_year", isExistyearDesc["yearDesc"]);
            handlYachtestimatedSelectFormValue("registration_year", isExistyearDesc["yearDesc"]);
          }

        }


        const shouldShowMore = Number(YachtFormsData.registration_year) < 2014;
        if (shouldShowMore) {
          setItemsToShow(res.data.data.length);
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);
  const navigate = useNavigate();
  const handleLabelClick = async (data) => {
    handlYachteSelectFormValue("model_year", data.toString());
    handlYachteSelectFormValue("registration_year", data.toString());
    handlYachtestimatedSelectFormValue("model_year", data.toString());
    handlYachtestimatedSelectFormValue("registration_year", data.toString());
    navigate("/YachtMaker");
  };

  const Progress = 20;
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
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <ul>
                    <li>Select Yacht model year</li>
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
                                  YachtFormsData &&
                                    YachtFormsData?.model_year == v.yearDesc
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                                onClick={() => handleLabelClick(v.yearDesc)}
                              >
                                <input
                                  type="radio"
                                  name="options"
                                  defaultChecked={
                                    YachtFormsData &&
                                      YachtFormsData?.model_year == v.yearDesc
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                />
                                {v.yearDesc}
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
                      <Link to="/Yachtdetails" className="buttonactions">
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
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (
                            !YachtFormsData.model_year ||
                            YachtFormsData.model_year == ""
                          ) {
                            swal({
                              text: `Please select Model Year`,
                              icon: "warning",
                              button: "Ok",
                            });
                          } else {
                            navigate("/YachtMaker");
                          }
                        }}
                        // onClick={() => handleNext("/YachtMaker")}

                        aria-disabled
                        className={`buttonactions ${!YachtFormsData.model_year ||
                          YachtFormsData.model_year == "" ? 'disabled' : ''}`}
                      >
                        Next
                        <i
                          className="fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
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
export default YachtlYear;
