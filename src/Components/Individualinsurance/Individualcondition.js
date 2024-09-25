import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  InputGroup,
  Form,
  Modal,
  FormControl,
  ProgressBar,
} from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useEffect } from "react";
import swal from "sweetalert";
import admin from "../../config";

const Individualcondition = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
    handleIndividualPhoneChange,
  } = UseMotorContext();
  const [show, setShow] = useState(false);
  const [toMaf, setToMaf] = useState(false);
  const [toQuote, setToQuote] = useState(false);

  const navigate = useNavigate();
  const Progress = 30;

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);

  const handlePush = (e, bool) => {
    if (bool === false) {
      handleShow();
      setToQuote(!toQuote);
    } else {
      handleShow();
      setToMaf(!toMaf);
    }
  };

  return (
    <div>
      <Header />
      <Individualmedicalbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <div className="row">
                    <ul style={{ paddingLeft: "0px" }}>
                      <li style={{ listStyle: "none", fontWeight: "bolder" }}>
                        Does the insured have any pre-exisiting &/or chronic
                        conditions?
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-12 mb-4">
                    <ul style={{ paddingLeft: "0px" }}></ul>
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                          <label className={`btn btn-default`}>
                            <input type="radio" name={`options`} />
                            <div onClick={(e) => handlePush(e, true)}>Yes</div>
                          </label>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                          <label className={`btn btn-default`}>
                            <input type="radio" name={`options`} />
                            <div onClick={(e) => handlePush(e, false)}>No</div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link
                        to="/Individualinsurancequotes"
                        className="buttonactions"
                      >
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    {toMaf ? (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          to="/Individualinsurancesymptoms"
                          className="buttonactions"
                        >
                          Next
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    ) : (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          to="/Individualinsurancequote"
                          className="buttonactions"
                        >
                          Next
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="md"
        centered
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleShow}
      >
        <Modal.Header closeButton>
          <Modal.Title>Disclaimer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">You'll be redirected to maf now.</p>
        </Modal.Body>
        <Modal.Footer style={{ padding: "5px 10px" }}>
          <a className="savechanges" onClick={handleShow}>
            Ok
          </a>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
};

export default Individualcondition;
