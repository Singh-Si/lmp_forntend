import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar, Form, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Individualinsurancepersonaldetails4 = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();

  const Navigate = useNavigate();

  const [maternity, setMaternity] = useState([]);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [terms, setTerms] = useState(false);
  const [startDate, setStartDate] = useState();


  const Progress = 30;

  const fetchData = async () => {
    await fetch(`${admin}/get_maternity`)
      .then((e) => e.json())
      .then((data) => {
        setMaternity(data.data)
        const initialHomeCondition = data && data.data.length > 0 ? data.data.map((item) => ({
          _id: item._id,
          value: false,
          name: item.condition
        })) : [];
        if (IndividualInsurance.maternity_condition.length === 0) {
          setIndividualInsurance((prevState) => ({
            ...prevState,
            ["maternity_condition"]: initialHomeCondition,
            // maternity_condition_visit: true
          }))
        }
      })
      .catch((err) => { });
  };

  useEffect(() => {
    fetchData();
    const stored = localStorage.getItem("IndividualInsurance");

    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
      setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
    }
  }, []);

  const handleSubmit = async () => {
    // //console.log("chcek");
    const {
      full_name,
      email,
      phone_number,
      date,
      gender,
      country,
      insurance_type,
      emirates_id,
      visa_id,
      salary_id,
      height,
      weight,
      symptom_condition,
      // general_condition,
      maternity_condition,
    } = IndividualInsurance;

    const dataToSend = {
      name: full_name,
      email: email,
      phoneno: phone_number,
      date_of_birth: date,
      insuranceType: insurance_type,
      gender: gender,
      nationality: country,
      emirate_issuing_visa: emirates_id,
      visa_type: visa_id,
      salary: salary_id,
      hight: height,
      weight: weight,
      medical_symptopm: symptom_condition,
      // medical_under_condition: general_condition,
      medical_maternity: maternity_condition,
    };

    await fetch(`${admin}/fillInsurancePlan`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((val) => {

      })
      .catch((err) => {

      });
  };

  const handlePush = (val, id, value) => {
    if (IndividualInsurance.maternity_condition.length > 0) {
      // Check if the _id already exists in the array
      let arr = IndividualInsurance.maternity_condition
      const existingIndex = arr.findIndex((item) => item._id === id);

      // If the _id exists, update the existing entry; otherwise, add a new entry
      if (existingIndex !== -1) {
        arr[existingIndex].value = value; // Update the existing entry's value
      }
      setIndividualInsurance((prevState) => ({
        ...prevState,
        maternity_condition: arr,
        general_condition_visit: true
      }));
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );

    };
  }

  const conditionCheck = (id, value) => {
    const condition = IndividualInsurance.maternity_condition.find(
      (val) => val._id === id
    );

    return condition ? condition.value === value : false;
  };


  console.log(IndividualInsurance.maternity_condition, "maternity_condition")

  const handleMaternitysubmit = async (e) => {
    if (IndividualInsurance.lastMenstrualPeriodDate == null || IndividualInsurance.lastMenstrualPeriodDate == '') {
      swal({
        text: "Please Select last menstrual period date",
        icon: "warning",
      })
      return false;
    }
    else {
    await fetch(`${admin}/updatePolicyDetails?id=${updatePolicyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { 
          medical_maternity: IndividualInsurance.maternity_condition,
          lastMenstrualPeriodDate: IndividualInsurance.lastMenstrualPeriodDate,
          location: 'Individualinsuranceunderwriting',
          insuranceType: 'Medical',

        }
         ),
    })
      .then((res) => res.json())
      .then((res) => { })
      .catch((err) => { });
    Navigate("/Individualinsuranceunderwriting")
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
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <ul className="mb-3" style={{ paddingLeft: "5px" }}>
                    <li style={{ listStyleType: "none", fontWeight: "bolder", color: "#ed1c24" }}>
                      Maternity Questionnaire:
                    </li>
                  </ul>
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    {maternity.length > 0 &&
                      maternity.map((mat) => (
                        <div className="col-lg-5" key={mat._id}>
                          <ul style={{ paddingLeft: "0px", justifyContent: "space-between", paddingBottom: "2px" }}>
                            <li>{mat.condition}</li>
                          </ul>
                          <div
                            className="button-group-pills"
                            data-toggle="buttons"
                          >
                            <div className="row" style={{ justifyContent: "space-between" }}>
                              <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${conditionCheck(mat._id, true)
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handlePush(e, mat._id, true)
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={conditionCheck(
                                      mat._id,
                                      true
                                    )}
                                  />
                                  <div>
                                    Yes
                                  </div>
                                </label>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${conditionCheck(mat._id, false)
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handlePush(e, mat._id, false)
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={conditionCheck(
                                      mat._id,
                                      false
                                    )}
                                  />
                                  <div>
                                    No
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    <div className="col-lg-5">
                      <ul style={{ paddingLeft: "0px", justifyContent: "space-between", paddingBottom: "2px" }}>
                        <li>LAST MENSTRUAL PERIOD DATE</li>
                      </ul>
                      <div className="col-lg-12 my-2">
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">

                            <i className="fa fa-calendar" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholderText={"Please select a date"}
                            className="form-control"
                            selected={IndividualInsurance?.lastMenstrualPeriodDate ? new Date(IndividualInsurance?.lastMenstrualPeriodDate) : null}
                            dateFormat={"dd/MM/yyyy"}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            peekNextMonth
                            onChange={(date) =>
                              setIndividualInsurance((prevState) => ({
                                ...prevState,
                                ["lastMenstrualPeriodDate"]: date,
                              }))
                            }
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="d-flex labelssss mb-3">
                    <Form.Check
                      className="abcds_abcs"
                      type="checkbox"
                      name="isselecctcontactterms"
                      onChange={(e) => setTerms(e.target.checked)}
                    />
                    <label>
                      Any non-disclosure, misrepresentation, or concealment of material fact will make this policy void with immediate effect without any entitlement for refund.
                    </label>
                  </div>
                </div> */}


                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link
                        to="/Individualinsurancepersonaldetails3"
                        className="buttonactions"
                      >
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
                      <Link
                        className="buttonactions"
                        onClick={handleMaternitysubmit}
                      >
                        Next
                        <i
                          className="fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Individualinsurancepersonaldetails4;
