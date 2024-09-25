import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
const Homeadditionaldetails = () => {
  return (
    <div>
      <Header />
      <Homebanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <h3
                  style={{
                    color: "#000000",
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                >
                  Additional Details
                </h3>
                <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row" style={{ justifyContent: "center" }}>
                    <div className="col-lg-7">
                      <ul>
                        <li>The Villa is within 400m of water</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default active">
                              <input type="radio" name="options" checked="" />
                              <div>No</div>
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default">
                              <input type="radio" name="options" />
                              <div>Yes</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <ul>
                        <li>The Villa is within 400m of water</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default active">
                              <input type="radio" name="options" checked="" />
                              <div>No</div>
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default">
                              <input type="radio" name="options" />
                              <div>Yes</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <ul>
                        <li>The Villa is within 400m of water</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default active">
                              <input type="radio" name="options" checked="" />
                              <div>No</div>
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default">
                              <input type="radio" name="options" />
                              <div>Yes</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <ul>
                        <li>The Villa is within 400m of water</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default active">
                              <input type="radio" name="options" checked="" />
                              <div>No</div>
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default">
                              <input type="radio" name="options" />
                              <div>Yes</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <ul>
                        <li>The Villa is within 400m of water</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default active">
                              <input type="radio" name="options" checked="" />
                              <div>No</div>
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default">
                              <input type="radio" name="options" />
                              <div>Yes</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <ul>
                        <li>The Villa is within 400m of water</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default active">
                              <input type="radio" name="options" checked="" />
                              <div>No</div>
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                            <label className="btn btn-default">
                              <input type="radio" name="options" />
                              <div>Yes</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                  <Link to="/" className="buttonactions">
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    Back
                  </Link>
                </div>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                  style={{ textAlign: "right" }}
                >
                  <Link to="/Homepersonaldetails" className="buttonactions">
                    Next
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Insurancedetails />
      <Footer />
    </div>
  );
};

export default Homeadditionaldetails;
