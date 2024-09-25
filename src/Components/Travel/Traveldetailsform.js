import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Travelbanner from "../Banner/Travelbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import TravelInsurancedetails from "../Common/TravelInsurancedetails";

const Traveldetailsform = () => {
  const Progress = 20;
  const { travelsFormsData, settravelsFormsData, traveltootip } = UseMotorContext();
  const [nooftravel, setnooftravel] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
  }, []);

  useEffect(() => {
    // console.log("no_of_travel", travelsFormsData.no_of_travel)
    // if (travelsFormsData.no_of_travel == "1") {
    //   console.log("yes")
    //   try {
    //     settravelsFormsData((prev) => ({
    //       ...prev,
    //       start_date: new Date(),
    //       end_date: new Date()
    //     }));
    //     localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
    //   } catch (error) {
    //     console.log("error>>>>>>", error)
    //   }
    // } else {
    //   console.log("no")
    // }
    localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
    const nooftravel =
      travelsFormsData.no_of_travel == ""
        ? travelsFormsData.plan_type == "641d418b19807a3c58191f7f"
          ? ""
          : "365"
        : travelsFormsData.no_of_travel;
    setnooftravel(nooftravel);
    if (parseInt(travelsFormsData.no_of_travel, 10) === 1) {
      console.log("no_of_travel??????", parseInt(travelsFormsData.no_of_travel, 10))
      const today = new Date();
      settravelsFormsData((prev) => ({
        ...prev,
        start_date: today,
        end_date: today,
      }));
    }
  }, []);
  console.log("travelsFormsData", travelsFormsData)
  const handleDate = (date) => {
    settravelsFormsData((prev) => ({
      ...prev,
      start_date: date,
    }));
    settravelsFormsData((prev) => ({
      ...prev,
      end_date: new Date(
        date.getTime() +
        (travelsFormsData.no_of_travel - 1) * 24 * 60 * 60 * 1000
      ),
    }));
    localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
  };



  const handleNextClick = () => {
    console.log(parseInt(nooftravel, 10))
    if (travelsFormsData.plan_type == '641d418b19807a3c58191f7f' && parseInt(nooftravel, 10) > 90) {
      // alert("Please select at least 90 days of travel");
      swal("Please select less than 90 days of travel", "", "warning");
      return;
    } else {
      localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
      navigate('/Travelplantype');
    }
  };

  useEffect(() => {
    if (travelsFormsData.start_date && travelsFormsData.no_of_travel) {
      // Convert the start_date to a JavaScript Date object
      const startDate = new Date(travelsFormsData.start_date);

      // Calculate the end_date by adding (no_of_travel - 1) days to the start_date
      let no_of_days = travelsFormsData.no_of_travel == "365" ? parseInt(travelsFormsData.no_of_travel) : parseInt(travelsFormsData.no_of_travel) - 1
      const endDate = new Date(
        startDate.getTime() + (no_of_days) * 24 * 60 * 60 * 1000
      );
      console.log("endDate", endDate)
      // Calculate the total number of days between start_date and end_date
      const timeDifference = endDate.getTime() - startDate.getTime();
      const diffDays = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

      // Update the state with the calculated end_date and diffDays
      settravelsFormsData((prev) => ({
        ...prev,
        end_date: endDate,
        no_of_travel: travelsFormsData.no_of_travel
      }));

      // Store the updated travelsFormsData in localStorage
      localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
      console.log("diffDays", diffDays);
    }
  }, [travelsFormsData.start_date, travelsFormsData.no_of_travel]);


  // , travelsFormsData.end_date

  console.log("traveltooltrip", traveltootip);



  return (
    <div>
      <Header />
      <Travelbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12">
              <div className="row form_abcd">
                <h5>Date Of Travel</h5>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>No of Travel Days</li>
                        </ul>
                        <div class="button-group-pills" data-toggle="buttons">
                          <div className="row">
                            <div className="col-lg-12 ">
                              <InputGroup className="mb-2 ">
                                <Form.Control
                                  required
                                  placeholder="No Of Travel"
                                  value={nooftravel}
                                  onChange={(e) => {
                                    setnooftravel(e.target.value);
                                    settravelsFormsData((prevData) => ({
                                      ...prevData,
                                      no_of_travel: e.target.value,
                                    }));
                                    localStorage.setItem(
                                      "travelsFormsData",
                                      JSON.stringify(travelsFormsData)
                                    );
                                  }}
                                  disabled={
                                    travelsFormsData.plan_type !==
                                    "641d418b19807a3c58191f7f"
                                  }
                                />

                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4" style={{ position: 'relative' }}>
                        <ul>
                          <li>Start Date</li>
                        </ul>
                        <InputGroup className="mb-5">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-calendar border-0" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholderText="Enter date"
                            className="form-control"
                            onChange={handleDate}
                            minDate={new Date()}
                            selected={new Date(travelsFormsData.start_date)}
                            dateFormat="dd/MM/yyyy"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            showTimeSelect={false}
                          />

                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip.travelStrartDate}
                            </Tooltip>
                          }
                        >
                          <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>End date</li>
                        </ul>
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholderText="Enter date"
                            className="form-control"
                            // onChange={handleDate}
                            disabled
                            selected={new Date(travelsFormsData.end_date)}
                            dateFormat="dd/MM/yyyy"
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Traveldetails" className="buttonactions">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                      onClick={handleNextClick}
                    >
                      <Link
                        // to="/Travelplantype"
                        className="buttonactions"
                      >
                        Next
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TravelInsurancedetails />
      <Footer />
    </div>
  );
};
export default Traveldetailsform;







