import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Getquote = () => {
  const {
    motorFormsData,
    HandleSubmitMotorFormdata,
    handleBeforeUnload,
    handleSubmitMotorform,
  } = UseMotorContext();
  const [policies, setpolicies] = useState([]);
  const [Loadiung, setLoadiung] = useState(false);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    (async () => {
      setLoadiung(true);
      await axios
        .get(API_URL + "/api/getrepairtypes")
        .then((response) => {
          setLoadiung(false);
          setpolicies(response.data.data);
        })
        .catch((e) => {
          setLoadiung(false);
          setError(true);
          {};
          setMessage(e.message);
        });
    })();
  }, []);
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <h5 className="gheading">
            You’re almost there, last
          </h5>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row" style={{ justifyContent: "center" }}>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
                      <ul>
                        <li>Is your current year policy still valid?</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-6 radiohide">
                            <label  className={`btn btn-default ${
                                motorFormsData.your_existing_policy_expired
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSubmitMotorform(
                                  "your_existing_policy_expired",
                                  true
                                )
                              }>
                              Yes
                              <input type="radio" name="options" defaultChecked="" />
                            </label>
                          </div>
                          <div className="col-lg-6 radiohide">
                            <label  className={`btn btn-default ${
                                !motorFormsData.your_existing_policy_expired
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSubmitMotorform(
                                  "your_existing_policy_expired",
                                  false
                                )
                              }>
                              No
                              <input type="radio" name="options" defaultChecked="" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <a onClick={HandleSubmitMotorFormdata}>
                        <Link to="/Lastclaim" className="buttonactions">
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
                        <Link to="/Quotes" className="buttonactions">
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

export default Getquote;
