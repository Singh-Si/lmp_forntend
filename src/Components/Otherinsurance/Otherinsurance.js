import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Otherbanner from "../Banner/Otherbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Form, FormControl, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import swal from "sweetalert";
import PhoneInput from "react-phone-number-input";
import { CSpinner } from "@coreui/react";
import "react-phone-number-input/style.css";
import OtherInsurancedetails from "../Common/OtherInsurancedetails";
const Otherinsurance = () => {
  const minTime = '09:00';
  const maxTime = '18:00';
  const { OtherInsurance, setOtherInsurance, handleOtherInsurance, otherInsuranceTooltip } =
    UseMotorContext();
  const [otherInsuranceOption, setOtherInsuranceOption] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [dayOption, setDay] = useState([]);
  const [timeOption, setTimeOption] = useState([])
  const [loader, setLoader] = useState(false);
  const [loaderinterval, setLoaderInterval] = useState(false);
  // const dayOption = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   " Saturday",
  //   "Sunday",
  // ];
  // setInterval(() => {
  //   setLoaderInterval(!loaderinterval)
  // }, 3000);
  const API = API_URL + "/api";
  const Navigate = useNavigate();
  const getDays = async () => {
    console.log("getDays>>>>>>>>>>>>>>>>>>>>>>>>>>> hiii")
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const days = await fetch(`${API}/getPreferredDays?type=user`, requestOptions)
      const res = await days.json()
      console.log("days>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.data)
      setDay(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  const handleOtherInsuranceOption = async () => {
    await fetch(`${API}/otherInsurance`)
      .then((res) => res.json())
      .then((res) => setOtherInsuranceOption(res.data))
      .catch((err) => console.log(err));
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    setOtherInsurance({ ...OtherInsurance, prefer_day_to_call: date });
    localStorage.setItem("OtherInsurance", JSON.stringify(OtherInsurance));
  };

  const handleSubmit = async () => {
    setLoader(true);

    if (!OtherInsurance.other_insurance_option) {
      swal({
        text: "Please Select Other Insurance Option",
        icon: "warning"
      });
      return false;
    }
    else if (!OtherInsurance.full_name) {
      swal({
        text: "Please Enter Full Name",
        icon: "warning",
      });
      return false;
    }
    else if (!OtherInsurance.email) {
      swal({
        text: "Please Enter Email",
        icon: "warning"
      });
      return false;
    }
    else if (!OtherInsurance.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      swal({
        text: "Please Enter Valid Email",
        icon: "warning"
      });
      return false;
    }
    // else if (!OtherInsurance.date) {
    //   swal({
    //     text: "Please Enter Age",
    //     icon: "warning"
    //   });
    //   return false;
    // }
    else if (!OtherInsurance.phone_number) {
      swal({
        text: "Please Enter Phone Number",
        icon: "warning"
      });
      return false;
    }

    else if (!OtherInsurance.brief_info) {
      swal({
        text: "Please Enter Brief Information",
        icon: "warning"
      });
      return false;
    }
    else if (!OtherInsurance.prefer_day_to_call) {
      swal({
        text: "Please Select Prefer Day to Call",
        icon: "warning"
      });
      return false;
    }
    else if (!OtherInsurance.prefer_time_to_call) {
      swal({
        text: "Please Select Prefer Time to Call",
        icon: "warning"
      });
      return false;
    }
    else {




      const {
        other_insurance_option,
        full_name,
        email,
        age,
        phone_number,
        brief_info,
        prefer_day_to_call,
        prefer_time_to_call,
        insuranceType,
      } = OtherInsurance;
      console.log("insurance Type value>>>>>>>", insuranceType)
      const dataToSend = {
        insuranceType: insuranceType,
        name: full_name,
        email: email,
        phoneno: phone_number,
        age: age,
        call_time: prefer_time_to_call,
        call_date: prefer_day_to_call,
        brief_information: brief_info,
        other_insurance_name: other_insurance_option,
        location: "Otherinsurance"

      };

      await fetch(`${API}/fillInsurancePlan`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setLoader(false);
      Navigate("/Otherinsurancesubmit")

    }
  };

  useEffect(() => {
    handleOtherInsuranceOption();
    getDays()
    // generateTimeOptions()
  }, []);



  useEffect(() => {
    localStorage.setItem("OtherInsurance", JSON.stringify(OtherInsurance));
    console.log("OtherInsurance>>>>>>>>>>>>>>>>>>>>>>>>>>>", OtherInsurance)
    const day = OtherInsurance?.prefer_day_to_call
    getTimeRangeByDay(day)
  }, [OtherInsurance]);
  const handlePhoneNumber = (e) => {
    try {
      const val = {
        target: {
          name: "phone_number",
          value: e
        }
      }
      handleOtherInsurance(val)
    } catch (error) {
      console.log(error);
    }
  }
  const handleDayChange = (e) => {
    try {
      handleOtherInsurance(e)
      getTimeRangeByDay(e.target.value)

    } catch (error) {
      console.log(error);
    }
  }
  const getTimeRangeByDay = async (day) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const days = await fetch(`${API}/getPreferredDaysById?id=${day}`, requestOptions)
      const res = await days.json()
      const starttime = res.data[0]?.start_time?.split(":")
      const Stime = starttime[0]
      const Sminute = starttime[1]
      const endtime = res.data[0]?.end_time?.split(":")
      // const Etime = endtime[0] > 0 ? endtime[0] - 1 : endtime[0]
      const Etime = endtime[0]
      const Eminute = endtime[1]
      generateTimeOptions(Stime, Etime, Sminute, Eminute)
    } catch (error) {
      console.log(error);
    }
  }
  const generateTimeOptions = (minTime, maxTime, Sminute, Eminute) => {
    const options = [];
    let modoptions
    for (let hour = minTime; hour <= maxTime; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        // Generate options in 15-minute intervals
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const timeValue = `${formattedHour}:${formattedMinute}`;
        if (formattedMinute != 60) {
          options.push({
            value: timeValue,
            label: timeValue,
          });
        }
        // if(formattedMinute == 60 && Sminute != "00"){
        //   options.push({
        //     value: `${formattedHour}:00`,
        //     label: `${formattedHour}:00`,
        //   });
        // }
      }
    }
    if (Eminute == "00") {
      for (let i = 0; i < 3; i++) {
        options.pop()
      }
    }
    if (Sminute == "00") {
      modoptions = options
    } else if (Sminute == "15") {
      modoptions = options.slice(1, options.length)
    } else if (Sminute == "30") {
      modoptions = options.slice(2, options.length)
    } else if (Sminute == "45") {
      modoptions = options.slice(3, options.length)
    }
    setTimeOption(modoptions)
  }
  return (
    <div>
      <Header />
      <Otherbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 nopadding">
              <h3 className="mb-4">
                Please select the Insurance Type From below Drop down Menu
              </h3>
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <ul>
                        <li>Other insurance Option 
                        </li>
                      </ul>
                      <InputGroup className="mb-4">
                        <select
                          id="ohter"
                          name="other_insurance_option"
                          onChange={handleOtherInsurance}
                          value={OtherInsurance.other_insurance_option}
                          className="form-control"
                          placeholder="Other insurance Option"
                        >
                          <option hidden>Other insurance Option</option>
                          {otherInsuranceOption &&
                            otherInsuranceOption.map((val) => (
                              <option value={val._id}>{val.insurance_name}</option>
                            ))}
                        </select>
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {otherInsuranceTooltip?.otherInsuranceOption}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{ top: '50px' }} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    {/* <div className="col-lg-1">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {otherInsuranceTooltip?.otherInsuranceOption}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div> */}
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <ul>
                        <li>Full Name </li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="name"
                          name="full_name"
                          onChange={handleOtherInsurance}
                          value={OtherInsurance.full_name}
                          placeholder="Full Name"
                          aria-label="Full Name"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {otherInsuranceTooltip?.name}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{ top: '50px' }} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <ul>
                        <li>Email</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          name="email"
                          type="email"
                          value={OtherInsurance.email}
                          onChange={handleOtherInsurance}
                          placeholder="Email ID"
                          aria-label="Email ID"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {otherInsuranceTooltip?.otherInsuranceOption}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{ top: '50px' }} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>

                    <div className="col-lg-6" style={{position:'relative'}}>
                      <ul>
                        <li>Phone Number </li>
                      </ul>
                      <InputGroup className="mb-4">
                        <PhoneInput
                          name="phone_number"
                          international
                          className="form-control"
                          defaultCountry="AE"
                          onChange={(e) => handlePhoneNumber(e)}
                          value={OtherInsurance.phone_number}
                          required
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {otherInsuranceTooltip?.phone}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{ top: '50px' }} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    {loader == true ? <div className="d-flex justify-content-center">
                      <CSpinner color="danger" />
                    </div> : ""
                    }
                    <div className="col-lg-12" style={{position:"relative"}}>
                      <ul>
                        <li>Brief Information </li>
                      </ul>
                      <InputGroup className="mb-4">
                        <textarea
                          name="brief_info"
                          onChange={handleOtherInsurance}
                          value={OtherInsurance.brief_info}
                          className="form-control"
                          placeholder="Brief Information"
                          rows="3"
                        ></textarea>
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {otherInsuranceTooltip?.briefInformation}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{ top: '50px' }} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <ul>
                        <li>Select a day
                        </li>
                      </ul>
                      <InputGroup className="">
                        <select
                          name="prefer_day_to_call"
                          onChange={(e) => handleDayChange(e)}
                          value={OtherInsurance.prefer_day_to_call}
                          className="form-control"
                          placeholder="Prefer Day to Call"
                        >
                          <option hidden>Prefer Day to Call</option>
                          {dayOption &&
                            dayOption?.map((val, index) => (
                              <option key={index} value={val._id}>
                                {val.name}
                              </option>
                            ))}
                        </select>
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {otherInsuranceTooltip?.day}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{ top: '50px' }} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6" style={{position:'relative'}}>
                      <ul>
                        <li>Select a Time</li>
                      </ul>
                      <InputGroup className="mb-4">
                        {/* <Form.Control
                          id="form11"
                          name="prefer_time_to_call"
                          type="time"
                          min={minTime}
                          max={maxTime}
                          onChange={handleOtherInsurance}
                          required
                        /> */}
                        <select
                          id="form11"
                          className="form-control"
                          name="prefer_time_to_call"
                          // value={OtherInsurance.prefer_time_to_call}
                          onChange={handleOtherInsurance}
                          required
                        >
                          {timeOption?.map((val, index) => (
                            <option selected={OtherInsurance.prefer_time_to_call == val.value ? true : false} key={index} value={val.value}>{val.label}</option>
                          ))}
                        </select>
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {otherInsuranceTooltip?.time}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{ top: '50px' }} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      {/* <Link to="/" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link> */}
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                      onClick={handleSubmit}
                    >
                      <Link
                        // to="/Otherinsurancesubmit"
                        className="buttonactions"
                      >
                        Submit
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Insurancedetails /> */}
      <OtherInsurancedetails />
      <Footer />
    </div>
  );
};

export default Otherinsurance;
