import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar,Form } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import swal from "sweetalert";
import Individualnsurancedetails from "../Common/Individualnsurancedetails";

const Individualinsurancepersonaldetails5 = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    HandleSubmitIndividualFormdata,
  } = UseMotorContext();
  const [underWriting, setUnderWriting] = useState([]);
  const [arr, setArr] = useState([]);
  const [visited, setVisited] = useState(false);
  const [terms, setTerms] = useState(false);

  const Progress = 30;
  const Navigate = useNavigate();


  const [updatePolicyId, setUpdatePolicyId] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
      setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
    }
  }, []);



  const fetchData = async () => {
    await fetch(`${admin}/getAllUnderwritingConditions`)
      .then((e) => e.json())
      .then((res) => {
        setUnderWriting(res.data)
        const initialHomeCondition = res.data && res.data.length > 0 ? res.data.map((item) => ({
          _id: item._id,
          value: false,
          name: item.condition
        })) : [];

        console.log("initialHomeCondition", initialHomeCondition)
        if (IndividualInsurance.medical_under_condition.length === 0) {
          setIndividualInsurance((prevState) => ({
            ...prevState,
            medical_under_condition: initialHomeCondition,
            // maternity_condition_visit: true
          }))
        }
      })
      .catch((err) => {
        console.log("error>>>>>>", err)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handlePush = (val, id, value) => {
    if (IndividualInsurance?.medical_under_condition?.length > 0) {
      // Check if the _id already exists in the array
      let arr = IndividualInsurance.medical_under_condition
      const existingIndex = arr.findIndex((item) => item._id === id);

      // If the _id exists, update the existing entry; otherwise, add a new entry
      if (existingIndex !== -1) {
        arr[existingIndex].value = value; // Update the existing entry's value
      }
      setIndividualInsurance((prevState) => ({
        ...prevState,
        medical_under_condition: arr,
        general_condition_visit: true
      }));
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );

    };
  }

  const handleSubmit = async () => {




    HandleSubmitIndividualFormdata({ medical_under_condition: IndividualInsurance.medical_under_condition, location: "Individualinsurancequote" })
  };

  const conditionCheck = (id, value) => {
    // console.log(" IndividualInsurance.medical_under_condition", IndividualInsurance.medical_under_condition)
    const condition = IndividualInsurance.medical_under_condition?.find(
      (val) => val._id === id
    );
    return condition ? condition.value === value : false;
  };


  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);


  const handleMaternitysubmit = async (e) => {
    await HandleSubmitIndividualFormdata({ medical_under_condition: IndividualInsurance.medical_under_condition, location: "Individualinsurancequote" })
  };

  const handleMaternitysubmitnext = async (e) => {
    // if (!terms) {
    //   swal({
    //     text: "Please Accept Terms & Conditions",
    //     icon: "warning",
    //   })
    //   return false;
    // }
    // else {
      await HandleSubmitIndividualFormdata({ medical_under_condition: IndividualInsurance.medical_under_condition, location: "Individualinsurancequote" })
      Navigate("/Individualinsurancequote");

    // }
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
                      Underwriting Conditions :
                    </li>
                  </ul>
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    {underWriting.length > 0 &&
                      underWriting.map((underwrite) => (
                        <div className="col-lg-5" key={underwrite._id}>
                          <ul style={{ paddingLeft: "0px", justifyContent: "space-between" }}>
                            <li>{underwrite.condition}</li>
                          </ul>
                          <div
                            className="button-group-pills"
                            data-toggle="buttons"
                          >
                            <div className="row">
                              <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${conditionCheck(underwrite._id, true)
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handlePush(e, underwrite._id, true)
                                  }
                                >
                                  <input
                                    type="radio"
                                    name={`options-${underwrite._id}`}
                                    defaultChecked={conditionCheck(
                                      underwrite._id,
                                      true
                                    )}
                                  />
                                  <div

                                  >
                                    Yes
                                  </div>
                                </label>
                              </div>
                              <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${conditionCheck(underwrite._id, false)
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handlePush(e, underwrite._id, false)
                                  }
                                >
                                  <input
                                    type="radio"
                                    name={`options-${underwrite._id}`}
                                    defaultChecked={conditionCheck(
                                      underwrite._id,
                                      false
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
                      ))}
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
                      {IndividualInsurance.gender == 'Male' || IndividualInsurance.gender == 'Female (Single)' ?
                        <Link
                          to="/Individualinsurancepersonaldetails3"
                          className="buttonactions"
                          onClick={handleMaternitysubmit}
                        >
                          <i
                            className="fa fa-chevron-left"
                            aria-hidden="true"
                          ></i>
                          Back
                        </Link>
                        :
                        <Link
                          to="/Individualinsurancematernity"
                          className="buttonactions"
                          onClick={handleMaternitysubmit}
                        >
                          <i
                            className="fa fa-chevron-left"
                            aria-hidden="true"
                          ></i>
                          Back
                        </Link>
                      }
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        className="buttonactions"
                        onClick={handleMaternitysubmitnext}
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
      <Individualnsurancedetails />
      <Footer />
    </div>
  );
};

export default Individualinsurancepersonaldetails5;
