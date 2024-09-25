import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Yachtbanner from "../Banner/Yachtbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { emailRegex } from "../../functions";
import swal from "sweetalert";
import axios from "axios";
import { API_URL } from "../..";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import YachtInsurancedetails from "../Common/YachtInsurancedetails";

const Yachtpersonaldetails = () => {

  const { YachtFormsData, handlYachteSelect, handlYachteSelectFormValue, handlYachtEstimatedSelect,
    handlYachtestimatedSelectFormValue, handlYachteSelectFormValuedata, yachttooltip } = UseMotorContext();
  const navigate = useNavigate()
  // and so on...
  const checkCondition = async () => {
    let yachttype = YachtFormsData.yacht_type_of_use?.toLowerCase()
    console.log("yachttype", yachttype)
    let checkdob = YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? YachtFormsData.date_of_birth : YachtFormsData.businessTypeId
    let message = YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Please Enter Your Date of Birth" : "Please Select Business Type"
    let errorMessage = "";
    if (!YachtFormsData.name) {
      errorMessage = "Please Enter Your Name";
    } else if (
      !YachtFormsData?.email ||
      !emailRegex.test(YachtFormsData.email)
    ) {
      errorMessage = "Please Enter a Valid Email";
    } else if (!YachtFormsData.phoneno) {
      errorMessage = "Please Enter a Valid Phone Number";
    }
    else if (!checkdob) {
      console.log("businessTypeId", YachtFormsData.businessTypeId)
      errorMessage = message
    }
    else if (!YachtFormsData.isselecctcontactterms) {
      errorMessage = "Please Select Terms And Conditions";
    }
    if (errorMessage) {
      swal({
        text: errorMessage,
        icon: "warning",
      });
    } else {
      await handlYachteSelectFormValuedata({ ...obj, personelform: true })
      navigate("/Territorycoverage")
      // Proceed to the next step
      // Add your logic here to move to the next step or perform other actions
    }
  };
  const Progress = 40;

  let obj = {
    location: "Territorycoverage",
    name: YachtFormsData.name,
    email: YachtFormsData.email,
    phoneno: YachtFormsData.phoneno,
    date_of_birth: YachtFormsData.date_of_birth,
    YachtMaker: YachtFormsData.YachtMaker,
    YachtVarient: YachtFormsData.YachtVarient,
    buying_used_boat: YachtFormsData.buying_used_boat,
    bot_brand_new: YachtFormsData.bot_brand_new,
    bot_current_renewal: YachtFormsData.bot_current_renewal,
    bot_current_insurance_company_id: YachtFormsData.bot_current_insurance_company_id,
    model_year: YachtFormsData.model_year,
    boat_details: {
      boat_name: YachtFormsData.boat_name,
      boat_registration_no: YachtFormsData.boat_registration_no,
      boat_hull_serial_number: YachtFormsData.boat_hull_serial_number,
      boat_hull_material: YachtFormsData.boat_hull_material,
      boat_length_in_meter: YachtFormsData.boat_length_in_meter,
      boat_breath_in_meter: YachtFormsData.boat_breath_in_meter,
      no_of_passengers: YachtFormsData.no_of_passengers,
      place_of__mooring: YachtFormsData.place_of__mooring,
      is_vessel_a_conversion: YachtFormsData.is_vessel_a_conversion,
      current_policy_status: YachtFormsData.current_policy_status,
      yacht_type_of_use: YachtFormsData?.yacht_type_of_use,
    },
    "boat_engine_details": {
      engine_type: YachtFormsData.engine_type,
      engine_maker: YachtFormsData.engine_maker,
      engine_seriel_number: YachtFormsData.engine_seriel_number,
      engine_model_year: YachtFormsData.engine_model_year,
      engine_horsepower: YachtFormsData.engine_horsepower,
      engine_speed: YachtFormsData.engine_speed
    },
    sumInsured: {
      sum_insured_hull_equipment_value: YachtFormsData.sum_insured_hull_equipment_value,
      sum_insured_dinghy_tender: YachtFormsData.sum_insured_dinghy_tender,
      sum_insured_out_board: YachtFormsData.sum_insured_out_board,
      sum_insured_personal_effect_including_cash: YachtFormsData.sum_insured_personal_effect_including_cash,
      sum_insured_trailer: YachtFormsData.sum_insured_trailer,
    }


  }
  if (obj["bot_current_insurance_company_id"] == "") {
    delete obj["bot_current_insurance_company_id"]
  }
  if(obj["boat_details"]["yacht_type_of_use"]?.toLowerCase() == "company name"){
    console.log("i am matched>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    delete obj["date_of_birth"]
    obj["businessTypeId"] = YachtFormsData.businessTypeId 
  }
  const [Businesstypes, setBusinesstypes] = useState([])
  useEffect(() => {
    axios.get(API_URL + "/api/getActiveBusinessType")
      .then((response) => {
        //console.log("response>>>>>>", response.data.data);
        response.data.data && setBusinesstypes(response.data.data);
      })
      .catch((error) => {
        console.error(error)
      });
  }, []);
  console.log("YachtFormsData", YachtFormsData)
  console.log("yachttooltip", yachttooltip)


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
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <div className="row">
                    <ul style={{ paddingLeft: "0px" }}>
                      <li style={{ listStyle: "none" }}>
                        Please fill your details :
                      </li>
                    </ul>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          name="name"
                          value={YachtFormsData?.name}
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          placeholder={
                            YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Full Name" : "Name of Company"
                          }
                          aria-label="Full Name"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.personalDetails?.name}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control

                          name="email"
                          value={YachtFormsData?.email}
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          required

                          placeholder={
                            YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Email Id" : "Email of Contact person"
                          }

                          aria-label="Email ID"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.personalDetails?.email}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <PhoneInput
                          placeholder={
                            YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Phone Number" : "Phone number of Contact Person"
                          }
                          international
                          className="form-control"
                          defaultCountry="AE"
                          value={YachtFormsData?.phoneno} // Use YachtFormsData.phoneno instead of value
                          onChange={(date) => {
                            handlYachteSelectFormValue("phoneno", date)
                            handlYachtestimatedSelectFormValue("phoneno", date)
                          }}
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.personalDetails?.phone}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    {YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? (
                      <div className="col-lg-6" style={{position:'relative'}}>
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholderText={"Enter Date Of Birth"}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={YachtFormsData.date_of_birth ? new Date(YachtFormsData.date_of_birth) : ""}
                            onChange={(date) => {

                              handlYachteSelectFormValue("date_of_birth", date)
                              handlYachtestimatedSelectFormValue("date_of_birth", date)
                            }}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {yachttooltip?.personalDetails?.date}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                    ) : (
                      <div className="col-lg-6" style={{position:'relative'}}>
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 640 512"
                            >
                              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                              <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 352h8.2c32.3-39.1 81.1-64 135.8-64c5.4 0 10.7 .2 16 .7V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM320 352H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H360.2C335.1 449.6 320 410.5 320 368c0-5.4 .2-10.7 .7-16l-.7 0zm320 16a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zM496 288c8.8 0 16 7.2 16 16v48h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H496c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16z" />
                            </svg>
                          </InputGroup.Text>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              handlYachteSelect(e)
                              handlYachtEstimatedSelect(e)
                            }}
                            id="businessType"
                            name="businessTypeId"
                            value={YachtFormsData.businessTypeId}
                          >
                            {Businesstypes && Businesstypes.length > 0 ? (
                              <>
                                <option value={""}> Select Business Type</option>
                                {Businesstypes.map((v, i) => {
                                  return (
                                    <option

                                      value={v?._id}
                                    >
                                      {v?.business_type_name}
                                    </option>
                                  );
                                })}
                              </>
                            ) : (
                              <></>
                            )}
                          </select>
                        </InputGroup>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="d-flex labelssss mb-3">
                    <Form.Check
                      className="abcds_abcs"
                      type="checkbox"
                      checked={YachtFormsData.isselecctcontactterms}
                      onChange={(e) =>
                        handlYachteSelectFormValue(
                          "isselecctcontactterms",
                          e.target.checked
                        )
                      }
                    />
                    <label>
                      By Clicking on "Proceed",I declare that I am a resident of
                      UAE and holding a valid Visa and agree to the website{" "}
                      <Link
                        target="_blank"
                        className="termscond"
                        to="/Privacypolicy"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        target="_blank"
                        className="termscond"
                        to="/Termsandcond"
                      >
                        Terms of Use
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Suminsured" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >

                      <Link
                        onClick={checkCondition}
                        className="buttonactions"
                      >
                        Next{" "}
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
      <YachtInsurancedetails />
      <Footer />
    </div>
  );
};

export default Yachtpersonaldetails;
