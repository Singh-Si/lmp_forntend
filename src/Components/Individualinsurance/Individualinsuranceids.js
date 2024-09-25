import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import admin from "../../config";
import Individualnsurancedetails from "../Common/Individualnsurancedetails";

const Individualinsurancepersonaldetails1 = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance, HandleSubmitIndividualFormdata
  } = UseMotorContext();
  const [emirates, setEmirates] = useState([]);
  const [visa, setVisa] = useState([]);
  const [salary, setSalary] = useState([]);

  const Progress = 30;

  const Navigate = useNavigate()

  const handleSubmit = async () => {
    // //console.log("chcek");
    if (!IndividualInsurance.emirates_id || IndividualInsurance.emirates_id == [] || IndividualInsurance.emirates_id == null || IndividualInsurance.emirates_id.length == 0) {
      swal({
        text: "Please select emirates",
        icon: "warning",
      });
      return false;
    }
    else if (!IndividualInsurance.visa_id || IndividualInsurance.visa_id == [] || IndividualInsurance.visa_id == null || IndividualInsurance.visa_id.length == 0) {
      swal({
        text: "Please select visa",
        icon: "warning",
      });
      return false;
    }
    else if (!IndividualInsurance.salary_id || IndividualInsurance.salary_id == [] || IndividualInsurance.salary_id == null | IndividualInsurance.salary_id.length == 0) {
      swal({
        text: "Please select salary",
        icon: "warning",
      });
      return false;
    } else {

      const {
        emirates_id,
        visa_id,
        salary_id,
      } = IndividualInsurance;

      const dataToSend = {
        emirate_issuing_visa: emirates_id,
        visa_type: visa_id,
        salary: salary_id,
        location: "Individualmetrics"
        // hight: height,
        // weight: weight,
      };

      HandleSubmitIndividualFormdata(dataToSend);
      Navigate("/Individualmetrics");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (IndividualInsurance.emirates_id) {
      fetchsalarydata(IndividualInsurance.emirates_id);
    }
  }, [IndividualInsurance.emirates_id]);


  const fetchData = async () => {
    await fetch(`${admin}/getAreaOfRegistrations`)
      .then((res) => res.json())
      .then((data) => {

        setEmirates(data.data)
        let dataarr = data.data
        //console.log("nationality array",dataarr)
        let countrytoifind = dataarr.find(
          (item) => item._id == "65338239f1131d655b9fe3a8"
        );
        console.log(countrytoifind)
        //console.log("nationality check",countrytoifind)
        if (!IndividualInsurance.emirates_id || IndividualInsurance.emirates_id == [] && countrytoifind) {
          setIndividualInsurance((prevData) => ({
            ...prevData,
            emirates_id: countrytoifind._id,
          }));
          localStorage.setItem(
            "IndividualInsurance",
            JSON.stringify(IndividualInsurance)
          );
        }
      }
      )
      .catch((e) => { });

    await fetch(`${admin}/getVisaTypes`)
      .then((res) => res.json())
      .then((data) => setVisa(data.data))
      .catch((e) => { });

  //   await fetch(`${admin}/getsalary?emirateId=${IndividualInsurance.emirates_id}`)
  //     .then((res) => res.json())
  //     .then((data) => setSalary(data.data))
  //     .catch((e) => { });
  // };
    };

  const fetchsalarydata = async (id) => {
    await fetch(`${admin}/getsalary?emirateId=${IndividualInsurance.emirates_id}`)
      .then((res) => res.json())
      .then((data) => setSalary(data.data))
      .catch((e) => { });
  };


  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();



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
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <ul>
                        <li>Emirate Issuing Visa</li>
                      </ul>
                    </div>
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        {emirates && emirates.length > 0 && (
                          <>
                            {emirates.map((val) => {
                              return (
                                <div
                                  className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                  key={val._id}
                                >
                                  <label
                                    className={`btn btn-default ${IndividualInsurance.emirates_id ===
                                      val._id
                                      ? "active"
                                      : ""
                                      }`}
                                    name="emirates_id"
                                    onClick={(e) => {
                                      handleIndividualInsurance(e, val._id, "emirates_id");
                                      setIndividualInsurance((prevData) => ({
                                        ...prevData,
                                        visa_id: [],
                                        salary_id: [],
                                      }));
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      name="emirates_id"
                                      defaultChecked={
                                        IndividualInsurance.emirates_id ===
                                        val._id
                                      }
                                      value={val._id}
                                    />
                                    {val.area_of_registration_name}
                                  </label>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Visa Type</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-cc-visa" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <select
                          className="form-control"
                          name="visa_id"
                          value={IndividualInsurance.visa_id}
                          onChange={handleIndividualInsurance}
                        >
                          <option hidden>Visa Type</option>
                          {visa.length === 0 ? (
                            <option>No options available</option>
                          ) : (
                            visa &&
                            visa.map((val) => (
                              <option value={val._id} key={val._id}>
                                {val.medical_plan_condition}
                              </option>
                            ))
                          )}
                        </select>
                      </InputGroup>
                    </div>

                    <div className="col-lg-6">
                      <ul>
                        <li>Salary</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-money" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <select
                          className="form-control"
                          name="salary_id"
                          value={IndividualInsurance.salary_id}
                          onChange={handleIndividualInsurance}
                        >
                          <option hidden>Salary</option>
                          {salary.length === 0 ? (
                            <option>No options available</option>
                          ) : (
                            salary &&
                            salary.map((val) => (
                              <option value={val._id} key={val._id}>
                                {val.medical_salary_range}
                              </option>
                            ))
                          )}
                        </select>
                      </InputGroup>
                    </div>

                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Individualcountry" className="buttonactions">
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
                      onClick={handleSubmit}
                    >
                      <Link
                        // to="/Individualmetrics"
                        className="buttonactions"
                      >
                        Next
                        <i
                          className="fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                    {/* {IndividualInsurance.emirates_id ||
                    IndividualInsurance.visa_id ||
                    IndividualInsurance.salary_id ? (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          to="/Individualmetrics"
                          className="buttonactions"
                          onClick={handleSubmit}
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
                          className="buttonactions"
                          onClick={() => {
                            let errorText = "";

                            if (!IndividualInsurance.emirates_id) {
                              errorText = "Please select emirates";
                            } else if (!IndividualInsurance.visa_id) {
                              errorText = "Please select visa";
                            } else if (!IndividualInsurance.salary_id) {
                              errorText = "Please select salary";
                            }

                            if (errorText) {
                              swal({
                                // title: "Error!",
                                text: errorText,
                                icon: "warning",
                              });
                            }
                          }}
                        >
                          Next
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Individualnsurancedetails />
      <Footer />
    </div>
  );
};

export default Individualinsurancepersonaldetails1;
