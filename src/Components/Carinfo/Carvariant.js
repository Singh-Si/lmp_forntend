import React, { useEffect, useState } from "react";
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
const Carvariant = () => {
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

  const onClickDivclick = async(data) => {
    handleSubmitMotorform("car_variant", data._id);
    handleSubmitMotorform("CarvarientName", data.motor_model_detail_name);
    fetchDataSelectCarValue(data.motor_model_detail_name)
    navigate("/SelectCarvalue")
  };

  const fetchData = async () => {
    setLoading(true);
    await axios
      .post(API_URL + "/api/getMotorDetails", {
        years: motorFormsData?.model_year,
        carMaker: motorFormsData?.car_maker,
        carModel: motorFormsData.car_model,
      })
      .then(async(response) => {
        setLoading(false);
        if (response?.data?.status === 200) {
          setDisableLink(false)
          let data=response.data.data
          console.log("car_variant",motorFormsData.car_variant)
          if(motorFormsData.car_variant ){
           let exist=await data.find((val=>val._id===motorFormsData.car_variant))
            if(exist){
              handleSubmitMotorform("car_variant", exist["_id"]);
              handleSubmitMotorform("CarvarientName", exist["motor_model_detail_name"]);
              setCars(response.data.data);
            }else{
              handleSubmitMotorform("car_variant", data[0]["_id"]);
              handleSubmitMotorform("CarvarientName", data[0]["motor_model_detail_name"]);
              setCars(response.data.data);
            }

          }
         else if (!motorFormsData.car_variant)
         handleSubmitMotorform("car_variant", data[0]["_id"]);
         handleSubmitMotorform("CarvarientName", data[0]["motor_model_detail_name"]);
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
        setMessage(error?.response?.data?.message);
        setDisableLink(true)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [itemsToShow, setItemsToShow] = useState(false);
  const showmore = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setItemsToShow(!itemsToShow);
  };
  useEffect(() => {
    if (Cars.length > 0) {
      const index = Cars.findIndex(
        (val) => val._id === motorFormsData.car_variant
      );
      //console.log(index, "check");
      if (index > 8) {
        setItemsToShow(true);
      }
    }
  }, [Cars]);
  const Progress = 40;

  const handleApiResponse = (response) => {
    if (response.data) {
      console.log("i am inside check me ", response.data.minCarValue)
      handleSubmitMotorform("minDep", response.data.minDep);
      handleSubmitMotorform("maxDep", response.data.maxDep);
      handleSubmitMotorform("minCarValue", +response.data.minCarValue);
      handleSubmitMotorform("maxCarValue", +response.data.maxCarValue);
      handleSubmitMotorform("aslider_value", +response.data.minCarValue)


    }
  };

  const fetchDataSelectCarValue = async (CarvarientName) => {
    try {
      console.log("fetchDataSelectCarValue")
      setLoading(true);
      await axios
        .post(API_URL + "/api/getCarEstimatedValue", {
          model_year: motorFormsData?.model_year,
          car_maker: motorFormsData?.car_maker,
          car_model: motorFormsData.car_model,
          car_variant: CarvarientName,
        })
        .then((response) => {

          handleApiResponse(response);
        })
        .catch((error) => {
          setDisableLink(true);
          ;
          setLoading(false);
          setError(true);
          setMessage(error?.response?.data?.message);
        });
    } catch (error) {
      console.log("error", error)
    }
  };






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
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <ul>
                    <li>Select vehicle variant</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {Loading ? (
                        <div id="loading"></div>
                      ) : Error ? (
                        <div>{Message}</div>
                      ) : Cars && Cars.length > 0 ? (
                        itemsToShow? Cars.map((v, i) => {

                          return (
                            <div
                              className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                              key={v._id}
                            >
                              <label
                                className={
                                  motorFormsData &&
                                    motorFormsData.car_variant === v._id
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                              >
                                <input type="radio" />
                                <div
                                  className="car_variant"
                                  onClick={() => onClickDivclick(v)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {v.motor_model_detail_name}
                                </div>
                              </label>
                            </div>
                          );
                        }):Cars.slice(0, 9).map((v, i) => {
                            return (
                              <div
                                className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                key={v._id}
                              >
                                <label
                                  className={
                                    motorFormsData &&
                                      motorFormsData.car_variant === v._id
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                >
                                  <input type="radio" />
                                  <div
                                    className="car_variant"
                                    onClick={() => onClickDivclick(v)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {v.motor_model_detail_name}
                                  </div>
                                </label>
                              </div>
                            );
                          })
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
                      <Link to="/Carmodel" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    {
                      disableLink ? (<div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}

                      >
                        <Link

                          className="buttonactions disabled"
                        >
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>

                      </div>) : (<div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                        onClick={() => fetchDataSelectCarValue(motorFormsData.CarvarientName)}
                      >
                        <Link

                          to="/SelectCarvalue"
                          className="buttonactions"
                        >
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>

                      </div>)
                    }
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

export default Carvariant;
