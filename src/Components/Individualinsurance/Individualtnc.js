import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import { Button, InputGroup, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Filters from "./Individualmedicalfilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import admin from "../../config";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
const Individualtnc = () => {
  // const [startDate, setStartDate] = useState(new Date());
  const [showMore, setShowMore] = useState(true);
  const [quoteData, setQuoteData] = useState([]);
  const [quoteArr, setQuoteArr] = useState([]);
  const [Mortgage, setMortgage] = useState(false);
  const [startDate, setStartDate] = useState();
  const [TermsAndConditions, setTermsAndConditions] = useState(false);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [additionalCover, setAdditionalCover] = useState([]);
  const [show, setShow] = useState(false);
  const [declaration, setDeclaration] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();

  const navigate = useNavigate();
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 6);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const fetchData = async () => {
    await fetch(`${admin}/getAllAdditionalCovered?lob=Medical`)
      .then((res) => res.json())
      .then((data) => setAdditionalCover(data.data))
      .catch((e) => { });
  };

  useEffect(() => {
    fetchData();
    getDeclaration();
  }, []);

  //   const handleStartDate = (date) => {
  //     setStartDate(date);
  //     setIndividualInsurance({
  //       ...IndividualInsurance,
  //       policy_issued_date: date.toISOString(),
  //     });
  //     localStorage.setItem("IndividualInsurance", JSON.stringify(IndividualInsurance));
  //   };

  const getDeclaration = async () => {
    await fetch(`${admin}/medicalDeclarations`)
      .then((res) => res.json())
      .then((data) => setDeclaration(data.data))
      .catch((e) => { });
  }

  console.log(declaration);

  const handleUpdatePolicy = async () => {
    const dataToSend = {
      plan_category_id: IndividualInsurance.company_id,
      plan_type_id: IndividualInsurance.plan_type_id,
      final_price: 1200,
      paymentStatus: "pending",
      bank_name: Mortgage ? IndividualInsurance.bank_name : null,
      policy_issued_date: IndividualInsurance.policy_issued_date,
      medical_price_id: IndividualInsurance.medicalRates?._id,

    };
    // //console.log(dataToSend);

    await fetch(`${admin}/updatePolicyDetails?id=${updatePolicyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((res) => { })
      .catch((err) => { });
  };

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
      setQuoteData([JSON.parse(stored).selectFilter]);
      setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);


  const handleDeclaration = () => {
    const allChecked = declaration.every(item => item.checked);
    setTermsAndConditions(allChecked);
    setIndividualInsurance({
      ...IndividualInsurance,
      termcondition : allChecked
    })
  };

  console.log("TermsAndConditions", TermsAndConditions);


  return (
    <div>
      <Header />
      <Individualmedicalbanner />

      <div className="Selectedinfo">
        <div className="container Quotes_info1212 pt-4 pb-4">
          <div className="row quotes_all" style={{ justifyContent: "center" }}>
            {/* <Filters /> */}
            <div
              className="col-lg-8 col-md-12 col-sm-12 col-xs-12"
              style={{ marginTop: "40px" }}
            >
              <div className="colnopadding additional mb-3">
                <div
                  className="row form_abcd ml-2 "
                  style={{ justifyContent: "initial" }}>
                  <h3 className="ml-2 mb-3 mt-0">Terms of Acceptance</h3>
                  <p style={{ fontWeight: "bold" }} className="mb-2 ml-6">I here by declare that
                    <ul style={{ fontWeight: 90 }} className="mt-3 ml-0" type="square">
                      {/* <li>
                      Any non-disclosure, misrepresentation, or concealment of
                      material fact will make this policy void with immediate
                      effect and premium refund will be as per insurer’s policy
                      terms and conditions.
                    </li>
                    <li>
                      Please enter correct Insured's details (Passport no. DOB,
                      Nationality, Gender & Visa place) to match with GDRFA
                      records for avoiding any delays.
                    </li> */}
                      {
                        declaration.map((item) => {
                          return (
                            <>
                              <div className="d-flex labelssss" style={{ alignItems: 'top' }}>
                                <Form.Check
                                  className="abcds_abcs"
                                  type="checkbox"
                                  style={{ marginRight: '10px' }}
                                 
                                  onChange={(e) => {
                                    item.checked = e.target.checked;
                                    handleDeclaration();
                                  }}
                                />
                                <li style={{ listStyle: 'none' }}>{item.name}</li>
                              </div>
                            </>
                          )
                        })
                      }
                    </ul>
                    {/* <div className="d-flex labelssss">
                      <Form.Check
                        className="abcds_abcs mt-3"
                        type="checkbox"
                        onChange={(e) => {
                          setTermsAndConditions(e.target.checked);
                        }}
                        checked={TermsAndConditions ? true : false}
                      />
                      <label className="mt-3">
                        I have read and agree to{" "}
                        <a className="termscond" onClick={handleShow}>
                          Terms and Conditions
                        </a>
                      </label>
                    </div> */}
                  </p>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
                <div className="row">
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 payments"
                    style={{ paddingLeft: "0px" }}
                  >
                    <Link
                      className="buttonactions"
                      to={"/Individualselectedquote"}
                    >
                      <i className="fa fa-chevron-left" aria-hidden="true"></i>
                      Back
                    </Link>
                  </div>
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 payments"
                    style={{ textAlign: "right", paddingRight: "0px" }}
                  >
                    {TermsAndConditions ? (
                      <Link
                        to={"/Individualpayment"}
                        className="buttonactions"
                        onClick={handleUpdatePolicy}
                      >
                        Next
                      <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </Link>
                    ) : (
                      <Link
                        className="buttonactions disabled"
                      >
                        Next
                      <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </Link>
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
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Individual medical insurance T&C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">
            The Participant hereby declares having provided a description of the
            risk to the best of his/her knowledge and belief that answers given
            here are true and all material information have been disclosed.
          </p>
          <p className="paragraph">
            In the event that any untrue, inaccurate, mismatching, incomplete or
            un-updated information has formed the basis of underwriting,
            issuance of this Quotation and subsequently the insurance policy,
            then insurer, at its sole discretion shall retain the full right to
            reject any claim(s) submitted under such issued policy and/or
            downgrade it to Third Party Liability (TPL) or treat the policy
            and/or any section of it as voidable.
          </p>
          <p className="paragraph">
            Your insurance coverage will not commence until the Insurers has
            indicated their acceptance of the Proposal/online order and a
            Certificate of Motor Insurance has been issued, subject to your
            payment of full premium.
          </p>
          <p className="paragraph">
            Should any issue arises out of the above, please refer to the Terms
            & Conditions of the insurer that form an integral part of this
            insurance policy and shall prevail in case of dispute.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ padding: "5px 10px" }}>
          <a className="savechanges" onClick={handleClose}>
            Ok
          </a>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
};

export default Individualtnc;
