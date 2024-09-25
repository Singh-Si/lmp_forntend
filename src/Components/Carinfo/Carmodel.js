/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import swal from "sweetalert";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Carmodel = () => {
  const [disableLink, setDisableLink] = useState(true);
  const {
    motorFormsData,
    handleBeforeUnload,
    handleSubmitMotorform,
  } = UseMotorContext();
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const [Cars, setCars] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");
  const navigate=useNavigate()
  const onClickDivclick = (data) => {
   handleSubmitMotorform("car_model", data);
   navigate("/Carvariant")
  };
  
     const fetchData = async () => {
       setLoading(true);
       await axios
         .post(API_URL + "/api/getMotorDetails", {
           years: motorFormsData?.model_year,
           carMaker: motorFormsData?.car_maker,
         })
         .then((response) => {
           setLoading(false);
           if (response?.data?.status === 200) {
            setDisableLink(false)
            let data=response.data.data
            if(motorFormsData.car_model){
             let exist= data.find((val=>val._id===motorFormsData.car_model))
              if(!exist){
                handleSubmitMotorform("car_model", data[0]["_id"]);
                setCars(response.data.data);
              }
  
            }
           else if (!motorFormsData.car_model)
              handleSubmitMotorform("car_model", response?.data?.data[0]["_id"]);
            setCars(response.data.data);
          
           }
           else{
            setDisableLink(true)
           }
         })
         .catch((error) => {
           ;
           setLoading(false);
           setError(true);
           setDisableLink(true)
           setMessage(error?.response?.data?.message);
         });
     };
  useEffect(() => {
    fetchData()
  }, []);
  const [itemsToShow, setItemsToShow] = useState(false);
  const showmore = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setItemsToShow(!itemsToShow);
  };
  useEffect(() => {
    if (Cars.length > 0) {
      const index = Cars.findIndex(
        (val) => val._id === motorFormsData.car_model
      );
      //console.log(index, "check");
      if (index > 8) {
        setItemsToShow(true);
      }
    }
  }, [Cars]);
  const Progress = 35;
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <ul>
                    <li>Select vehicle model</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {Loading && <div id="loading"></div>}
                      {Error && (Message ? Message : "Intervel server error")}
                      {Cars && Cars.length > 0 ? (
                          itemsToShow
                          ?Cars.map((v, i) => (
                          <div
                            className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                            key={v._id}
                          >
                            <label
                              className={`btn btn-default ${
                                motorFormsData?.car_model == v._id
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <input type="radio" />
                              <div
                                className="Carmodel"
                                onClick={() => onClickDivclick(v._id)}
                                style={{ cursor: "pointer" }}
                              >
                                {v._id}
                              </div>
                            </label>
                          </div>
                        )):(Cars.slice(0, 9).map((v, i) => (
                          <div
                            className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                            key={v._id}
                          >
                            <label
                              className={`btn btn-default ${
                                motorFormsData?.car_model == v._id
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <input type="radio" />
                              <div
                                className="Carmodel"
                                onClick={() => onClickDivclick(v._id)}
                                style={{ cursor: "pointer" }}
                              >
                                {v._id}
                              </div>
                            </label>
                          </div>
                        )))
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <>
                      {Cars && Cars.length > 9 && (
                        <>
                          {itemsToShow ? (
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                              <p
                                className="showcom"
                                style={{ cursor: "pointer" }}
                                onClick={showmore}
                              >
                                Show Less
                              </p>
                            </div>
                          ) : (
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                              <p
                                className="showcom"
                                style={{ cursor: "pointer" }}
                                onClick={showmore}
                              >
                                Show More
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Carmaker" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    {disableLink ? ( <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      
                        <Link  className="buttonactions disabled">
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                      
                    </div>):( <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      
                        <Link to="/Carvariant" className="buttonactions">
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                      
                    </div>)}      
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MotorInsurancedetails />
      <Footer />
    </div>
  );
};

export default Carmodel;
