import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
const Individualstandardconditions = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    HandleSubmitIndividualFormdata,
  } = UseMotorContext();
  const [underWriting, setUnderWriting] = useState([]);
  const [arr, setArr] = useState([]);
  const [visited, setVisited] = useState(false);
  const [updatePolicyId, setUpdatePolicyId] = useState("");

  const Navigate = useNavigate()

  const Progress = 30;


  // useEffect(() => {
  //   const stored = localStorage.getItem("IndividualInsurance");
  //   if (stored) {
  //     setIndividualInsurance(JSON.parse(stored));
  //     setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
  //   }
  // }, []);

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");

    if (stored) {
      // setIndividualInsurance(JSON.parse(stored));
      setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
    }
    setUnderWriting(IndividualInsurance.selectFilter);
    fetchData();

  }, []);

  console.log(">>>>>>>>>>>>selectfilter", IndividualInsurance?.selectFilter)


  const fetchData = async () => {
    console.log("IndividualInsurance.selectFilter", IndividualInsurance?.selectFilter)
    const initialArr = IndividualInsurance?.selectFilter?.standard_conditions_arr ? IndividualInsurance?.selectFilter?.standard_conditions_arr.map((underwrite) => ({
      itemId: underwrite.itemId,
      value: false,
      benefit: underwrite.benefit,
    })) : [];

    console.log("initialArr", initialArr);

    setIndividualInsurance((prevState) => ({
      ...prevState,
      standard_condition: !prevState.standard_condition? initialArr : prevState.standard_condition,
    }));

  }

  console.log("IndividualInsurance.standard_condition", IndividualInsurance.standard_condition)

  const handlePush = (val, id, value) => {
    if (IndividualInsurance.standard_condition.length > 0) {
      // Check if the _id already exists in the array
      let arr = IndividualInsurance.standard_condition
      const existingIndex = arr.findIndex((item) => item.itemId === id);

      // If the _id exists, update the existing entry; otherwise, add a new entry
      if (existingIndex !== -1) {
        arr[existingIndex].value = value; // Update the existing entry's value
      }
      setIndividualInsurance((prevState) => ({
        ...prevState,
        standard_condition: arr,

      }));
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );

    };
  }

  const conditionCheck = (id, value) => {


    const condition = IndividualInsurance.standard_condition?.find(
      (val) => val.itemId === id
    );
    return condition ? condition.value === value : false;
  };



  const handlenextsubmit = async () => {
    let obj = { medical_additional_condition: IndividualInsurance.standard_condition, location: "Individualselectedquote" }
    await HandleSubmitIndividualFormdata(obj)


    localStorage.setItem("navlocation2", "Individualstandardconditions")
    Navigate('/Individualselectedquote')
  }





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
                      Additional Conditions :
                    </li>
                  </ul>
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    {
                      underWriting.standard_conditions_arr?.map((underwrite) => (
                        console.log("underwrite", underwrite),
                        <div className="col-lg-5" key={underwrite.itemId}>
                          <ul style={{ paddingLeft: "0px", justifyContent: "space-between" }}>
                            <li>{underwrite.benefit}</li>
                          </ul>
                          <div
                            className="button-group-pills"
                            data-toggle="buttons"
                          >
                            <div className="row">
                              <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${conditionCheck(underwrite.itemId, true)
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handlePush(e, underwrite.itemId, true)
                                  }
                                >
                                  <input
                                    type="radio"
                                    name={`options-${underwrite.itemId}`}
                                    defaultChecked={conditionCheck(
                                      underwrite.itemId,
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
                                  className={`btn btn-default ${conditionCheck(underwrite.itemId, false)
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handlePush(e, underwrite.itemId, false)
                                  }
                                >
                                  <input
                                    type="radio"
                                    name={`options-${underwrite.itemId}`}
                                    defaultChecked={conditionCheck(
                                      underwrite.itemId,
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
                      )

                      )}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      {
                        localStorage.getItem("navlocation") === "Individualcompare" ?
                          <Link className="buttonactions" to={"/Individualcompare"}>
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                            Back
                          </Link>
                          :
                          <Link className="buttonactions" to={"/Individualinsurancequote"}>
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                            Back
                          </Link>
                      }
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                      onClick={handlenextsubmit}
                    >
                      <Link
                        // to="/Individualselectedquote"
                        className="buttonactions"
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

export default Individualstandardconditions;
