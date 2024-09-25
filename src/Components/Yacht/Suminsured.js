import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Yachtbanner from "../Banner/Yachtbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import { SuminsuredValidation } from "../../Validators/yachtDetailsValidator";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import YachtInsurancedetails from "../Common/YachtInsurancedetails";

const Suminsured = () => {
  const Progress = 40;
  const { YachtFormsData, handlYachteSelect, handlYachteSelectFormValue, handlYachtEstimatedSelect,
    handlYachtestimatedSelectFormValue, handlYachteSelectFormValuedata, yachttooltip } = UseMotorContext();
  const [formattedValues, setFormattedValues] = useState({
    sum_insured_hull_equipment_value: YachtFormsData?.sum_insured_hull_equipment_value?.toLocaleString() || "",
    sum_insured_dinghy_tender: YachtFormsData?.sum_insured_dinghy_tender?.toLocaleString() || "",
    sum_insured_out_board: YachtFormsData?.sum_insured_out_board?.toLocaleString() || "",
    sum_insured_personal_effect_including_cash: YachtFormsData?.sum_insured_personal_effect_including_cash?.toLocaleString() || "",
    sum_insured_trailer: YachtFormsData?.sum_insured_trailer?.toLocaleString() || "",
  });



  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const fieldName = e.target.name;

    // Check if the input is a valid number
    if (!/^[0-9,]*$/.test(inputValue)) {
      // Display a warning message
      swal({
        text: "Please enter a valid number.",
        icon: "warning",
        button: "Ok",
      });
      return; // Don't proceed if it's not a valid number
    }

    // Remove commas from the input value to get a plain number
    const plainNumber = inputValue.replace(/,/g, '');

    // Format the plain number with commas
    const formattedNumber = Number(plainNumber).toLocaleString();

    // Update the formatted value state
    setFormattedValues((prevFormattedValues) => ({
      ...prevFormattedValues,
      [fieldName]: formattedNumber,
    }));

    // Your other logic goes here, e.g., calling the handlers
    handlYachteSelectFormValue(fieldName, +plainNumber);
    handlYachtestimatedSelectFormValue(fieldName, +plainNumber);
  };


  const handlenext = () => {
    try{
    console.log("YachtFormsData", YachtFormsData)
  if(!YachtFormsData?.sum_insured_dinghy_tender || YachtFormsData?.sum_insured_dinghy_tender === "" || YachtFormsData?.sum_insured_dinghy_tender === undefined){
    setFormattedValues((prevFormattedValues) => ({
      ...prevFormattedValues,
      sum_insured_dinghy_tender: 0,
    }));
    handlYachteSelectFormValue('sum_insured_dinghy_tender', 0);
    handlYachtestimatedSelectFormValue('sum_insured_dinghy_tender', 0);
  };
  if(!YachtFormsData?.sum_insured_out_board || YachtFormsData?.sum_insured_out_board === "" || YachtFormsData?.sum_insured_out_board === undefined){
    setFormattedValues((prevFormattedValues) => ({
      ...prevFormattedValues,
      sum_insured_out_board: 0,
    }));
    handlYachteSelectFormValue('sum_insured_out_board', 0);
    handlYachtestimatedSelectFormValue('sum_insured_out_board', 0);
  };
  if(!YachtFormsData?.sum_insured_personal_effect_including_cash || YachtFormsData?.sum_insured_personal_effect_including_cash === "" || YachtFormsData?.sum_insured_personal_effect_including_cash === undefined){
    setFormattedValues((prevFormattedValues) => ({
      ...prevFormattedValues,
      sum_insured_personal_effect_including_cash: 0,
    }));
    handlYachteSelectFormValue('sum_insured_personal_effect_including_cash', 0);
    handlYachtestimatedSelectFormValue('sum_insured_personal_effect_including_cash', 0);
  };
  if(!YachtFormsData?.sum_insured_trailer || YachtFormsData?.sum_insured_trailer === "" || YachtFormsData?.sum_insured_trailer === undefined){
    setFormattedValues((prevFormattedValues) => ({
      ...prevFormattedValues,
      sum_insured_trailer: 0,
    }));
    handlYachteSelectFormValue('sum_insured_trailer', 0);
    handlYachtestimatedSelectFormValue('sum_insured_trailer', 0);
  };
  navigate("/yachtpersonaldetails")
}catch(error){
  console.log("error", error)
}
}
  





  console.log("formattedValues?.sum_insured_personal_effect_including_cash")
  const navigate = useNavigate()

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
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>Sum Insured (AED)</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <Form.Control
                          type="text"
                          required
                          pattern="[0-9]*"
                          onChange={handleInputChange}
                          name="sum_insured_hull_equipment_value"
                          defaultValue={ formattedValues.sum_insured_hull_equipment_value}
                          placeholder="Hull & Equipment Value"
                          aria-label="Hull & Equipment Value"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.sumInsured?.hullEquipmentValue}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <Form.Control
                          type="text"
                          required
                          onChange={handleInputChange}
                          name="sum_insured_dinghy_tender"
                          defaultValue={ formattedValues?.sum_insured_dinghy_tender}
                          placeholder="Dinghy / Tender Value"
                          aria-label="Dinghy / Tender"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.sumInsured?.dinghyTenderValue}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <Form.Control
                          required
                          onChange={handleInputChange}
                          name="sum_insured_out_board"
                          defaultValue={ formattedValues?.outboardValue}
                          placeholder="Out Board Value"
                          aria-label="Out Board"
                          type="text"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.sumInsured?.outboardValue}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <Form.Control
                          onChange={handleInputChange}
                          name="sum_insured_personal_effect_including_cash"
                          defaultValue={ formattedValues?.sum_insured_personal_effect_including_cash}
                          required
                          placeholder="Personal  Belonging Cash "
                          aria-label="Personal Effect Including Cash"
                          type="text"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.sumInsured?.personalBelongingCash}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <Form.Control
                          onChange={handleInputChange}
                          name="sum_insured_trailer"
                          defaultValue={ formattedValues?.sum_insured_trailer}
                          required
                          placeholder="Trailer Value"
                          aria-label="Trailer"
                          type="text"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.sumInsured?.trailerValue}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6 mb-4"></div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Enginedetails" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <a
                        onClick={() => {
                          if (!YachtFormsData.sum_insured_hull_equipment_value || YachtFormsData.sum_insured_hull_equipment_value === "") {

                            swal({
                              text: `Please Enter Hull & Equipment Value`,
                              icon: "warning",
                              button: "Ok",
                            });

                          } else {

                            // navigate("/yachtpersonaldetails")
                            handlenext()
                          }
                        }}
                        className="buttonactions">
                        Next<i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </a>
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

export default Suminsured;
