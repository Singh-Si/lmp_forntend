import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import { getData } from "../../functions";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Carpolicyinfo = () => {
  const [lastyearpolicies, setlastyearpolicies] = useState([]);
  const [policies, setpolicies] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");
  const { motorFormsData, handleBeforeUnload, handleSubmitMotorform } =
    UseMotorContext();
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await axios
        .get(API_URL + "/api/getPolicyType")
        .then((res) => {
          setLoading(false)
          if(!motorFormsData.last_year_policy_type)
          handleSubmitMotorform(
            "last_year_policy_type",
            res.data.data[0]["policy_type_name"]
          );
          setlastyearpolicies(res.data.data);
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
          setMessage(e.message);
          {};
        });
    })();
    (async () => {
      setLoading(true);
      getData(API_URL + "/api/getPlanFor")
        .then((res) => {
          if(!motorFormsData.polcy_type)
          handleSubmitMotorform(
            "polcy_type",
            res.data.data[0]["plan_for_name"]
          );
          handleSubmitMotorform("policy_id",  res.data.data[0]["_id"]);
          setpolicies(res.data.data);
        })
        .catch((e) => {
          {};
        });
    })();
  }, []);
  const [lastyearpoliciesitemsToShow, setlastyearpoliciesItemsToShow] = useState(false);
  const showmorelastyearpoliciesitemsToShow = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setlastyearpoliciesItemsToShow(!lastyearpoliciesitemsToShow);
  };
  const [itemsToShow, setItemsToShow] = useState(false);
  const showmore = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setItemsToShow(!itemsToShow);
  };

  useEffect(() => {
    if (policies.length > 0) {
      const index = policies.findIndex(
        (val) => val._id === motorFormsData.car_maker
      );
      //console.log(index, "check");
      if (index > 8) {
        setItemsToShow(true);
      }
    }
    if (lastyearpolicies.length > 0) {
      const index = lastyearpolicies.findIndex(
        (val) => val._id === motorFormsData.car_maker
      );
      //console.log(index, "check");
      if (index > 8) {
        showmorelastyearpoliciesitemsToShow(true);
      }
    }
  }, [lastyearpolicies,policies]);
  const Progress = 80;
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12">
              {Loading ? (
                <div id="loading"></div>
              ) : (
                <div className="row form_abcd">
                  <div
                    className={`${lastyearpolicies?.length === 2 && policies?.length === 2
                        ? "col-lg-8 col-md-12 col-sm-12 col-xs-11"
                        : "col-lg-8 col-md-12 col-sm-12 col-xs-11"
                      } `}
                  >
                    <ul>
                      <li>Select last year insurance type</li>
                    </ul>
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        {Error && (Message ? Message : "Intervel server error")}
                        {lastyearpolicies &&
                          lastyearpolicies.length > 0 &&
                          lastyearpoliciesitemsToShow ? lastyearpolicies.map((v, i) => {
                            return (
                              <div key={v._id} className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide">
                                <label
                                  className={
                                    motorFormsData.last_year_policy_type ==
                                      v?.policy_type_name
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={() => {
                                    handleSubmitMotorform(
                                      "last_year_policy_type",
                                      v?.policy_type_name
                                    );
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      motorFormsData.last_year_policy_type ==
                                        v?.policy_type_name
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                  {v?.policy_type_name}
                                </label>
                              </div>
                            );
                          }):lastyearpolicies && lastyearpolicies.length > 0 && lastyearpolicies.slice(0, 8).map((v, i) => {
                            return (
                              <div  key={v._id}  className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide">
                                <label
                                  className={
                                    motorFormsData.last_year_policy_type ==
                                      v?.policy_type_name
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={() => {
                                    handleSubmitMotorform(
                                      "last_year_policy_type",
                                      v?.policy_type_name
                                    );
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      motorFormsData.last_year_policy_type ==
                                        v?.policy_type_name
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                  {v?.policy_type_name}
                                </label>
                              </div>
                            )})
                          }
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${lastyearpolicies?.length === 2 && policies?.length === 2
                        ? "col-lg-8 col-md-12 col-sm-12 col-xs-11"
                        : "col-lg-8 col-md-12 col-sm-12 col-xs-11"
                      }`}
                  >
                    <ul>
                      <li>Vehicle registration under</li>
                    </ul>
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        {policies &&
                        itemsToShow ?  policies.map((v, i) => {
                            return (
                              <div  key={v._id}  className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide">
                                <label
                                  className={
                                    motorFormsData.polcy_type ===
                                      v?.plan_for_name
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={(e) => {
                                    handleSubmitMotorform(
                                      "polcy_type",
                                      v?.plan_for_name
                                    )
                                    handleSubmitMotorform("policy_id", v?._id);
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      motorFormsData.polcy_type ===
                                        v?.plan_for_name
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                  {v?.policy_type_name}
                                  {v?.plan_for_name}
                                </label>
                              </div>
                            );
                          }):policies && policies.length > 0 && policies.slice(0, 8).map((v, i) => {
                            return (
                              <div  key={v._id}  className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide">
                                <label
                                  className={
                                    motorFormsData.polcy_type ===
                                      v?.plan_for_name
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={(e) => {
                                    handleSubmitMotorform(
                                      "polcy_type",
                                      v?.plan_for_name
                                    )
                                    handleSubmitMotorform("policy_id", v?._id);
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      motorFormsData.polcy_type ===
                                        v?.plan_for_name
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                  {v?.policy_type_name}
                                  {v?.plan_for_name}
                                </label>
                              </div>
                            );
                          }
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                        <Link to="/Carbasicinfo" className="buttonactions">
                          <i className="fa fa-chevron-left" aria-hidden="true"></i>
                          Back
                        </Link>
                      </div>
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link to="/Carmodelyear" className="buttonactions">
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                        {/* <a onClick={motornextStep} className="buttonactions">
                      Next<i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MotorInsurancedetails />
      <Footer />
    </div>
  );
};
export default Carpolicyinfo;